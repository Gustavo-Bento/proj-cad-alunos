import { FormBuilder, FormGroup } from '@angular/forms';
import {Student} from '../studant';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  students: Student[]=[

  ];
  formGroupStudent : FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formGroupStudent = formBuilder.group({
      id : [''],
      name : [''],
      course : ['']
    });
  }
  save(){
    this,this.students.push(this.formGroupStudent.value)
  }
}
