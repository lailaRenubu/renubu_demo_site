// Pure Scrolling System - Let Carrd Handle Animations
        document.addEventListener('DOMContentLoaded', function () {

            // Define scroll stops with their target positions
            const scrollStops = [
                { position: 0, name: 'hero' },
                { position: 1224, name: 'problem' },
                { position: 2364, name: 'solutions' },
                { position: 3550, name: 'cta' }
            ];

            let currentStop = 0;
            let isScrolling = false;
            let lastScrollTime = 0;

            // Check if element is interactive (button, link, input, etc.)
            function isInteractiveElement(element) {
                if (!element) return false;

                const interactiveSelectors = [
                    'button', 'a', 'input', 'select', 'textarea',
                    '[data-modal]', '[role="button"]', '.button',
                    '#beta-cta-btn', '#hero-cta-btn'
                ];

                // Check if the element itself is interactive
                for (const selector of interactiveSelectors) {
                    if (element.matches && element.matches(selector)) {
                        return true;
                    }
                }

                // Check if any parent element is interactive
                let parent = element.parentElement;
                while (parent && parent !== document.body) {
                    for (const selector of interactiveSelectors) {
                        if (parent.matches && parent.matches(selector)) {
                            return true;
                        }
                    }
                    parent = parent.parentElement;
                }

                return false;
            }

            // Simple smooth scroll function
            function scrollToPosition(position) {
                if (isScrolling) return;

                isScrolling = true;
                lastScrollTime = Date.now();

                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });

                // Reset scroll lock after animation completes
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }

            // Get the appropriate scroll stop based on current position
            function getCurrentStop() {
                const scrollY = window.scrollY;
                for (let i = scrollStops.length - 1; i >= 0; i--) {
                    if (scrollY >= scrollStops[i].position - 200) {
                        return i;
                    }
                }
                return 0;
            }

            // Navigation functions
            function scrollToProblemSection() {
                currentStop = 1;
                scrollToPosition(scrollStops[1].position);
            }

            function scrollToNextSection() {
                if (currentStop < scrollStops.length - 1) {
                    currentStop++;
                    scrollToPosition(scrollStops[currentStop].position);
                }
            }

            function scrollToPreviousSection() {
                if (currentStop > 0) {
                    currentStop--;
                    scrollToPosition(scrollStops[currentStop].position);
                }
            }

            // Enhanced wheel event handler that avoids interactive elements
            function handleWheelScroll(e) {
                // Don't hijack scroll if user is scrolling over interactive elements
                if (isInteractiveElement(e.target)) {
                    return; // Let the normal scroll behavior happen
                }

                if (isScrolling) {
                    e.preventDefault();
                    return;
                }

                const now = Date.now();
                if (now - lastScrollTime < 150) return;

                currentStop = getCurrentStop();
                const delta = e.deltaY;
                const isSignificantScroll = Math.abs(delta) > 75;

                if (isSignificantScroll) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (delta > 0) {
                        scrollToNextSection();
                    } else {
                        scrollToPreviousSection();
                    }
                }
            }

            function handleKeyNavigation(e) {
                if (isScrolling) return;

                // Don't hijack keys if user is in an input field
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                    return;
                }

                switch (e.key) {
                    case 'ArrowDown':
                    case 'PageDown':
                    case ' ':
                        e.preventDefault();
                        scrollToNextSection();
                        break;
                    case 'ArrowUp':
                    case 'PageUp':
                        e.preventDefault();
                        scrollToPreviousSection();
                        break;
                }
            }

            // Setup Learn More button (only the n02 button, not the modal buttons)
            const learnMoreButton = document.querySelector('#hero-cta-btn .button.n02');
            if (learnMoreButton) {
                learnMoreButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    scrollToProblemSection();
                    return false;
                });
                learnMoreButton.setAttribute('href', 'javascript:void(0)');
            }

            // Setup down arrow detection (avoid modal buttons)
            const downArrowSelectors = [
                '.down-arrow', '.scroll-down', '.scroll-indicator',
                '#scroll-teaser', '[data-scroll="down"]',
                '.fa-chevron-down', '.fa-arrow-down', '.arrow-down'
            ];

            let downArrow = null;
            for (const selector of downArrowSelectors) {
                const element = document.querySelector(selector);
                // Make sure it's not a modal button
                if (element && !element.hasAttribute('data-modal') && !element.closest('[data-modal]')) {
                    downArrow = element;
                    break;
                }
            }

            if (!downArrow) {
                const potentialArrows = document.querySelectorAll('*');
                for (const element of potentialArrows) {
                    // Skip modal buttons
                    if (element.hasAttribute('data-modal') || element.closest('[data-modal]')) {
                        continue;
                    }

                    const text = element.textContent?.trim() || '';
                    const innerHTML = element.innerHTML || '';

                    if ((text === '↓' || text === '⬇' || text === '▼' ||
                        innerHTML.includes('chevron') || innerHTML.includes('arrow-down')) &&
                        element.children.length <= 2 && text.length < 50) {
                        downArrow = element;
                        break;
                    }
                }
            }

            if (downArrow) {
                downArrow.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    scrollToNextSection();
                    return false;
                });

                downArrow.style.cursor = 'pointer';
                downArrow.style.transition = 'transform 0.2s ease, opacity 0.2s ease';

                downArrow.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(3px)';
                    this.style.opacity = '0.7';
                });

                downArrow.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0)';
                    this.style.opacity = '1';
                });

                if (downArrow.tagName === 'A') {
                    downArrow.setAttribute('href', 'javascript:void(0)');
                }
            }

            // Event listeners
            document.addEventListener('wheel', handleWheelScroll, { passive: false });
            document.addEventListener('keydown', handleKeyNavigation);

            // Update current stop on manual scroll
            let scrollUpdateTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollUpdateTimeout);
                scrollUpdateTimeout = setTimeout(() => {
                    if (!isScrolling) {
                        currentStop = getCurrentStop();
                    }
                }, 150);
            });

            // Global functions
            window.scrollToSection = function (sectionIndex) {
                if (sectionIndex >= 0 && sectionIndex < scrollStops.length) {
                    currentStop = sectionIndex;
                    scrollToPosition(scrollStops[sectionIndex].position);
                }
            };

            window.setupDownArrow = function (selector) {
                const element = document.querySelector(selector);
                if (element && !element.hasAttribute('data-modal')) {
                    element.addEventListener('click', function (e) {
                        e.preventDefault();
                        scrollToProblemSection();
                    });
                    element.style.cursor = 'pointer';
                }
            };

            console.log('Pure scrolling system initialized - Carrd handles animations');
        });