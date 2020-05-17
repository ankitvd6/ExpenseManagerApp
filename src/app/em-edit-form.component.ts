import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseManagerService } from './em.service';
import { Router } from "@angular/router";
import { Expense } from './expense';

@Component({
    selector: 'td-edit-form',
    templateUrl: './em-edit-form.component.html',
    styleUrls: ['./em-edit-form.component.css'],
})

export class ExpenseEditFormComponent implements OnInit {
    formGroup: FormGroup;
    expenseItem: Expense;
    updateIndex: number;

    constructor(private formBuilder: FormBuilder, private expenseManagerService: ExpenseManagerService, private router: Router) { }

    ngOnInit(){
        let heading = window.localStorage.getItem('editExpenseHeading');
        this.formGroup = this.formBuilder.group({
            heading : this.formBuilder.control(''),
            amount: this.formBuilder.control(''),
            description: this.formBuilder.control(''),
            date: this.formBuilder.control(''),
        });

        let data = this.expenseManagerService.getExpenseUpdateElement(heading);  
        this.formGroup.setValue(data.expense);
        this.expenseItem = data.expense;
        this.updateIndex = data.index;   
    }

    onSubmit(){
        this.expenseManagerService.update(this.formGroup.value, this.updateIndex);
        this.router.navigateByUrl('/');    
    }
}
