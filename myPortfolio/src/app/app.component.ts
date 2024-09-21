import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myPortfolio';


  downloadCV() {
    const url = 'https://drive.google.com/file/d/1lW4ksMBDzSHq9gWT13JSYCA_30Z-p9_A/view?usp=sharing';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'My_CV.pdf';
    link.click();
  }
}
