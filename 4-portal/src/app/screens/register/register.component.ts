import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private api: HttpClient) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = new FormGroup({
    fCName: new FormControl('', Validators.required),
    fCAge: new FormControl('', Validators.min(1)),
    fCEmail: new FormControl('', Validators.required),
    fCPassword: new FormControl('', Validators.required),
    fCPassword2: new FormControl('', Validators.required),
  });

  error: string = 'Fill in the needed details to register account.';

  async onSubmit() {
    if (!(await this.registerForm.valid)) {
      {
        this.error = 'No fields must be empty.';
        alert(this.error);
        return;
      }
    }
    else if (await this.registerForm.value['fCPassword'] !== await this.registerForm.value['fCPassword2']) {
      this.error = 'Password doesnt match!';
      alert(this.error);
      return;
    }
    else if (await this.registerForm.valid){
      var result: any = await this.api.post(environment.API_URL + "/user/register", 
      {
        "name": this.registerForm.value['fCName'], 
        "age": this.registerForm.value['fCAge'],
        "email": this.registerForm.value['fCEmail'],
        "password": this.registerForm.value['fCPassword']
      }).toPromise();
      if(result.success == true){
        var payload: {name: string; age: string; email: string; password: string;};
        payload = {
          name: this.registerForm.value['fCName'],
          age: this.registerForm.value['fCAge'],
          email: this.registerForm.value['fCEmail'],
          password: this.registerForm.value['fCPassword']
        };

        var result: any = await this.api.post(environment.API_URL + "/user/login", {"email": payload.email, "password": payload.password}).toPromise();
        if(result.success == true){
         this.nav('home');
        }
        else{
          alert(result.data);
        }
          
      }
      else{
        if(result.data == "Email has already been used."){
          alert(result.data);
        }
        else if (result.data == "Inavlid attributes."){
          alert("Make sure that age must be a number.")
        }
      }
    }
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
