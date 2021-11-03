import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router:Router, private api: HttpClient) { }

  ngOnInit(): void {
  }
  
  results: any;
  
  adminEmail: string = 'admin@usjr.edu.ph';
  adminPassword: string = 'admin10';

  async getAll(){
    var result:any = await this.api.get(environment.API_URL + "/user/all").toPromise();
    this.results = result.data;
  }

  nav(destination: string){
    this.router.navigate([destination]);
  } 

}
