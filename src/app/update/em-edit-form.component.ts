import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

    constructor(private formBuilder: FormBuilder, private expenseManagerService: ExpenseManagerService, 
        private activatedRoute: ActivatedRoute, private router: Router, private location: Location) { }

    ngOnInit(){        
        let eid = this.activatedRoute.snapshot.paramMap.get('id');
        this.form = this.formBuilder.group({
            id: this.formBuilder.control(''),
            heading : this.formBuilder.control(''),
            amount: this.formBuilder.control(''),
            description: this.formBuilder.control(''),
            date: this.formBuilder.control(''),
        });
        console.log(`got id : ${eid}`);
        
        this.expenseManagerService.findExpenseById(eid).subscribe(item => {
            console.log(`findByID itemId: ${item.id} heading : ${item.heading} `);
            // this.form = this.formBuilder.group({
            //     id: this.formBuilder.control(''),
            //     heading : this.formBuilder.control(''),
            //     amount: this.formBuilder.control(''),
            //     description: this.formBuilder.control(''),
            //     date: this.formBuilder.control(''),
            // });

            this.form.setValue(item);
        });
    }

    goBack(): void {
        this.location.back();
    }

    onSubmit(){
        // this.expenseManagerService.update(this.formGroup.value, this.updateIndex);
        console.log(`Inside onSubmit of update-form formGroup: ${this.form.value} formGroup.id : ${this.form.value.id}`);
        
        this.expenseManagerService.update(this.form.value);
        this.router.navigateByUrl('/dashboard/:id');    
    }
}
