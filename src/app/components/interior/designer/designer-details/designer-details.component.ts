import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-designer-details',
  templateUrl: './designer-details.component.html',
  styleUrls: ['./designer-details.component.scss']
})
export class DesignerDetailsComponent implements OnInit {
  isLoading:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
