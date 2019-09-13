import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.scss']
})
export class LandpageComponent implements OnInit {
  public phoneValidator = "^((\\+91-?)|0)?[0-9]{10}$";
  public phoneForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }
  ngOnInit() {
    let wapnumber = sessionStorage.getItem('wapnumber') ? sessionStorage.getItem('wapnumber'):'';
    wapnumber=wapnumber.slice(2,wapnumber.length);
    this.phoneForm = this.fb.group({
      phonenumber: new FormControl(wapnumber,
        Validators.compose([Validators.required,
        Validators.pattern(this.phoneValidator)
        ]))
    });
  }

  public addPhoneNumber() {
    sessionStorage.setItem('wapnumber', `91${this.phoneForm.value.phonenumber}`);
    this.router.navigate(['/message']);
  }



}
