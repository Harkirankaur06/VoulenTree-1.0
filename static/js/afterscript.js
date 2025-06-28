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
       
function signout() {
  document.body.classList.add("fade-out");
   console.log("Signing out...");

  setTimeout(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/index.html";
  }, 800); 
}
// profile area
var navlinks = document.getElementById("navlinks");
function profileopen() {
  navlinks.style.right = "0";
}
function profileclose() {
  navlinks.style.right = "-200px";
}
function profileopen() {
  document.getElementById('profile-popup').classList.add('active');
}

function closePopup() {
  document.getElementById('profile-popup').classList.remove('active');
}

// get details js

// newww
const openModalBtn = document.getElementById('openModalBtn');
  const modal = document.getElementById('customModal');
  const okBtn = document.getElementById('okBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  // Show the modal
  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // Handle OK button click
  okBtn.addEventListener('click', () => {
    alert('Application Submitted Successfully');
    modal.style.display = 'none';
  });

  // Handle Cancel button click
  cancelBtn.addEventListener('click', () => {
    alert('You clicked Cancel');
    modal.style.display = 'none';
  });

  // Optional: close modal when clicking outside the box
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  const openModalBtn1 = document.getElementById('openModalBtn1');
  const modal1 = document.getElementById('customModal1');
  const okBtn1 = document.getElementById('okBtn1');
  const cancelBtn1 = document.getElementById('cancelBtn1');

  // Show the modal
  openModalBtn1.addEventListener('click', () => {
    modal1.style.display = 'block';
  });

  // Handle OK button click
  okBtn1.addEventListener('click', () => {
    alert('Application Submitted Successfully');
    modal1.style.display = 'none';
  });

  // Handle Cancel button click
  cancelBtn1.addEventListener('click', () => {
    alert('You clicked Cancel');
    modal1.style.display = 'none';
  });

  // Optional: close modal when clicking outside the box
  window.addEventListener('click', (e) => {
    if (e.target === modal1) {
      modal1.style.display = 'none';
    }
  });

  
  const openModalBtn2 = document.getElementById('openModalBtn2');
  const modal2 = document.getElementById('customModal2');
  const okBtn2 = document.getElementById('okBtn2');
  const cancelBtn2 = document.getElementById('cancelBtn2');

  // Show the modal
  openModalBtn2.addEventListener('click', () => {
    modal2.style.display = 'block';
  });

  // Handle OK button click
  okBtn2.addEventListener('click', () => {
    alert('Application Submitted Successfully');
    modal2.style.display = 'none';
  });

  // Handle Cancel button click
  cancelBtn2.addEventListener('click', () => {
    alert('You clicked Cancel');
    modal2.style.display = 'none';
  });

  // Optional: close modal when clicking outside the box
  window.addEventListener('click', (e) => {
    if (e.target === modal2) {
      modal2.style.display = 'none';
    }
  });

// floating button for ngo's

const openFormBtn5 = document.getElementById('openFormBtn5');
const formModal5 = document.getElementById('formModal5');
const closeFormBtn5 = document.getElementById('closeFormBtn5');
const contactForm5 = document.getElementById('contactForm5');

// Show the form
openFormBtn5.addEventListener('click', () => {
  formModal5.style.display = 'block';
});

// Hide the form
closeFormBtn5.addEventListener('click', () => {
  formModal5.style.display = 'none';
});

// Handle form submission
contactForm5.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted successfully!');
  formModal5.style.display = 'none';
});

// Optional: close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === formModal5) {
    formModal5.style.display = 'none';
  }
});

// chatbot
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  const messages = document.getElementById("chat-messages");

  if (!message) return;

  // Append user message to chat
  messages.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

  // Send to backend
  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    // Append bot response
    messages.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  })
  .catch((err) => {
    console.error("Fetch error:", err);
    messages.innerHTML += `<p><strong>Bot:</strong> Sorry, I couldn't reach the server.</p>`;
  });
}
// Enable Enter key to send message
document.getElementById("user-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submit if inside one
    sendMessage();          // Call your existing sendMessage function
  }
});
