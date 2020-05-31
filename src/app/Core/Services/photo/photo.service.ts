import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
//import { AngularFireStorage } from '@angular/fire/storage'
import { Observable, of } from 'rxjs';

import * as firebase from 'firebase';
import 'firebase/storage';
import { FirebaseStorage } from 'angularfire2';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  //constructor(private storage: AngularFireStorage) { }
  constructor() { }

  /*public async takePicture() {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });
  }*/
  public async takePicture() {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      correctOrientation:true,
      source: CameraSource.Camera,
      quality: 100 
    });
  }

  //Sube Foto a Firebase
  uploadImage(image:string, ruta:string){

    var storageRef = firebase.storage().ref(ruta);

    return new Promise((resolve, reject) => resolve(
            storageRef.putString(image, 'data_url', {
              contentType: 'image/png'
              })
      ));
  }
  
}
