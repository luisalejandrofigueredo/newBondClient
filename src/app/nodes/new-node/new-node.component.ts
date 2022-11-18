import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { NodeService } from "../../services/node.service";
import { LoginService } from "../../services/login.service";
@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.sass']
})
export class NewNodeComponent implements OnInit {
  color!:string;
  nodeForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    net: new FormControl<boolean>(false, { nonNullable: true }),
    colorCtr: new FormControl<string>('#a21d3a', { nonNullable: true })
  });
  constructor(private loginService: LoginService, private location: Location, private nodeService: NodeService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    let colStr=''
    if (this.nodeForm.controls.colorCtr.dirty){
      const color=eval(this.nodeForm.controls.colorCtr.value);
      colStr=color.hex;
    } else
    {
      colStr=this.nodeForm.controls.colorCtr.value.substring(1);
    }
    this.nodeService.add(this.loginService.id, { name: this.nodeForm.controls.name.value, description: this.nodeForm.controls.description.value, x: 100, y: 100, net: this.nodeForm.controls.net.value, visible: true ,color:colStr }).then((accept) => {
      this.location.back();
    })
  }
}
