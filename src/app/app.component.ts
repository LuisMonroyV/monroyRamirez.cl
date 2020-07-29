import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fbSrvc: FirebaseService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.isLandscape()) {
        this.fbSrvc.pantallaOrigen = 'Desktop';
      } else {
        this.fbSrvc.pantallaOrigen = 'Phone';
      }
      console.log('Pantalla cliente: ', this.fbSrvc.pantallaOrigen);
    });
  }

  ngOnInit() {
  }
}
