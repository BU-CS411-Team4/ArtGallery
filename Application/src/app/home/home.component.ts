import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.onload = () => {
      this.initSlideShow();
    };
    this.showSlides(1); // Show the first slide when the page loads
  }

  initSlideShow(): void {
    let slideIndex = 1;
    this.showSlides(slideIndex);
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
    let slideIndex = 1; // You can remove this line if you declare slideIndex as a property of HomeComponent
    slideIndex += n;
    this.showSlides(slideIndex);
  }

  currentSlide(n: number): void {
    this.showSlides(n);
  }
}
