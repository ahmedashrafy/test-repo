# A/B Test: Header CTA Visibility

## Overview

This A/B test evaluates the impact of adding a prominent call-to-action (CTA) button in the header navigation to increase user engagement with the Crosschain Risk Framework documentation.

**Test Name:** `header-cta-visibility`

**Hypothesis:** Adding a visible "Assess Your Protocol" CTA button in the header will increase user engagement as measured by click-through rates, time on page, and scroll depth.

## Variants

### Variant A (Control)
- Default header with standard navigation and search functionality
- No CTA button visible
- Baseline measurement for comparison

### Variant B (Treatment)
- Header includes all standard elements from Variant A
- Additional "Assess Your Protocol" CTA button displayed after the search component
- Button styled with accent color (`--md-accent-fg-color`) for prominence
- CTA button hidden on mobile devices (< 76.234375em) to maintain clean mobile experience

## Implementation Details

### Files Modified
- `g0.html` - Main HTML file with header modifications

### Changes Made

#### 1. HTML Structure (Lines 690-695)
```html
<!-- A/B Test: Header CTA Visibility (Variant B) -->
<div class="md-header__cta" id="header-cta-test" style="display: none;">
  <a class="md-header__cta-button" href="#assess-protocol" data-ab-test="header-cta" data-variant="B">
    Assess Your Protocol
  </a>
</div>
```

**Key Features:**
- CTA container initially hidden with `display: none`
- Semantic HTML with clear data attributes for tracking
- Link href set to `#assess-protocol` (update to actual destination URL)
- Accessible and keyboard navigable

#### 2. CSS Styles (Lines 612-650)
```css
/* A/B Test: Header CTA Button Styles */
.md-header__cta {
  display: flex;
  align-items: center;
  margin-left: 0.8rem;
  flex-shrink: 0;
}

.md-header__cta-button {
  background-color: var(--md-accent-fg-color);
  color: var(--md-accent-bg-color);
  padding: 0.4rem 1rem;
  border-radius: 0.2rem;
  font-size: 0.7rem;
  font-weight: 700;
  /* ... additional styles ... */
}
```

**Design Principles:**
- Uses existing CSS variables for consistency with site theme
- Smooth transitions for hover and active states
- Box shadow for visual depth and prominence
- Responsive design with mobile breakpoint

#### 3. JavaScript A/B Test Logic (Lines 1036-1250)

**Core Functionality:**

##### Variant Assignment
- 50/50 split between variants A and B
- Cookie-based persistence (30-day expiry)
- Consistent experience across page loads
- Secure cookie with SameSite=Strict

##### Analytics Tracking

The implementation tracks multiple engagement metrics:

**1. Page Views**
```javascript
trackEvent('ab_test_page_view', {
  variant: variant,
  page_url: window.location.href,
  page_title: document.title
});
```

**2. CTA Clicks** (Variant B only)
```javascript
trackEvent('ab_test_cta_click', {
  variant: variant,
  cta_text: target.textContent.trim(),
  cta_href: target.getAttribute('href')
});
```

**3. Navigation Clicks** (Both variants)
```javascript
trackEvent('ab_test_nav_click', {
  variant: variant,
  link_text: target.textContent.trim(),
  link_href: target.getAttribute('href')
});
```

**4. Scroll Depth** (Both variants)
- Tracks milestones: 25%, 50%, 75%, 90%, 100%
- Non-intrusive passive event listener
- Records maximum scroll depth achieved

**5. Session Metrics** (Both variants)
- Time on page (calculated on page unload)
- Maximum scroll depth
- Session end tracking

## Configuration

### Test Parameters

The test configuration can be adjusted in the JavaScript:

```javascript
const AB_TEST_CONFIG = {
  testName: 'header-cta-visibility',
  variants: ['A', 'B'],
  splitRatio: 0.5,              // 50/50 split (adjust between 0-1)
  cookieName: 'ab_test_header_cta',
  cookieExpiry: 30              // Cookie lifetime in days
};
```

### Adjustable Settings

1. **Split Ratio** (`splitRatio`):
   - Default: 0.5 (50/50 split)
   - Range: 0.0 - 1.0
   - Example: 0.7 = 70% variant A, 30% variant B

2. **Cookie Expiry** (`cookieExpiry`):
   - Default: 30 days
   - Determines how long users remain in assigned variant

3. **CTA Button Text**:
   - Current: "Assess Your Protocol"
   - Modify in HTML (line 692)

4. **CTA Button Destination**:
   - Current: "#assess-protocol" (placeholder)
   - Update href to actual destination page/section

## Analytics Integration

The implementation includes integration points for multiple analytics platforms:

### Google Analytics (gtag.js)
```javascript
if (typeof gtag === 'function') {
  gtag('event', eventName, {
    event_category: 'AB_Test',
    event_label: AB_TEST_CONFIG.testName,
    variant: eventData.variant,
    ...eventData
  });
}
```

### Custom Analytics Endpoint
```javascript
fetch('/api/analytics/ab-test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(event)
});
```

### Console Logging
All events are logged to browser console for debugging:
```javascript
console.log('[A/B Test Analytics]', event);
```

## Metrics to Monitor

### Primary Metrics
1. **CTA Click-Through Rate (CTR)** - Variant B only
   - Formula: (CTA clicks / Page views) × 100
   - Target: Establish baseline and track improvement

2. **Navigation Engagement**
   - Compare navigation click rates between variants
   - Measure if CTA enhances or distracts from navigation

