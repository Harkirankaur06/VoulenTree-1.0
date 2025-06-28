let currentIndex = 0;
function moveSlide(direction) {
    const slider = document.querySelector(".slider-wrapper");
    const slides = document.querySelectorAll(".slider-content");
    const totalSlides = slides.length;
    const visibleSlides = 4; 
    const slideWidth = slides[0].offsetWidth + 100; 
    
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = totalSlides - visibleSlides;
    } else if (currentIndex > totalSlides - visibleSlides) {
        currentIndex = 0;
    }
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
let index = 1; // Start at the second image for the peek effect

function moveSlide1(step) {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    const visibleWidth = document.querySelector('.carousel-container').clientWidth;
    const imageWidth = visibleWidth * 0.6 + 20; // 60% width + margin

    if (images.length === 0) return; // Prevent errors if no images exist

    index += step;

    // Ensure looping effect
    if (index >= images.length) {
        index = 0; // Reset to the first image when at the end
    }

    carousel.style.transition = "transform 0.5s ease-in-out"; // Smooth slide transition
    carousel.style.transform = `translateX(${-index * imageWidth}px)`;

    // Update active class for scaling effect
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");
}

// Auto-slide every 5 seconds to the next image
setInterval(() => {
    moveSlide1(1);
}, 5000);



function moveSlide2(step) {
    const carousel = document.querySelector('.carousel1');
    const images = document.querySelectorAll('.carousel img');
    const visibleWidth = document.querySelector('.carousel-container1').clientWidth;
    const imageWidth = visibleWidth * 0.6 + 20; // 60% width + margin

    if (images.length === 0) return; // Prevent errors if no images exist

    index += step;

    // Ensure looping effect
    if (index >= images.length) {
        index = 0; // Reset to the first image when at the end
    }

    carousel.style.transition = "transform 29s ease"; // Smooth slide transition
    carousel.style.transform = `translateX(${-index * imageWidth}px)`;

    // Update active class for scaling effect
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");
}

// Auto-slide every 5 seconds to the next image
setInterval(() => {
    moveSlide2(1);
}, 5000);

// chatbot
function sendMessage() {
  const input = document.getElementById("user-input");
  const messages = document.getElementById("chat-messages");
  const message = input.value.trim();

  if (message !== "") {
    const userMessage = document.createElement("div");
    userMessage.textContent = "You: " + message;
    messages.appendChild(userMessage);

    const botMessage = document.createElement("div");
    botMessage.textContent = "Bot: Please log in to ask questions!";
    messages.appendChild(botMessage);

    messages.scrollTop = messages.scrollHeight;
    input.value = "";

    setTimeout(() => {
      alert("Redirecting to login page...");
      window.location.href = "/loginyt";
    }, 1000); // wait 1 second before redirect
  }
}

// for pre defined question
function sendPreset(message) {
  const input = document.getElementById("user-input");
  input.value = message;
  sendMessage(); // your existing send function
}

// seach oppo alert
function searchoppo() {
            alert("Frist you need to login,after that you can access.");
        }
        function searchoppo() {
            alert("Frist you need to login,after that you can access.");
        }

document.getElementById("user-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
