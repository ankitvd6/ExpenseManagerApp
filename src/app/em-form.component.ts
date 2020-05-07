import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseManagerService } from './em.service';
import { Router } from "@angular/router";
import { Expense } from './expense';

@Component({
    selector: 'em-form',
    templateUrl: './em-form.component.html',
    styleUrls: ['./em-form.component.css'],
})

export class ExpenseFormComponent implements OnInit{
    formGroup: FormGroup;
    expenseItem: Expense;

    constructor(private formBuilder: FormBuilder, private expenseManagerService: ExpenseManagerService, private router: Router) { }

    ngOnInit(){
        this.expenseItem = history.state.expenseItem;
        
        if(history.state.heading != undefined){
            this.formGroup = this.formBuilder.group({
                heading : this.formBuilder.control(` ${history.state.heading} `),
                amount: this.formBuilder.control(` ${history.state.amount} `),
                description: this.formBuilder.control(` ${history.state.description} `),
                dueDate: this.formBuilder.control(` ${history.state.dueDate} `),
            });
        }
        else{
            this.formGroup = this.formBuilder.group({
                heading : this.formBuilder.control(''),
                amount: this.formBuilder.control(''),
                description: this.formBuilder.control(''),
                dueDate: this.formBuilder.control(''),
            });
        }
    }

    onSubmit(expenseItem: Expense){
        this.expenseManagerService.add(expenseItem).subscribe(() => {
            this.ngOnInit();
        });
        this.router.navigateByUrl('/');
    }
}