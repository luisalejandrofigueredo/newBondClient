import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  domMatrix!: DOMMatrix;
  constructor() { }
  setZoom(domMatrix:DOMMatrix){
    this.domMatrix=domMatrix;
  }
  getZoom():DOMMatrix{
    return this.domMatrix;
  }
}
