import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ExpenseManagerService } from './em.service';
import { Expense } from './expense';

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
        this.getExpense();
    }
        
    getExpense(): void{
        let heading = this.activatedRoute.snapshot.paramMap.get('heading');
        let expenseItem = this.expenseManagerService.getExpenseByHeading(heading);
        this.expenseItem = expenseItem
    }

    editExpense(expenseItem: Expense) {
        window.localStorage.removeItem("editExpenseHeading");
        window.localStorage.setItem("editExpenseHeading", expenseItem.heading);
        this.router.navigate(['edit']);
    }

    // onDelete(expenseItem: Expense){
    //     this.expenseManagerService.delete(expenseItem);
    // }



    goBack(): void {
        this.location.back();
    }

}