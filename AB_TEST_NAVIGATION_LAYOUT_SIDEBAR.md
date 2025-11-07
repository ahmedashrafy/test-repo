# A/B Test: navigation-layout-sidebar

## Overview

This A/B test evaluates whether expanding the left sidebar navigation to show all subsections by default improves user engagement compared to the current collapsed state.

## Test Details

- **Test Name**: navigation-layout-sidebar
- **Version**: 1.0
- **File Modified**: g0.html
- **Lines Modified**: 695-754 (navigation structure), 1120-1301 (JavaScript implementation)

## Hypothesis

Users researching security risks may benefit from seeing the full content hierarchy upfront in the sidebar navigation, potentially:
- Reducing bounce rate
- Increasing pages per session
- Improving time on site
- Enhancing content discoverability

## Implementation

### Control Group (50% of users)
Users in the control group see the **collapsed navigation** (current behavior):
- Main sections are visible
- Subsections are hidden by default
- Users must click to expand each section
- CSS classes: `md-nav__item`

### Variant Group (50% of users)
Users in the variant group see the **expanded navigation**:
- Main sections are visible
- All subsections are expanded by default
- Full content hierarchy is immediately visible
- CSS classes: `md-nav__item md-nav__item--active md-nav__item--nested`
- Checkboxes are pre-checked: `<input ... checked>`

## Technical Implementation

### 1. HTML Structure Changes

The navigation structure (lines 721-879) has been modified to include:

- **Nested navigation items** for each main section (Introduction, Categories of Risk, Network Consensus Risk, Protocol Architecture Risk)
- **Subsection links** under each main section
- **Toggle checkboxes** that control expand/collapse behavior
- **Data attribute** `data-ab-test="navigation-layout-sidebar"` for JavaScript targeting

Example structure:
```html
<li class="md-nav__item md-nav__item--active md-nav__item--nested">
  <input class="md-nav__toggle md-toggle" id="__nav_1" type="checkbox" checked>
  <label class="md-nav__link" for="__nav_1">
    <span class="md-ellipsis">Introduction</span>
    <span class="md-nav__icon md-icon"></span>
  </label>
  <nav class="md-nav" data-md-level="1">
    <ul class="md-nav__list">
      <li class="md-nav__item">
        <a class="md-nav__link" href="#types-of-crosschain-interaction">
          Types of Crosschain Interaction
        </a>
      </li>
      <!-- More subsections... -->
    </ul>
  </nav>
</li>
```

### 2. JavaScript A/B Test Logic (lines 1120-1301)

The JavaScript implementation handles:

#### Variant Assignment
- Uses localStorage to persist user assignment across sessions
- 50/50 split between control and variant groups
- Deterministic assignment prevents flickering
- Configurable through `FEATURE_FLAG_MODE` and `VARIANT_TRAFFIC_PERCENTAGE`

#### Variant Application
- **Control group**: JavaScript removes `md-nav__item--active` classes and unchecks toggles
- **Variant group**: Keeps the expanded state from HTML (no changes needed)
- Adds `data-ab-test-navigation-layout-sidebar` attribute to body for CSS targeting

#### Metrics Tracking
The following metrics are automatically tracked:

1. **Navigation Clicks**: Counts clicks on navigation links
2. **Time on Site**: Measures session duration
3. **Scroll Depth**: Tracks maximum scroll percentage
4. **Session Summary**: Logs comprehensive metrics on page unload

### 3. Analytics Integration

The implementation includes placeholders for Google Analytics (gtag) events:

```javascript
gtag('event', 'ab_test_navigation_click', {
  'test_name': 'navigation-layout-sidebar',
  'variant': 'control' or 'variant',
  'click_count': number
});

gtag('event', 'ab_test_session_end', {
  'test_name': 'navigation-layout-sidebar',
  'variant': 'control' or 'variant',
  'time_on_site': milliseconds,
  'navigation_clicks': number,
  'max_scroll_depth': percentage
});
```

**Note**: To activate analytics tracking, ensure Google Analytics is configured on the page.

## Configuration

### Feature Flag Modes

Located in the JavaScript (line 1153):

```javascript
const FEATURE_FLAG_MODE = 'auto'; // Options: 'auto', 'control', 'variant'
const VARIANT_TRAFFIC_PERCENTAGE = 50; // 0-100
```

