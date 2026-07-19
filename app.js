const defaultPlaceholder = '/images/dummy.png';

/* ==========================================================================
   SERVICE DATA
   ========================================================================== */

const serviceData = {

    signage: {
        title: "Corporate & Outdoor Signage",
        description: "From glowing neon signs to robust outdoor corporate branding, we build signage that is durable, vibrant, and impossible to ignore.",
        features: [
            "LED illuminated signage",
            "Outdoor branding systems",
            "Retail & office signage",
            "Weather-resistant fabrication",
            "Large format signage",
            "Corporate identity integration"
        ],
         images: [
            "/images/new/signage1.webp",
            "/images/new/signage2.webp",
            "/images/new/signage3.webp"
        ]
    },

    engraving: {
        title: "Precision Engraving Solutions",
        description: "Permanent, elegant laser and chemical engraving applied meticulously to your corporate gifts and essential signage.",
        features: [
            "Laser engraving",
            "Chemical engraving",
            "Corporate plaques",
            "Metal engraving",
            "Industrial marking",
            "Custom branding"
        ],
        images: [
            "/images/460/20853986/about-awards-marssign-nZs4tHucMYXCHmZwZ-hUxQ.jpg",
            "/images/576/20318283/memento-hvbKnPQRfjkemjrtJgW4NA.jpg"
        ]
    },

    promo1: {
        title: "Branded Drinkware",
        description: "High-quality branded mugs and bottles perfect for giveaways, corporate events, and everyday utility.",
        features: [
            "Corporate mugs",
            "Bottle printing",
            "Promotional drinkware",
            "Custom gift items",
            "Bulk branding",
            "Premium printing"
        ],
        images: [
            "/images/576/20313425/about-img-pprinted-mugs-rQmVnCX6D2Kyp78JpXd5ag.jpg",
            "/images/576/20317996/custom-printing2-DIs6ZkFcFRVNW-NbNgKcSg.jpg"
        ]
    },

    promo2: {
        title: "Apparel & Accessories",
        description: "Make your team look sharp and unified with premium printed t-shirts, personalized bags, lanyards, and custom mouse pads.",
        features: [
            "Custom t-shirts",
            "Corporate apparel",
            "Branded bags",
            "Lanyards",
            "Mouse pads",
            "Keychains & gifts"
        ],
        images: [
            "/images/576/20854969/mug-VU4xaO-0a5SYB6JGk-5EQg.jpg",
            "/images/576/20855083/bottle-Q-jMC8_bNyhKDkC_Pi9G3g.jpg",
            "/images/576/20855182/tshirt-X7wqRq9wsvUVsWZRN9MV5w.jpg",
            "/images/576/20855215/pillow-pZPkGCMYPwPHuu_2Yi6lIw.jpg",
            "/images/576/20855360/bag-jbYCVJx_ZnkFK31vnrWKMQ.jpg",
            "/images/576/20857117/lanyard-jE0B8C44Gzwc0QpkqzDBOQ.jpg",
            "/images/576/20857227/mouse-pad-TLu5I_cJyT2zQirm6gCtvA.jpg",
            "/images/576/20860750/keychain-5lug4hjNfcvItI0c2fGzqQ.jpg",
            "/images/576/20861328/corporate-heo4PLuxVwwhpIYeq5o0gQ.jpg",
            "/images/641/20854969/mug-VU4xaO-0a5SYB6JGk-5EQg.jpg"
        ]
    },

    awards: {
        title: "Awards & Recognition",
        description: "Stunning acrylic, crystal, and wood trophies alongside premium medals to celebrate your top achievers properly.",
        features: [
            "Corporate trophies",
            "Crystal awards",
            "Medals",
            "Recognition plaques",
            "Sports awards",
            "Custom engraving"
        ],
        images: [
            "/images/576/20857500/medals-8M66nGRb7yZ63wq26yi12g.jpg",
            "/images/576/20857567/trophy-GAdTkhRo0OvGwfTL1FrAbQ.jpg",
            "/images/576/20861386/sports-z1HKdJFR6F05zV4L14YvJw.jpg"
        ]
    },

    decor: {
        title: "Prime Decor & Fine Art",
        description: "Elevate interior spaces with gallery canvas prints, fine art posters, and elegantly structured snap frames.",
        features: [
            "Canvas printing",
            "Interior decor",
            "Fine art posters",
            "Snap frames",
            "Wall graphics",
            "Premium finishing"
        ],
        images: [
            "/images/576/20858821/mdf-o2KkC57OqV1vHwvgxY25zw.jpg",
            "/images/576/20859968/forex-EedhkxvrtfxWOrzOvTxJzQ.jpg",
            "/images/660/20861792/special-W5s5eQdiZDqssCVcqUgv_w.jpg"
        ]
    },

    printing: {
        title: "Professional Printing",
        description: "Versatile large-format, DTF, and standard visual printing that maintains crisp colors and sharp typography.",
        features: [
            "Large format printing",
            "DTF printing",
            "UV printing",
            "Corporate printing",
            "Banner production",
            "Display graphics"
        ],
        images: [
            "/images/576/20860589/laser-V9kWw9dszIhy9Owzmv7SpQ.jpg",
            "/images/576/20860708/uv-48bk1hC9wB3cplX88G5jGg.jpg",
            "/images/576/20861293/school-iniQ1QWwVWVfq5mhohteJw.jpg"
        ]
    },

    embroidery: {
        title: "Embroidery Services",
        description: "Premium custom embroidery for apparel and corporate branding.",
        features: [
            "Apparel embroidery",
            "Custom corporate branding",
            "Patches & logos"
        ],
        images: [
            "/images/new/embroidery.webp",
            "/images/new/hoodembroidery.webp",
            "/images/new/Embroidery.webp"

        ]
    },

    vehicle: {
        title: "Vehicle & Fleet Branding",
        description: "Full and partial vehicle wraps with professional installation.",
        features: [
            "Full & partial wraps",
            "Custom decals & lettering",
            "Reflective safety markings"
        ],
        images: [
           "/images/new/brandingvehicle.webp",
            "/images/new/businessvehiclebranding.webp",
            "/images/new/Vehicle_branding.webp"        ]
    }

};

