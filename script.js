// Модальне вікно
function openModal(){
    document.getElementById("modal").style.display="flex";
}
function closeModal(){
    document.getElementById("modal").style.display="none";
}


// Модальне вікно
function openModalReview(){
    document.getElementById("review").style.display="flex";
}
function closeModalReview(){
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
//
//
//
// // Reviews carousel
// let index = 0;
// const reviews = document.querySelector(".reviews");
// const total = document.querySelectorAll(".review").length;
//
// document.getElementById("next").onclick = () => {
//     index = (index + 1) % total;
//     reviews.style.transform = `translateX(-${index * 100}%)`;
// };
//
// document.getElementById("prev").onclick = () => {
//     index = (index - 1 + total) % total;
//     reviews.style.transform = `translateX(-${index * 100}%)`;
// };


const track = document.getElementById("reviewsTrack");
const cards = document.querySelectorAll(".reviews");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;

function getVisibleCards() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function updateCarousel() {
    const visible = getVisibleCards();
    const cardWidth = track.offsetWidth / visible;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
    const visible = getVisibleCards();

    if (index >= cards.length - visible) {
        index = 0; // повертається на початок
    } else {
        index++;
    }

    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    const visible = getVisibleCards();

    if (index <= 0) {
        index = cards.length - visible; // переходить на кінець
    } else {
        index--;
    }

    updateCarousel();
});

window.addEventListener("resize", () => {
    index = 0;
    updateCarousel();
});

updateCarousel();




//
//
// const track = document.querySelector(".reviews-track");
// const cards = document.querySelectorAll(".reviews");
// const prevBtn = document.getElementById("prev");
// const nextBtn = document.getElementById("next");
//
// let index = 0;
//
// function getVisibleCount() {
//     if (window.innerWidth <= 600) return 1;
//     if (window.innerWidth <= 992) return 2;
//     return 3;
// }
//
// function updateCarousel() {
//     const visible = getVisibleCount();
//     const cardWidth = cards[0].offsetWidth;
//     track.style.transform = `translateX(-${index * cardWidth}px)`;
// }
//
// nextBtn.addEventListener("click", () => {
//     const visible = getVisibleCount();
//     if (index < cards.length - visible) {
//         index++;
//         updateCarousel();
//     }
// });
//
// prevBtn.addEventListener("click", () => {
//     if (index > 0) {
//         index--;
//         updateCarousel();
//     }
// });
//
// window.addEventListener("resize", updateCarousel);




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
