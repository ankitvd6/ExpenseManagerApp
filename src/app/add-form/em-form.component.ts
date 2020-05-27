import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseManagerService } from '../em.service';
import { Router } from "@angular/router";
import { Expense } from '../expense';
import { EXPENSES } from '../mock-expenses';

@Component({
    selector: 'em-form',
    templateUrl: './em-form.component.html',
    styleUrls: ['./em-form.component.css'],
})

export class ExpenseFormComponent implements OnInit{
    formGroup: FormGroup;
    expenseItem: Expense;
    errorMessage;
    @Output() addItem = new EventEmitter();
    // totalExpense: number = 0;

    constructor(private formBuilder: FormBuilder, private expenseManagerService: ExpenseManagerService, private router: Router) { }

    ngOnInit() {
            this.formGroup = this.formBuilder.group({
                id : this.formBuilder.control(''),
                heading : this.formBuilder.control('',Validators.required),
                amount: this.formBuilder.control('',Validators.required),
                description: this.formBuilder.control(''),
                date: this.formBuilder.control(''),
            });
        console.log("------------------>called add form ngOnInit");
    }

    onSubmit(expenseItem: Expense){
        if(this.formGroup.valid){
            console.log("expenseItem.id"+expenseItem.id);
            this.expenseManagerService.add(expenseItem)
            .then(docRef => {
                console.log("====ADDED DOC whose DOCREF id ===>>>"+docRef.id);
                // console.log("====DOCREF id type===>>>"+typeof docRef.id);
                this.expenseManagerService.assignExpenseId(docRef);
            });
            // this.expenseManagerService.calculateTotalExpense();
            // this.totalExpense = this.expenseManagerService.calculateTotalExpense();
            this.ngOnInit();
            this.addItem.emit(expenseItem);
            this.errorMessage = '';
            console.log("---------------------------------->end OnSubmit addForms");
        }   
        else{
            if(this.formGroup.get('heading').hasError('required'))
                this.errorMessage = 'Name field is required';
            if(this.formGroup.get('amount').hasError('required'))
                this.errorMessage = 'Amount field is required';
        }     
    }
    
}