// ACTIVE MENU ***********
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
    let linkPage = link.getAttribute("href");

    if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

// MOBILE MENU TOGGLE ***********

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

// OPEN MENU
openMenu.addEventListener("click", () => {
    mobileMenu.classList.add("open");
    overlay.style.display = "block";
    document.body.classList.add("body-no-scroll");  // scroll lock
});

// CLOSE MENU FUNCTION
function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    overlay.style.display = "none";
    document.body.classList.remove("body-no-scroll");
}

// CLOSE WITH BUTTON
closeMenu.addEventListener("click", closeMobileMenu);

// CLOSE WHEN CLICK ON OVERLAY
overlay.addEventListener("click", closeMobileMenu);


// headre js close ======================================


// hero slidre and form js *********

$(document).ready(function () {

    // Slick Slider
    $('.ca-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 800,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear'
    });

    // Appointment Toggle
    $(".make-appoint").on("click", function () {
        $(".ca-appointment-form").slideToggle(300);
        $(this).toggleClass("active");
    });

    // Date Picker
    $("#app-date").datepicker({
        dateFormat: "dd-mm-yy",
        showAnim: "fadeIn"
    });

});

$(".ca-appointment-form").on("submit", function (e) {
    e.preventDefault(); 

    // Loader show
    $("#appointment-loader").show();
    $("#message-sent").hide();
    setTimeout(function () {

        $("#appointment-loader").hide();

        $("#message-sent").fadeIn();

        $(".ca-appointment-form")[0].reset();

    }, 2000);
});


// hero slidre and form js close ************************


// testimonial slider js ************

$(document).ready(function () {

    $('.testimonial-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 700,
        fade: true,
        autoplay: false,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>'
    });

});

// testimonial slider js end ************


// scroll top button js start ==============

$(document).ready(function() {

    // Show/Hide button on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });

    // Scroll to top animation
    $('#scroll-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 100);
        return false;
    });

});


// scroll top button js end ==============


// tabify(Doctors) js start ===========

$(document).ready(function(){

    var $grid = $('.isotope-container').isotope({
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows'
    });

    $('#filters li').on('click', function(){
        $('#filters li').removeClass('active');
        $(this).addClass('active');

        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

});

// tabify(Doctors) js end ===========


// gallery popup js start ===========

$(document).ready(function() {
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
});

// gallery popup js end ===========


// appoint page form date js and valdation js ========

$(document).ready(function() {
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
    });
});

$(document).ready(function () {

    $("#appointment_form_main").on("submit", function (e) {
        e.preventDefault();

        let errors = []; 
        $("#error-container").html("");
        $(".input-error").removeClass("input-error");

        let name = $("#app-name").val().trim();
        let email = $("#app-email").val().trim();
        let message = $("#app-message").val().trim();
        let number = $("#app-number").val().trim();

        // NAME VALIDATION
        if (name === "") {
            errors.push("* Por favor introduce tu nombre");
            $("#app-name").addClass("input-error");
        }

        // EMAIL VALIDATION
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email === "" || !emailPattern.test(email)) {
            errors.push("* Por favor introduce una dirección de correo electrónico válida");
            $("#app-email").addClass("input-error");
        }

        // MESSAGE VALIDATION
        if (message === "") {
            errors.push("* Por favor introduce tu mensaje");
            $("#app-message").addClass("input-error");
        }

        // PHONE VALIDATION (ONLY NUMBERS + EXACT 10 DIGITS)
        let phonePattern = /^[0-9]+$/;

        if (number === "") {
            errors.push("* Por favor introduce tu número de teléfono");
            $("#app-number").addClass("input-error");
        } 
        else if (!phonePattern.test(number)) {
            errors.push("* Solo se permiten números en el teléfono");
            $("#app-number").addClass("input-error");
        }
        else if (number.length !== 10) {
            errors.push("* El número de teléfono debe tener exactamente 10 dígitos");
            $("#app-number").addClass("input-error");
        }

        // SHOW ERRORS IF FOUND
        if (errors.length > 0) {
            let html = "";
            errors.forEach(function (err) {
                html += `<div class="error-text">${err}</div>`;
            });
            $("#error-container").html(html);
            return false;
        }

        // SUCCESS
        $("#appointment-loader").show();

        setTimeout(function () {
            $("#appointment-loader").hide();
            $("#message-sent").html("<div class='alert alert-success'>Solicitud enviada correctamente.</div>");
            $("#appointment_form_main")[0].reset();
        }, 1000);
    });
});


// appoint page form date end ========


// contact form Validations js start ===========

