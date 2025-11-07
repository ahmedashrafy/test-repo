# A/B Test: Search Box Prominence

## Overview

This A/B test evaluates the impact of increasing the visibility and prominence of the search functionality on user engagement with documentation search.

## Test Details

- **Test Name:** `search-box-prominence`
- **File Modified:** `g0.html`
- **Date Implemented:** 2025-11-07
- **Test Type:** UI/UX Enhancement

## Hypothesis

**"Increasing the visual prominence of the search box will improve user engagement with the documentation search feature, leading to more search queries and faster information discovery."**

By making the search box larger, more visually distinct, and adding clearer placeholder text, users will:
1. More quickly identify the search functionality
2. Be more inclined to use search to find information
3. Have a better overall experience navigating the documentation

## Variants

### Variant A (Control)
- **Description:** Current default search box styling
- **Characteristics:**
  - Standard font size (0.9rem)
  - Default padding
  - Minimal visual distinction
  - Placeholder text: "Search"

### Variant B (Enhanced)
- **Description:** Enhanced search box with improved visibility
- **Characteristics:**
  - Larger font size (1.1rem)
  - Increased padding (0.8rem vertical)
  - Subtle border (2px solid rgba(68, 138, 255, 0.3))
  - Box shadow for depth (0 2px 8px rgba(0, 0, 0, 0.1))
  - Enhanced hover/focus states with stronger border and shadow
  - Improved placeholder text: "Search documentation..."
  - Smooth transitions (0.3s ease)
  - Responsive design with appropriate sizing for different screen sizes

## Implementation Details

### CSS Implementation
- CSS classes applied to `<body>` element:
  - `ab-test-search-box-prominence-a` (control)
  - `ab-test-search-box-prominence-b` (enhanced)
- Uses `!important` to ensure styles override defaults
- Responsive breakpoints at 60em for desktop-specific enhancements

### JavaScript Controller
- **Location:** Inline `<script>` at end of `<body>` tag
- **Functionality:**
  - 50/50 random assignment of variants
  - Persistent assignment via localStorage
  - URL parameter override for testing (`?ab_test_search_box=a` or `?ab_test_search_box=b`)
  - Exposes variant via `window.abTestSearchBoxVariant` for analytics
  - Sets `data-ab-test-search-box` attribute on body for tracking

### Configuration Priority
1. **URL Parameter** (highest priority): `?ab_test_search_box=a` or `?ab_test_search_box=b`
2. **localStorage**: Persisted variant from previous session
3. **Random Assignment**: 50/50 split for new users

## Testing the Implementation

### Manual Testing

#### Test Variant A (Control)
```
Open: file:///path/to/g0.html?ab_test_search_box=a
```
- Verify default search box styling appears
- Check that body has class `ab-test-search-box-prominence-a`

#### Test Variant B (Enhanced)
```
Open: file:///path/to/g0.html?ab_test_search_box=b
```
- Verify enhanced search box styling:
  - Larger font size
  - Visible border and shadow
  - Enhanced hover/focus effects
  - "Search documentation..." placeholder
- Check that body has class `ab-test-search-box-prominence-b`

#### Test Persistence
1. Load page without URL parameter
2. Check localStorage for `ab_test_search_box_prominence` key
3. Reload page - verify same variant appears
4. Clear localStorage and reload - verify new random assignment

#### Debug Mode
Add `?debug=true` to URL to see console logs:
```
file:///path/to/g0.html?ab_test_search_box=b&debug=true
```

### Browser Compatibility
- Modern browsers with ES6+ support
- Graceful fallback to variant A if localStorage is unavailable
- Works without JavaScript (defaults to variant A styling)

## Metrics to Track

To properly evaluate this A/B test, track the following metrics:

### Primary Metrics
1. **Search Engagement Rate**
   - % of users who interact with the search box (focus/click)
   - Track: `document.querySelector('.md-search__input').addEventListener('focus')`

2. **Search Query Submission Rate**
   - % of users who submit a search query
   - Track: Form submission or search query execution

3. **Time to First Search**
   - Average time from page load to first search interaction
   - Track: `performance.now()` at page load vs. first focus event

### Secondary Metrics
1. **Search Result Engagement**
   - Click-through rate on search results
   - Depth of search result exploration

2. **Page Bounce Rate**
   - Do more users stay on the page after using search?

3. **Search Success Rate**
   - Do users find what they're looking for? (refinement rate, clicks after search)

### Implementation Example
```javascript
// Track search box interactions
const searchInput = document.querySelector('.md-search__input');
const variant = window.abTestSearchBoxVariant;

searchInput.addEventListener('focus', function() {
  // Send analytics event
  gtag('event', 'search_box_focus', {
    'experiment_id': 'search-box-prominence',
    'variant_id': variant
  });
});

searchInput.addEventListener('submit', function() {
  // Send analytics event
  gtag('event', 'search_query_submit', {
    'experiment_id': 'search-box-prominence',
    'variant_id': variant
  });
});
```

## Success Criteria

The test will be considered successful if Variant B shows:
- **10%+ increase** in search engagement rate
- **15%+ increase** in search query submissions
- **20%+ decrease** in time to first search interaction
- No negative impact on page performance or user experience

## Rollout Plan

1. **Phase 1: Testing** (1 week)
   - Deploy to staging environment
   - Conduct QA testing across browsers and devices
   - Verify analytics tracking

2. **Phase 2: Limited Release** (2 weeks)
   - Enable for 10% of production traffic
   - Monitor for errors and performance issues
   - Begin collecting baseline metrics

3. **Phase 3: Full Release** (4-6 weeks)
   - Increase to 50/50 split
   - Collect statistically significant data
   - Analyze results

4. **Phase 4: Decision**
   - If B wins: Remove variant A, make B default
   - If A wins: Remove test code, keep current styling
   - If inconclusive: Iterate on design and retest

## Rollback Procedure

If issues arise:

1. **Immediate**: Add URL parameter to force variant A
   ```
   ?ab_test_search_box=a
   ```

2. **Quick Fix**: Modify script to default to variant A
   ```javascript
   // Change line 1114:
   return 'a'; // Force variant A
   ```

3. **Full Rollback**: Remove A/B test code
   - Delete CSS rules (lines 612-657)
   - Delete JavaScript controller (lines 1039-1173)
   - Revert placeholder text

## Notes

- Test is client-side only, no server changes required
- Minimal performance impact (< 1KB gzipped JavaScript)
- No external dependencies
- Compatible with existing analytics infrastructure
- Can run multiple A/B tests simultaneously using same pattern

## References

- Implementation Date: 2025-11-07
- Related Issues: [Link to issue tracker]
- Design Mockups: [Link to design files]
- Analytics Dashboard: [Link to metrics dashboard]
