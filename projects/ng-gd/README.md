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
} from 'ng-gd/src/public-api';

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
