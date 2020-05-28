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
        this.afs.collection(`users/${user.uid}/userDetails`).ref.add(userDetails);
    }
    
    assignExpenseId(docRef: DocumentReference) {        
        this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/expenses/${docRef.id}`).update({
            id : docRef.id,
        });        
    }
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
        return this.afs.doc<Expense>(`users/${this.afAuth.auth.currentUser.uid}/expenses/${eid}`).valueChanges();
    }

    calculateTotalExpense() {
        let sum = 0;
        this.getAll().map(e => {
            sum += e.amount;
        })
        this.totalExpense = sum;
        return this.totalExpense;
    }


}
interface UserDetails {
    displayName: string,
    email: string;
}
