import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from './expense';
import { EXPENSES } from './mock-expenses';

@Injectable({
    providedIn: "root",
})
export class ExpenseManagerService{
    
    getAll() {
        return EXPENSES;
    }

    add(expense: Expense) {
        EXPENSES.push(expense);
        console.log("sucessfully added");
    }

    delete(expense: Expense) {
        let index = EXPENSES.indexOf(expense);
        if(index >= 0){
            EXPENSES.splice(index,1);
        }
    }

    update(expense: Expense, index: number) {
        EXPENSES[index].heading = expense.heading;
        EXPENSES[index].amount = expense.amount;
        EXPENSES[index].description = expense.description;
        EXPENSES[index].date = expense.date;
        console.log(" successfully updated ");
    }

    getExpenseByHeading(heading: string): Expense{
        return EXPENSES.find(expense => expense.heading === heading);
    }

    getExpenseUpdateElement(heading: string): ExpenseUpdateItem{
        let expense = EXPENSES.find(expense => expense.heading === heading);
        const expenseUpdateElement: ExpenseUpdateItem = {index:0, expense: {}};
        
        expenseUpdateElement.index = EXPENSES.indexOf(expense);
        expenseUpdateElement.expense = expense;
        return expenseUpdateElement;
    }

}

interface ExpenseUpdateItem{
    expense;
    index;
}