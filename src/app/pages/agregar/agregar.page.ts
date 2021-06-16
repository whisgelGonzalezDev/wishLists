import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string;
  constructor(private deseos: DeseosService,
              private route: ActivatedRoute) { 

                const id = this.route.snapshot.paramMap.get('id');
                this.lista =this.deseos.getList( id );

                console.log(this.lista);
              }

  ngOnInit() {
  }
  
  addItem() {
    if ( this.nombreItem.length === 0 ) {
      return
    }

    const nuevoItem = new ListaItem ( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';
    this.deseos.saveStorage();
  }

  changeCheck( item: Lista ) {
    
    const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;
    if( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseos.saveStorage();

  }

  borrar( i: number ) {
    this.lista.items.splice( i, 1 );
    this.deseos.saveStorage();
  }
}