- **'auto'**: Automatically assigns users based on `VARIANT_TRAFFIC_PERCENTAGE`
- **'control'**: Forces all users to control group (collapsed navigation)
- **'variant'**: Forces all users to variant group (expanded navigation)

### Debugging

Check the browser console for A/B test information:

```javascript
// View current test configuration
console.log(window.abTestInfo);
// Output: { name, version, variant, timestamp }

// View session summary on page unload
// Output: { test, variant, timeOnSite, navigationClicks, maxScrollDepth }
```

Check localStorage:
```javascript
localStorage.getItem('ab_test_navigation-layout-sidebar');
localStorage.getItem('ab_test_navigation-layout-sidebar_timestamp');
```

## Success Metrics

The test measures the following key performance indicators:

| Metric | Description | Expected Impact |
|--------|-------------|-----------------|
| Navigation Clicks | Number of navigation link clicks per session | Increase in variant |
| Time on Site | Total session duration in milliseconds | Increase in variant |
| Scroll Depth | Maximum scroll percentage reached | Increase in variant |
| Pages per Session | Number of pages viewed (tracked externally) | Increase in variant |
| Bounce Rate | % of single-page sessions (tracked externally) | Decrease in variant |

## Testing the Implementation

### Manual Testing

1. **Test Control Group**:
   - Open browser DevTools console
   - Clear localStorage: `localStorage.clear()`
   - Set feature flag: Change `FEATURE_FLAG_MODE` to `'control'`
   - Reload page
   - Verify navigation is collapsed

2. **Test Variant Group**:
   - Open browser DevTools console
   - Clear localStorage: `localStorage.clear()`
   - Set feature flag: Change `FEATURE_FLAG_MODE` to `'variant'`
   - Reload page
   - Verify navigation is expanded with all subsections visible

3. **Test Automatic Assignment**:
   - Set `FEATURE_FLAG_MODE` to `'auto'`
   - Clear localStorage multiple times and reload
   - Verify ~50% of assignments are control, ~50% are variant

### Validation Checklist

- [ ] Navigation structure displays correctly in both variants
- [ ] User assignment persists across page reloads
- [ ] Console logs show correct variant assignment
- [ ] Body has correct `data-ab-test-navigation-layout-sidebar` attribute
- [ ] Metrics are tracked and logged correctly
- [ ] Navigation links work in both variants
- [ ] Expand/collapse toggles work in control group
- [ ] No JavaScript errors in console

## Best Practices

1. **Run test for sufficient duration**: Allow at least 2 weeks for statistically significant results
2. **Monitor sample size**: Ensure each variant has adequate sample size (minimum 1000 users per variant)
3. **Check for seasonality**: Be aware of traffic patterns that might skew results
4. **Validate metrics**: Compare tracked metrics with external analytics tools
5. **Document results**: Record findings and decision rationale

## Rollout Strategy

Based on test results:

### If Variant Wins
1. Update `FEATURE_FLAG_MODE` to `'variant'` for 100% traffic
2. Monitor for 1 week to ensure stability
3. Remove A/B test code and make variant the default implementation
4. Clean up control group code

### If Control Wins
1. Update `FEATURE_FLAG_MODE` to `'control'`
2. Remove expanded navigation HTML structure
3. Revert to original collapsed navigation
4. Remove A/B test JavaScript

### If Results Are Inconclusive
1. Extend test duration
2. Investigate potential segmentation (new vs. returning users)
3. Consider testing alternative navigation layouts

## Code Style Notes

The implementation follows the existing code style:
- Maintains consistent HTML indentation (2 spaces)
- Uses existing CSS classes from Material for MkDocs theme
- JavaScript uses IIFE pattern to avoid global scope pollution
- Comments follow JSDoc-style conventions
- Descriptive variable and function names

## Files Modified

- `g0.html`: Main HTML file containing the navigation structure and A/B test logic

## Related Documentation

- [Material for MkDocs Navigation Documentation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/)
- A/B Testing Best Practices
- Google Analytics Event Tracking

## Contact

For questions or issues with this A/B test implementation, please refer to the project maintainers or technical documentation.

---

**Last Updated**: 2025-11-07
**Test Status**: Active
**Expected End Date**: TBD based on statistical significance
