# A/B Test: Search Prominence Test

## Overview

**Test Name:** `search-prominence-test`
**File Modified:** `g0.html`
**Status:** Active
**Created:** 2025-11-07

## Objective

Test the impact of making the search functionality more prominent by changing its visual style and placement. The hypothesis is that a more visually prominent search feature will:
- Increase search usage rate
- Reduce time-to-find-content
- Potentially reduce bounce rate by helping users find information faster

## Test Variants

### Variant A (Control)
- Uses the existing default search styling
- Subtle appearance in header
- Standard Material Design theme colors
- Default width and font size

### Variant B (Prominent Search)
- **Increased width:** Search box width increased from 11.7rem to 14rem (desktop)
- **Contrasting background:** Light blue (#e3f2fd) instead of translucent
- **Box shadow:** Subtle shadow (0 2px 4px rgba(0,0,0,0.1)) for depth
- **Larger font:** Increased from 0.8rem to 1rem
- **Hover state:** Lighter blue (#bbdefb) on hover
- **Expanded width:** When active, expands to 36rem instead of 34.4rem

## Implementation Details

### CSS Changes
The CSS is applied conditionally based on a `data-ab-search-prominence` attribute on the `<body>` element:

```css
/* Variant B styling */
body[data-ab-search-prominence="variant-b"] .md-search__input {
  font-size: 1rem !important;
  background-color: #e3f2fd !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
}
```

### JavaScript Logic

1. **Variant Assignment:**
   - Random 50/50 split between variants
   - Assignment stored in `localStorage` for session persistence
   - Key: `ab_test_search-prominence-test`

2. **Tracking Events:**
   - `ab_test_assigned`: When a user is first assigned to a variant
   - `search_opened`: When search is activated
   - `search_query_entered`: When user types a search query
   - `search_result_clicked`: When user clicks on a search result (time-to-find metric)
   - `page_exit`: When user leaves the page (engagement time and bounce rate)

3. **Data Storage:**
   - Events stored in `localStorage` under key `ab_test_events`
   - Last 100 events kept for local debugging
   - Console logging enabled for development

### Metrics Tracked

#### Primary Metrics

1. **Search Usage Rate**
   - Event: `search_opened`
   - Calculation: (Number of sessions with search_opened) / (Total sessions)

2. **Time-to-Find Content**
   - Event: `search_result_clicked`
   - Field: `time_to_find` (milliseconds from search open to result click)
   - Calculation: Average time_to_find across all search sessions

3. **Bounce Rate**
   - Event: `page_exit`
   - Field: `bounced` (boolean)
   - Calculation: (Number of bounced sessions) / (Total sessions)
   - Definition: Bounce = engagement time < 5 seconds

#### Secondary Metrics

- `time_to_type`: Time from opening search to entering first query
- `query_length`: Character count of search query
- `engagement_time`: Total active time on page (seconds)

## Integration with Analytics

The tracking function `trackEvent()` is designed to integrate with your analytics platform. Uncomment and configure one of the following:

### Google Analytics 4
```javascript
function trackEvent(eventName, data) {
  gtag('event', eventName, data);
}
```

### Google Analytics Universal
```javascript
function trackEvent(eventName, data) {
  ga('send', 'event', 'AB Test', eventName, data.variant);
}
```

### Mixpanel
```javascript
function trackEvent(eventName, data) {
  mixpanel.track(eventName, data);
}
```

### Custom Endpoint
```javascript
function trackEvent(eventName, data) {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventName, data: data })
  });
}
```

## Accessing Test Data

### In Browser Console

```javascript
// Get current variant
window.abTest.getVariant();  // Returns 'variant-a' or 'variant-b'

// Get test name
window.abTest.getTestName();  // Returns 'search-prominence-test'

// Track custom event
window.abTest.trackEvent('custom_event', { custom: 'data' });

// View stored events
JSON.parse(localStorage.getItem('ab_test_events'));

// Check current variant assignment
localStorage.getItem('ab_test_search-prominence-test');
```

### Force Specific Variant (Testing)

```javascript
// Force variant A
localStorage.setItem('ab_test_search-prominence-test', 'variant-a');
location.reload();

// Force variant B
localStorage.setItem('ab_test_search-prominence-test', 'variant-b');
location.reload();
```

## Analysis Guidelines

### Sample Size Calculation
For a 95% confidence level and 80% power:
- Minimum sample size: ~1,000 users per variant
- Recommended: 2,000-5,000 users per variant

### Statistical Significance
Use a chi-square test or t-test depending on metric:
- **Proportions** (search usage rate, bounce rate): Chi-square test
- **Continuous** (time-to-find): Two-sample t-test

### Success Criteria
Consider the test successful if Variant B shows:
1. **Increased search usage rate** by at least 10% (statistically significant)
2. **Reduced time-to-find content** by at least 15% (statistically significant)
3. **No significant increase** in bounce rate (or ideally, a decrease)

## Code Style & Quality

### Clean Code Practices
- ✅ Clear, descriptive variable names
- ✅ Comprehensive inline comments
- ✅ Modular function design
- ✅ ES5 syntax for broad browser compatibility
- ✅ Defensive error handling

### Performance Considerations
- Minimal DOM manipulation (single attribute set)
- Debounced search input tracking (500ms)
- Event delegation for search results
- Efficient localStorage usage with size limit

### Browser Compatibility
- Uses `localStorage` (IE8+)
- Vanilla JavaScript (no dependencies)
- CSS with `!important` for specificity
- Fallback console logging

## Testing Checklist

- [ ] Open page in browser and check console for variant assignment
- [ ] Verify correct styling applied based on variant
- [ ] Test search functionality works in both variants
- [ ] Check localStorage for stored variant
- [ ] Verify events are tracked when interacting with search
- [ ] Test variant persistence across page reloads
- [ ] Force both variants and visually compare
- [ ] Test on mobile and desktop viewports
- [ ] Verify no JavaScript errors in console
- [ ] Check that existing functionality is not broken

## Rollout Plan

### Phase 1: Soft Launch (Week 1)
- Deploy to 10% of traffic
- Monitor for errors and unexpected behavior
- Review initial metrics daily

### Phase 2: Full Test (Weeks 2-4)
- Deploy to 100% of new users
- Collect data for 3-4 weeks
- Minimum 2,000 users per variant

### Phase 3: Analysis & Decision (Week 5)
- Analyze results for statistical significance
- Compare against success criteria
- Make decision: adopt Variant B, keep Variant A, or iterate

### Phase 4: Rollout (Week 6+)
- If Variant B wins: Make permanent and remove test code
- If Variant A wins: Remove test code, keep current styling
- Document learnings for future tests

## Maintenance

### Removing the Test
When the test concludes, remove the following from `g0.html`:

1. CSS block (lines 612-647)
2. JavaScript block (lines 650-824)
3. This documentation file

### Permanent Implementation
If Variant B wins, integrate the CSS directly into the minified stylesheet and remove the data attribute conditionals.

## Notes

- Test does not affect SEO (client-side only)
- Does not require server-side changes
- No PII (Personally Identifiable Information) collected
- Compliant with GDPR (uses functional localStorage only)
- Test data stored locally in user's browser

## Support

For questions or issues with this A/B test implementation:
1. Check browser console for error messages
2. Verify localStorage is enabled in the browser
3. Review the implementation code in `g0.html` (lines 612-824)
4. Test with forced variant assignments to isolate issues

---

**Last Updated:** 2025-11-07
**Version:** 1.0
