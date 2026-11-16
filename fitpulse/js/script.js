function escapeHtml(string) {
    return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

const reviewForm = document.getElementById('addReviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');
const STORAGE_KEY = 'fitpulseReviews';

function loadReviews() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (err) {
        return [];
    }
}

function saveReviews(reviews) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (err) {
        
    }
}

function addReviewCard(name, text) {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6');
    col.innerHTML = `
        <div class="review-card">
            <h4>${escapeHtml(name)}</h4>
            <p>"${escapeHtml(text)}"</p>
        </div>
    `;
    reviewsContainer.appendChild(col);
}

loadReviews().forEach(function (review) {
    addReviewCard(review.name, review.text);
});

reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewerText').value.trim();
    if (!name || !text) return;

    addReviewCard(name, text);

    const reviews = loadReviews();
    reviews.push({ name: name, text: text });
    saveReviews(reviews);

    reviewForm.reset();
    alert('Thank you! Your review has been added.');
});

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('userEmail').value;
    const subject = document.getElementById('userSubject').value;
    const message = document.getElementById('userMessage').value;

    const trainerEmail = "alex.vance@fitpulse.com";

    const mailtoLink = `mailto:${trainerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + email + "\n\n" + message)}`;

    window.location.href = mailtoLink;
});

document.getElementById('year').textContent = new Date().getFullYear();