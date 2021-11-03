import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private api: HttpClient) { }

  ngOnInit(): void {
  }

  title = 'portal';

  loginForm: FormGroup = new FormGroup({
    fCEmail: new FormControl('', Validators.required),
    fCPassword: new FormControl('', Validators.required)
  });
  
 
  
  requestResult = "";
  
  adminEmail: string = 'admin@usjr.edu.ph';
  adminPassword: string = 'admin10';

  async login(){
    if (!(await this.loginForm.value['fCEmail']) && !(await this.loginForm.value['fCPassword'])) {
      alert("Make sure that all textboxes are filled.")
    }
    else if (!(await this.loginForm.value['fCEmail']) && (await this.loginForm.value['fCPassword'])) {
      alert("Missing Email.")
    }
    else if ((await this.loginForm.value['fCEmail']) && !(await this.loginForm.value['fCPassword'])) {
      alert("Missing Password")
    }
    else {
      var result: any = await this.api.post(environment.API_URL + "/user/login", {"email": this.loginForm.value['fCEmail'], "password": this.loginForm.value['fCPassword']}).toPromise();
      if(result.success == true){
        alert(result.data);
        this.nav('home');
      }
      else{
        alert(result.data);
      }
    }
    
    /*if(this.fCEmail.value == this.adminEmail && this.fCPassword.value == this.adminPassword){
      this.nav('home');
    }
    else{
      alert("Incorrect credentials!");
    }*/
  }

  register(){
    this.nav('register');
  }

  nav(destination: string){
    this.router.navigate([destination]);
  }
}
