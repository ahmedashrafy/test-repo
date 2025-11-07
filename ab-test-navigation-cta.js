/**
 * A/B Test Implementation: navigation-cta-button
 *
 * This script handles user segmentation, variant assignment, tracking,
 * and analytics for the navigation CTA button A/B test.
 *
 * @author A/B Testing Team
 * @version 1.0.0
 * @date 2025-11-07
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    testName: 'navigation-cta-button',
    testId: 'ab-test-nav-cta-001',
    variants: {
      CONTROL: 'control',
      TREATMENT: 'treatment'
    },
    // What percentage of users should see treatment (0-100)
    treatmentPercentage: 50,
    // Local storage key for persisting user assignment
    storageKey: 'ab-test-navigation-cta-button',
    // GitHub repository details for tracking
    githubRepo: 'crosschainriskframework/crosschainriskframework.github.io',
    // Tracking attributes
    trackingAttributes: {
      button: 'contribute-cta-click',
      location: 'header-navigation'
    }
  };

  /**
   * ABTest Class
   * Manages the A/B test lifecycle including assignment, display, and tracking
   */
  class ABTest {
    constructor(config) {
      this.config = config;
      this.userVariant = null;
      this.sessionId = this.generateSessionId();
      this.init();
    }

    /**
     * Initialize the A/B test
     */
    init() {
      // Get or assign user to a variant
      this.userVariant = this.getUserVariant();

      // Apply the variant (show/hide elements)
      this.applyVariant();

      // Set up tracking
      this.setupTracking();

      // Track impression
      this.trackImpression();

      // Log for debugging
      this.logTestInfo();
    }

    /**
     * Get or assign user to a variant group
     * @returns {string} The variant assigned to the user
     */
    getUserVariant() {
      // Check if user already has an assignment
      const storedVariant = localStorage.getItem(this.config.storageKey);

      if (storedVariant && this.isValidVariant(storedVariant)) {
        return storedVariant;
      }

      // Assign new variant
      const variant = this.assignVariant();

      // Persist the assignment
      localStorage.setItem(this.config.storageKey, variant);

      // Also set a session cookie for server-side tracking if needed
      this.setVariantCookie(variant);

      return variant;
    }

    /**
     * Assign user to a variant based on random distribution
     * @returns {string} The assigned variant
     */
    assignVariant() {
      const random = Math.random() * 100;
      return random < this.config.treatmentPercentage
        ? this.config.variants.TREATMENT
        : this.config.variants.CONTROL;
    }

    /**
     * Check if a variant name is valid
     * @param {string} variant - The variant to validate
     * @returns {boolean} True if valid
     */
    isValidVariant(variant) {
      return Object.values(this.config.variants).includes(variant);
    }

    /**
     * Apply the assigned variant to the page
     */
    applyVariant() {
      const elements = document.querySelectorAll('[data-ab-test="navigation-cta-button"]');

      elements.forEach(element => {
        const elementVariant = element.getAttribute('data-ab-variant');

        if (this.userVariant === this.config.variants.CONTROL &&
            elementVariant === this.config.variants.TREATMENT) {
          // Hide treatment elements for control group
          element.style.display = 'none';
          element.setAttribute('data-variant-active', 'false');
        } else {
          // Ensure treatment elements are visible for treatment group
          element.setAttribute('data-variant-active', 'true');
        }
      });

      // Add body class for CSS targeting if needed
      document.body.classList.add(`ab-test-${this.userVariant}`);
    }

    /**
     * Set up event tracking for the test
     */
    setupTracking() {
      // Track CTA button clicks
      this.trackButtonClicks();

      // Track GitHub engagement (if API available)
      this.trackGitHubEngagement();

      // Track page engagement
      this.trackPageEngagement();
    }

    /**
     * Track clicks on the CTA button
     */
    trackButtonClicks() {
      const buttons = document.querySelectorAll(
        `[data-tracking="${this.config.trackingAttributes.button}"]`
      );

      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          this.trackEvent('cta_button_click', {
            button_text: button.textContent.trim(),
            button_href: button.getAttribute('href'),
            variant: this.userVariant,
            location: button.getAttribute('data-tracking-location'),
            timestamp: new Date().toISOString(),
            session_id: this.sessionId
          });
        });
      });
    }

    /**
     * Track impression (user saw the page with this test)
     */
    trackImpression() {
      this.trackEvent('test_impression', {
        variant: this.userVariant,
        test_name: this.config.testName,
        timestamp: new Date().toISOString(),
        session_id: this.sessionId,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight
      });
    }

    /**
     * Track GitHub engagement (stars, forks)
     * Note: This requires GitHub API access or backend integration
     */
    trackGitHubEngagement() {
      // This is a placeholder for GitHub engagement tracking
      // In production, you would integrate with GitHub API or your backend

      // Example: Check if user has starred the repo
      if (window.octokit) {
        // If you have GitHub API client available
        this.checkGitHubStar();
      }
    }

    /**
     * Track general page engagement metrics
     */
    trackPageEngagement() {
      let engagementTime = 0;
      const trackingInterval = setInterval(() => {
        engagementTime += 1;
      }, 1000);

      // Track when user leaves
      window.addEventListener('beforeunload', () => {
        clearInterval(trackingInterval);
        this.trackEvent('page_engagement', {
          variant: this.userVariant,
          time_on_page: engagementTime,
          session_id: this.sessionId
        });
      });

      // Track scroll depth
      this.trackScrollDepth();
    }

    /**
     * Track how far user scrolls on the page
     */
    trackScrollDepth() {
      let maxScroll = 0;

      window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercent > maxScroll) {
          maxScroll = Math.floor(scrollPercent);

          // Track at 25%, 50%, 75%, 100% milestones
          if ([25, 50, 75, 100].includes(maxScroll)) {
            this.trackEvent('scroll_depth', {
              variant: this.userVariant,
              depth: maxScroll,
              session_id: this.sessionId
            });
          }
        }
      });
    }

    /**
     * Generic event tracking function
     * Integrate with your analytics platform here
     * @param {string} eventName - Name of the event
     * @param {Object} properties - Event properties
     */
    trackEvent(eventName, properties = {}) {
      const eventData = {
        event: eventName,
        test_id: this.config.testId,
        test_name: this.config.testName,
        ...properties
      };

      // Console log for debugging
      console.log('[AB Test Event]', eventData);

      // Send to analytics platforms
      // Google Analytics (gtag)
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
      }

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
          event_category: 'ab_test',
          event_label: this.config.testName,
          ...properties
        });
      }

      // Segment
      if (typeof analytics !== 'undefined') {
        analytics.track(eventName, eventData);
      }

      // Mixpanel
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track(eventName, eventData);
      }

      // Amplitude
      if (typeof amplitude !== 'undefined') {
        amplitude.getInstance().logEvent(eventName, eventData);
      }

      // Custom analytics endpoint
      this.sendToAnalyticsEndpoint(eventData);
    }

    /**
     * Send event data to custom analytics endpoint
     * @param {Object} eventData - The event data to send
     */
    sendToAnalyticsEndpoint(eventData) {
      // Replace with your actual analytics endpoint
      const ANALYTICS_ENDPOINT = '/api/analytics/track';

      // Use sendBeacon for reliability (works even when page is closing)
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify(eventData)],
          { type: 'application/json' }
        );
        navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
      } else {
        // Fallback to fetch
        fetch(ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
          keepalive: true
        }).catch(err => console.error('Analytics error:', err));
      }
    }

    /**
     * Set a cookie for the variant assignment
     * @param {string} variant - The variant to store
     */
    setVariantCookie(variant) {
      const expiryDays = 30;
      const date = new Date();
      date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${this.config.storageKey}=${variant};${expires};path=/;SameSite=Lax`;
    }

    /**
     * Generate a unique session ID
     * @returns {string} Session ID
     */
    generateSessionId() {
      return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Log test information for debugging
     */
    logTestInfo() {
      if (window.location.search.includes('debug=true')) {
        console.group('🧪 A/B Test Info');
        console.log('Test Name:', this.config.testName);
        console.log('Test ID:', this.config.testId);
        console.log('User Variant:', this.userVariant);
        console.log('Session ID:', this.sessionId);
        console.log('Treatment %:', this.config.treatmentPercentage);
        console.groupEnd();
      }
    }

    /**
     * Public method to get current variant
     * @returns {string} Current user variant
     */
    getVariant() {
      return this.userVariant;
    }

    /**
     * Force a variant (for testing purposes)
     * @param {string} variant - Variant to force
     */
    forceVariant(variant) {
      if (this.isValidVariant(variant)) {
        localStorage.setItem(this.config.storageKey, variant);
        window.location.reload();
      } else {
        console.error('Invalid variant:', variant);
      }
    }

    /**
     * Check GitHub star status (requires GitHub API access)
     */
    async checkGitHubStar() {
      try {
        // This would require GitHub API integration
        // Placeholder for actual implementation
        const hasStarred = false; // await checkIfUserStarredRepo();

        this.trackEvent('github_star_status', {
          variant: this.userVariant,
          has_starred: hasStarred,
          session_id: this.sessionId
        });
      } catch (error) {
        console.error('Error checking GitHub star status:', error);
      }
    }
  }

  // Initialize the A/B test when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.navigationCTATest = new ABTest(CONFIG);
    });
  } else {
    window.navigationCTATest = new ABTest(CONFIG);
  }

  // Expose utility methods for debugging/testing
  window.ABTestUtils = {
    forceControl: () => window.navigationCTATest.forceVariant('control'),
    forceTreatment: () => window.navigationCTATest.forceVariant('treatment'),
    getVariant: () => window.navigationCTATest.getVariant(),
    reset: () => {
      localStorage.removeItem(CONFIG.storageKey);
      window.location.reload();
    }
  };

  // Log helper instructions for developers
  console.log('%c🧪 A/B Test Active: navigation-cta-button', 'font-weight: bold; color: #4051b5;');
  console.log('Debug commands available:');
  console.log('  ABTestUtils.forceControl()    - Force control variant');
  console.log('  ABTestUtils.forceTreatment()  - Force treatment variant');
  console.log('  ABTestUtils.getVariant()      - Get current variant');
  console.log('  ABTestUtils.reset()           - Reset test assignment');
  console.log('Add ?debug=true to URL for detailed logging');

})();
