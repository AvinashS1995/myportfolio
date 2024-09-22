import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myPortfolio';

  sendMessageForm!: FormGroup;
  

  constructor(private http: HttpClient) {
    this.sendMessageForm = new FormGroup ({
      yourName: new FormControl('',Validators.required),
      yourEmail: new FormControl('',[Validators.required,Validators.email]),
      subject: new FormControl('',Validators.required),
      message: new FormControl('',Validators.required),
    })
  }

  ngOnInit():void {
    
  }

  onDownloadCV() {
  const link = document.createElement('a');
  link.href = 'assets/AngularResume.pdf';
  link.download = 'AvianshResume.pdf';
  link.click();
  }

 
  send() {
    const {yourName, yourEmail, subject, message} = this.sendMessageForm.getRawValue();
    
    if (this.sendMessageForm.valid) {
      emailjs.init('vSHog72PZuYqVm5oL')
    emailjs.send("service_iigmz3s", "template_ln656cf", {
      from_name: yourName || '',
      to_name: "Abhiya",
      from_email: yourEmail || '',
      subject: subject || '',
      message: message || '',
      reply_to: "yuu",
    }).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      
      
      // this.openSuccessToastrShow();
    }, (err) => {
      console.log('FAILED...', err);
      // this.openErrorToastrShow(); 
    });
    console.log("sendMessageForm",this.sendMessageForm.getRawValue());
    this.sendMessageForm.reset()
  } else {
    console.log('Form is invalid');
    // this.openFormErrorToastrShow();
    this.sendMessageForm.markAllAsTouched();
  }

  }
  
}
