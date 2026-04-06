/*
 * ============================================================
 * SERVICES CAROUSEL - Custom Vanilla JS + jQuery
 * ============================================================
 * 
 * VIVA EXPLANATION:
 * ----------------
 * 1. INFINITE LOOP: We clone first/last slides and jump instantly when reaching clones
 * 2. RESPONSIVE: Check screen width to show 1/2/3 cards
 * 3. AUTO-PLAY: setInterval moves slides every 5 seconds
 * 4. HOVER PAUSE: mouseenter/mouseleave events control auto-play
 * 5. jQuery: Used for button click handlers (requirement)
 * 
 * KEY CONCEPTS:
 * - transform: translateX() - moves the carousel track
 * - flex layout - cards sit in a row
 * - cloning - creates seamless loop effect
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const CONFIG = {
        autoPlayInterval: 5000,  // Auto-slide every 5 seconds
        transitionDuration: 500, // Animation takes 0.5 seconds
        breakpoints: {
            mobile: 768,   // Below this = 1 card
            tablet: 1024   // Below this = 2 cards, above = 3 cards
        }
    };

    // ===== STATE VARIABLES =====
    let currentIndex = 0;      // Current slide position
    let autoPlayTimer = null;  // Timer reference for auto-play
    let isHovering = false;    // Is mouse over carousel?
    let slidesPerView = 3;     // How many cards visible
    let totalSlides = 0;       // Total number of slides

    // ===== DOM ELEMENTS =====
    const carouselTrack = document.getElementById('carouselTrack');
    const slideCounter = document.getElementById('slideCounter');
    const slides = document.querySelectorAll('.carousel-slide');
    
    // ===== MAIN INIT FUNCTION =====
    function initCarousel() {
        if (!carouselTrack || slides.length === 0) return;

        totalSlides = slides.length;
        updateSlidesPerView();      // Check screen size
        createClones();             // For infinite loop
        updateCarouselPosition(false);
        updateCounter();
        initializeButtonHandlers(); // jQuery buttons
        initializeHoverPause();     // Pause on hover
        initializeTouchSupport();   // Mobile swipe
        startAutoPlay();            // Auto-slide
        
        window.addEventListener('resize', debounce(handleResize, 250));
        console.log('✅ Carousel ready!');
    }

    // ===== INFINITE LOOP - Clone slides =====
    // We clone slides at start and end so when we reach the "fake" end,
    // we can instantly jump to the real slide without user noticing
    function createClones() {
        const clonesBefore = [];
        const clonesAfter = [];
        
        // Clone last few slides to prepend
        for (let i = totalSlides - slidesPerView; i < totalSlides; i++) {
            const clone = slides[i].cloneNode(true);
            clone.classList.add('clone');
            clonesBefore.push(clone);
        }
        
        // Clone first few slides to append
        for (let i = 0; i < slidesPerView; i++) {
            const clone = slides[i].cloneNode(true);
            clone.classList.add('clone');
            clonesAfter.push(clone);
        }
        
        // Prepend clones
        clonesBefore.forEach(clone => {
            carouselTrack.insertBefore(clone, carouselTrack.firstChild);
        });
        
        // Append clones
        clonesAfter.forEach(clone => {
            carouselTrack.appendChild(clone);
        });
    }

    // ===== Update Slides Per View Based on Screen Width =====
    function updateSlidesPerView() {
        const width = window.innerWidth;
        
        if (width <= CONFIG.breakpoints.mobile) {
            slidesPerView = 1;
        } else if (width <= CONFIG.breakpoints.tablet) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
    }

    // ===== Get Slide Width =====
    function getSlideWidth() {
        const allSlides = carouselTrack.querySelectorAll('.carousel-slide');
        if (allSlides.length === 0) return 0;
        
        const slide = allSlides[0];
        const style = window.getComputedStyle(carouselTrack);
        const gap = parseFloat(style.gap) || 25;
        
        return slide.offsetWidth + gap;
    }

    // ===== Update Carousel Position =====
    function updateCarouselPosition(animate = true) {
        const slideWidth = getSlideWidth();
        const offset = (currentIndex + slidesPerView) * slideWidth;
        
        if (!animate) {
            carouselTrack.style.transition = 'none';
        } else {
            carouselTrack.style.transition = `transform ${CONFIG.transitionDuration}ms ease-in-out`;
        }
        
        carouselTrack.style.transform = `translateX(-${offset}px)`;
        
        // Force reflow if no animation
        if (!animate) {
            carouselTrack.offsetHeight; // Trigger reflow
        }
    }

    // ===== Navigate to Next Slide =====
    function nextSlide() {
        currentIndex++;
        updateCarouselPosition(true);
        
        // Check if we need to loop
        setTimeout(() => {
            if (currentIndex >= totalSlides) {
                currentIndex = 0;
                updateCarouselPosition(false);
            }
            updateCounter();
        }, CONFIG.transitionDuration);
    }

    // ===== Navigate to Previous Slide =====
    function prevSlide() {
        currentIndex--;
        updateCarouselPosition(true);
        
        // Check if we need to loop
        setTimeout(() => {
            if (currentIndex < 0) {
                currentIndex = totalSlides - 1;
                updateCarouselPosition(false);
            }
            updateCounter();
        }, CONFIG.transitionDuration);
    }

    // ===== Update Slide Counter =====
    function updateCounter() {
        if (slideCounter) {
            const displayIndex = ((currentIndex % totalSlides) + totalSlides) % totalSlides + 1;
            slideCounter.textContent = `Showing ${displayIndex} of ${totalSlides}`;
            
            // Add pop animation to counter
            slideCounter.style.transform = 'scale(1.1)';
            setTimeout(() => {
                slideCounter.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // ===== jQuery Button Handlers (VIVA: Show jQuery usage) =====
    function initializeButtonHandlers() {
        $(document).ready(function() {
            // Next button - jQuery click handler
            $('#nextBtn').on('click', function() {
                nextSlide();
                resetAutoPlay();
            });
            
            // Previous button - jQuery click handler  
            $('#prevBtn').on('click', function() {
                prevSlide();
                resetAutoPlay();
            });
        });
    }

    // ===== Hover Pause (VIVA: mouseenter/mouseleave events) =====
    function initializeHoverPause() {
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        
        if (carouselWrapper) {
            // When mouse enters - pause auto-play
            carouselWrapper.addEventListener('mouseenter', function() {
                isHovering = true;
                stopAutoPlay();
            });
            
            // When mouse leaves - resume auto-play
            carouselWrapper.addEventListener('mouseleave', function() {
                isHovering = false;
                startAutoPlay();
            });
        }
    }

    // ===== Auto-Play (VIVA: setInterval/clearInterval) =====
    function startAutoPlay() {
        if (autoPlayTimer || isHovering) return;
        
        autoPlayTimer = setInterval(function() {
            if (!isHovering) {
                nextSlide();
            }
        }, CONFIG.autoPlayInterval);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        if (!isHovering) {
            startAutoPlay();
        }
    }

    // ===== Touch/Swipe Support =====
    function initializeTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;
        
        carouselTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });
        
        carouselTrack.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            if (!isHovering) {
                startAutoPlay();
            }
        }, { passive: true });
        
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) >= minSwipeDistance) {
                if (swipeDistance > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
        }
    }

    // ===== Handle Window Resize =====
    function handleResize() {
        const previousSlidesPerView = slidesPerView;
        updateSlidesPerView();
        
        if (previousSlidesPerView !== slidesPerView) {
            // Rebuild carousel with new clones
            rebuildCarousel();
        } else {
            // Just update position
            updateCarouselPosition(false);
        }
    }

    // ===== Rebuild Carousel on Breakpoint Change =====
    function rebuildCarousel() {
        // Remove existing clones
        const clones = carouselTrack.querySelectorAll('.clone');
        clones.forEach(clone => clone.remove());
        
        // Reset index
        currentIndex = 0;
        
        // Recreate clones
        createClones();
        
        // Update position
        updateCarouselPosition(false);
        updateCounter();
    }

    // ===== Debounce Utility =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== Keyboard Navigation =====
    document.addEventListener('keydown', function(e) {
        // Only handle if carousel is in viewport
        const carouselSection = document.querySelector('.services');
        if (!carouselSection) return;
        
        const rect = carouselSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            }
        }
    });

    // ===== Initialize on DOM Ready =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }

})();
