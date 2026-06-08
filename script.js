/* ============================================================
   WoodNest — script.js
   JavaScript: Navbar, Hamburger, Scroll Reveal, Form
   ============================================================ */
 
 
/* ──────────────────────────────────────
   1. NAVBAR — COLOR CHANGE ON SCROLL
   When the user scrolls down more than 60px,
   add the "scrolled" class to the navbar.
   CSS uses that class to make the nav white + add shadow.
────────────────────────────────────── */
 
const navbar = document.getElementById('navbar');
 
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
 
 
/* ──────────────────────────────────────
   2. HAMBURGER MENU (Mobile)
   Clicking the hamburger button toggles
   the mobile menu open and closed.
   The CSS "open" class handles the animation.
────────────────────────────────────── */
 
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
 
hamburger.addEventListener('click', function () {
  // Toggle the "open" class on both elements
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
 
// Called by onclick="closeMobile()" on each mobile menu link
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}
 
 
/* ──────────────────────────────────────
   3. SMOOTH SCROLL (Fallback)
   Handles smooth scrolling when a nav
   link is clicked. Works in all browsers.
   (CSS scroll-behavior: smooth handles
   modern browsers, this is a backup.)
────────────────────────────────────── */
 
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target   = document.querySelector(targetId);
 
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
 
 
/* ──────────────────────────────────────
   4. SCROLL REVEAL ANIMATION
   We use IntersectionObserver to watch
   every element with the class "reveal".
   When it enters the screen (12% visible),
   we add "visible" — CSS then fades it in.
────────────────────────────────────── */
 
// Select all elements we want to animate
const revealElements = document.querySelectorAll('.reveal');
 
// Create the observer
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // If the element is in the viewport
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
 
      // Stop watching it once it has been revealed
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12  // Trigger when 12% of the element is visible
});
 
// Start observing each reveal element
revealElements.forEach(function (el) {
  revealObserver.observe(el);
});
 
 
/* ──────────────────────────────────────
   5. CONTACT FORM HANDLER
   Prevents default form submission,
   shows a success state on the button,
   then resets after 3 seconds.
────────────────────────────────────── */
 
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
 
contactForm.addEventListener('submit', function (e) {
  // Stop the page from reloading
  e.preventDefault();
 
  // Change button to success state
  submitBtn.textContent = 'Message Sent ✓';
  submitBtn.style.background = '#7A9E7E';  /* sage green */
  submitBtn.disabled = true;
 
  // After 3 seconds, reset the form and button
  setTimeout(function () {
    submitBtn.textContent = 'Send Message →';
    submitBtn.style.background = '';
    submitBtn.disabled = false;
    contactForm.reset();
  }, 3000);
});
 
 
/* ──────────────────────────────────────
   6. ACTIVE NAV LINK ON SCROLL
   Highlights the correct nav link
   based on which section is visible.
────────────────────────────────────── */
 
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
 
window.addEventListener('scroll', function () {
  let currentSection = '';
 
  sections.forEach(function (section) {
    // Get top position of section relative to scroll
    const sectionTop = section.offsetTop - 100;
 
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
 
  // Add "active" class to matching nav link
  navAnchors.forEach(function (anchor) {
    anchor.classList.remove('active');
    if (anchor.getAttribute('href') === '#' + currentSection) {
      anchor.classList.add('active');
    }
  });
});