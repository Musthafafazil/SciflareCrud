import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentServiceService } from '../student-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public departmentList = ["Mech", "EEE", "ECE", 'CSE']
  public studentFrom!: FormGroup;
  public actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder, private studentService: StudentServiceService, private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.studentFrom = this.formBuilder.group({
      studentName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', Validators.required],
    })
    if (this.editData) {
      this.actionBtn = "Update"
      this.studentFrom.controls['studentName'].setValue(this.editData.studentName);
      this.studentFrom.controls['mobileNumber'].setValue(this.editData.mobileNumber);
      this.studentFrom.controls['gender'].setValue(this.editData.gender);
      this.studentFrom.controls['dateofBirth'].setValue(this.editData.dateofBirth);
      this.studentFrom.controls['department'].setValue(this.editData.department);
      this.studentFrom.controls['email'].setValue(this.editData.email);
    }

  }

  public addStudent() {
    if (!this.editData) {
      if (this.studentFrom.valid) {
        this.studentService.saveStudent(this.studentFrom.value).subscribe({
          next: (res) => {
            alert("Student Data Saved Successfully");
            this.studentFrom.reset();
            this.dialogRef.close('Saved');

          },
          error: () => {
            alert("Error in Saving Date");
          }
        })
      }
    } else {
      this.updateStudent()
    }

  }

  private updateStudent() {
    this.studentService.updateStudent(this.studentFrom.value, this.editData._id).subscribe({
      next: (res) => {
        alert("Student Data Updated Successfully");
        this.studentFrom.reset();
        this.dialogRef.close('Updated');

      },
      error: () => {
        alert("Error in Updating Date");
      }
    })
  }

}
