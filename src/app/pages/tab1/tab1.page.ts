import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor( public deseos: DeseosService,
               private route: Router,
               private alertCtrl: AlertController ) {

                
  }

  async agregarLista( lista: Lista ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('Cancelar')
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data,22);

            if( data.titulo.length === 0 ){
              return;
            }
            
            const id = this.deseos.crearLista(data.titulo);


          //creacion de la lista 
          this.route.navigateByUrl(`/tabs/tab1/agregar/${ id }`);

          }
        }
      ]
    });
   alert.present();

  }

}
