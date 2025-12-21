// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Intersection Observer for counter animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters when stats section comes into view
            if (entry.target.classList.contains('top-stats')) {
                const statNumbers = entry.target.querySelectorAll('.rating-large');
                statNumbers.forEach(stat => {
                    if (!stat.dataset.animated) {
                        stat.dataset.animated = 'true';
                        const text = stat.textContent;
                        const target = parseInt(text.replace(/,/g, ''));
                        if (!isNaN(target)) {
                            animateCounter(stat, target);
                        }
                    }
                });
            }
        }
    });
}, observerOptions);

// Initialize Charts
function initializeCharts() {
    // Rating Trend Chart
    const ratingCtx = document.getElementById('ratingChart');
    if (ratingCtx) {
        new Chart(ratingCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Rating',
                    data: [1200, 1250, 1300, 1350, 1380, 1400, 1420, 1430, 1440, 1445, 1450, 1456],
                    borderColor: '#1e90ff',
                    backgroundColor: 'rgba(30, 144, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1e90ff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 1000,
                        max: 1500,
                        ticks: {
                            color: '#999'
                        },
                        grid: {
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#999'
                        },
                        grid: {
                            color: '#f0f0f0'
                        }
                    }
                }
            }
        });
    }

    // Problems Doughnut Chart
    const problemsCtx = document.getElementById('problemsChart');
    if (problemsCtx) {
        new Chart(problemsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Easy', 'Medium', 'Hard'],
                datasets: [{
                    data: [180, 181, 22],
                    backgroundColor: ['#7cb342', '#ffa726', '#ef5350'],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    initializeCharts();

    // Observe stats section
    const topStats = document.querySelector('.top-stats');
    if (topStats) {
        observer.observe(topStats);
    }
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
    }
});

// Add fade-in animation to cards on scroll
function observeCards() {
    const cards = document.querySelectorAll('.chart-card, .project-card, .stat-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// Initialize card animations
document.addEventListener('DOMContentLoaded', observeCards);
