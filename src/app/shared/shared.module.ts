import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { CustomPaginationService } from "../services/pagination-service";
import { HeaderComponent } from "./header/header.component";
import { SideBarComponent } from "./side-bar/side-bar.component";



@NgModule({
    declarations: [
        HeaderComponent,
        SideBarComponent,

    ],

    imports: [
        CommonModule,
        RouterModule

    ],
    exports: [
        CommonModule,
        HeaderComponent,
        RouterModule,
        NgxPaginationModule,
        SideBarComponent

    ],
    providers: [
        CustomPaginationService
    ],
    entryComponents: [],
})
export class SharedModule { }
