import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../studant';
import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  formGroupStudent: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: [''],
    });
  }
  save() {
    this.students.push(this.formGroupStudent.value);
  }
}
