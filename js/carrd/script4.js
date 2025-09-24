// More robust initialization with unique namespace
        window.TestimonialSlideshowInit = window.TestimonialSlideshowInit || function () {
            'use strict';

            // Check if already initialized
            if (window.testimonialSlideshowInitialized) {
                return;
            }

            const wrapper = document.getElementById('testimonial-slideshow-main');
            if (!wrapper) {
                console.log('Testimonial slideshow wrapper not found');
                return;
            }

            class TestimonialSlideshow {
                constructor() {
                    this.currentSlide = 0;
                    this.testimonials = wrapper.querySelectorAll('.testimonial-slide');
                    this.dots = wrapper.querySelectorAll('.testimonial-dot');
                    this.totalSlides = this.testimonials.length;
                    this.prevBtn = wrapper.querySelector('.testimonial-prev-btn');
                    this.nextBtn = wrapper.querySelector('.testimonial-next-btn');
                    this.autoplayInterval = null;

                    console.log('Testimonial slideshow initializing...', {
                        testimonials: this.testimonials.length,
                        dots: this.dots.length,
                        prevBtn: !!this.prevBtn,
                        nextBtn: !!this.nextBtn
                    });

                    if (this.testimonials.length > 0 && this.prevBtn && this.nextBtn) {
                        this.init();
                    } else {
                        console.error('Testimonial slideshow: Missing required elements');
                    }
                }

                init() {
                    // Event listeners
                    this.prevBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.prevSlide();
                        console.log('Previous slide clicked');
                    });

                    this.nextBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.nextSlide();
                        console.log('Next slide clicked');
                    });

                    this.dots.forEach((dot, index) => {
                        dot.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.goToSlide(index);
                            console.log('Dot clicked:', index);
                        });
                    });

                    // Auto-play
                    this.startAutoplay();

                    // Pause on hover
                    const slideshow = wrapper.querySelector('.testimonial-slideshow-container');
                    if (slideshow) {
                        slideshow.addEventListener('mouseenter', () => this.stopAutoplay());
                        slideshow.addEventListener('mouseleave', () => this.startAutoplay());
                    }

                    console.log('Testimonial slideshow initialized successfully');
                }

                showSlide(index) {
                    console.log('=== SHOW SLIDE CALLED ===');
                    console.log('Index:', index);
                    console.log('Total testimonials:', this.testimonials.length);
                    console.log('Testimonials:', this.testimonials);

                    // Hide all testimonials
                    this.testimonials.forEach((testimonial, i) => {
                        console.log(`Removing active from slide ${i}:`, testimonial);
                        testimonial.classList.remove('active');
                    });

                    // Show current testimonial
                    if (this.testimonials[index]) {
                        console.log(`Adding active to slide ${index}:`, this.testimonials[index]);
                        this.testimonials[index].classList.add('active');
                        console.log('Classes after adding active:', this.testimonials[index].className);
                    } else {
                        console.error('Testimonial at index', index, 'not found!');
                    }

                    // Update dots
                    this.dots.forEach((dot, i) => {
                        console.log(`Removing active from dot ${i}:`, dot);
                        dot.classList.remove('active');
                    });
                    if (this.dots[index]) {
                        console.log(`Adding active to dot ${index}:`, this.dots[index]);
                        this.dots[index].classList.add('active');
                        console.log('Dot classes after adding active:', this.dots[index].className);
                    }

                    console.log('=== SHOW SLIDE END ===');
                }

                nextSlide() {
                    console.log('=== NEXT SLIDE METHOD ===');
                    console.log('Current slide before calculation:', this.currentSlide);
                    console.log('Total slides:', this.totalSlides);

                    const oldSlide = this.currentSlide;
                    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;

                    console.log('New slide calculated:', this.currentSlide);
                    console.log(`Moving from slide ${oldSlide} to slide ${this.currentSlide}`);

                    this.showSlide(this.currentSlide);
                    console.log('=== NEXT SLIDE METHOD END ===');
                }

                prevSlide() {
                    console.log('=== PREV SLIDE METHOD ===');
                    console.log('Current slide before calculation:', this.currentSlide);

                    const oldSlide = this.currentSlide;
                    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;

                    console.log('New slide calculated:', this.currentSlide);
                    console.log(`Moving from slide ${oldSlide} to slide ${this.currentSlide}`);

                    this.showSlide(this.currentSlide);
                    console.log('=== PREV SLIDE METHOD END ===');
                }

                goToSlide(index) {
                    console.log('=== GO TO SLIDE METHOD ===');
                    console.log('Going to slide:', index);

                    this.currentSlide = index;
                    this.showSlide(this.currentSlide);
                    console.log('=== GO TO SLIDE METHOD END ===');
                }

                addDebugButtons() {
                    console.log('Adding debug buttons...');

                    // Create debug container
                    const debugDiv = document.createElement('div');
                    debugDiv.style.cssText = 'margin: 20px 0; text-align: center; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 10px;';

                    // Add debug buttons
                    const testNextBtn = document.createElement('button');
                    testNextBtn.textContent = 'DEBUG: Next Slide';
                    testNextBtn.style.cssText = 'margin: 5px; padding: 10px; background: red; color: white; border: none; border-radius: 5px; cursor: pointer;';
                    testNextBtn.addEventListener('click', () => {
                        console.log('DEBUG BUTTON: Manual next slide trigger');
                        this.nextSlide();
                    });

                    const testPrevBtn = document.createElement('button');
                    testPrevBtn.textContent = 'DEBUG: Prev Slide';
                    testPrevBtn.style.cssText = 'margin: 5px; padding: 10px; background: blue; color: white; border: none; border-radius: 5px; cursor: pointer;';
                    testPrevBtn.addEventListener('click', () => {
                        console.log('DEBUG BUTTON: Manual prev slide trigger');
                        this.prevSlide();
                    });

                    const infoBtn = document.createElement('button');
                    infoBtn.textContent = 'DEBUG: Show Info';
                    infoBtn.style.cssText = 'margin: 5px; padding: 10px; background: green; color: white; border: none; border-radius: 5px; cursor: pointer;';
                    infoBtn.addEventListener('click', () => {
                        console.log('=== DEBUG INFO ===');
                        console.log('Current slide:', this.currentSlide);
                        console.log('Total slides:', this.totalSlides);
                        console.log('Testimonials:', this.testimonials);
                        console.log('Dots:', this.dots);
                        console.log('Prev button:', this.prevBtn);
                        console.log('Next button:', this.nextBtn);

                        // Check which slide is currently active
                        this.testimonials.forEach((slide, i) => {
                            console.log(`Slide ${i} classes:`, slide.className);
                        });
                        console.log('=== DEBUG INFO END ===');
                    });

                    debugDiv.appendChild(testPrevBtn);
                    debugDiv.appendChild(testNextBtn);
                    debugDiv.appendChild(infoBtn);

                    // Insert debug buttons after the slideshow
                    const controls = wrapper.querySelector('.testimonial-controls');
                    controls.parentNode.insertBefore(debugDiv, controls.nextSibling);

                    console.log('Debug buttons added');
                }

                startAutoplay() {
                    this.stopAutoplay(); // Clear any existing interval
                    this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
                }

                stopAutoplay() {
                    if (this.autoplayInterval) {
                        clearInterval(this.autoplayInterval);
                        this.autoplayInterval = null;
                    }
                }
            }

            new TestimonialSlideshow();
            window.testimonialSlideshowInitialized = true;
        };

        // Try to initialize immediately
        TestimonialSlideshowInit();

        // Also try after a short delay in case elements aren't ready
        setTimeout(TestimonialSlideshowInit, 100);

        // And as a fallback, try when the DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', TestimonialSlideshowInit);
        }