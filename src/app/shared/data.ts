import { Injectable } from '@angular/core';

@Injectable()
export class Data {

    public storage: any;
    public storage2: any;
    public storage_second: any;
    public storage_third : any;
    public coursename: any;
    public specialization: any;
    public tabIndex: any;
    public newTicketpageValue: any;
    public OpenTicketpageValue: any;
    public CloseTicketpageValue: any;
    public ViewpageValue: any;
    public setValue(val,val1) {
        this.coursename = val;
        this.specialization = val1;
    }

    public getVal(){
        var data =this.coursename +'/' + this.specialization;
        return data ;
    }
    public constructor() { }

}