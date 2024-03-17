import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,LottieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/lottie/eat.json',
  };
  title = 'what-to-eat-in-list';
}
