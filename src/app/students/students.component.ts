import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student';
import { Component } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  formGroupStudent: FormGroup;
  istEditing: boolean = false;
  isSubmited: boolean = false;

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
    this.formGroupStudent = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      course: ['', [Validators.required]],
    });
  }
  save() {
    this.isSubmited = true;

    if (this.formGroupStudent.valid) {
      if (this.istEditing) {
        this.service.update(this.formGroupStudent.value).subscribe({
          next: () => {
            this.loadStudents(),
              (this.istEditing = false),
              (this.isSubmited = false);
          },
        });
      } else {
        this.service.save(this.formGroupStudent.value).subscribe({
          next: (data) => {
            this.students.push(data), (this.isSubmited = false);
          },
        });
      }
      this.formGroupStudent.reset();
    }
  }
  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudents(),
    });
  }
  edit(student: Student) {
    this.formGroupStudent.setValue(student);
    this.istEditing = true;
  }

  get name(): any {
    return this.formGroupStudent.get('name');
  }

  get course(): any {
    return this.formGroupStudent.get('course');
  }
}
