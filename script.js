
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
