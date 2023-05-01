# NgGd

The easy way to manage the canvas.
Support object and clicks events to the objects
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Code scaffolding

Run `ng generate component component-name --project ng-gd` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-gd`.

> Note: Don't forget to add `--project ng-gd` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ng-gd` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-gd`, go to the dist folder `cd dist/ng-gd` and run `npm publish`.

## Running unit tests

Run `ng test ng-gd` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Usage

### install the lib

### create a canvas in html
```html
<canvas #canvas width="640" height="480"></canvas>
```
### declare var in your document class;
```typescript 
gd = inject(NgGdService);
private ctx!: CanvasRenderingContext2D;
@ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

ngOnInit(): void {
this.ctx = this.canvas.nativeElement.getContext('2d')!;
this.ctx.fillStyle = "black";
}
```
[Demo in stackblitz](https://stackblitz.com/edit/angular-atkcvp?file=src/main.ts)

