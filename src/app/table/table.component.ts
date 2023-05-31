import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StudentServiceService } from '../student-service.service';
import { FormComponent } from '../form/form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['studentName', 'mobileNumber', 'gender', 'department', 'dateofBirth', 'email', 'action'];
  dataSource: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private studentService: StudentServiceService,private router: Router) { }

  ngOnInit() {
     this.getAllStudent();
    //   const source: any[] = [
    //     {position: 1, studentName: 'Hydrogen', mobileNumber: 1.0079, gender: 'Male',department:'Mech',dateofBirth:'2023-03-08T18:30:00.000Z',email:'assassas'},

    //   ];
    // this.dataSource = new MatTableDataSource(source);
  }

  openDialog() {
    this.dialog.open(FormComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'Saved') {
        this.getAllStudent();
      }
    })
  }

  getAllStudent() {
    this.studentService.getStudent().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error While fetching The Student Data")
      }
    })
  }

  editStudent(rowNumber: any) {
    this.dialog.open(FormComponent, {
      width: '30%',
      data: rowNumber
    }).afterClosed().subscribe(val => {
      if (val == 'Updated') {
        this.getAllStudent();
      }
    })
  }


  deleteStudent(id: any) {
    this.studentService.deleteStudent(id).subscribe({
      next: (res) => {
        alert("Student Data Deleted Successfully")
        this.getAllStudent();
      },
      error: (err) => {
        alert("Error in Deleting the Student Data")
      }
    })
  }


  public logout():void{
    this.router.navigate(['']);
  }

}
