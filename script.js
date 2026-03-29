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



// window.addEventListener('scroll', function() {
//     var button = document.querySelector('.floating-cta');
//     var footer = document.querySelector('.footer');
//     var buttonHeight = button.offsetHeight;
//     var footerTop = footer.offsetTop;
//     var scrollPosition = window.scrollY + window.innerHeight;
//
//     // Якщо скрол підійшов до футера, робимо кнопку абсолютною
//     if (scrollPosition > footerTop + 20) { // +20 - невеликий відступ
//         button.style.position = 'absolute';
//         button.style.top = (footerTop - buttonHeight - 30) + 'px'; // 20 - відступ
//     } else {
//         // Повертаємо фіксовану позицію
//         button.style.position = 'fixed';
//         // button.style.top = 'auto';
//         button.style.bottom = '30px';
//     }
// });



const meals = [
    {
        name: "Oatmeal with berries",
        type: "breakfast",
        calories: 250,
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
    },
    {
        name: "Avocado toast",
        type: "breakfast",
        calories: 300,
        img: "https://images.unsplash.com/photo-1505253216365-3f3b5f1f6d5d"
    },
    {
        name: "Grilled chicken salad",
        type: "lunch",
        calories: 400,
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    },
    {
        name: "Salmon with rice",
        type: "dinner",
        calories: 550,
        img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
    },
    {
        name: "Protein bar",
        type: "snack",
        calories: 200,
        img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    },
    {
        name: "Greek yogurt with honey",
        type: "snack",
        calories: 180,
        img: "https://images.unsplash.com/photo-1571212515416-fef01fc43637"
    },
    {
        name: "Pasta with vegetables",
        type: "lunch",
        calories: 450,
        img: "https://images.unsplash.com/photo-1525755662778-989d0524087e"
    },
    {
        name: "Steak with potatoes",
        type: "dinner",
        calories: 700,
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141"
    }
];

function generateMeal() {
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
      <img style="width: 400px; height: 410px" src="${randomMeal.img}">
    </div>
  `;
}










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