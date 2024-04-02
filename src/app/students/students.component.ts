import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../student';
import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  formGroupStudent: FormGroup;

  ngOnInit(): void{
    this.loadStudents();
  }

  loadStudents(){
    this.serviee.getStudents().subscribe({
      next: data => this.students = data
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private serviee: StudentService
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: [''],
    });
  }
  save() {
    this.serviee.save(this.formGroupStudent.value).subscribe({
      next: data => this.students.push(data)
    });

  }
}
