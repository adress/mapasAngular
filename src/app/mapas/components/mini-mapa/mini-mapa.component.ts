import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [`
    div {
      width: 100%;
      height: 150px;
      margin: 0px;
    }
  `]
})
export class MiniMapaComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  @Input() lngLat: [number, number] = [0, 0];

  constructor() { }
  ngAfterViewInit(): void {

    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      //en mapbox todo empeza con longitud primero
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });
    
    //agregar marcador
    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa);
  }

}
