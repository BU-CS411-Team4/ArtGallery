import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideIndex = 1;
  constructor() { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }

  showSlides(n: number): void {
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;

    if (n > slides.length) {
      n = 1;
    } else if (n < 1) {
      n = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
  }

  plusSlides(n: number): void {
    if((this.slideIndex == 1) && (n == -1)) {
      this.slideIndex = 5
    } else if((this.slideIndex == 5) && (n == 1)) {
      this.slideIndex = 1
    } else {
      this.slideIndex += n;
    }

    this.showSlides(this.slideIndex);
  }

  currentSlide(n: number): void {
    this.showSlides(n);
  }
}
