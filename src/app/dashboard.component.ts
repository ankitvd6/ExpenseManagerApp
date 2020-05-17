import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'em-dash',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
    
    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        console.log("------------->CALLED DASHBOARD ONINIT()");
        
      }

    addItemMethod(){
        console.log("------------------------->Emitted event addItem");
        
    }

}