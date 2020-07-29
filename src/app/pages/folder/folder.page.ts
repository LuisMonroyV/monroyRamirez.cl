import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  randomClass = 'fondo' + this.fbSrvc.pantallaOrigen + (Math.round(Math.random() / 2 * 100)).toString();
  hora = new Date();
  inter: any;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private activatedRoute: ActivatedRoute,
              private fbSrvc: FirebaseService) { }

  ngOnInit() {
    console.log(this.randomClass);
    console.log(this.hora);
    this.inter = setInterval( () => {
      this.hora = new Date();
    } , 1000);
  }

    tap(event: any) {
      console.log('tap', event);
    }
}
