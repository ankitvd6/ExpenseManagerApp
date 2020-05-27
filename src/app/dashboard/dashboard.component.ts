import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ExpenseManagerService } from '../em.service';

@Component({
    selector: 'em-dash',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
    // totalExpense ;
    
    constructor(private activatedRoute: ActivatedRoute, private expenseManagerService: ExpenseManagerService) { }

    ngOnInit() {
        // console.log("------------->CALLED DASHBOARD ONINIT()");
        // this.updateTotalExpense();
      }

    // updateTotalExpense() {
    //     console.log("inside DASHBOARD's updateTotalExpense() method");
    //     this.totalExpense = this.expenseManagerService.calculateTotalExpense();
    // }

}