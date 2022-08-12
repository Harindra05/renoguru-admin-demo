import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleValue = new EventEmitter();
  @Output() colourChange = new EventEmitter();

  showsidebar: any = true;
  colour: any = true

  constructor(private cookie:CookieService,private router:Router) { }

  ngOnInit(): void {
  }
  sideBarToggle() {
    this.showsidebar = !this.showsidebar
    this.toggleValue.emit(this.showsidebar);
  }
  themesColourChange() {
    this.colour = !this.colour
    this.colourChange.emit(this.colour)
  }
  logout(){
    this.cookie.delete('renoAdmin')
    this.router.navigate(['/']);
  }
}
