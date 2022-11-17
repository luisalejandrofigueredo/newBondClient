import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warper.component.html',
  styleUrls: ['./warper.component.sass']
})
export class WarperComponent implements OnInit {
  @Input('Title') title!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
