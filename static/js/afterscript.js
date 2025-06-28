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
const openBtn = document.getElementById("openYearCalendarBtn");
const modal6 = document.getElementById("yearCalendarModal");
const closeBtn = document.getElementById("closeYearCalendarBtn");
const grid = document.getElementById("calendarGrid");
const title = document.getElementById("calendarMonthTitle");
const prevBtn = document.getElementById("prevMonthBtn");
const nextBtn = document.getElementById("nextMonthBtn");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

openBtn.addEventListener("click", () => {
  modal6.style.display = "block";
  buildCalendar(currentYear, currentMonth);
});

closeBtn.addEventListener("click", () => {
  modal6.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal6.style.display = "none";
  }
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  buildCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  buildCalendar(currentYear, currentMonth);
});

function buildCalendar(year, month) {
  grid.innerHTML = "";
  title.textContent = `${monthNames[month]} ${year}`;

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  days.forEach(day => {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.className = "calendar-day-header";
    grid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= totalDays; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;
    cell.className = "calendar-date-cell";
    cell.addEventListener("click", () => {
      alert(`You selected ${d} ${monthNames[month]} ${year}`);
    });
    grid.appendChild(cell);
  }
}
/////////////////////////////////
// --- Opportunity Modal Setup ---
const openOrgBtn7 = document.getElementById("openOrgPanelBtn7");
const closeOrgBtn7 = document.getElementById("closeOrgPanelBtn7");
const orgModal7 = document.getElementById("orgPanelModal7");
const orgContainer7 = document.getElementById("orgOpportunitiesContainer7");

// Show modal
openOrgBtn7.addEventListener("click", () => {
  orgModal7.style.display = "block";
  refreshOpportunities7(); // Load new opportunities every time it's opened
});

// Close modal
closeOrgBtn7.addEventListener("click", () => {
  orgModal7.style.display = "none";
});

// Click outside to close
window.addEventListener("click", (e) => {
  if (e.target === orgModal7) {
    orgModal7.style.display = "none";
  }
});

// Get random opportunities
function getRandomOpportunities() {
  const sampleData = [
    {
      org_name: "CleanEarth",
      org_gmail: "contact@cleanearth.org",
      org_location: "Mumbai, India",
      org_requirement: "Beach Cleaning",
      org_durationdays: 3,
      org_durationtime: "Morning",
      org_stipend: 300,
      org_msg: "Join hands to clean Juhu beach."
    },
    {
      org_name: "BrightFuture",
      org_gmail: "hello@brightfuture.org",
      org_location: "Bangalore, India",
      org_requirement: "Child Education",
      org_durationdays: 15,
      org_durationtime: "Evening",
      org_stipend: 1500,
      org_msg: "Help kids learn basic skills."
    },
    {
      org_name: "EcoGuardians",
      org_gmail: "info@ecoguardians.org",
      org_location: "Pune, India",
      org_requirement: "Tree Plantation",
      org_durationdays: 5,
      org_durationtime: "Afternoon",
      org_stipend: 200,
      org_msg: "Support our city greening drive."
    },
    {
      org_name: "FoodRelief",
      org_gmail: "volunteer@foodrelief.org",
      org_location: "Delhi, India",
      org_requirement: "Meal Distribution",
      org_durationdays: 2,
      org_durationtime: "Anytime",
      org_stipend: 0,
      org_msg: "Distribute food to the needy."
    }
  ];

  return sampleData.sort(() => 0.5 - Math.random()).slice(0, 2);
}

// Replace opportunity list
function refreshOpportunities7() {
  const newOpportunities = getRandomOpportunities();
  orgContainer7.innerHTML = "";

  newOpportunities.forEach(op => {
    const card = document.createElement("div");
    card.className = "org-card7";
    card.innerHTML = `
      <h3 class="org-card-title7">${op.org_name}</h3>
      <p><strong>Email:</strong> ${op.org_gmail}</p>
      <p><strong>Location:</strong> ${op.org_location}</p>
      <p><strong>Requirement:</strong> ${op.org_requirement}</p>
      <p><strong>Duration:</strong> ${op.org_durationdays} days (${op.org_durationtime})</p>
      <p><strong>Stipend:</strong> ₹${op.org_stipend || 0}</p>
      <p><strong>Message:</strong> ${op.org_msg || '—'}</p>
    `;
    orgContainer7.appendChild(card);
  });
}
/////////////////////////////////////////////////
const actionToggleBtn8 = document.getElementById("actionToggleBtn8");
const actionMenu8 = document.getElementById("actionMenu8");

let isMenuVisible8 = false;

actionToggleBtn8.addEventListener("click", () => {
  isMenuVisible8 = !isMenuVisible8;
  actionMenu8.style.display = isMenuVisible8 ? "flex" : "none";
});

// Replace these with real modal or panel triggers
document.getElementById("openOrgPanelBtn8").addEventListener("click", () => {
 orgModal7.style.display = "block";
  renderOpportunities7();
});

document.getElementById("openCalendarBtn8").addEventListener("click", () => {
  modal6.style.display = "block";
  buildCalendar(currentYear, currentMonth);
});

document.getElementById("openAddWorkBtn8").addEventListener("click", () => {
  formModal5.style.display = 'block';
});
// 
window.addEventListener("DOMContentLoaded", () => {
  const calendarBtn = document.getElementById("openYearCalendarBtn");
  const addWorkBtn = document.getElementById("openFormBtn5");
  const showOpportunityBtn = document.getElementById("openOrgPanelBtn7");

  if (calendarBtn) calendarBtn.style.display = "none";
  if (addWorkBtn) addWorkBtn.style.display = "none";
  if (showOpportunityBtn) showOpportunityBtn.style.display = "none";
});

// review edit option
function openReviewModal() {
  document.getElementById("reviewModal").style.display = "block";
}

function closeReviewModal() {
  document.getElementById("reviewModal").style.display = "none";
}

document.getElementById("reviewForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your review!");
  closeReviewModal();
  this.reset();
});
