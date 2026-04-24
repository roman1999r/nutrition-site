import {meals} from "./meals-list.js"




// Модальне вікно

window.openModal = function (){
    document.getElementById("modal").style.display="flex";
}
window.closeModal = function (){
    document.getElementById("modal").style.display="none";
}


// Модальне вікно
window.openModalReview = function (){
    document.getElementById("review").style.display="flex";
}
window.closeModalReview = function () {
    document.getElementById("review").style.display="none";
}


// // Карусель
// let index=0;
// const reviews=document.querySelectorAll(".review");
//
// setInterval(()=>{
//     reviews[index].classList.remove("active");
//     index=(index+1)%reviews.length;
//     reviews[index].classList.add("active");
// },4000);
//


// Header menu
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight;

    const navLinks = document.querySelectorAll(".header-menu-link");

    const sections = Array.from(navLinks)
        .map(link => {
            const id = link.getAttribute("href");
            if (id.startsWith("#")) {
                return document.querySelector(id);
            }
        })
        .filter(Boolean);

    function setActive() {

        const scrollPosition = window.scrollY + headerHeight + 20;
        const pageBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

        sections.forEach((section, index) => {

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            // 🔥 якщо це остання секція і ми внизу сторінки
            if (pageBottom && index === sections.length - 1) {
                navLinks.forEach(link => link.classList.remove("is-current"));
                document.querySelector(`.header-menu-link[href="#${section.id}"]`)
                    ?.classList.add("is-current");
                return;
            }

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove("is-current"));
                document.querySelector(`.header-menu-link[href="#${section.id}"]`)
                    ?.classList.add("is-current");
            }

        });
    }

    window.addEventListener("scroll", setActive);
    setActive();
});



// // // Reviews
//
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el=>{
    observer.observe(el);
});



const tracks = document.getElementById('reviewsTrack');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

const scrollAmount = 320; // ширина картки + gap

next.addEventListener('click', () => {
    tracks.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});


prev.addEventListener('click', () => {
    tracks.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

const track = document.getElementById('reviewsTrack');

let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => {
    isDown = false;
});

track.addEventListener('mouseup', () => {
    isDown = false;
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
});

// 📱 Touch (мобілка)
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = track.scrollLeft;
});

track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
});












// Burger
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header-menu");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
});

// Закриття при кліку на пункт
document.querySelectorAll(".header-menu-link").forEach(link => {
    link.addEventListener("click", () => {
        burger.classList.remove("active");
        menu.classList.remove("active");
    });
});



function calculateCalories() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const age = document.getElementById("age").value;

    if (!weight || !height || !age) {
        document.getElementById("result").innerText = "Fill all fields!";
        return;
    }

    const calories = 10 * weight + 6.25 * height - 5 * age + 5;

    document.getElementById("result").innerText =
        "Your daily calories: " + Math.round(calories);
}


// Telegram for footer
const btn = document.querySelector('.floating-cta');
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight - 80) {
        btn.style.bottom = (windowHeight - footerTop + 5) + 'px';
    } else {
        btn.style.bottom = '20px';
    }
});




window.generateMeal = function () {
    const type = document.getElementById("mealType").value;
    const maxCal = parseInt(document.getElementById("maxCalories").value);

    let filtered = meals;

    if (type !== "all") {
        filtered = filtered.filter(meal => meal.type === type);
    }

    if (maxCal) {
        filtered = filtered.filter(meal => meal.calories <= maxCal);
    }

    if (filtered.length === 0) {
        document.getElementById("mealResult").innerHTML = "No meals found 😢";
        return;
    }

    const randomMeal = filtered[Math.floor(Math.random() * filtered.length)];

    document.getElementById("mealResult").innerHTML = `
      <div class="meal-card">
        <h3>${randomMeal.name}</h3>
        <p>${randomMeal.calories} kcal</p>
        <img class="meal-generator-img" src="${randomMeal.img}">
      </div>
    `;
};










let progress = 0;
const bar = document.getElementById("progress-bar");

const interval = setInterval(() => {
    progress += 10;
    bar.style.width = progress + "%";

    if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
            document.getElementById("preloader").style.display = "none";
        }, 300);
    }
}, 150);