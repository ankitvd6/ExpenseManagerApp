import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ExpenseManagerService } from '../em.service';
import { Expense } from '../expense';

/*  This coponent is being used to display the expense item details the url will have a parameter 'heading' 
    which is the heading of the expense that user wants to know the details of; 
    When the user clicks on one of the expense-list-item he/she will be directed to this component. 
*/

@Component({
    selector: 'td-item',
    templateUrl: './em-item.component.html',
    styleUrls: ['./em-item.component.css'],
})
export class ExpenseItemComponent implements OnInit{
    expenseItem: Expense;

    constructor(private activatedRoute: ActivatedRoute, private location: Location, private expenseManagerService: ExpenseManagerService,
        private router: Router){}

    ngOnInit(): void {
        let eid = this.activatedRoute.snapshot.paramMap.get('id');
        this.getExpense(eid);
    }
        
    getExpense(eid: string): void{
        this.expenseManagerService.findExpenseById(eid).subscribe(item => {
            this.expenseItem = item;
        });
    }

    editExpense(expenseItem: Expense) {
        this.router.navigate([`edit/${expenseItem.id}`]);
    }
    
    goBack(): void {
        this.location.back();
    }

}