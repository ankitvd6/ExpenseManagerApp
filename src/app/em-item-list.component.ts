import { Component, OnInit } from '@angular/core';
import { ExpenseManagerService } from './em.service';
import { Expense } from './expense';

@Component({
    selector: 'em-item-list',
    templateUrl: './em-item-list.component.html',
    styleUrls: ['em-item-list.component.css'],
})

export class ExpenseItemListComponent implements OnInit{
    expenses;
    selectedExpense;
    searchInput='';

    constructor(private expenseManagerService: ExpenseManagerService){}

    ngOnInit(){
        this.getAllExpenses();
        console.log(this.expenses.length);
    }

    getAllExpenses(){
        this.expenseManagerService.getAll().subscribe((expenses) => {
            this.expenses = expenses;
        });
    }

    onDeleteExpenseItem(expenseItem: Expense){
        console.log("onDelete clicked"+expenseItem.description);
        this.expenseManagerService.delete(expenseItem)
        .subscribe(() => this.getAllExpenses());
        // this.showExpenseDetail(null);
    }

    showExpenseDetail(expenseItem){
        console.log("clicked show");
        this.selectedExpense = expenseItem;
    }


}