import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup
  formSubmitted: boolean

  constructor(private builder: FormBuilder,) { }

  ngOnInit(): void {
    this.formSubmitted = false
    this.contactForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  get form() { return this.contactForm.controls; }

  submitMessage() {
    this.formSubmitted = true
    if (this.contactForm.invalid) {
      return
    }
  }

}
