import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(lista: any[], textoFiltro: string, columna: string): any {

    if(textoFiltro === '') return lista;

    return lista.filter(
      item => {

        return item[columna].toLowerCase().includes(textoFiltro.toLowerCase());
      }
    );
  }

}
