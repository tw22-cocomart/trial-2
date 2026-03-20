// ================= NAVBAR =================
function updateNavbar() {
  const navList = document.getElementById("nav-right-list");
  if (!navList) return;

  const userJson = localStorage.getItem("cocomartUser");

  if (userJson) {
    navList.innerHTML = `
      <li><a href="cart.html"><img class="icon cart" src="images/icon-cart-line.png" alt="cart" /></a></li>
      <li><a href="profile.html"><img class="icon profile" src="images/icon-profile-line.png" alt="profile" /></a></li>
      <li><a id="nav-logout" href="#"><img class="icon logout" src="images/icon-login-line.png" alt="logout" /></a></li>
    `;

    const logoutBtn = document.getElementById("nav-logout");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("cocomartUser");
        window.location.href = "index.html";
      });
    }
  } else {
    navList.innerHTML = `
      <li><a href="login.html" class="alt-nav">Log In</a></li>
    `;
  }
}

updateNavbar();

// ================= SIGNUP =================
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = {
      name: formData.get("name") || "Not provided",
      address: formData.get("address") || "Not provided",
      contact: formData.get("contact") || "Not provided",
      email: formData.get("email") || "Not provided",
      password: formData.get("password") || "",
    };

    localStorage.setItem("cocomartUser", JSON.stringify(user));

    window.location.href = "login.html";
  });
}

// ================= LOGIN =================
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const storedUser = localStorage.getItem("cocomartUser");

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email && user.password === password) {
      window.location.href = "profile.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

// ================= PROFILE =================
function populateProfile() {
  const nameEl = document.getElementById("name");
  const addressEl = document.getElementById("address");
  const contactEl = document.getElementById("contact");
  const emailEl = document.getElementById("email");

  if (!nameEl || !addressEl || !contactEl || !emailEl) return;

  const userJson = localStorage.getItem("cocomartUser");

  if (!userJson) {
    window.location.href = "login.html";
    return;
  }

  const user = JSON.parse(userJson);

  nameEl.textContent = user.name || "Not provided";
  addressEl.textContent = user.address || "Not provided";
  contactEl.textContent = user.contact || "Not provided";
  emailEl.textContent = user.email || "Not provided";
}

populateProfile();
