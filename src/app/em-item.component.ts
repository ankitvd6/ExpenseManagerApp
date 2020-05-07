import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ExpenseManagerService } from './em.service';
import { Expense } from './expense';


@Component({
    selector: 'td-item',
    templateUrl: './em-item.component.html',
    styleUrls: ['./em-item.component.css'],
})
export class ExpenseItemComponent implements OnInit{
    expenseItem: Expense;

    constructor(private activatedRoute: ActivatedRoute, private location: Location, private expenseManagerService: ExpenseManagerService,
        private router: Router){}

    editExpense(expenseItem: Expense): void{
        window.localStorage.removeItem("editExpenseHeading");
        window.localStorage.setItem("editExpenseHeading", expenseItem.heading);
        this.router.navigate(['edit']);
    }

    onDelete(expenseItem: Expense){
        this.expenseManagerService.delete(expenseItem);
    }

    ngOnInit(): void {
        this.getExpense();
    }
    
    getExpense(): void{
        let heading = this.activatedRoute.snapshot.paramMap.get('heading');
        this.expenseManagerService.getExpenseByHeading(heading).subscribe(expenseItem => this.expenseItem = expenseItem);
    }

    goBack(): void {
        this.location.back();
    }

}