# A/B Test: Hero CTA Button Test

## Test Overview

**Test Name:** `hero-cta-button-test`

**Objective:** Test different call-to-action button text and styling in the header to improve user engagement and click-through rates to the GitHub repository.

**Status:** Active

**Branch:** `ab-test/hero-cta-button-test`

---

## Test Variants

### Variant A: Control (Go to repository)
- **Text:** "Go to repository"
- **Description:** Current text with enhanced button styling
- **Color Scheme:** Primary theme color (indigo/blue)
- **Style:** Standard button with moderate emphasis
- **Purpose:** Baseline control to measure against other variants

### Variant B: Get Started
- **Text:** "Get Started"
- **Description:** Action-oriented text with prominent button styling
- **Color Scheme:** Accent color (purple) for high visibility
- **Style:** Bold, larger padding, more prominent
- **Purpose:** Test if action-oriented language increases engagement

### Variant C: Explore Framework
- **Text:** "Explore Framework"
- **Description:** Descriptive text with unique color scheme
- **Color Scheme:** Teal/turquoise for differentiation
- **Style:** Bold, distinctive color to stand out
- **Purpose:** Test if descriptive, framework-specific text resonates better

---

## Implementation Details

### Files Modified
- `g0.html` - Main HTML file with A/B test implementation

### Code Changes

#### 1. CSS Styling (Lines 612-691)
Added comprehensive button styles for all three variants:
- Base `.cta-button` class for common styling
- Variant-specific classes: `.cta-variant-a`, `.cta-variant-b`, `.cta-variant-c`
- Hover effects and transitions
- Responsive design considerations

#### 2. JavaScript Configuration (Lines 695-794)
Implemented A/B test logic:
- Random variant assignment
- LocalStorage persistence for consistent user experience
- URL parameter override for testing (`?ab_variant=variant-a`)
- Click tracking integration
- Analytics event dispatch

### Features

#### Variant Assignment
- Users are randomly assigned to one of three variants
- Assignment persists across sessions using localStorage
- Consistent experience for returning users

#### Testing Capabilities
- Force specific variant via URL: `?ab_variant=variant-a`, `variant-b`, or `variant-c`
- Reset test assignment: Call `window.resetABTest()` in browser console
- Console logging for debugging

#### Analytics Integration
- Google Analytics (gtag) support
- Custom event dispatch for other analytics platforms
- Tracks: test name, variant, and button text

---

## Testing Instructions

### Manual Testing

1. **Test Variant A (Control):**
   ```
   http://your-domain.com/?ab_variant=variant-a
   ```

2. **Test Variant B (Get Started):**
   ```
   http://your-domain.com/?ab_variant=variant-b
   ```

3. **Test Variant C (Explore Framework):**
   ```
   http://your-domain.com/?ab_variant=variant-c
   ```

### Reset Test Assignment
Open browser console and run:
```javascript
window.resetABTest()
```
Then reload the page to see a new random variant.

### Check Current Variant
Open browser console and run:
```javascript
console.log('Current variant:', window.AB_TEST_VARIANT);
console.log('Variant config:', window.AB_TEST_CONFIG);
```

---

## Analytics Tracking

### Events Tracked

#### 1. Variant Assignment
- Logged to console on page load
- Format: `[A/B Test] hero-cta-button-test: {variant} - {description}`

#### 2. Button Clicks
- **Google Analytics Event:**
  - Event Name: `ab_test_click`
  - Parameters:
    - `test_name`: "hero-cta-button-test"
    - `variant`: "variant-a", "variant-b", or "variant-c"
    - `button_text`: The displayed button text

- **Custom Event:**
  - Event Name: `ab_test_click`
  - Detail Object:
    ```javascript
    {
      testName: "hero-cta-button-test",
      variant: "variant-a|variant-b|variant-c",
      buttonText: "Go to repository|Get Started|Explore Framework"
    }
    ```

### Metrics to Track

**Primary Metric:**
- Click-Through Rate (CTR) on repository link

