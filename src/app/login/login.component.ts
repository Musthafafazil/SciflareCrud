import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logInForm:FormGroup
  public error: boolean = false;;
  constructor(private formBuilder: FormBuilder, private router: Router){ }
  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    
  })
}
  
  public submit():void {
    if (this.logInForm.valid) {
      if(this.logInForm.value.username == 'testuser@gmail.com' && this.logInForm.value.password == "test123"){
        this.router.navigate(['/student']);
      }
      else{
        this.error = true;
      }
    }
   
  }

}
