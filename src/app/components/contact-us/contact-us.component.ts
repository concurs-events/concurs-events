import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionsService } from '@app/service/functions/functions.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup
  formSubmitted: boolean

  constructor(private builder: FormBuilder,
    private functionService: FunctionsService) { }

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
    let body = {
      "name": this.contactForm.controls.name.value,
      "email": this.contactForm.controls.email.value,
      //"attending": "event",
      "message": this.contactForm.controls.message.value
    }

    let result = this.functionService.postUserData(body).pipe(take(1))
      .subscribe(data => {
        console.log('result ', data)
      });
  }

}
