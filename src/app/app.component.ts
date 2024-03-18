import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ButtonModule } from 'primeng/button';
import { DataService } from './data.service';
import { GoogleMapLocation } from './type/location.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, LottieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/lottie/eat.json',
  };
  locationList: GoogleMapLocation[] = [];
  selectLocation!: GoogleMapLocation;
  mapApiKey = 'AIzaSyAiFgUI-di7CXYgmuV1cUZPXszR74ugnW8';
  isPolling = false;
  showResult = false;

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.dataService.getLocationList().subscribe((data) => {
      this.locationList = data;
      // this.selectLocation = this.selectRandomLocation();
    });
  }

  selectRandomLocation() {
    this.showResult = false;
    this.isPolling = true;
    const list = document.querySelectorAll('.wrap > span');
    Array.prototype.forEach.call(list, (l) =>
      l.classList.add('span-' + (this.locationList.length - 1))
    );
    const randomIndex = Math.floor(Math.random() * this.locationList.length);
    const randomLocation = this.locationList[randomIndex];
    return randomLocation;
  }

  startPolling() {
    this.selectLocation = this.selectRandomLocation();
    setTimeout(() => {
      this.showResult = true;
    }, 3000);
  }

  getMapSrc(): SafeResourceUrl {
    console.log(this.selectLocation?.title);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?key=${this.mapApiKey}&q=${this.selectLocation?.title}`
    );
  }
}
