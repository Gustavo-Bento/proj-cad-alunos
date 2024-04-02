import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../student';
import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { Observable, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  formGroupStudent: FormGroup;

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe({
      next: (data) => (this.students = data),
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private service: StudentService
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: [''],
    });
  }
  save() {
    this.service.save(this.formGroupStudent.value).subscribe({
      next: (data) => this.students.push(data),
    });
  }
  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudents(),
    });
  }
}
