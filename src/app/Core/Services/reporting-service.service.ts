import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { Filesystem, FilesystemDirectory } from '@capacitor/core';
import { Platform } from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  pdfObj = null
  logoBase64;
  
  constructor(private http: HttpClient, private plt: Platform,
    private fileOpener: FileOpener) { 
    this.localAssetToBase64('../../../assets/img/logo.png')
  }

  public async generarReporteVisita(visita: any){

    var docDefinition = {
      watermark: { text: 'Safetify', color: 'grey', opacity: 0.1, bold: true, italics: false },
      content: [
        {
          image: this.logoBase64,
          width: 100,
          height: 100
        },
        { text: 'Reporte Visita - ' + visita.tipoVisita.descripcion , alignment:'center', fontSize: 20,
          bold: true },
        { text: visita.cliente.nombre + ' - ' + visita.establecimiento.nombre , alignment:'center', fontSize: 15,
          bold: true },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Fecha Visita: ',
              bold: true 
            },
            {
              width: '*',
              text: visita.fecha
            }
          ],
          margin: [ 0, 10, 0, 0 ]
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Realizada Por: ',
              bold: true 
            },
            {
              width: '*',
              text: visita.empleado.apellido + ', ' + visita.empleado.nombre 
            }
          ]
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Estado: ',
              bold: true 
            },
            {
              width: '*',
              text: visita.estado.descripcion
            }
          ]
        },
        { text: 'Controles' , alignment:'center', fontSize: 20, margin: [ 0, 5, 0, 5 ],
          bold: true 
        },
        this.generarEsquemaControles(visita.controles)      
      ]     
    }

    if(this.plt.is('cordova')){
      this.pdfObj.getBase64(async (data) => {
        try {
          let path = `pdf/reportVisita_${visita.id}_${Date.now()}.pdf`;

          const result = await Filesystem.writeFile({
            path,
            data,
            directory: FilesystemDirectory.Documents,
            recursive: true
          });
          this.fileOpener.open(`${result.uri}`, 'application/pdf')
        } catch(e){
          console.error('Error Escritura PDF', e)
        }
      })

    }else{
      pdfMake.createPdf(docDefinition).download();
    }    
  }

  private generarEsquemaControles(controles: any[]){

    var bodyTables = []

    controles.forEach(control => {
      
      var bodyControl = []

      bodyTables.push({
        text: control.ubicacion,
        fontSize: 15,
        bold: true,
        margin: [ 0, 5, 0, 0 ]  
      });

      bodyControl.push([
        { 
        text: 'Medición', fontSize: 12,
			  bold: true,
        margin: [0, 0, 0, 10]
        }, 
        { 
        text: 'Valor', fontSize: 12,
			  bold: true,
        margin: [0, 0, 0, 10]
        }]);

      control.mediciones.forEach(medicion => {
        bodyControl.push([medicion.nombre , medicion.valor]);
      });

      var tablaControl: any = {
        table:{
          headerRows: 1,
          body: bodyControl
        },
        alignment:'center',
        margin: [0, 10, 0, 5]
      }

      bodyTables.push(tablaControl)

    });

    return bodyTables;
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }
  localAssetToBase64(ruta){
    this.http.get(ruta, {responseType: 'blob'})
    .subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () =>{
        this.logoBase64 = reader.result;
      }
      reader.readAsDataURL(res)
    })
  }
}
