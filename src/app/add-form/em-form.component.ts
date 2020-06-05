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

    constructor(private formBuilder: FormBuilder, private expenseManagerService: ExpenseManagerService, 
        private router: Router) { }

    ngOnInit() {
            this.formGroup = this.formBuilder.group({
                id : this.formBuilder.control(''),
                heading : this.formBuilder.control('',Validators.required),
                amount: this.formBuilder.control('',Validators.required),
                description: this.formBuilder.control(''),
                date: this.formBuilder.control('',Validators.required),
            });
    }

    onSubmit(expenseItem: Expense){
        if(this.formGroup.valid){
            this.expenseManagerService.add(expenseItem)
            .then(docRef => {
                //updating the id of expense item to docRef this will help in finding the expense item document.
                this.expenseManagerService.assignExpenseId(docRef);
            });
            this.ngOnInit();
            this.addItem.emit(expenseItem);
            this.errorMessage = '';
            this.router.navigateByUrl('/');
        }   
        else{
            if(this.formGroup.get('heading').hasError('required'))
                this.errorMessage = 'Title Amount and Date fields are required';
            else if(this.formGroup.get('amount').hasError('required'))
                this.errorMessage = 'Title Amount and Date fields are required';
            else if(this.formGroup.get('date').hasError('required'))
                this.errorMessage = 'Title Amount and Date fields are required';
        }     
    }

    goBack(): void {
        this.router.navigateByUrl('/');
    }
    
}