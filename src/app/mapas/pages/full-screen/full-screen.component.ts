import { Component, OnInit } from '@angular/core';
//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #mapa{
    width: 100%;
    height: 100%;
  }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      //en mapbox todo empeza con longitud primero
      center: [-76.30112549317491, 3.901395854146426],
      zoom: 17
    });
  }

}