### Secondary Metrics
1. **Time on Page**
   - Compare average session duration
   - Indicates content engagement level

2. **Scroll Depth**
   - Track how far users scroll
   - Higher scroll = deeper content engagement

3. **Bounce Rate**
   - Monitor if CTA reduces immediate exits

## Testing Guidelines

### Pre-Launch Checklist
- [ ] Update CTA button href to actual destination URL
- [ ] Configure analytics tracking endpoint
- [ ] Test both variants in browser (clear cookies between tests)
- [ ] Verify mobile responsiveness (CTA should hide < 76.234375em)
- [ ] Confirm analytics events fire correctly
- [ ] Check browser console for errors

### Manual Testing

**To test Variant A (Control):**
1. Open browser DevTools
2. Clear cookies for the site
3. Set cookie manually: `document.cookie = "ab_test_header_cta=A; path=/; max-age=2592000"`
4. Refresh page
5. Verify no CTA button is visible

**To test Variant B (Treatment):**
1. Open browser DevTools
2. Clear cookies for the site
3. Set cookie manually: `document.cookie = "ab_test_header_cta=B; path=/; max-age=2592000"`
4. Refresh page
5. Verify CTA button is visible in header
6. Test button click and verify tracking

**Check Variant Assignment:**
```javascript
// In browser console
document.body.getAttribute('data-ab-test-variant')
```

### Debugging

Enable detailed logging:
1. Open browser DevTools Console
2. Look for `[A/B Test]` prefix in logs
3. View initialization: `[A/B Test] Initialized:`
4. Monitor events: `[A/B Test Analytics]`

## Running the Test

### Minimum Sample Size
- Calculate required sample size based on expected effect size
- Recommended: Minimum 100 conversions per variant
- Use statistical significance calculator (α = 0.05, power = 0.8)

### Test Duration
- Run for at least 1-2 full business cycles (2-4 weeks recommended)
- Account for day-of-week and time-of-day variations
- Don't stop test early based on intermediate results

### Statistical Analysis
- Use two-proportion z-test for CTR comparison
- Calculate confidence intervals (95% recommended)
- Check for statistical significance (p < 0.05)
- Monitor for novelty effect (first week may have inflated metrics)

## Success Criteria

The test will be considered successful if Variant B shows:
1. **Statistically significant** increase in CTA clicks
2. **No significant decrease** in navigation engagement
3. **Positive or neutral impact** on time on page and scroll depth
4. **No increase** in bounce rate

## Rollout Plan

### If Variant B Wins:
1. Remove A/B test code
2. Make CTA button permanent in header
3. Remove cookie-based variant assignment
4. Keep analytics tracking for ongoing monitoring
5. Consider additional CTA optimizations (copy, color, placement)

### If Variant A Wins (or Inconclusive):
1. Analyze why CTA didn't improve metrics
2. Consider alternative CTA placements (sidebar, inline, footer)
3. Test different CTA copy or design
4. Remove test code and revert to control

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript (const, arrow functions, spread operator)
- Cookie support required
- Fetch API with fallback error handling

## Performance Considerations

- Minimal JavaScript overhead (<5KB)
- Passive event listeners for scroll tracking
- Cookie-based (no localStorage or IndexedDB)
- No external dependencies
- Lazy initialization (runs after DOM ready)

## Privacy & GDPR Compliance

**Cookie Usage:**
- First-party cookie only (`ab_test_header_cta`)
- 30-day expiry with SameSite=Strict
- No personal data collected
- No cross-site tracking

**Analytics Data:**
- Anonymous user tracking
- No PII (Personally Identifiable Information)
- Consider adding cookie consent banner if required by jurisdiction
- Update privacy policy to mention A/B testing cookies

## Maintenance

### Regular Monitoring
- Check analytics dashboard weekly
- Monitor for JavaScript errors in production
- Verify cookie assignment distribution (should be ~50/50)
- Track conversion rates and engagement metrics

### Code Updates
When updating the header structure:
1. Ensure CTA button placement remains after search component
2. Test both variants after any header changes
3. Verify mobile responsiveness maintained
4. Check analytics tracking still functions

## Support & Questions

For questions or issues with this A/B test implementation:
1. Check browser console for error messages
2. Verify analytics integration is working
3. Review this documentation for configuration options
4. Test variant assignment manually using DevTools

## Changelog

### Version 1.0.0 (Initial Implementation)
- Added CTA button in header (Variant B)
- Implemented 50/50 A/B test split
- Added comprehensive analytics tracking:
  - Page views
  - CTA clicks
  - Navigation clicks
  - Scroll depth (25%, 50%, 75%, 90%, 100%)
  - Time on page
- Responsive design (hides CTA on mobile)
- Cookie-based variant persistence (30 days)
- Google Analytics integration
- Custom analytics endpoint support
- Console logging for debugging

## Future Enhancements

Potential improvements for future iterations:
1. **Multi-variant testing** - Test different CTA copy or colors
2. **Personalization** - Show different CTAs based on user behavior
3. **A/A testing** - Validate tracking accuracy
4. **Server-side rendering** - Reduce layout shift by rendering variant server-side
5. **Advanced targeting** - Segment by traffic source, geography, or returning vs. new users
6. **Automated analysis** - Integration with statistical analysis tools
7. **Heatmap integration** - Visual representation of clicks and engagement

---

**Last Updated:** 2025-11-07
**Test Status:** Ready for Deployment
**Owner:** Development Team