/* ==========================================================================
   MODAL FUNCTIONS
   ========================================================================== */

let modalInterval;

function openServiceModal(serviceKey) {

    const data = serviceData[serviceKey];

    if (!data) return;

    document.getElementById('modal-title').innerText =
        data.title;

    document.getElementById('modal-description').innerText =
        data.description;

    /* Gallery */

    const gallery =
        document.getElementById('modal-gallery');

    gallery.innerHTML = '';

    data.images.forEach((imgSrc, index) => {

        const img = document.createElement('img');

        img.src = imgSrc || defaultPlaceholder;

        img.loading = "lazy";

        img.onerror = function () {
            this.src = defaultPlaceholder;
        };

        img.className =
            index === 0 ? 'modal-slide active' : 'modal-slide';

        gallery.appendChild(img);

    });

    /* Features */

    const featuresContainer =
        document.getElementById('modal-features');

    if (featuresContainer) {

        featuresContainer.innerHTML = '';

        data.features.forEach(feature => {

            featuresContainer.innerHTML += `
                <div class="feature-item">
                    ${feature}
                </div>
            `;

        });

    }

    /* Open modal */

    const modal =
        document.getElementById('serviceModal');

    modal.classList.add('active');

    document.body.style.overflow = 'hidden';

    startModalSlideshow();

}

/* ==========================================================================
   CLOSE MODAL
   ========================================================================== */

function closeServiceModal() {

    const modal =
        document.getElementById('serviceModal');

    if (modal) {

        modal.classList.remove('active');

        document.body.style.overflow = 'auto';

        clearInterval(modalInterval);

    }

}

/* ==========================================================================
   MODAL SLIDESHOW
   ========================================================================== */

function startModalSlideshow() {

    clearInterval(modalInterval);

    const slides =
        document.querySelectorAll('#modal-gallery .modal-slide');

    if (slides.length <= 1) return;

    let currentIndex = 0;

    modalInterval = setInterval(() => {

        slides[currentIndex]
            .classList.remove('active');

        currentIndex =
            (currentIndex + 1) % slides.length;

        slides[currentIndex]
            .classList.add('active');

    }, 4000);

}

