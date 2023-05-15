# NgGd

The easy way to manage the canvas.
Support object and clicks events to the objects
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Build

Run `ng build ng-gd` to build the lib. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-gd`, go to the dist folder `cd dist/ng-gd` and run `npm publish`.

## Running unit tests

Run `ng test ng-gd` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Usage

### install the lib
npm i ng-gd

### declare in a module program

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgGdService } from 'ng-gd';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NgGdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### create a canvas in html

```html
<canvas #canvas width="640" height="480"></canvas>
```

### declare vars in your component class and call the lib;

```typescript
import {
  NgGdService,
  Point,
  NodeObject,
} from 'ng-gd';

export class App implements OnInit {
gd = inject(NgGdService);
private ctx!: CanvasRenderingContext2D;
@ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
}

ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.gd.start(800,600);
    this.gd.setDarkMode();
    this.gd.addNode({ x: 150, y: 150 }, "one", "one", false, 10, 10);
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
}
```

[Demo objects in stackblitz](https://stackblitz.com/edit/angular-ngdemo?file=src%2Fmain.ts)

[Demo graph in stackblitz](https://stackblitz.com/edit/angular-ng-demo-graphics?file=src%2Fmain.ts)

[Demo ZOrder in GitHub](https://github.com/luisalejandrofigueredo/ZOrderDemo)

[Demo ZOrder in stackblitz](https://stackblitz.com/edit/angular-demozorder?file=src%2Fmain.ts)


## List gd service commands

**start(width: number, height: number)** start gd lib required for start.

**getLabels():** get all labels.

**getConnections()** get all connections.

**getNodes()** get all nodes.

**castingMultiplesSides(id: number)** get a multiples sides object with id number;

**castingLine(id:number)** get a line Object.

**castingRectangle(id: number)** get a rectangle object.

**castingCircle(id: number)** get a circle object.

**castingNode(id:number)** get a node object.

**castingLabel(id: number)** get a label object.

**castingConnection(id: number)** get connection object.

**casting(id)** get a any object with casting.

**getMousePoint(ctx: CanvasRenderingContext2D, x: number, y: number)** return a position the mouse.

**setDarkMode()** change the background color to black and ink white;

**setLightMode()** change the background color to white and ink black;

**canvasSetSize(width: number, height: number)** change canvas size for the library not the canvas.

**resetMouse()** reset last position.

**clear(ctx: CanvasRenderingContext2D)** clear the canvas.

**clearObjects()** delete all objects in the library.

**addGraphBars(ctx: CanvasRenderingContext2D, point: Point, width: number, values: number[], color: string[], distance: number)** create graph bars.

**addAxisY(ctx: CanvasRenderingContext2D, point: Point, dist: number, steps: number, labels: string[], fontSize: number, angleGrades?: number, distance?: number)** create a y axis.

**addAxisX(ctx: CanvasRenderingContext2D, point: Point, dist: number, steps: number, labels: string[], fontSize: number, angleGrades?: number, distance?: number)** create a x axis.

**addMultiplesSides(point: Point, sides: number, radius: number, color?: string, borderColor?: string)** create a figure with 5 sides minimum.

**addTriangle(first: Point, second: Point, third: Point, color?: string, borderColor?: string)** create a triangle.

**addCircle(point: Point, radius: number, color?: string, borderColor?: string)** create a circle.

**addRectangle(point: Point, width: number, height: number, angle:number,color?: string, borderColor?: string)** create a rectangle.

**addNode(point: Point, name: string, description?: string, net?: boolean, angleLabel?: number, distanceLabel?: number)** add node.

**addConnection(point: Point, toPoint: Point, color?: string, label?: string)** create a connection.

**addLine(point: Point, toPoint: Point, steps?: number, color?: string)** create a line steps mark the line like rule.

**addLabel(point: Point, text: string, fontSize: number, angle: number)** create a label.

**click(ctx: CanvasRenderingContext2D, event: MouseEvent):{ shape: ShapeObject, action: string }** return a array all objects are clicked with mouse order for ZOrder. 
Possible events off object:

## inPoint Object are clicked.

### Line and connection private events

**inPointXY Object clicked in first point.**

**inPointToXY Object clicked in second point.**

**inRectangle Object clicked in the line.**


**getClicks()** return a list created for click function speed reasons.

**draw(ctx: CanvasRenderingContext2D)** draw all objects.

**zoomInPoint(ctx: CanvasRenderingContext2D, x: number, y: number, zoom: number)** zoom in x,y position.

**getItem(id:number)** return a object with casting to ShapeObject.


## Object properties all object are derived the class ShapeObject.
x:position x.
y:position y.

**color** object color;

**visible** toggle object to visible you turn false the object not draw.

**type** var with string class of the object the easy way to obtain the type class the one object.

**possibles values are**

label

node

connection

rectangle

circle

triangle

multiplesSides

line


## Objects common functions

**drawShape(ctx: CanvasRenderingContext2D)** draw the object in the canvas.

**inverseShape(ctx: CanvasRenderingContext2D)** draw the object with background color.

**inPoint(x: number, y: number)** return true if the object is in position x,y.

**move(x:number,y:number)** Move the object to new position.

**moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent)** Move the object to mouse position.

## Additional functions for LineObject and ConnectionObject

**inPointXY(x: number, y: number): boolean** if the mouse is over the first point the line or connection.

**inPointToXY(x: number, y: number): boolean** if the mouse is over the second point the line or connection.


**inRectangle(x: number, y: number): boolean** if the mouse is over the line.

**moveMouseXY(ctx: CanvasRenderingContext2D, event: MouseEvent)** Mouse move the first point to new position. 

**moveMouseToXY(ctx: CanvasRenderingContext2D, event: MouseEvent)** Mouse move the second point to new position. 


## Objects level
**toFront()** Move the object to fist plane over all objects.

**toTop()** Move the object to first plane.

**toBack()** Move the object to last plane.

**nextZOrder()** Move the object one plane to front.

**backZOrder()** Move the object one plane to back.

service renumber is for not let plane withouts objects.
for sample .
this.gd.renumber()