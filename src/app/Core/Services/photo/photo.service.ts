import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

import { AngularFireStorage } from '@angular/fire/storage';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private storage: AngularFireStorage) { }

  /*public async takePicture() {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });
  }*/
  public async takePicture(source: CameraSource) {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      correctOrientation:true,
      source: source,
      quality: 100 
    });
  }

  //Sube Foto a Firebase
  uploadImage(image:string, ruta:string){

    const fileRef = this.storage. ref(ruta);
    return new Promise<any>((resolve, reject) => resolve(
      fileRef.putString(image, 'data_url', {
        contentType: 'image/png'
        })
    )); 
  }
  
}
