import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  enviado = false;
  cargando = false;
  mail = '';
  pantallaOrigen = '';

  constructor( private fbAuth: AngularFireAuth,
               private db: AngularFirestore,
               private toast: ToastController,
               public loadCtrl: LoadingController,
               private afStorage: AngularFireStorage ) {
    console.log('constructor del fbSrvc');

    this.db.firestore.enablePersistence()
    .then ( () => {
      console.log('Persistencia de datos para FireBase habilitada!');
    })
    .catch( err => {
        console.log('No se pudo habilitar persistencia de datos para FireBase: ', err.code);
    });
    this.loginFirebase('luis.monroyv@gmail.com', '123456')
    .then( ok => {
      console.log('Firebase Iniciado OK.' , ok.user.uid);
    })
    .catch( err => {
      console.log('Error al iniciar Firebase: ', err);
    });

  }


  async loading(texto?: string) {
    const load = await this.loadCtrl.create({
      spinner: 'circular',
      mode: 'ios',
      message: texto
    });
    await load.present();
    setTimeout(() => {
      this.stopLoading();
    }, 10000);
    const { role, data } = await load.onDidDismiss();
    console.log('Loading dismissed!');
  }
  loginFirebase(email: string, pass?: string) {  // Posteo en FireBase
    console.log('loginFirebase()');
    return this.fbAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  logOutFirebase() {
    console.log('logOutFirebase()');
    return this.fbAuth.auth.signOut();
  }
  async mostrarMensaje( texto: string ) {
    const toast = await this.toast.create({
      message: texto,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async postSolicitud( mail: string ) {
    if (mail.length > 0) {
      const fecha = new Date();
      await this.db.collection('solicitudes').add({ fecha, mail})
      .then( docRef => {
        console.log('Solicitud ID: ', docRef.id);
      })
      .catch( err => {
        console.log('Error al ingresar Solcitud: ', err);
      });
    }
  }
  async sendEmailVerification() {
    this.enviado = true;
    await this.fbAuth.auth.currentUser.sendEmailVerification()
    .then( () => {
      this.mostrarMensaje('Correo enviado.');
    })
    .catch( err => {
      console.log('Error al enviar correo: ', err);
      this.mostrarMensaje('No pudimos enviar el correo, reintenta en unos momentos.');
    });
  }
  stopLoading() {
    console.log('stopLoading()');
    this.loadCtrl.getTop().then( elem => {
      if (elem) {
        this.loadCtrl.dismiss();
      }
    })
    .catch( err => {
      console.error(err);
    });
  }

}
