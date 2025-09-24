function showSuccessMessage(form) {
            // Remove any existing messages
            const existingMessage = form.parentNode.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Create success message
            const successDiv = document.createElement('div');
            successDiv.className = 'form-message form-success';
            successDiv.innerHTML = '✓ Thanks for reaching out! We\'ll get back to you soon.';

            // Insert after form
            form.parentNode.insertBefore(successDiv, form.nextSibling);

            // Remove message after 5 seconds
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 5000);
        }

        function showErrorMessage(form, message) {
            // Remove any existing messages
            const existingMessage = form.parentNode.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Create error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-message form-error';
            errorDiv.innerHTML = '⚠ ' + message;

            // Insert after form
            form.parentNode.insertBefore(errorDiv, form.nextSibling);

            // Remove message after 7 seconds
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 7000);
        }

        function openCustomCalendlyModal(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            try {
                // Close any existing modals first
                closeCustomCalendlyModal();

                // Add modal-open class to body
                document.body.classList.add('modal-open');

                // Create modal HTML
                const modalHTML = `
    <div class="custom-calendly-overlay" id="custom-calendly-overlay">
    <div class="custom-calendly-modal">
    <div class="custom-close-btn" onclick="closeCustomCalendlyModal()">×</div>
    
    <div class="custom-content-section">
    <h2>Thanks for your interest!</h2>
    <p>Schedule a personalized demo and discover how our platform can transform your workflow.</p>
    
    <ul>
    <li>30-minute personalized consultation</li>
    <li>Live platform demonstration</li>
    <li>Custom solution recommendations</li>
    <li>Q&A with our product experts</li>
    </ul>
    
    <div class="contact-form-section">
    <h3>Or send us a quick message</h3>
    <form id="contact-form-container" action="https://formspree.io/f/xjkezawk" method="POST">
    <!-- Form will be built programmatically -->
    </form>
    </div>
    </div>
    
    <div class="calendly-section" id="calendly-inline-widget">
    <!-- Calendly will be embedded here -->
    </div>
    </div>
    </div>
    `;

                // Insert modal into DOM
                document.body.insertAdjacentHTML('beforeend', modalHTML);

                // Now build the form programmatically
                const form = document.getElementById('contact-form-container');

                // Create Name field
                const nameGroup = document.createElement('div');
                nameGroup.className = 'form-group';

                const nameLabel = document.createElement('label');
                nameLabel.setAttribute('for', 'contact-name');
                nameLabel.textContent = 'Name';

                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.id = 'contact-name';
                nameInput.name = 'name';
                nameInput.placeholder = 'Your name';
                nameInput.required = true;

                nameGroup.appendChild(nameLabel);
                nameGroup.appendChild(nameInput);

                // Create Email field
                const emailGroup = document.createElement('div');
                emailGroup.className = 'form-group';

                const emailLabel = document.createElement('label');
                emailLabel.setAttribute('for', 'contact-email');
                emailLabel.textContent = 'Email';

                const emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.id = 'contact-email';
                emailInput.name = 'email';
                emailInput.placeholder = 'your@email.com';
                emailInput.required = true;

                emailGroup.appendChild(emailLabel);
                emailGroup.appendChild(emailInput);

                // Create Message field
                const messageGroup = document.createElement('div');
                messageGroup.className = 'form-group';

                const messageLabel = document.createElement('label');
                messageLabel.setAttribute('for', 'contact-message');
                messageLabel.textContent = 'Message';

                const messageTextarea = document.createElement('textarea');
                messageTextarea.id = 'contact-message';
                messageTextarea.name = 'message';
                messageTextarea.placeholder = 'Tell us about your needs or questions...';
                messageTextarea.required = true;

                messageGroup.appendChild(messageLabel);
                messageGroup.appendChild(messageTextarea);

                // Create Submit button - FIXED: Changed to type="submit"
                const submitBtn = document.createElement('button');
                submitBtn.type = 'submit'; // This is the key fix!
                submitBtn.className = 'submit-btn';
                submitBtn.textContent = 'Send Message';

                // Append all elements to form
                form.appendChild(nameGroup);
                form.appendChild(emailGroup);
                form.appendChild(messageGroup);
                form.appendChild(submitBtn);

                // Add form submission handler with AJAX
                form.addEventListener('submit', async function (e) {
                    e.preventDefault(); // Prevent default form submission

                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';

                    try {
                        // Collect form data
                        const formData = new FormData(form);

                        // Submit via fetch API
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });

                        if (response.ok) {
                            // Success - show message and reset form
                            showSuccessMessage(form);
                            form.reset();
                        } else {
                            // Handle Formspree validation errors
                            const data = await response.json();
                            if (data.errors) {
                                showErrorMessage(form, 'Please check your form and try again.');
                            } else {
                                showErrorMessage(form, 'Something went wrong. Please try again.');
                            }
                        }
                    } catch (error) {
                        console.error('Form submission error:', error);
                        showErrorMessage(form, 'Network error. Please try again.');
                    } finally {
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send Message';
                    }
                });

                // Initialize Calendly inline widget
                setTimeout(function () {
                    if (typeof Calendly !== 'undefined') {
                        Calendly.initInlineWidget({
                            url: 'https://calendly.com/jstrackany/renubu',
                            parentElement: document.getElementById('calendly-inline-widget'),
                            prefill: {},
                            utm: {}
                        });
                    }
                }, 100);

                // Add click-outside-to-close functionality
                const overlay = document.getElementById('custom-calendly-overlay');
                if (overlay) {
                    overlay.addEventListener('click', function (e) {
                        if (e.target === this) {
                            closeCustomCalendlyModal();
                        }
                    });
                }

            } catch (error) {
                console.error('Error opening modal:', error);
            }

            return false;
        }

        function closeCustomCalendlyModal() {
            const overlay = document.getElementById('custom-calendly-overlay');
            if (overlay) {
                overlay.remove();
            }
            document.body.classList.remove('modal-open');
        }

        // Setup event listeners
        document.addEventListener('DOMContentLoaded', function () {
            // Attach to all elements with class "open-modal" OR data-modal="calendly"
            document.addEventListener('click', function (e) {
                const target = e.target.closest('.open-modal, [data-modal="calendly"]');
                if (target) {
                    e.preventDefault();
                    openCustomCalendlyModal(e);
                }
            });

            // ESC key to close modal
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && document.getElementById('custom-calendly-overlay')) {
                    closeCustomCalendlyModal();
                }
            });
        });

        // Global function if you need to call it directly
        window.openCalendlyModal = openCustomCalendlyModal;