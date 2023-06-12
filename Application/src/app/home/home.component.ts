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
  }

  initSlideShow(): void {
    let slideIndex = 1;
    showSlides(slideIndex);

    function showSlides(n: number) {
      const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
      const dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
      
      if (n > slides.length) {
        slideIndex = 1;
      } else if (n < 1) {
        slideIndex = slides.length;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }

    function plusSlides(n: number) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n: number) {
      showSlides(slideIndex = n);
    }

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton) {
      prevButton.addEventListener('click', function () {
        plusSlides(-1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        plusSlides(1);
      });
    }

    const dotElements = document.getElementsByClassName('dot');

    for (let j = 0; j < dotElements.length; j++) {
      dotElements[j].addEventListener('click', function () {
        currentSlide(j + 1);
      });
    }
  }
}
