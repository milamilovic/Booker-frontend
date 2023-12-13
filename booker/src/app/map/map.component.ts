import {Component, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "./map.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private address: string = '';
  private marker!: L.Marker;

  @Output() mapClick: EventEmitter<{ lat: number; lng: number; street: string; city: string }> = new EventEmitter<{ lat: number; lng: number; street: string; city: string }>();


  constructor(private mapService : MapService) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.addMarker();
    this.registerOnClick();
    this.search();
  }



  private addMarker(): void {
    const lat: number = 45.25;
    const lon: number = 19.8228;

    if(this.marker) {
        this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Trenutno se nalazite ovde.')
      .openPopup();



  }

  search(): void {
    this.mapService.search('Strazilovska 19, Novi Sad').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19')
          .openPopup();
      },
      error: () => {},
    });
  }


  registerOnClick(): void {
    this.address = '';
    this.map.on('click', (e: any) => {
      const coord = e.latlng;

      const lat = coord.lat;
      const lng = coord.lng;
      const latitudeVal = e.latlng.lat.toFixed(6);
      const longitudeVal = e.latlng.lng.toFixed(6);
       const latitudeInput = document.getElementById('latitude') as HTMLInputElement;
       const longitudeInput = document.getElementById('longitude') as HTMLInputElement;
       const streetInput = document.getElementById('street') as HTMLInputElement;
       const cityInput = document.getElementById('city') as HTMLInputElement;
      if (latitudeInput && longitudeInput) {
        latitudeInput.value = latitudeVal;
        longitudeInput.value = longitudeVal;
      }

      localStorage.setItem("lat", lat);
      localStorage.setItem("lng", lng);
      this.mapService.reverseSearch(lat, lng).subscribe((data: any) => {
        if (data && data.address) {
          streetInput.value = `${data.address.house_number}  ${data.address.road}`
          cityInput.value = `${data.address.city}`
          this.address = `${data.address.road}, ${data.address.city}, ${data.address.country}`
        } else {
          streetInput.value = "Street not found.";
          cityInput.value = "City not found."
        }

        this.mapClick.emit({ lat, lng, street: streetInput.value, city: cityInput.value });
      },
          error => {
            console.error("Error retrieving address: ", error);
            streetInput.value = "Error retrieving street";
            cityInput.value = "Error retrieving city";

          });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      const mp = new L.Marker([lat, lng]).addTo(this.map);
      mp.bindPopup(this.address).openPopup();
      alert(mp.getLatLng());
    });
  }



  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }





}
