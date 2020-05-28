import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseManagerService } from '../em.service';
import { Expense } from '../expense';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
    selector: 'em-item-list',
    templateUrl: './em-item-list.component.html',
    styleUrls: ['em-item-list.component.css'],
})

export class ExpenseItemListComponent implements OnInit{
    searchInput='';
    sortOrder = '';
    sortParameter = '';
    // @Output() deleteItem = new EventEmitter();
    expenses: Observable<any[]>;
    uid: string;
    totalExpense: number = 0;

    constructor(private expenseManagerService: ExpenseManagerService, private router: Router,
        private afs: AngularFirestore, private afAuth: AngularFireAuth,
        private activatedRoute: ActivatedRoute){
    }

    ngOnInit(){ 
        this.uid = this.afAuth.auth.currentUser.uid;
        // this.expensesCollection = this.afs.collection<Expense>(`users/${this.uid}/expenses`);
        //automatically update expenses when collection changes.
        this.expenses = this.afs.collection(`users/${this.uid}/expenses`).valueChanges();
        this.expenses.subscribe(expenses => {
            this.totalExpense = 0;
            expenses.forEach(element => this.totalExpense += element.amount);
        });
        
    }

    onDeleteExpenseItem(expenseItem: Expense){
        console.log("onDelete clicked item-id: "+expenseItem.id);
        this.expenseManagerService.delete(expenseItem.id);
        this.router.navigateByUrl(`/dashboard/${this.uid}`);
    }
}