$(document).ready(function () {

    $("#contact_form").on("submit", function (e) {
        e.preventDefault();

        let errors = [];
        $("#error-container").html("");
        $("#response-container").html("");
        $(".input-error").removeClass("input-error");

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let message = $("#message").val().trim();
        let number = $("#number").val().trim();

        // NAME VALIDATION
        if (name === "") {
            errors.push("* Por favor introduce tu nombre");
            $("#name").addClass("input-error");
        }

        // EMAIL VALIDATION
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email === "" || !emailPattern.test(email)) {
            errors.push("* Por favor introduce una dirección de correo electrónico válida");
            $("#email").addClass("input-error");
        }

        // MESSAGE VALIDATION
        if (message === "") {
            errors.push("* Por favor introduce tu mensaje");
            $("#message").addClass("input-error");
        }

        // PHONE VALIDATION (ONLY NUMBERS + EXACTLY 10 DIGITS)
        let phonePattern = /^[0-9]+$/;

        if (number !== "") {
            if (!phonePattern.test(number)) {
                errors.push("* Solo se permiten números en el teléfono");
                $("#number").addClass("input-error");
            } else if (number.length !== 10) {
                errors.push("* El número de teléfono debe tener exactamente 10 dígitos");
                $("#number").addClass("input-error");
            }
        }

        // SHOW ERRORS IF ANY
        if (errors.length > 0) {
            let html = "";
            errors.forEach(function (err) {
                html += `<div class="error-text">${err}</div>`;
            });
            $("#error-container").html(html);
            return false;
        }

        // SUCCESS FLOW (JUST LIKE APPOINTMENT FORM)
        $("#contact-loader").show();

        setTimeout(function () {
            $("#contact-loader").hide();
            $("#response-container").html("<div class='alert alert-success'>Mensaje enviado correctamente.</div>");
            $("#contact_form")[0].reset();
        }, 1000);
    });

});


// contact form Validations js end ===========


// tabify faq js start ============

// // -------------------------
// // FAQ FILTER SYSTEM
// // -------------------------
// document.querySelectorAll("#filters li").forEach(function (filterBtn) {
//     filterBtn.addEventListener("click", function (e) {
//         e.preventDefault();

//         // Remove active from all
//         document.querySelectorAll("#filters li").forEach(li => li.classList.remove("active"));
//         this.classList.add("active");

//         let filter = this.getAttribute("data-filter");

//         // Show / Hide FAQ items
//         document.querySelectorAll(".acc-item").forEach(function (item) {

//             if (filter === "all") {
//                 item.style.display = "block";
//             } else {
//                 let cat = item.getAttribute("data-category");

//                 if (cat === filter) {
//                     item.style.display = "block";
//                 } else {
//                     item.style.display = "none";
//                 }
//             }
//         });
//     });
// });

// // -------------------------
// // CUSTOM ACCORDION TOGGLE
// // -------------------------
// $(document).ready(function () {

//     // 👉 OPEN FIRST ITEM BY DEFAULT
//     $(".acc-item").first().find(".acc-body").show();
//     $(".acc-item").first().find(".acc-header").addClass("active");

//     // 👉 CLICK FUNCTION
//     $(".acc-header").click(function () {

//         // Remove active from others
//         $(".acc-header").not(this).removeClass("active");
//         $(".acc-body").not($(this).next(".acc-body")).slideUp();

//         // Toggle active on clicked one
//         $(this).toggleClass("active");

//         // Slide toggle answer
//         $(this).next(".acc-body").slideToggle();
//     });

// });


// Search functionality for FAQ
function searchFAQs() {
    const searchText1 = document.getElementById('search-text')?.value.toLowerCase() || '';
    const searchText2 = document.getElementById('s')?.value.toLowerCase() || '';
    let searchTerm = searchText1 || searchText2;
    
    const faqItems = document.querySelectorAll('.acc-item');
    
    if (!searchTerm.trim()) {
        faqItems.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq_question')?.textContent.toLowerCase() || '';
        const answer = item.querySelector('.acc-body')?.textContent.toLowerCase() || '';
        const faqContent = question + ' ' + answer;
        
        if (faqContent.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to both search forms
    const topSearchBtn = document.getElementById('search-submit');
    const topSearchInput = document.getElementById('search-text');
    
    if (topSearchBtn) {
        topSearchBtn.addEventListener('click', searchFAQs);
    }
    
    if (topSearchInput) {
        topSearchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchFAQs();
            }
        });
    }
    
    const sidebarSearchBtn = document.getElementById('searchsubmit');
    const sidebarSearchInput = document.getElementById('s');
    
    if (sidebarSearchBtn) {
        sidebarSearchBtn.addEventListener('click', function(event) {
            event.preventDefault();
            searchFAQs();
        });
    }
    
    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchFAQs();
            }
        });
    }
    
    // Tab filter functionality (updated)
    document.querySelectorAll("#filters li").forEach(function (filterBtn) {
        filterBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove active from all
            document.querySelectorAll("#filters li").forEach(li => li.classList.remove("active"));
            this.classList.add("active");

            let filter = this.getAttribute("data-filter");

            // Clear search fields when clicking filter tabs
            document.getElementById('search-text').value = '';
            document.getElementById('s').value = '';

            // Show / Hide FAQ items
            document.querySelectorAll(".acc-item").forEach(function (item) {
                if (filter === "all") {
                    item.style.display = "block";
                } else {
                    let cat = item.getAttribute("data-category");
                    item.style.display = cat === filter ? "block" : "none";
                }
            });
        });
    });
    
    // Accordion functionality
    $(document).ready(function () {
        // 👉 OPEN FIRST ITEM BY DEFAULT
        $(".acc-item").first().find(".acc-body").show();
        $(".acc-item").first().find(".acc-header").addClass("active");

        // 👉 CLICK FUNCTION
        $(".acc-header").click(function () {
            // Remove active from others
            $(".acc-header").not(this).removeClass("active");
            $(".acc-body").not($(this).next(".acc-body")).slideUp();

            // Toggle active on clicked one
            $(this).toggleClass("active");

            // Slide toggle answer
            $(this).next(".acc-body").slideToggle();
        });
    });
    
    // Optional: Real-time search (comment out if not needed)
    document.getElementById('search-text')?.addEventListener('input', searchFAQs);
    document.getElementById('s')?.addEventListener('input', searchFAQs);
});



// tabify faq js end ===============


