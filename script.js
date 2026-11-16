/* =========================================
   EVENTORA — JAVASCRIPT
   PAGE 01: EVENT DISCOVERY
========================================= */


/* =========================================
   01. DOM ELEMENTS
========================================= */

const menuToggle = document.getElementById("menu-toggle");

const mainNavigation = document.getElementById("main-navigation");

const searchForm = document.getElementById("event-search-form");

const locationFilter = document.getElementById("event-location");

const categoryFilter = document.getElementById("event-category");

const dateFilter = document.getElementById("event-date");

const eventCards = document.querySelectorAll(".event-card");


/* =========================================
   02. EVENT DATABASE
========================================= */

const eventsDatabase = [

    {
        id: 1,
        name: "Electric Nights Festival",
        location: "johannesburg",
        category: "music",
        date: "2026-11-21",
        url: "event-details.html"
    },

    {
        id: 2,
        name: "The Future Forward Summit",
        location: "cape-town",
        category: "business",
        date: "2026-11-28",
        url: "event-details.html"
    },

    {
        id: 3,
        name: "The Midnight Experience",
        location: "durban",
        category: "lifestyle",
        date: "2026-12-05",
        url: "event-details.html"
    }

];


/* =========================================
   03. MOBILE NAVIGATION
========================================= */

if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNavigation.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

    });


    const navigationLinks = mainNavigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNavigation.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* =========================================
   04. EVENT SEARCH
========================================= */

function searchEvents(location, category, date) {

    const matchingEvents = eventsDatabase.filter(function (event) {

        const matchesLocation =
            !location || event.location === location;

        const matchesCategory =
            !category || event.category === category;

        const matchesDate =
            !date || event.date === date;

        return (
            matchesLocation &&
            matchesCategory &&
            matchesDate
        );

    });

    return matchingEvents;

}


/* =========================================
   05. SEARCH FORM SUBMISSION
========================================= */

if (searchForm) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const selectedLocation = locationFilter.value;

        const selectedCategory = categoryFilter.value;

        const selectedDate = dateFilter.value;


        const results = searchEvents(
            selectedLocation,
            selectedCategory,
            selectedDate
        );


        if (results.length === 0) {

            showSearchMessage(
                "No matching events found. Try changing your filters."
            );

            return;

        }


        showSearchMessage(
            `${results.length} event(s) found.`
        );


        displaySearchResults(results);

    });

}


/* =========================================
   06. SEARCH FEEDBACK
========================================= */

function showSearchMessage(message) {

    let messageElement = document.getElementById("search-message");


    if (!messageElement) {

        messageElement = document.createElement("p");

        messageElement.id = "search-message";

        messageElement.className = "search-message";

        searchForm.appendChild(messageElement);

    }


    messageElement.textContent = message;

}


/* =========================================
   07. DISPLAY SEARCH RESULTS
========================================= */

function displaySearchResults(results) {

    eventCards.forEach(function (card) {

        const eventName = card
            .querySelector("h3")
            .textContent
            .trim();


        const matchingEvent = results.find(function (event) {

            return event.name === eventName;

        });


        card.style.display = matchingEvent ? "block" : "none";

    });


    document
        .getElementById("featured-events")
        .scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}


/* =========================================
   08. RESET SEARCH RESULTS
========================================= */

function resetSearch() {

    eventCards.forEach(function (card) {

        card.style.display = "block";

    });


    const messageElement = document.getElementById("search-message");

    if (messageElement) {

        messageElement.remove();

    }

}


/* =========================================
   09. FILTER CHANGE HANDLING
========================================= */

[locationFilter, categoryFilter, dateFilter].forEach(function (filter) {

    if (!filter) return;

    filter.addEventListener("change", function () {

        resetSearch();

    });

});


/* =========================================
   10. EVENT CARD INTERACTIONS
========================================= */

eventCards.forEach(function (card, index) {

    const eventLink = card.querySelector(".event-link");

    const eventImage = card.querySelector(".event-image");


    if (eventLink && eventImage) {

        eventLink.addEventListener("click", function (event) {

            event.preventDefault();

            window.location.href = eventImage.href;

        });

    }

});


/* =========================================
   11. DATE VALIDATION
========================================= */

if (dateFilter) {

    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    )
        .toISOString()
        .split("T")[0];

    dateFilter.setAttribute("min", localToday);

}


/* =========================================
   12. SMOOTH INTERNAL NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


/* =========================================
   13. INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("EVENTORA initialized successfully.");

    console.log("Event discovery system ready.");

});
