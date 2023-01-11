import { Component,Input,OnInit } from '@angular/core';
import { Location, } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-modules-node',
  templateUrl: './modules-node.component.html',
  styleUrls: ['./modules-node.component.sass']
})
export class ModulesNodeComponent implements OnInit {
  @Input('node-id') id=0;
  constructor(private activatedRoute:ActivatedRoute,private location: Location, private router: Router) { }
  ngOnInit(): void {
  }
  editPersonalFile() {
    this.router.navigate(['nodes/personalFile',this.id])
  }

}
