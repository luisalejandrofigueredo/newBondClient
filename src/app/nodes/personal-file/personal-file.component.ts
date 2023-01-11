import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-file',
  templateUrl: './personal-file.component.html',
  styleUrls: ['./personal-file.component.sass']
})
export class PersonalFileComponent implements OnInit{
  id:number=0;
  constructor(private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id=params['id']
    });
  }
}
