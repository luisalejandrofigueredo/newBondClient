import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsConService } from "../../services/events-con.service";
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-event-con',
  templateUrl: './add-event-con.component.html',
  styleUrls: ['./add-event-con.component.sass']
})
export class AddEventConComponent implements OnInit {
  eventForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    date:new FormControl<Date>(new Date(),{nonNullable:true})
  });
  id:number=0;

  constructor(private snackBar:MatSnackBar ,private activatedRoute:ActivatedRoute,private eventConService:EventsConService,private location:Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id=params['id'];
    });
  }

  onSubmit(){
    this.eventConService.add(this.id,{name:this.eventForm.controls.name.value,description:this.eventForm.controls.description.value,date:this.eventForm.controls.date.value}).then((accept)=>{
      this.snackBar.open('Event added','Add',{duration:3000});
      this.location.back();
    }).catch((reject)=>{
      this.snackBar.open('Registry not added','Error',{duration:3000})
    });
  }

  cancel(){
    this.location.back();
  }
}
