import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseManagerService } from '../em.service';
import { Expense } from '../expense';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { element } from 'protractor';


@Component({
    selector: 'em-item-list',
    templateUrl: './em-item-list.component.html',
    styleUrls: ['em-item-list.component.css'],
})

export class ExpenseItemListComponent implements OnInit{
    // expenses: Expense[];
    searchInput='';
    sortOrder = '';
    sortParameter = '';
    @Output() deleteItem = new EventEmitter();
    private expenseItemDoc : AngularFirestoreDocument<Expense>;
    private expensesCollection: AngularFirestoreCollection;
    expenses: Observable<any[]>;
    uid: string;
    totalExpense: number = 0;

    constructor(private expenseManagerService: ExpenseManagerService, private router: Router,
        private afs: AngularFirestore, private afAuth: AngularFireAuth,
        private activatedRoute: ActivatedRoute){
            // this.uid = activatedRoute.snapshot.paramMap.get('userId');
            // console.log("parammap UiserId :"+activatedRoute.snapshot.paramMap.get('userId'));
            console.log("CALLED ITEM-LIST CONSTRUCTOR----->>>>");
    }

    ngOnInit(){ 
        this.uid = this.afAuth.auth.currentUser.uid;
        this.expensesCollection = this.afs.collection<Expense>(`users/${this.uid}/expenses`);
        this.expenses = this.afs.collection(`users/${this.afAuth.auth.currentUser.uid}/expenses`).valueChanges();
        this.expenses.subscribe(expenses => {
            this.totalExpense = 0;
            expenses.forEach(element => this.totalExpense += element.amount);
        });
        
        // console.log("item-list-init-fn() ----------------------->");
    }

    // getAllExpenses(){
    //     this.expenses = this.expenseManagerService.getAll();
    //     console.log(this.expenses.forEach(element => console.log(element)));
    //     console.log("item-list-method getAllexpenses()----->>>>>>>>>");
    // }
    onDeleteExpenseItem(expenseItem: Expense){
        console.log("onDelete clicked item-id: "+expenseItem.id);
        this.expenseManagerService.delete(expenseItem.id);
        this.router.navigateByUrl(`/dashboard/${this.uid}`);
        // this.deleteItem.emit("emited");
        // this.getAllExpenses();
        console.log("item-list-method END onDelete()---------->>>>>>>>>>>");
        // this.totalExpense = this.expenseManagerService.calculateTotalExpense();
    }
}