import { Component, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventsConService } from "../../services/events-con.service";
import { EventCon } from 'src/app/interfaces/event-con';

@Component({
  selector: 'app-edit-event-con',
  templateUrl: './edit-event-con.component.html',
  styleUrls: ['./edit-event-con.component.sass']
})
export class EditEventConComponent implements OnInit {
  eventForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    date:new FormControl<Date>(new Date(),{nonNullable:true})
  });
  id:number=0;
  eventConBuffer!:EventCon;
  constructor(private eventsConService:EventsConService,private location:Location,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id=params['id'];
      this.eventsConService.getOne(this.id).then((register)=>{
        this.eventForm.controls.name.setValue(register.name);
        this.eventForm.controls.description.setValue(register.description);
        this.eventForm.controls.date.setValue(new Date(register.date));
        this.eventConBuffer=register;
      });
    });
  }

  async onSubmit(){
    this.eventConBuffer.name=this.eventForm.controls.name.value;
    this.eventConBuffer.description=this.eventForm.controls.description.value;
    this.eventConBuffer.date=this.eventForm.controls.date.value;
    await this.eventsConService.put(this.eventConBuffer).then(accept=>{
      this.location.back();
    });
  }

  cancel(){
    this.location.back();
  }

}
