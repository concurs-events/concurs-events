import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionsService } from '@app/service/functions/functions.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css']
})
export class NewsLetterComponent implements OnInit {

  newsForm: FormGroup
  formSubmitted: boolean

  constructor(private builder: FormBuilder,
    private functionService: FunctionsService,
    private elem: ElementRef) { }

  ngOnInit(): void {
    this.formSubmitted = false
    this.newsForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get form() { return this.newsForm.controls; }

  submitForm() {
    let submitObj = this.elem.nativeElement.querySelector('#submitBtn').classList
    let subscribeObj = this.elem.nativeElement.querySelector('#subscribe').classList
    let spinnerObj = this.elem.nativeElement.querySelector('#spinner').classList
    let successObj = this.elem.nativeElement.querySelector('#success').classList
    let errorObj = this.elem.nativeElement.querySelector('#error').classList
    let body = {}
    this.formSubmitted = true

    if (this.newsForm.invalid) {
      this.enableError(subscribeObj, submitObj, errorObj)
      return
    }
    subscribeObj.add('hide');
    submitObj.add('wd-40');
    spinnerObj.toggle('hide');

    body["email"] = this.newsForm.controls.email.value

    this.functionService.subscribeNewsLetter(body).pipe(take(1))
      .subscribe(data => {
        submitObj.add('bg-gr')
        spinnerObj.toggle('hide');
        successObj.toggle('hide');
        this.newsForm.reset()
        this.formSubmitted = false
        setTimeout(function (submitObj, spinnerObj, successObj, subscribeObj) {
          subscribeObj.remove('hide');
          submitObj.remove('bg-gr')
          submitObj.remove('wd-40');
          successObj.add('hide');
        }, 1000, submitObj, spinnerObj, successObj, subscribeObj);
        this.functionService.sendNewsLetterEmail(body).pipe(take(1))
          .subscribe(emailData => { })
      }, error => {
        spinnerObj.toggle('hide');
        this.enableError(subscribeObj, submitObj, errorObj)
        console.log(error);
      })
  }

  enableError(subscribeObj, submitObj, errorObj) {
    subscribeObj.add('hide');
    submitObj.add('wd-40', 'bg-rd');
    errorObj.toggle('hide');
    setTimeout(function (submitObj, errorObj, subscribeObj) {
      subscribeObj.remove('hide');
      submitObj.remove('wd-40', 'bg-rd');
      errorObj.add('hide');
    }, 1000, submitObj, errorObj, subscribeObj);
  }

}
