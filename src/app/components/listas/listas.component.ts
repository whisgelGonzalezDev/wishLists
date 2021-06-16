import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList ) lista:IonList
  @Input() terminada = true;
  constructor( public deseos: DeseosService,
               private route: Router,
               private alertCtrl: AlertController) { }

  ngOnInit() {}

  listSelected( lista: Lista ) {
    if( this.terminada ) {
      this.route.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.route.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrar( lista: Lista ) {
   this.deseos.borrarLista( lista );
   this.deseos.saveStorage();
  }

  async edit( lista: Lista ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
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
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);

            if( data.titulo.length === 0 ){
              return;
            }
            
          lista.titulo = data.titulo;
          this.deseos.saveStorage();
          this.lista.closeSlidingItems();
          }
        }
      ]
    });
   alert.present();

  }
}  