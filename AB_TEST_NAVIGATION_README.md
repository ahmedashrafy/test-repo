# A/B Test: Navigation Layout Test

## Test Overview

**Test Name:** `navigation-layout-test`

**Hypothesis:** A detailed expanded navigation structure with visible subsections will improve user engagement and content discovery compared to the current collapsed 4-item navigation structure.

**Test Location:** `g0.html` (lines 698-885 for HTML, lines 612-658 for CSS, lines 1173-1349 for JavaScript)

## Variants

### Variant A (Control)
- **Description:** Current collapsed navigation with 4 main sections
- **Structure:**
  - Introduction
  - Categories of Risk
  - Network Consensus Risk
  - Protocol Architecture Risk
- **Behavior:** Simple flat navigation without visible subsections

### Variant B (Treatment)
- **Description:** Expanded navigation with 2-3 visible subsections per main section
- **Structure:**
  - **Introduction**
    - Types of Crosschain Interaction
    - Stakeholders
    - Security Risks
  - **Categories of Risk**
    - Network Consensus
    - Protocol Architecture
    - Implementation
  - **Network Consensus Risk**
    - Finality
    - Liveness
    - Safety
  - **Protocol Architecture Risk**
    - Validator Security
    - Message Verification
    - Smart Contract Risk
- **Behavior:** Expanded structure with always-visible subsections for better content discovery

## Metrics Tracked

The test automatically tracks the following metrics:

1. **Time on Page**
   - Total time spent on the page (in seconds)
   - Tracked via heartbeat every 30 seconds
   - Final tracking on page unload

2. **Number of Section Clicks**
   - Every navigation link click is tracked
   - Distinguishes between main sections and subsections
   - Includes link text and timestamp

3. **Scroll Depth**
   - Tracked at 25%, 50%, 75%, and 100% milestones
   - Maximum scroll depth recorded
   - Final scroll depth on page leave

4. **Pages per Session**
   - Number of pages viewed within the same session
   - Uses sessionStorage to maintain count
   - Tracked on each page view

## Implementation Details

### HTML Structure
- Two complete navigation lists are present in the HTML:
  - `.nav-variant-a` - Control variant (collapsed)
  - `.nav-variant-b` - Treatment variant (expanded)
- The `nav` element has a `data-variant` attribute that controls which variant is displayed

### CSS Classes
- `nav[data-variant="A"]` - Shows variant A, hides variant B
- `nav[data-variant="B"]` - Shows variant B, hides variant A
- Additional styling for expanded navigation subsections:
  - `.md-nav__link--parent` - Main section links (bold)
  - `.md-nav__link--sub` - Subsection links (slightly smaller, indented)
  - `.md-nav__list--sub` - Subsection list container

### JavaScript Functionality

#### Variant Assignment
```javascript
// 50/50 random split on first visit
// Variant stored in localStorage to ensure consistency
variant = Math.random() < 0.5 ? 'A' : 'B';
localStorage.setItem('ab_test_nav_variant', variant);
```

#### Analytics Integration
The tracking function supports:
- Google Analytics 4 (gtag)
- Segment (analytics.track)
- Console logging for debugging

**Events Tracked:**
- `ab_test_assigned` - When a user is first assigned to a variant
- `navigation_click` - When any navigation link is clicked
- `time_on_page` - Total time spent (on page unload)
- `time_on_page_heartbeat` - Time tracking every 30 seconds
- `scroll_depth` - At 25%, 50%, 75%, 100% milestones
- `final_scroll_depth` - Maximum scroll depth on page leave
- `page_view` - Each page view with session page count

## Manual Testing

### Testing Variant A (Control)
1. Open browser DevTools Console
2. Run: `localStorage.setItem('ab_test_nav_variant', 'A')`
3. Refresh the page
4. Verify the simple 4-item navigation is displayed

### Testing Variant B (Treatment)
1. Open browser DevTools Console
2. Run: `localStorage.setItem('ab_test_nav_variant', 'B')`
3. Refresh the page
4. Verify the expanded navigation with subsections is displayed

### Resetting the Test
To clear your variant assignment:
```javascript
localStorage.removeItem('ab_test_nav_variant');
sessionStorage.removeItem('ab_test_pages_viewed');
```

## Integration with Analytics Platforms

### Google Analytics 4
If you're using Google Analytics 4, ensure the `gtag` function is loaded before this script. The test will automatically send events to GA4.

### Segment
If you're using Segment, ensure the `analytics` object is loaded. The test will automatically send events to Segment.

### Custom Analytics
To integrate with a custom analytics platform, modify the `trackEvent` function (around line 1211):

```javascript
function trackEvent(eventName, eventData) {
  // Add your custom analytics tracking here
  yourAnalytics.track(eventName, eventData);
}
```

## Success Criteria

To determine the winning variant, analyze the following:

1. **Time on Page:** Higher average time suggests better engagement
2. **Navigation Clicks:** More clicks on navigation (especially subsections in B) indicates better content discovery
3. **Scroll Depth:** Deeper scrolling suggests users are finding relevant content
4. **Pages per Session:** More pages viewed suggests improved navigation utility

**Recommended Sample Size:** At least 1,000 users per variant
**Recommended Duration:** Run for at least 2 weeks to account for weekly patterns

## Statistical Significance

Before concluding the test, ensure:
- Sufficient sample size (minimum 1,000 users per variant recommended)
- Statistical significance (p-value < 0.05)
- Practical significance (meaningful difference in key metrics)
- Consistent results across different user segments

## Rollout Plan

### If Variant B Wins:
1. Update `data-variant="A"` to `data-variant="B"` on line 706
2. Remove Variant A HTML (`.nav-variant-a` list)
3. Clean up CSS for unused variant
4. Optionally remove the JavaScript tracking after a monitoring period

### If Variant A Wins:
1. Keep current implementation with `data-variant="A"`
2. Remove Variant B HTML (`.nav-variant-b` list)
3. Clean up CSS for unused variant
4. Remove JavaScript tracking

### If Results are Inconclusive:
1. Extend test duration
2. Increase sample size
3. Consider testing on specific user segments
4. Explore alternative navigation designs

## Notes

- The test uses localStorage, so variant assignment persists across sessions
- Users will see a consistent experience once assigned to a variant
- The test is designed to have minimal performance impact
- All tracking is done client-side; no server-side changes needed

## Support

For questions or issues with this A/B test implementation, please contact the development team or refer to the project documentation.

---

**Last Updated:** 2025-11-07
**Test Status:** Ready for Production
**Version:** 1.0
