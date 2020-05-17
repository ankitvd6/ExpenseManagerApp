import { Component, OnInit } from '@angular/core';
import { ExpenseManagerService } from './em.service';
import { Expense } from './expense';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'em-item-list',
    templateUrl: './em-item-list.component.html',
    styleUrls: ['em-item-list.component.css'],
})

export class ExpenseItemListComponent implements OnInit{
    expenses: Expense[];
    searchInput='';
    totalExpense:number;

    constructor(private expenseManagerService: ExpenseManagerService, private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        this.getAllExpenses();
    }

    getAllExpenses(){
        this.expenses = this.expenseManagerService.getAll();
    }

    onDeleteExpenseItem(expenseItem: Expense){
        console.log("onDelete clicked"+expenseItem.description);
        this.expenseManagerService.delete(expenseItem);
        this.getAllExpenses();
    }

}