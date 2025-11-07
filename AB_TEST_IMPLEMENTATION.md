# A/B Test Implementation: Hero CTA Placement

## Test Overview

**Test Name:** hero-cta-placement
**Test Type:** CTA Button Placement
**Implementation Date:** 2025-11-07
**Status:** Active

## Test Description

This A/B test evaluates the effectiveness of CTA (Call-to-Action) button placement on the homepage to determine which position yields higher user engagement and conversion rates for accessing deeper documentation sections.

### Hypothesis
Early placement of the "Get Started" CTA button (immediately after the introduction paragraph) will increase user engagement and click-through rates compared to placing it after the "Types of Crosschain Interaction" section.

## Variants

### Variant A: Early CTA Placement
- **Location:** After the introduction paragraph (line ~804)
- **Rationale:** Captures user attention while interest is high, immediately after the problem statement
- **Expected Outcome:** Higher initial engagement, potentially lower quality leads

### Variant B: Late CTA Placement
- **Location:** After the "General-purpose Messaging" section (line ~838)
- **Rationale:** Allows users to gain more context before being prompted to act
- **Expected Outcome:** More informed users, potentially higher quality engagement

## Technical Implementation

### 1. HTML Structure

Two CTA button containers were added to `g0.html`:

```html
<!-- Variant A: After introduction (line ~804) -->
<div id="cta-variant-a" class="cta-container" style="display: none;">
  <a href="#categories-of-risk" class="cta-button" data-cta-variant="a" onclick="trackCTAClick('variant-a')">
    Get Started
  </a>
</div>

<!-- Variant B: After General-purpose Messaging (line ~838) -->
<div id="cta-variant-b" class="cta-container" style="display: none;">
  <a href="#categories-of-risk" class="cta-button" data-cta-variant="b" onclick="trackCTAClick('variant-b')">
    Get Started
  </a>
</div>
```

### 2. CSS Styling

Professional button styles matching the existing Material Design theme:

- Primary brand colors from CSS variables
- Hover effects with elevation changes
- Focus states for accessibility
- Responsive design for mobile devices
- Smooth transitions and animations

### 3. JavaScript Logic

**Variant Assignment:**
- 50/50 random split for new users
- Persistent assignment via cookies (30-day duration)
- Query parameter override for testing (`?variant=a` or `?variant=b`)

**Analytics Tracking:**
- Variant impression tracking on page load
- CTA click tracking with variant identification
- Extensible analytics integration (GA4, Universal Analytics, custom endpoints)

## Testing the Implementation

### Manual Testing

1. **Test Variant A:**
   ```
   Open: g0.html?variant=a
   Expected: CTA button appears after introduction paragraph
   ```

2. **Test Variant B:**
   ```
   Open: g0.html?variant=b
   Expected: CTA button appears after Types of Crosschain Interaction section
   ```

3. **Test Random Assignment:**
   ```
   Open: g0.html (no parameters)
   Clear cookies and refresh multiple times
   Expected: Random assignment to either variant
   ```

4. **Test Cookie Persistence:**
   ```
   Open page, note variant, refresh page
   Expected: Same variant displayed
   ```

### Browser Console Testing

Open browser console to verify:
```javascript
// Check analytics events are being logged
// Should see "Analytics Event: ab_test_impression"
// Should see "Analytics Event: cta_click" when clicking CTA

// Check cookie is set
document.cookie
// Should contain: ab_test_hero_cta=a or ab_test_hero_cta=b
```

## Analytics Integration

### Current Implementation
The test currently logs events to the browser console for verification.

### Integration Steps

#### For Google Analytics 4 (GA4):
Uncomment lines 1044-1046 in the JavaScript:
```javascript
if (typeof gtag !== 'undefined') {
  gtag('event', eventName, eventData);
}
```

#### For Universal Analytics:
Uncomment lines 1049-1051 in the JavaScript:
```javascript
if (typeof ga !== 'undefined') {
  ga('send', 'event', eventData.category, eventData.action, eventData.label);
}
```

#### For Custom Analytics:
Uncomment and configure lines 1054-1058:
```javascript
fetch('/api/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ event: eventName, data: eventData })
});
```

## Key Metrics to Track

### Primary Metrics
1. **Click-Through Rate (CTR)**: Percentage of users who click the CTA button
2. **Time to Click**: Average time from page load to CTA click
3. **Scroll Depth**: How far users scroll before seeing/clicking CTA

### Secondary Metrics
1. **Bounce Rate**: Users who leave without interaction
2. **Page Engagement Time**: Total time spent on page
3. **Downstream Actions**: Users who proceed to "Categories of Risk" section

## Sample Size Calculation

For statistically significant results:
- **Minimum visitors per variant:** 385 (assuming 5% baseline CTR, 95% confidence, 80% power)
- **Recommended test duration:** 2-4 weeks
- **Minimum conversions needed:** ~50 per variant

## Configuration

### Cookie Settings
- **Cookie Name:** `ab_test_hero_cta`
- **Duration:** 30 days
- **Values:** `a` or `b`

### Test Parameters
- **Variant Split:** 50/50
- **Override Parameter:** `?variant=a` or `?variant=b`

## Code Quality & Best Practices

✅ **Clean Implementation:**
- Well-commented code with clear documentation
- Follows existing code style and conventions
- Minimal impact on page load performance

✅ **Accessibility:**
- Proper focus states for keyboard navigation
- Semantic HTML structure
- ARIA-compatible implementation

✅ **Analytics:**
- Event tracking for impressions and clicks
- Variant identification in all events
- Extensible for multiple analytics platforms

✅ **Maintainability:**
- Clear naming conventions
- Modular JavaScript functions
- Easy to enable/disable or remove

## Rollout Plan

1. **Testing Phase** (1-3 days)
   - Verify implementation with manual testing
   - Confirm analytics tracking works correctly
   - Test on multiple browsers and devices

2. **Soft Launch** (1 week)
   - Release to 10% of traffic
   - Monitor for errors or issues
   - Validate data collection

3. **Full Launch** (2-4 weeks)
   - Release to 100% of traffic
   - Collect statistically significant data
   - Monitor key metrics daily

4. **Analysis & Decision**
   - Analyze results with statistical significance
   - Declare winning variant or iterate
   - Implement permanent solution

## Removal or Permanent Implementation

### To Remove Test:
1. Delete both CTA container divs from HTML
2. Remove JavaScript section (lines 1003-1115)
3. Remove CSS styles (lines 612-661)

### To Make Permanent (Winning Variant):
1. Keep only the winning variant's CTA div
2. Remove `style="display: none;"` from the div
3. Remove A/B test JavaScript entirely
4. Keep the CSS styles
5. Update analytics tracking if desired

## Support & Questions

For questions or issues with this implementation, refer to:
- This documentation file
- Inline code comments in g0.html
- Analytics platform documentation for integration

---

**Implementation Checklist:**
- [x] HTML structure for both variants
- [x] CSS styling for CTA button
- [x] JavaScript for variant assignment
- [x] Cookie persistence logic
- [x] Query parameter override
- [x] Analytics event tracking
- [x] Click tracking functionality
- [x] Documentation

**Test Status:** ✅ Ready for deployment
