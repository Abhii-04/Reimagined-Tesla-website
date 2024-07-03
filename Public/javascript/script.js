$(document).ready(()=> {
  'use strict';

    var owl = $('.owl-carousel'),
        item,
        itemsBgArray = [], // to store items background-image
        itemBGImg;
  
    owl.owlCarousel({  
        items: 1,
        smartSpeed: 1000,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000,
        loop: true,
        nav: true,
        navText: false,
        onTranslated: function () {
            changeNavsThump();
        }
    });
  
    $('.active').addClass('anim');
  
    var owlItem = $('.owl-item'),
        owlLen = owlItem.length;
    /* --------------------------------
      * store items bg images into array
    --------------------------------- */
    $.each(owlItem, function( i, e ) {
        itemBGImg = $(e).find('.owl-item-bg').attr('src');
        itemsBgArray.push(itemBGImg);
    });
    /* --------------------------------------------
      * nav control thump
      * nav control icon
    --------------------------------------------- */
    var owlNav = $('.owl-nav'),
        el;
    
    $.each(owlNav.children(), function (i,e) {
        el = $(e);
        // append navs thump/icon with control pattern(owl-prev/owl-next)
        el.append('<div class="'+ el.attr('class').match(/owl-\w{4}/) +'-thump">');
        el.append('<div class="'+ el.attr('class').match(/owl-\w{4}/) +'-icon">');
    });
    
    /*-------------------------------------------
      Change control thump on each translate end
    ------------------------------------------- */
    function changeNavsThump() {
        var activeItemIndex = parseInt($('.owl-item.active').index()),
            // if active item is first item then set last item bg-image in .owl-prev-thump
            // else set previous item bg-image
            prevItemIndex = activeItemIndex != 0 ? activeItemIndex - 1 : owlLen - 1,
            // if active item is last item then set first item bg-image in .owl-next-thump
            // else set next item bg-image
            nextItemIndex = activeItemIndex != owlLen - 1 ? activeItemIndex + 1 : 0;
        
        $('.owl-prev-thump').css({
            backgroundImage: 'url(' + itemsBgArray[prevItemIndex] + ')'
        });
        
        $('.owl-next-thump').css({
            backgroundImage: 'url(' + itemsBgArray[nextItemIndex] + ')'
        });
    }
    changeNavsThump();
});



const buttons = document.querySelectorAll("[data-carousel-button]");

// Function to show a specific slide
function showSlide(index) {
  const slides = document.querySelector("[data-carousel] [data-slides]");
  const items = slides.children;

  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";
    delete items[i].dataset.active;
  }

  items[index].style.display = "block";
  items[index].dataset.active = true;
}
// Automatic slideshow
let index = 0;
function showSlides() {
  const slides = document.querySelector("[data-carousel] [data-slides]");
  const items = slides.children;

  index++;
  if (index >= items.length) {
    index = 0;
  }

  showSlide(index);
  setTimeout(showSlides, 3000); // Change image every 1 second
}

// Initialize the slideshow
showSlides();
// Function to simulate typing effect
function typeEffect(element, text, speed) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.placeholder += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        element.placeholder = ''; // Clear placeholder after typing completes
        setTimeout(() => {
          typeEffect(element, text, speed); // Restart typing effect
        }, 500); // Wait 0.5 seconds before restarting typing effect
      }, 1000); // Wait 1 second after completion before clearing placeholder
    }
  }, speed);
}

// Select the input element
const emailInput = document.getElementById('email-input');

// Original placeholder text
const placeholderText = "Enter Your E-mail";

// Set the typing speed (in milliseconds)
const typingSpeed = 300; // 0.3 seconds per character

// Call the function with the input element, placeholder text, and speed
typeEffect(emailInput, placeholderText, typingSpeed);


function updateNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links li a");

  sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();

      if (window.screen.width <= 425) {
          if (rect.top <= 1300) {
              navLinks.forEach((navLink) => {
                  navLink.classList.remove("active");
              });
              navLinks[index].classList.add("active");
          }
      } else if (425 <= window.screen.width <= 768) {
          if (rect.top <= 1250) {
              navLinks.forEach((navLink) => {
                  navLink.classList.remove("active");
              });
              navLinks[index].classList.add("active");
          }
      } else {
          if (rect.top <= 1000) {
              navLinks.forEach((navLink) => {
                  navLink.classList.remove("active");
              });
              navLinks[index].classList.add("active");
          }
      }
  });
}

window.addEventListener("scroll", updateNav);


