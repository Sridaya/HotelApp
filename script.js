// Show login/register popup once on initial site load
function showPopup() {
  document.getElementById('popupOverlay').style.display = 'flex';
  document.getElementById('popupContent').innerHTML = `
    <h2>Welcome</h2>
    <button onclick="showLoginForm()">Login</button>
    <button onclick="showRegisterForm()">Register</button>
  `;
}
function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
  localStorage.setItem("popupShown", "true");
}
function showLoginForm() {
  document.getElementById('popupContent').innerHTML = `
    <h2>Login</h2>
    <input type="text" id="loginUser" placeholder="Username">
    <input type="password" id="loginPass" placeholder="Password">
    <button onclick="handleLogin()">Login</button>
  `;
}
function showRegisterForm() {
  document.getElementById('popupContent').innerHTML = `
    <h2>Register</h2>
    <input type="text" id="regName" placeholder="Name">
    <input type="email" id="regEmail" placeholder="Email">
    <div style="position:relative;">
      <input type="password" id="regPassword" placeholder="Password">
      <i  onclick="togglePassword()" style="position:absolute; right:10px; top:10px; cursor:pointer;"></i>
    </div>
    <button onclick="handleRegister()">Register</button>
  `;
}
function togglePassword() {
  const pw = document.getElementById('regPassword');
  pw.type = pw.type === 'password' ? 'text' : 'password';
}
function handleLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  if (!user || !pass) {
    alert("Please enter both username and password.");
  } else {
    alert("Login successful!");
    closePopup();
  }
}
function handleRegister() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  if (!name || !email || !pass) {
    alert("Please fill all fields to register.");
  } else {
    alert("Registration successful!");
    closePopup();
  }
}

// Scroll carousel and toggle arrows
function scrollHotels(direction) {
  const container = document.getElementById('hotelCarousel');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  container.scrollBy({ left: direction * 320, behavior: 'smooth' });

  setTimeout(() => {
    leftArrow.style.display = container.scrollLeft > 0 ? 'block' : 'none';
    rightArrow.style.display =
      container.scrollLeft + container.offsetWidth < container.scrollWidth
        ? 'block'
        : 'none';
  }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  scrollHotels(0);
  const alreadyShown = localStorage.getItem("popupShown");
  if (!alreadyShown) {
    showPopup();
  }

  document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", e => {
      const hotelName = e.target.closest(".hotel-card").querySelector("h3").innerText;
      showDetails(hotelName);
    });
  });

  document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", e => {
      const hotelName = e.target.closest(".hotel-card").querySelector("h3").innerText;
      showBookingForm(hotelName);
    });
  });
});

const hotelDescriptions = {
  "123 Hotel": {
    rating: "⭐⭐⭐⭐☆",
    review: "Excellent service and comfort at a great price!",
    details: "Warm hospitality and a cozy vibe. Neat rooms and tasty local cuisine."
  },
  "ABC Hotel": {
    rating: "⭐⭐⭐⭐⭐",
    review: "Luxury living without the high price tag.",
    details: "Modern ambiance and professional staff. Immaculate rooms and gourmet dining."
  },
  "XYZ Hotel": {
    rating: "⭐⭐⭐⭐☆",
    review: "Affordable elegance in every corner.",
    details: "Peaceful atmosphere with courteous service. Spacious rooms and a delightful breakfast."
  },
  "Sunrise Inn": {
    rating: "⭐⭐⭐☆☆",
    review: "Ideal for both business and leisure stays.",
    details: "Friendly team and soothing interiors. Clean rooms and freshly prepared meals."
  },
  "Cloud View": {
    rating: "⭐⭐⭐⭐☆",
    review: "A relaxing escape with ocean views.",
    details: "Tranquil setting and attentive care. Well-kept rooms and seafood specialties."
  },
  "Royal Stay": {
    rating: "⭐⭐⭐☆☆",
    review: "Smart stays for smart travelers.",
    details: "Efficient service and urban charm. Comfortable rooms and quick bites."
  }
};

function showDetails(hotelName) {
  const desc = hotelDescriptions[hotelName];
  const popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.style.display = 'flex';
  popup.innerHTML = `
    <div class="popup">
      <span class="close-btn" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>🏨 ${hotelName}</h2>
      <p>${desc.review}</p>
      <div class="rating">${desc.rating}</div>
      <p>${desc.details}</p>
      <div class="comments">
        <p><strong>1:</strong> Loved the stay!</p>
        <p><strong>2:</strong> Great experience overall!</p>
      </div>
      <div class="comment-box">
        <input type="text" placeholder="Write your comment">
        <button onclick="addComment(this)">Add Comment</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
}

function addComment(button) {
  const input = button.parentElement.querySelector('input');
  const comment = input.value.trim();
  if (comment) {
    const commentsDiv = button.closest('.popup').querySelector('.comments');
    const p = document.createElement('p');
    p.textContent = comment;
    commentsDiv.appendChild(p);
    input.value = '';
  } else {
    alert("Please write a comment.");
  }
}

function showBookingForm(hotelName) {
  const popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.style.display = 'flex';
  popup.innerHTML = `
    <div class="popup">
      <span class="close-btn" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>Booking - ${hotelName}</h2>
      <input type="text" id="bookName" placeholder="Your Name">
      <input type="text" id="bookPhone" placeholder="Phone Number">
      <input type="number" id="bookMembers" placeholder="Number of Members">
      <input type="number" id="bookRooms" placeholder="Number of Rooms" oninput="updateAmount(this)">
      <p id="calculatedAmount" style="margin-top:10px;"><strong>Amount:</strong> ₹0</p><br>
      <p>Do you have Any Pets?</p>
      <div style="display: flex; gap: 20px; justify-content: center; margin-top: 5px;">
        <label><input type="radio" name="pets" value="Yes"> Yes</label>
        <label><input type="radio" name="pets" value="No" checked> No</label>
      </div>
      <button onclick="submitBooking(this)">Book Now</button>
    </div>
  `;
  document.body.appendChild(popup);
}

function submitBooking(button) {
  const popup = button.closest('.popup');
  const name = popup.querySelector('#bookName').value.trim();
  const phone = popup.querySelector('#bookPhone').value.trim();
  const members = popup.querySelector('#bookMembers').value.trim();
  const rooms = parseInt(popup.querySelector('#bookRooms').value.trim());

  if (!name || !phone || !members || !rooms) {
    alert("Please fill all required fields.");
    return;
  }

  const amount = rooms * 1000;
  alert(`Booked successfully! Total Amount: ₹${amount}`);
  popup.parentElement.remove();
}

function updateAmount(input) {
  const rooms = parseInt(input.value) || 0;
  const amount = rooms * 1000;
  document.getElementById('calculatedAmount').innerHTML = `<strong>Amount:</strong> ₹${amount}`;
}
// Scroll to top smoothly
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/hide scroll button on scroll
window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.querySelector('.sub');
  const textarea = document.getElementById('userThought');
  const emailInput = document.getElementById('userEmail');
  const errorMsg = document.getElementById('thoughtError');

  submitBtn.addEventListener('click', () => {
    const thought = textarea.value.trim();

    if (!thought) {
      errorMsg.textContent = "Please share your thoughts!";
    } else {
      errorMsg.textContent = "";
      alert("Thank you for sharing your thoughts!");
      textarea.value = '';
      emailInput.value = '';
    }
  });
});

