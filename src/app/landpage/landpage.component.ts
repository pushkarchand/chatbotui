import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.scss']
})
export class LandpageComponent implements OnInit {
  public listOfCountries: [{ name: 'India', code: '91' }, { name: 'UAE', code: '971' }, { name: 'UAE', code: '971' }, { name: 'USA', code: '+1' }];
  constructor() { }
  // private formBuilder: FormBuilder
  public contactForm: FormGroup;
  ngOnInit() {
    // this.contactForm = this.formBuilder.group({
    //   code: '',
    //   number: ''
    // });
  }

}
