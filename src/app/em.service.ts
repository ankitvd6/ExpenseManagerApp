import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from './expense';
import { EXPENSES } from './mock-expenses';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
// import { element } from 'protractor';

@Injectable({
    providedIn: "root",
})
export class ExpenseManagerService{
    totalExpense: number = 0;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

    saveUserDetails(){
        const user = this.afAuth.auth.currentUser;
        const userDetails: UserDetails = {
            displayName : user.displayName,
            email : user.email,
        }
        console.log("uid: "+user.uid);
        
        this.afs.collection(`users/${user.uid}/userDetails`).ref.add(userDetails);
    }
    
    assignExpenseId(docRef: DocumentReference) {        
        this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/expenses/${docRef.id}`).update({
            id : docRef.id,
        });
        console.log("SuccessFully assigned.....");
        
    }
    // getAll() {
    //     return EXPENSES;
    // }
    getAll() {
        let expensesArray = [];
        console.log(`inside service: uid: ${this.afAuth.auth.currentUser.uid}`);
        
        this.afs.collection(`users/${this.afAuth.auth.currentUser.uid}/expenses`).ref.get()
        .then(function(col) {
            col.docs.forEach(element => {
                expensesArray.push(element.data());
            })
        });
        return expensesArray;
    }

    add(expense: Expense) {
        // EXPENSES.push(expense);
        console.log("sucessfully added");
        return this.afs.collection(`users/${this.afAuth.auth.currentUser.uid}/expenses`).ref.add(expense);
    }

    delete(eid: string) {
        return this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/expenses/${eid}`).delete();
    }

    update(expense: Expense) {
        return this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/expenses/${expense.id}`).update({
            heading: expense.heading,
            amount: expense.amount,
            description: expense.description,
            date: expense.date,
        });
    }
    
    findExpenseById(eid: string) {
        // console.log(`DOCUMENT BY ID ${eid} is : ${this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/expenses/${eid}`).valueChanges()}`);
        // console.log(`DOCUMENT BY ID ${eid} using ref.get() : ${this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/expenses/${eid}`).ref.get()}`);
        return this.afs.doc<Expense>(`users/${this.afAuth.auth.currentUser.uid}/expenses/${eid}`).valueChanges();
    }
    // delete(expense: Expense) {
    //     let index = EXPENSES.indexOf(expense);
    //     if(index >= 0){
    //         EXPENSES.splice(index,1);
    //     }
    // }

    // update(expense: Expense, index: number) {
    //     EXPENSES[index].heading = expense.heading;
    //     EXPENSES[index].amount = expense.amount;
    //     EXPENSES[index].description = expense.description;
    //     EXPENSES[index].date = expense.date;
    //     console.log(" successfully updated ");
    // }

    calculateTotalExpense() {
        let sum = 0;

        // const reducer = (accumulator, currentValue) => accumulator.amount + currentValue.amount;
        // this.totalExpense = this.getAll().reduce(reducer).amount;
        // console.log(`value of TotalExpense inside service method() --------------> ${this.totalExpense}`);
        this.getAll().map(e => {
            sum += e.amount;
        })
        this.totalExpense = sum;
        // console.log(`called by --------------> ${this.calculateTotalExpense.caller()}`);
        // console.log(`value of TotalExpense inside service method() --------------> ${this.totalExpense}`);
        return this.totalExpense;
    }

    // getExpenseByHeading(heading: string): Expense{
    //     return EXPENSES.find(expense => expense.heading === heading);
    // }

    // getExpenseUpdateElement(heading: string): ExpenseUpdateItem{
    //     let expense = EXPENSES.find(expense => expense.heading === heading);
    //     const expenseUpdateElement: ExpenseUpdateItem = {index:0, expense: {}};
        
    //     expenseUpdateElement.index = EXPENSES.indexOf(expense);
    //     expenseUpdateElement.expense = expense;
    //     return expenseUpdateElement;
    // }

}
interface UserDetails {
    displayName: string,
    email: string;
}

interface ExpenseUpdateItem{
    expense;
    index;
}