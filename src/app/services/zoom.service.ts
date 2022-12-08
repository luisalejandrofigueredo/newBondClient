import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  domMatrix!: DOMMatrix
  zoomMemory:{mouseX:number,mouseY:number,zoom:number}[]=[];
  zoom = false;
  nullMatrix!:DOMMatrix;
  constructor() { }
  init(domMatrix:DOMMatrix) {
    this.domMatrix=domMatrix;
    this.nullMatrix=domMatrix;
    this.zoom=false;
  }

  newZoom(mouseX: number, mouseY: number, zoom: number) {
    this.zoom=true;
    this.domMatrix.translate(mouseX, mouseY);
    this.domMatrix.scale(zoom, zoom);
    this.domMatrix.translate(-mouseX, -mouseY);
    this.zoomMemory.push({mouseX:mouseX,mouseY:mouseY,zoom:zoom});
  }

  setZoom():DOMMatrix {
    this.domMatrix=this.nullMatrix;
    this.zoomMemory.forEach(zoom => {
      this.domMatrix.translate(zoom.mouseX, zoom.mouseY);
      this.domMatrix.scale(zoom.zoom, zoom.zoom);
      this.domMatrix.translate(-zoom.mouseX, -zoom.mouseY);
    });
    return this.domMatrix
  }
  
  getZoom(): DOMMatrix {
    return this.domMatrix;
  }
}
