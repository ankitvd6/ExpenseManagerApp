import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../expense';

@Pipe({name: 'sortBy'})
export class SortByPipe implements PipeTransform {
    transform(list: Expense[], sortOrder: string, sortParam:string, ...args: any[]) {
        if(list.length === 1)
            return list;
        else{
            if(sortOrder === 'asc' && sortParam === 'amount')
                return list.slice().sort((a,b) => a.amount - b.amount);
            if(sortOrder === 'desc' && sortParam === 'amount')
                return list.slice().sort((a,b) => b.amount - a.amount);
            //sort by date
            if(sortOrder === 'asc' && sortParam === 'date')
                return list.slice().sort(this.compareDate);
            if(sortOrder === 'desc' && sortParam === 'date')
                return list.slice().sort(this.compareDateDesc);
            // sort by heading string
            if(sortOrder === 'asc' && sortParam === 'heading')
                return list.slice().sort(this.compareString);
            if(sortOrder === 'desc' && sortParam === 'heading')
                return list.slice().sort(this.compareStringDesc);
            else
                return list;
        }
        // throw new Error("Method not implemented.");
    }

    compareString(a,b) {
        const headingA = a.heading.toUpperCase();
        const headingB = b.heading.toUpperCase();

        let comparison = 0;
        if(headingA > headingB) { comparison = 1; }
        else if(headingA < headingB) { comparison = -1; }
        return comparison;
    }
    compareStringDesc(a,b) {
        const headingA = a.heading.toUpperCase();
        const headingB = b.heading.toUpperCase();

        let comparison = 0;
        if(headingA > headingB) { comparison = 1; }
        else if(headingA < headingB) { comparison = -1; }
        return comparison * -1;
    }

    compareDate(a,b) {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        let comparison = 0;
        if(dateA > dateB) { comparison = 1; }
        else if(dateA < dateB) { comparison = -1; }
        return comparison;
    }

    compareDateDesc(a,b) {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        let comparison = 0;
        if(dateA > dateB) { comparison = 1; }
        else if(dateA < dateB) { comparison = -1; }
        return comparison * -1;
    }

}