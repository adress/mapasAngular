import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }

  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-76.30112549317491, 3.901395854146426];

  //areglo de maracadores
  marcadores: MarcadorColor[] = [];

  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      //en mapbox todo empeza con longitud primero
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola mundo';

    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }

  irMarcador(marcador: mapboxgl.Marker) {
    const { lng, lat } = marcador.getLngLat();
    this.mapa.flyTo({ center: [lng, lat] });
  }

  agregarMarcador() {
    //genera color hexadecimal aleatorio
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    //agrega el nuevo marcador al arreglo
    this.marcadores.push({ color, marker: nuevoMarcador });
    this.guardarMarcadoresLocalStorage();

    
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });

  }

  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({ color, centro: [lng, lat] });
    });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    const strMarcadores = localStorage.getItem('marcadores');
    if (!strMarcadores) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(strMarcadores!);

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });
    });
  }

  borrarMarcador(index: number){
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index, 1); //lo elimina del arreglo
    this.guardarMarcadoresLocalStorage();
  }

}
