import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  title = 'portal';
  adminEmail: string = 'admin@usjr.edu.ph';
  adminPassword: string = 'admin10';

  login(email: string, password: string){
    if(email == this.adminEmail && password == this.adminPassword){
      this.router.navigate(['home']);
    }
    else{
      alert("Incorrect credentials!");
    }
  }
}
