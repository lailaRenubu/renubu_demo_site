let smartV2CurrentSlideIndex = 1;
        const smartV2TotalSlides = 5;

        // Core slide management function
        function smartV2ShowSlide(slideNumber, event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            // Validate slide number
            if (slideNumber < 1 || slideNumber > smartV2TotalSlides) {
                console.log('Invalid slide number:', slideNumber);
                return false;
            }

            // Hide all slides within the V2 container
            const v2Container = document.querySelector('.smart-slideshow-v2');
            if (!v2Container) {
                console.log('V2 container not found');
                return false;
            }

            const slides = v2Container.querySelectorAll('.smart-slide');
            slides.forEach(slide => slide.classList.remove('smart-active'));

            // Show target slide
            const targetSlide = v2Container.querySelector(`[data-smart-slide="${slideNumber}"]`);
            if (targetSlide) {
                targetSlide.classList.add('smart-active');
            } else {
                console.log('Target slide not found:', slideNumber);
                return false;
            }

            // Update indicators
            const indicators = v2Container.querySelectorAll('.smart-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('smart-active', index + 1 === slideNumber);
            });

            // Update counter
            const counterElement = document.getElementById('smartCurrentSlideV2');
            if (counterElement) {
                counterElement.textContent = slideNumber;
            }

            // Update current index
            smartV2CurrentSlideIndex = slideNumber;
            return true;
        }

        // Navigate to next slide
        function smartV2SlideNext() {
            const nextSlide = smartV2CurrentSlideIndex + 1;
            if (nextSlide <= smartV2TotalSlides) {
                return smartV2ShowSlide(nextSlide);
            }
            return false;
        }

        // Navigate to previous slide
        function smartV2SlidePrev() {
            const prevSlide = smartV2CurrentSlideIndex - 1;
            if (prevSlide >= 1) {
                return smartV2ShowSlide(prevSlide);
            }
            return false;
        }

        // Navigate to specific slide
        function smartV2GoToSlide(slideNumber) {
            console.log('smartV2GoToSlide called with:', slideNumber);
            return smartV2ShowSlide(slideNumber);
        }

        // Get current slide info
        function smartV2GetCurrentSlide() {
            return {
                current: smartV2CurrentSlideIndex,
                total: smartV2TotalSlides,
                isFirst: smartV2CurrentSlideIndex === 1,
                isLast: smartV2CurrentSlideIndex === smartV2TotalSlides
            };
        }

        // Check if navigation is possible
        function smartV2CanGoNext() {
            return smartV2CurrentSlideIndex < smartV2TotalSlides;
        }

        function smartV2CanGoPrev() {
            return smartV2CurrentSlideIndex > 1;
        }

        // Initialize when DOM is ready
        function initSmartV2() {
            const totalSlidesElement = document.getElementById('smartTotalSlidesV2');
            if (totalSlidesElement) {
                totalSlidesElement.textContent = smartV2TotalSlides;
            }
            smartV2ShowSlide(1);
            console.log('SmartV2 slideshow initialized');
        }

        // Main initialization and event handling
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize the slideshow
            initSmartV2();

            // Handle navigation icons with event listeners to prevent page refresh
            const leftIcon = document.querySelector('#show-me-btn .n01');
            const rightIcon = document.querySelector('#show-me-btn .n02');

            if (leftIcon) {
                leftIcon.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    smartV2SlidePrev();
                    return false;
                });
            }

            if (rightIcon) {
                rightIcon.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    smartV2SlideNext();
                    return false;
                });
            }

            // Handle dot indicators
            const indicators = document.querySelectorAll('.smart-slideshow-v2 .smart-indicator');
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    smartV2GoToSlide(index + 1);
                    return false;
                });
            });

            // Keyboard navigation
            document.addEventListener('keydown', function (event) {
                const slideshow = document.querySelector('.smart-slideshow-v2');
                if (slideshow && slideshow.contains(document.activeElement)) {
                    if (event.key === 'ArrowLeft') {
                        smartV2SlidePrev();
                    } else if (event.key === 'ArrowRight') {
                        smartV2SlideNext();
                    }
                }
            });
        });

        // Fallback initialization if DOMContentLoaded already fired
        if (document.readyState === 'loading') {
            // DOMContentLoaded listener above will handle this
        } else {
            // DOM is already ready, initialize immediately
            initSmartV2();

            // Set up event listeners immediately
            const leftIcon = document.querySelector('#show-me-btn .n01');
            const rightIcon = document.querySelector('#show-me-btn .n02');

            if (leftIcon) {
                leftIcon.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    smartV2SlidePrev();
                    return false;
                });
            }

            if (rightIcon) {
                rightIcon.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    smartV2SlideNext();
                    return false;
                });
            }

            const indicators = document.querySelectorAll('.smart-slideshow-v2 .smart-indicator');
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    smartV2GoToSlide(index + 1);
                    return false;
                });
            });
        }