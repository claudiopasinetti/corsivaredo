// Main JavaScript file for Lido Azzurro landing page
// Author: Generated for conversion optimization
// Last updated: 2025-08-19

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏊‍♂️ Lido Azzurro landing page initialized');
    
    // Initialize all functionality
    initializeCountdown();
    initializeFAQ();
    initializeModal();
    initializeSmoothScroll();
    initializeTallyIntegration();
    initializeAnalytics();
    initializeURLParameters();
    initializeCookieBanner();
    
    // Track page load
    trackEvent('page_view', 'landing', 'lido_azzurro_corsi');
});

/**
 * Countdown timer to September 15th, 2025 at 23:59 (Europe/Rome timezone)
 */
function initializeCountdown() {
    const targetDate = new Date('2025-09-15T23:59:00+02:00'); // Europe/Rome timezone
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = targetDate - now;
        
        if (timeLeft <= 0) {
            // Promo expired
            countdownElement.innerHTML = '<span class="text-3xl md:text-5xl lg:text-6xl font-bold text-[#b01313]">Promo scaduta</span>';
            countdownElement.classList.add('countdown-expired');
            
            // Disable CTAs and show alternative message
            disableCTAsAfterExpiry();
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="flex justify-center gap-6 md:gap-8 flex-wrap">
                <div class="text-center">
                    <div class="text-3xl md:text-5xl lg:text-6xl font-bold text-[#b01313] mb-1">${days.toString().padStart(2, '0')}</div>
                    <div class="text-sm md:text-base font-medium uppercase tracking-wide text-[#b01313]">giorni</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl md:text-5xl lg:text-6xl font-bold text-[#b01313] mb-1">${hours.toString().padStart(2, '0')}</div>
                    <div class="text-sm md:text-base font-medium uppercase tracking-wide text-[#b01313]">ore</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl md:text-5xl lg:text-6xl font-bold text-[#b01313] mb-1">${minutes.toString().padStart(2, '0')}</div>
                    <div class="text-sm md:text-base font-medium uppercase tracking-wide text-[#b01313]">min</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl md:text-5xl lg:text-6xl font-bold text-[#b01313] mb-1">${seconds.toString().padStart(2, '0')}</div>
                    <div class="text-sm md:text-base font-medium uppercase tracking-wide text-[#b01313]">sec</div>
                </div>
            </div>
        `;
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Disable CTAs and show alternative message when promo expires
 */
function disableCTAsAfterExpiry() {
    const ctaButtons = document.querySelectorAll('.cta-track');
    const expiredMessage = 'Promo scaduta — contattaci per disponibilità';
    
    ctaButtons.forEach(button => {
        button.style.opacity = '0.6';
        button.style.pointerEvents = 'none';
        button.innerHTML = expiredMessage;
    });
    

}

/**
 * FAQ Accordion functionality
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-icon');
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.closest('.faq-item');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    
                    otherAnswer.style.display = 'none';
                    otherAnswer.classList.remove('open');
                    otherIcon.classList.remove('rotate');
                }
            });
            
            // Toggle current FAQ
            const isCurrentlyHidden = answer.style.display === 'none' || answer.style.display === '';
            if (isCurrentlyHidden) {
                answer.style.display = 'block';
                answer.classList.add('open');
                icon.classList.add('rotate');
            } else {
                answer.style.display = 'none';
                answer.classList.remove('open');
                icon.classList.remove('rotate');
            }
            
            // Track FAQ interaction
            const questionText = this.querySelector('span').textContent;
            trackEvent('faq_click', 'engagement', questionText);
        });
    });
}

/**
 * Calendar Modal functionality
 */
function initializeModal() {
    const modalBtn = document.getElementById('calendar-modal-btn');
    const modal = document.getElementById('calendar-modal');
    const closeBtn = document.getElementById('close-modal');
    
    if (!modalBtn || !modal || !closeBtn) return;
    
    // Open modal
    modalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Track modal open
        trackEvent('calendar_modal_open', 'engagement', 'calendar_view');
    });
    
    // Close modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    // Swipe to close on mobile
    let startY = 0;
    modal.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    
    modal.addEventListener('touchend', function(e) {
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;
        
        // Swipe down to close (threshold: 100px)
        if (diff < -100) {
            closeModal();
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80; // Account for sticky header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Track CTA clicks
                if (this.classList.contains('cta-track')) {
                    const location = this.getAttribute('data-location') || 'unknown';
                    trackEvent('cta_click', 'conversion', location);
                }
            }
        });
    });
}

/**
 * Tally form integration with UTM preservation and auto-resize
 */
function initializeTallyIntegration() {
    const tallyIframe = document.getElementById('tally-iframe');
    if (!tallyIframe) return;
    
    // Note: UTM parameter preservation removed as requested
    
    // Set initial iframe properties for better height adaptation
    tallyIframe.style.overflow = 'hidden';
    
    // Listen for iframe load to ensure proper sizing
    tallyIframe.addEventListener('load', function() {
        // Try to get the content height from the iframe
        try {
            const iframeDoc = tallyIframe.contentDocument || tallyIframe.contentWindow.document;
            if (iframeDoc && iframeDoc.body) {
                const contentHeight = Math.max(
                    iframeDoc.body.scrollHeight,
                    iframeDoc.body.offsetHeight,
                    iframeDoc.documentElement.clientHeight,
                    iframeDoc.documentElement.scrollHeight,
                    iframeDoc.documentElement.offsetHeight
                );
                if (contentHeight > 300) {
                    tallyIframe.style.height = Math.max(contentHeight, 600) + 'px';
                }
            }
        } catch (e) {
            // Cross-origin restrictions prevent direct access, rely on postMessage
            console.log('Using postMessage for iframe height adjustment');
        }
    });
    
    // Auto-resize iframe using postMessage
    window.addEventListener('message', function(e) {
        // Accept messages from Tally domain
        if (!e.origin.includes('tally.so')) return;
        
        // Handle different Tally message formats
        if (e.data && typeof e.data === 'object') {
            // Standard Tally resize message
            if (e.data.type === 'tally-resize' && e.data.height) {
                tallyIframe.style.height = Math.max(e.data.height, 600) + 'px';
            }
            // Alternative message format
            else if (e.data.height && typeof e.data.height === 'number') {
                tallyIframe.style.height = Math.max(e.data.height, 600) + 'px';
            }
        }
        // Handle direct height values
        else if (typeof e.data === 'number' && e.data > 200) {
            tallyIframe.style.height = Math.max(e.data, 600) + 'px';
        }
        
        // Track form submission
        if (e.data.type === 'tally-submit') {
            trackEvent('tally_submit', 'conversion', 'lead_form');
        }
    });
    
    // Track form view when it comes into viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('tally_view', 'engagement', 'form_view');
                

                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(tallyIframe);
}

/**
 * Analytics tracking functions
 */
function initializeAnalytics() {
    // Track scroll depth
    let scrollDepthTracked = false;
    
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage >= 50 && !scrollDepthTracked) {
            trackEvent('scroll_50', 'engagement', 'page_scroll');
            scrollDepthTracked = true;
        }
    });
    
    // Track outbound links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
            trackEvent('outbound_click', 'engagement', link.href);
        }
    });
}

/**
 * Track events for Meta Pixel
 * @param {string} action - Event action
 * @param {string} category - Event category
 * @param {string} label - Event label
 */
function trackEvent(action, category, label) {
    // Meta Pixel custom events
    if (typeof fbq !== 'undefined') {
        // Map common events to Meta Pixel standard events
        switch(action) {
            case 'page_view':
                fbq('track', 'PageView');
                break;
            case 'tally_view':
                fbq('track', 'ViewContent');
                break;
            case 'tally_submit':
                fbq('track', 'Lead');
                break;
            case 'cta_click':
                fbq('track', 'InitiateCheckout');
                break;
            default:
                fbq('trackCustom', action, {
                    category: category,
                    label: label
                });
        }
    }
    
    // Console log for debugging
    console.log('📊 Meta Pixel event tracked:', { action, category, label });
}



/**
 * Handle URL parameters for dynamic content
 */
function initializeURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Highlight target audience based on course parameter
    const courseParam = urlParams.get('course');
    if (courseParam) {
        highlightTargetAudience(courseParam);
    }
    
    // Auto-scroll to form for retargeting traffic
    const fromParam = urlParams.get('from');
    if (fromParam === 'retargeting') {
        setTimeout(() => {
            const formSection = document.getElementById('form-section');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                trackEvent('auto_scroll', 'retargeting', 'form_focus');
            }
        }, 500);
    }
}

/**
 * Highlight specific target audience card
 * @param {string} target - Target audience (adulti, bambini, over60)
 */
function highlightTargetAudience(target) {
    const targetCards = document.querySelectorAll('.target-card');
    
    targetCards.forEach(card => {
        const cardTarget = card.getAttribute('data-target');
        if (cardTarget === target) {
            card.classList.add('highlighted');
            
            // Scroll to target section
            setTimeout(() => {
                document.getElementById('target-section').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 1000);
            
            trackEvent('target_highlight', 'personalization', target);
        }
    });
}

/**
 * Cookie banner functionality
 */
function initializeCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    if (!banner || !acceptBtn) return;
    
    // Show banner if cookies not accepted
    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            banner.classList.remove('hidden');
            banner.classList.add('show');
        }, 2000);
    }
    
    // Accept cookies
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookies-accepted', 'true');
        banner.classList.remove('show');
        setTimeout(() => banner.classList.add('hidden'), 300);
        
        trackEvent('cookies_accepted', 'compliance', 'cookie_banner');
    });
}

/**
 * Utility function to get environment variables with fallback
 * @param {string} key - Environment variable key
 * @param {string} fallback - Fallback value
 */
function getEnvVar(key, fallback = '') {
    // In production, these would come from actual environment variables
    const envVars = {
        'FACEBOOK_PIXEL_ID': '1063589709210238', // Meta Pixel ID for Lido Azzurro
        'TALLY_EMBED_URL': 'https://tally.so/embed/w2G1J9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
    };
    
    return envVars[key] || fallback;
}

/**
 * Handle form errors and fallbacks
 */
function handleFormErrors() {
    const iframe = document.getElementById('tally-iframe');
    if (!iframe) return;
    
    iframe.addEventListener('error', function() {
        const fallbackMessage = document.createElement('div');
        fallbackMessage.className = 'text-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg';
        fallbackMessage.innerHTML = `
            <h3 class="text-lg font-bold text-yellow-800 mb-2">Problema nel caricamento del modulo</h3>
            <p class="text-yellow-700 mb-4">Se non vedi il form ricarica la pagina</p>
        `;
        
        iframe.parentNode.replaceChild(fallbackMessage, iframe);
        trackEvent('form_error', 'error', 'tally_load_failed');
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleFormErrors);

/**
 * Performance monitoring
 */
function monitorPerformance() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would integrate with web-vitals library if available
        // For now, just log basic performance metrics
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    trackEvent('performance', 'timing', 'page_load', Math.round(perfData.loadEventEnd));
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

/*
=== ACTIVATION INSTRUCTIONS ===

To activate tracking and complete the integration:

1. Google Analytics 4:
   - Replace 'GA_MEASUREMENT_ID' with your actual GA4 Measurement ID (G-XXXXXXXXXX)
   - Update the gtag script src in index.html
   - Verify events are appearing in GA4 Real-time reports

2. Meta Pixel:
   - Replace 'FACEBOOK_PIXEL_ID' with your actual Meta Pixel ID
   - Test pixel firing using Meta Pixel Helper browser extension
   - Verify events in Meta Events Manager

3. Google Ads:
   - Replace 'GOOGLE_ADS_ID' and 'CONVERSION_LABEL' with actual values
   - Set up conversion actions in Google Ads
   - Test conversion tracking

4. Tally Form:
   - Replace 'XXXXXXXX' in Tally embed URL with actual form ID
   - Configure form fields as specified in requirements
   - Set up webhook for form submissions if needed
   - Test auto-resize functionality

5. Contact Information:
   - Update WhatsApp number (393XXXXXXXXX) with real number
   - Add actual address and phone in footer
   - Update Google Maps embed with real coordinates

6. Content:
   - Replace placeholder images with actual pool/facility photos
   - Optimize images for web (<150KB each)
   - Add real testimonials and reviews
   - Update any placeholder text

7. Testing Checklist:
   □ All CTA buttons scroll to form section
   □ Countdown timer works correctly
   □ FAQ accordion functions properly
   □ Calendar modal opens and closes
   □ Form submits successfully
   □ UTM parameters are preserved
   □ Mobile responsive design works
   □ Analytics events fire correctly
   □ Performance meets Core Web Vitals standards

8. A/B Testing Opportunities:
   - Headline variations
   - CTA button text and colors
   - Social proof positioning
   - Form field order
   - Pricing presentation

9. Conversion Optimization:
   - Monitor form abandonment rates
   - Test different countdown timer placements
   - Optimize page load speed
   - Analyze scroll depth and engagement
   - Test mobile vs desktop conversion rates

For questions or support with activation, refer to platform documentation:
- Google Analytics: https://support.google.com/analytics
- Meta Pixel: https://www.facebook.com/business/help/742478679120153
- Google Ads: https://support.google.com/google-ads
- Tally: https://tally.so/help
*/
