import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../models/users';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() error: any;

  @Output() msg = new EventEmitter<String>();

  message: String;

  constructor() { }

  ngOnInit(): void {

  //   if(this.error.controls.firstName.errors.required)
  //     this.message = "First Name Required";

  //   if(this.error.controls.firstName.errors.pattern)
  //     this.message ="Mauvais First Name pattern" 

  //   if(this.error.controls.lastName.errors.required)
  //      this.message ="Last Name Required"
  //   if(this.error.controls.lastName.errors.pattern)
  //      this.message ="Mauvais last Name pattern"

  //    if(this.error.controls.email.errors.pattern)
  //      this.message ="Mauvais email pattern"

  //    if(this.error.controls.password.errors.pattern)
  //      this.message ="Mauvais password pattern"

  //    else
  //      this.message ="Oussama"
    
  // }

  // validation() {
  //   this.msg.emit(this.message)
  // }
  
  }
}
