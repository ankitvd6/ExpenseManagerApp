import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseManagerService } from '../em.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Expense } from '../expense';

@Component({
    selector: 'td-edit-form',
    templateUrl: './em-edit-form.component.html',
    styleUrls: ['./em-edit-form.component.css'],
})

export class ExpenseEditFormComponent implements OnInit {
    form: FormGroup;
    expenseItem: Expense;
    updateIndex: number;
    errorMessage

    constructor(private formBuilder: FormBuilder, private expenseManagerService: ExpenseManagerService, 
        private activatedRoute: ActivatedRoute, private router: Router, private location: Location) { }

    ngOnInit(){        
        let eid = this.activatedRoute.snapshot.paramMap.get('id');
        this.form = this.formBuilder.group({
            id: this.formBuilder.control(''),
            heading : this.formBuilder.control('', Validators.required),
            amount: this.formBuilder.control('', Validators.required),
            description: this.formBuilder.control(''),
            date: this.formBuilder.control('', Validators.required),
        });
        
        this.expenseManagerService.findExpenseById(eid).subscribe(item => {
            this.form.setValue(item);
        });
    }

    goBack(): void {
        // this.location.back();
        this.router.navigateByUrl('');
    }

    onSubmit(){
        if(this.form.valid) {
            this.expenseManagerService.update(this.form.value);
            this.router.navigateByUrl('/dashboard/:id');    
        }
        else{
            if(this.form.get('heading').hasError('required'))
                this.errorMessage = 'Title field is required';
            else if(this.form.get('amount').hasError('required'))
                this.errorMessage = 'Amount field is required';
            else if(this.form.get('date').hasError('required'))
                this.errorMessage = 'Date field is required';
        }
    }
}
