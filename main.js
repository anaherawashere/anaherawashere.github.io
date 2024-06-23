// mobile navigation burger menu

const primaryHeader = document.querySelector('.primary-header')
const navToggle = document.querySelector('.mobile-nav-toggle')
const primaryNav = document.querySelector('.primary-navigation')

navToggle.addEventListener('click', () => {
  primaryNav.hasAttribute('data-visible')
    ? navToggle.setAttribute('aria-expanded', false)
    : navToggle.setAttribute('aria-expanded', true)
  primaryNav.toggleAttribute('data-visible')
  primaryHeader.toggleAttribute('data-overlay')
})

// blog nav - create list of anchors based on headings

const subheadings = document.querySelectorAll('.blog-section')

// Select the parent container where the nav items will be added
const navContainer = document.querySelector('.blog__nav')

// Loop through each heading element
subheadings.forEach((heading, index) => {
  // Create a unique ID for each heading and set it
  const id = `section-${index + 1}`
  heading.id = id

  // Create a new li element
  const li = document.createElement('li')
  li.classList.add('blog__nav-item')

  // Create a new anchor element
  const anchor = document.createElement('a')
  anchor.classList.add('blog-nav-link')
  anchor.href = `#${id}`
  anchor.textContent = heading.textContent

  // Append the anchor to the li
  li.appendChild(anchor)

  // Append the li to the nav container
  navContainer.appendChild(li)
})

// Function to handle the click event and add active class
function handleLinkClick(event) {
  // Prevent the default action of the anchor link
  event.preventDefault();

  // Get all nav links
  const navLinks = document.querySelectorAll('.blog-nav-link');

  // Remove the active class from all nav links
  navLinks.forEach(link => link.classList.remove('active'));

  // Add the active class to the clicked link
  event.target.classList.add('active');

  // Scroll to the corresponding section
  const targetId = event.target.getAttribute('href').substring(1);
  document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });

  // Update the URL hash
  history.pushState(null, null, `#${targetId}`);
}

// Add click event listeners to all nav links
document.querySelectorAll('.blog-nav-link').forEach(link => {
  link.addEventListener('click', handleLinkClick);
});

// Function to handle intersection changes
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.blog-nav-link[href="#${id}"]`);
      
      if (entry.isIntersecting) {
          navLink.classList.add('active');
      } else {
          navLink.classList.remove('active');
      }
  });
}

// Create an Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5 // Adjust the threshold as needed
});

// Observe each heading
headings.forEach(heading => {
  observer.observe(heading);
});