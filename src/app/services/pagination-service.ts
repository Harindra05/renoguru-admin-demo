import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";



@Injectable()
export class CustomPaginationService {

    config = {
        currentPage: 1,
        itemsPerPage: 10
    };
    collection = [];
    constructor(private route: ActivatedRoute, private router: Router) {

    }

    pageChange(newPage: number) {
        this.config.currentPage = newPage

    }




}

