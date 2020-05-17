import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
    @Output() addItem = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private expenseManagerService: ExpenseManagerService, private router: Router) { }

    ngOnInit() {
            this.formGroup = this.formBuilder.group({
                heading : this.formBuilder.control(''),
                amount: this.formBuilder.control(''),
                description: this.formBuilder.control(''),
                dueDate: this.formBuilder.control(''),
            });
        console.log("------------------>called add form ngOnInit");
    }

    onSubmit(expenseItem: Expense){
        this.expenseManagerService.add(expenseItem);
        this.ngOnInit();
        this.addItem.emit("hello");
        console.log("---------------------------------->end OnSubmit addForms");        
    }
}