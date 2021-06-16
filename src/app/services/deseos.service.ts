import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas: Lista [] = [];
  constructor() {
    this.loadStorage();
   }


   crearLista(titulo: string) {
    const nvaLista = new Lista(titulo);
    this.listas.push(nvaLista);
    this.saveStorage();

    return nvaLista.id;
   }
   
   borrarLista(lista: Lista) {
      this.listas = this.listas.filter( listaData => listaData.id !== lista.id )
    }

   getList( id: string | number) {
      id = Number(id);

      return this.listas.find( listaData => listaData.id === id );
   }

   saveStorage() {
     localStorage.setItem('data', JSON.stringify(this.listas) );
   }

   loadStorage() {
      
    if(localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
   }
}
