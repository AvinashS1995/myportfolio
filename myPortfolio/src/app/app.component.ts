import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import emailjs from '@emailjs/browser';
import { DefaultGlobalConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myPortfolio';

  sendMessageForm!: FormGroup;


  constructor(private http: HttpClient, private toast : ToastrService) {
    this.sendMessageForm = new FormGroup({
      yourName: new FormControl('', Validators.required),
      yourEmail: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {

  }

  onDownloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/AngularResume.pdf';
    link.download = 'AvianshResume.pdf';
    link.click();
  }


  send() {
    const { yourName, yourEmail, subject, message } = this.sendMessageForm.getRawValue();

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
        this.toast.success('Successfully Send Message!','Sucees',{closeButton:true,timeOut:3000,positionClass:'toast-bottom-right'})

      }, (err) => {
        console.log('FAILED...', err);
        this.toast.error('Error In Sending Message!','Error',{closeButton:true,timeOut:3000,positionClass:'toast-bottom-right'}) 
      });
      console.log("sendMessageForm", this.sendMessageForm.getRawValue());
      this.sendMessageForm.reset()
    } else {
      console.log('Form is invalid');
      this.toast.error('Form is invalid!','Error',{closeButton:true,timeOut:3000,positionClass:'toast-bottom-right'})
      this.sendMessageForm.markAllAsTouched();
    }

  }


  
}