**Secondary Metrics:**
- Time on page before clicking
- Bounce rate
- Pages per session
- Return visitor rate

**Calculation:**
```
CTR = (Number of clicks on CTA button / Total page views) × 100
```

---

## Analytics Integration Guide

### For Google Analytics (GA4)

The implementation already includes gtag integration. Ensure GA4 is properly initialized:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

View results in GA4:
1. Go to Reports → Engagement → Events
2. Look for `ab_test_click` event
3. Filter by custom dimensions: `test_name`, `variant`, `button_text`

### For Other Analytics Platforms

Listen for custom events:

```javascript
document.addEventListener('ab_test_click', function(event) {
  var testData = event.detail;

  // Send to your analytics platform
  // Example for Segment:
  analytics.track('AB Test Click', {
    testName: testData.testName,
    variant: testData.variant,
    buttonText: testData.buttonText
  });
});
```

---

## Design Rationale

### Variant A (Control)
- Maintains familiar language ("Go to repository")
- Establishes baseline performance
- Minimal disruption to existing user experience

### Variant B (Get Started)
- Uses action-oriented, beginner-friendly language
- Higher visual prominence with accent color
- Hypothesis: More inviting for new users

### Variant C (Explore Framework)
- Descriptive, framework-specific language
- Unique teal color for visual distinction
- Hypothesis: Better conveys the purpose of the destination

---

## Success Criteria

### Primary Goal
Achieve a statistically significant increase in CTR compared to Variant A (control)

### Statistical Significance
- Minimum sample size: 1,000 page views per variant
- Confidence level: 95%
- Minimum detectable effect: 20% relative improvement

### Decision Matrix
- **Variant B or C shows >20% improvement:** Implement winning variant
- **No significant difference:** Keep current implementation (Variant A)
- **Multiple variants perform similarly:** Conduct follow-up testing

---

## Timeline

1. **Deployment:** Immediate (upon merge to main)
2. **Data Collection:** 2-4 weeks (minimum)
3. **Analysis:** End of collection period
4. **Decision:** Within 1 week of analysis
5. **Implementation:** Within 1 week of decision

---

## Rollback Plan

If issues are detected:

1. **Remove A/B Test Classes:**
   - Delete lines 612-691 (CSS)
   - Delete lines 695-794 (JavaScript)

2. **Restore Original Link:**
   - Keep existing `md-source` structure
   - Remove any variant-specific classes

3. **Or Revert Branch:**
   ```bash
   git checkout main
   ```

---

## Code Style & Best Practices

### ✅ Implemented Best Practices

1. **Clean, Well-Documented Code**
   - Inline comments explaining each section
   - Descriptive variable names
   - Clear function purposes

2. **Follows Existing Code Style**
   - Uses existing CSS variable conventions
   - Maintains consistent indentation
   - Follows Material Design theme patterns

3. **Feature Flags**
   - URL parameter override for testing
   - LocalStorage for persistence
   - Easy reset functionality

4. **Analytics Ready**
   - Multiple analytics platform support
   - Comprehensive event tracking
   - Console logging for debugging

5. **Non-Breaking Changes**
   - Graceful degradation
   - Doesn't affect existing functionality
   - Easy to remove if needed

---

## Notes

- The test affects both desktop and mobile views
- All variants maintain the same link destination
- No server-side changes required
- Compatible with existing Material for MkDocs theme
- LocalStorage is used for variant persistence (cleared if user clears browser data)

---

## Questions or Issues?

For questions about this A/B test implementation:
1. Check browser console for debug logs
2. Verify variant assignment with `window.AB_TEST_VARIANT`
3. Test different variants using URL parameters
4. Review analytics events in your platform

---

## Next Steps

1. ✅ Deploy to production
2. ⏳ Monitor analytics data
3. ⏳ Collect minimum sample size
4. ⏳ Perform statistical analysis
5. ⏳ Make implementation decision
6. ⏳ Document results and learnings
