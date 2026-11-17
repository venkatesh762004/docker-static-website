
// =====================================
// 1. TYPING ANIMATION
// =====================================

const typingElement = document.getElementById("typing");

const roles = [
    "Cloud Engineer",
    "DevOps Engineer",
    "AWS Engineer",
    "Automation Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingElement.textContent = currentRole.substring(0, characterIndex);

    let delay = deleting ? 45 : 95;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1400;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
    }

    setTimeout(typeRole, delay);
}

typeRole();


// =====================================
// 2. DARK / LIGHT THEME
// =====================================

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    document.body.classList.toggle("light", theme === "light");

    if (themeToggle) {
        themeToggle.textContent = theme === "light" ? "☾" : "☀";
    }
}

let savedTheme = "dark";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
} catch (error) {
    savedTheme = "dark";
}

applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("light")
        ? "dark"
        : "light";

    applyTheme(newTheme);

    try {
        localStorage.setItem("portfolio-theme", newTheme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }
});


// =====================================
// 3. MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");

    const isOpen = navLinks?.classList.contains("open");
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("open");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }
    });
});


// =====================================
// 4. PROJECT CATEGORY FILTER
// =====================================

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(card => {
            const categories = (card.dataset.category || "").split(" ");

            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            card.classList.toggle("hidden", !shouldShow);
        });
    });
});


// =====================================
// 5. SCROLL REVEAL ANIMATIONS
// =====================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}


// =====================================
// 6. BACK TO TOP
// =====================================

const topButton = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
        topButton?.classList.add("show");
    } else {
        topButton?.classList.remove("show");
    }
});

topButton?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =====================================
// 7. CURRENT YEAR
// =====================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =====================================
// 8. SUBTLE 3D CARD TILT
// =====================================

const tiltCards = document.querySelectorAll(
    ".skill-card, .project-card, .about-card"
);

const supportsFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (supportsFinePointer) {
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 7;
            const rotateX = ((0.5 - y / rect.height)) * 7;

            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}