/* ==========================================================================
   DOCUMENT READY
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       INITIALIZE SERVICE SLIDESHOWS
       ========================================================== */

    Object.keys(serviceData).forEach(key => {

        const container =
            document.getElementById(`slideshow-${key}`);

        if (
            container &&
            serviceData[key].images.length > 0
        ) {

            /* Create images */

            serviceData[key].images.forEach((imgSrc, index) => {

                const img =
                    document.createElement('img');

                img.src = imgSrc || defaultPlaceholder;

                img.loading = "lazy";

                img.onerror = function () {
                    this.src = defaultPlaceholder;
                };

                img.className =
                    index === 0
                        ? 'slide active'
                        : 'slide';

                container.appendChild(img);

            });

            /* Start slideshow */

            if (serviceData[key].images.length > 1) {

                const slides =
                    container.getElementsByClassName('slide');

                let currentIndex = 0;

                setInterval(() => {

                    slides[currentIndex]
                        .classList.remove('active');

                    currentIndex =
                        (currentIndex + 1) % slides.length;

                    slides[currentIndex]
                        .classList.add('active');

                }, 3500 + (Math.random() * 500));

            }

        }

    });

    /* ==========================================================
       CLOSE MODAL OUTSIDE CLICK
       ========================================================== */

    window.addEventListener('click', (event) => {

        const modal =
            document.getElementById('serviceModal');

        if (event.target === modal) {

            closeServiceModal();

        }

    });

    /* ==========================================================
       HERO CAROUSEL
       ========================================================== */

    let currentSlide = 0;

    const slides =
        document.querySelectorAll('.carousel-slide');

    const dots =
        document.querySelectorAll('.control-dot');

    const slideCount = slides.length;

    let autoplayInterval;

    function goToSlide(index) {

        if (
            !slides[currentSlide] ||
            !dots[currentSlide]
        ) return;

        slides[currentSlide]
            .classList.remove('active');

        dots[currentSlide]
            .classList.remove('active');

        currentSlide = index;

        slides[currentSlide]
            .classList.add('active');

        dots[currentSlide]
            .classList.add('active');

    }

    function nextSlide() {

        let nextIndex =
            (currentSlide + 1) % slideCount;

        goToSlide(nextIndex);

    }

    if (slideCount > 0) {

        autoplayInterval =
            setInterval(nextSlide, 5500);

    }

    dots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            clearInterval(autoplayInterval);

            goToSlide(index);

            autoplayInterval =
                setInterval(nextSlide, 5500);

        });

    });

    /* ==========================================================
       SCROLL REVEAL
       ========================================================== */

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.12
    };

    const revealObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in-view");

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        }, observerOptions);

    const revealElements =
        document.querySelectorAll(".reveal-fade");

    revealElements.forEach(el =>
        revealObserver.observe(el)
    );

    /* ==========================================================
       COUNTERS
       ========================================================== */

    const counters =
        document.querySelectorAll('.stat-num');

    const counterObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const target =
                        +entry.target.getAttribute('data-target');

                    const updateCount = () => {

                        const count =
                            +entry.target.innerText;

                        const inc =
                            target / 40;

                        if (count < target) {

                            entry.target.innerText =
                                Math.ceil(count + inc);

                            setTimeout(updateCount, 40);

                        } else {

                            entry.target.innerText = target;

                        }

                    };

                    updateCount();

                    observer.unobserve(entry.target);

                }

            });

        }, { threshold: 0.5 });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================================================
       DYNAMIC HEADER
       ========================================================== */

    const header =
        document.getElementById("main-header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 80) {

            header.style.width = "100%";
            header.style.borderRadius = "0px";
            header.style.top = "0px";
            header.style.boxShadow =
                "0 8px 32px rgba(0, 0, 0, 0.08)";

        } else {

            header.style.width = "90%";
            header.style.borderRadius = "40px";
            header.style.top = "20px";
            header.style.boxShadow =
                "0 12px 40px rgba(0, 0, 0, 0.04)";

        }

    }, { passive: true });

});
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const navDrawer = document.querySelector('.primary-nav');

    if (toggleButton && navDrawer) {
        // Triggers animation classes on user input interaction
        toggleButton.addEventListener('click', () => {
            toggleButton.classList.toggle('open');
            navDrawer.classList.toggle('open');
        });

        // Safely resets tracking visibility states once link targets fire
        navDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleButton.classList.remove('open');
                navDrawer.classList.remove('open');
            });
        });
    }
});