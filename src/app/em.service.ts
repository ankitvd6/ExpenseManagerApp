import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from './expense';
import { EXPENSES } from './mock-expenses';

@Injectable({
    providedIn: "root",
})
export class ExpenseManagerService{
    
    getAll(): Observable<Expense[]>{
        return of(EXPENSES);
    }

    add(expense: Expense): Observable<void>{
        let heading = expense.heading;
        let expenseTemp = EXPENSES.find(expense => expense.heading === heading);
        let index = EXPENSES.indexOf(expenseTemp);
        console.log(`-----index of expense-------> ${index}`);
        if(index === -1){
            EXPENSES.push(expense);
            console.log("sucessfully added");
        }
        else{
            EXPENSES[index].heading = expense.heading;
            EXPENSES[index].amount = expense.amount;
            EXPENSES[index].description = expense.description;
            EXPENSES[index].date = expense.date;
            console.log(" successfully updated ");
        }
        return of();    
    }

    delete(expense: Expense): Observable<void>{
        let index = EXPENSES.indexOf(expense);
        if(index >= 0){
            EXPENSES.splice(index,1);
        }
        return of();
    }

    update(expense: Expense, index: number): Observable<void>{
        // console.log(`${expense.heading}`);
        // let index = EXPENSES.indexOf(expense);
        console.log("index "+ index);
        EXPENSES[index].heading = expense.heading;
        EXPENSES[index].amount = expense.amount;
        EXPENSES[index].description = expense.description;
        EXPENSES[index].date = expense.date;
        console.log(" successfully updated ");
        return of();
    }

    getExpenseByHeading(heading: string): Observable<Expense>{
        return of(EXPENSES.find(expense => expense.heading === heading));
    }

    getExpenseUpdateElement(heading: string): Observable<ExpenseUpdateItem>{
        let expense = EXPENSES.find(expense => expense.heading === heading);
        const expenseUpdateElement: ExpenseUpdateItem = {index:0, expense: {}};
        
        expenseUpdateElement.index = EXPENSES.indexOf(expense);
        expenseUpdateElement.expense = expense;
        return of(expenseUpdateElement);
    }

    getExpense(expense: Expense): Observable<Expense>{
        let index = EXPENSES.indexOf(expense);
        if(index >= 0){
            console.log(EXPENSES[index]);
            return of(EXPENSES[index]);
        }
        else
            return of(null);
    }

}

interface ExpenseUpdateItem{
    expense;
    index;
}