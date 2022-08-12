import { Component } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent {

  toggle = true;
  colourChange = false;

  getData(data: any) {
    if (!this.toggle) {
      this.toggle = true;
    }
    else {
      this.toggle = false;
    }
  }
  getColourChange(data: any) {
    if (data) {
      this.colourChange = false
    } else {
      this.colourChange = true

    }

  }
}
