# A/B Test: hero-cta-placement

## Overview

This A/B test evaluates the impact of moving GitHub repository stats from the header to a prominent hero section on the homepage to increase repository engagement and star conversions.

## Test Details

- **Test Name**: `hero-cta-placement`
- **File Modified**: `g0.html`
- **Start Date**: 2025-11-07
- **Status**: Implementation Complete

## Variants

### Variant A (Control)
- Standard header display with GitHub stats in the top-right corner
- Stats show: 42 stars, 5 forks
- Standard small icon and text display
- No hero section

### Variant B (Treatment)
- De-emphasized header GitHub stats (50% opacity, increases to 100% on hover)
- Prominent hero section below the header with:
  - Large, prominent title: "Crosschain Risk Framework"
  - Descriptive subtitle
  - Enhanced GitHub stats display with icons
  - Clear "Star on GitHub" call-to-action button
  - Gradient background design
  - Fully responsive layout

## Implementation

### User Assignment
- **Method**: Client-side JavaScript using `localStorage`
- **Split**: 50/50 random assignment
- **Persistence**: Variant assignment persists across sessions
- **Storage Key**: `ab_test_hero-cta-placement`

### Tracking

All GitHub link clicks are tracked with the following information:
- Test name: `hero-cta-placement`
- Variant: `A` or `B`
- Click location: `header`, `sidebar`, or `hero`
- Timestamp

**Tracking Implementation:**
```javascript
window.trackGitHubClick(location)
```

**Console Output:**
```javascript
{
  test: 'hero-cta-placement',
  variant: 'A' or 'B',
  location: 'header|sidebar|hero',
  timestamp: ISO 8601 timestamp
}
```

**Google Analytics (if available):**
- Event: `github_click`
- Category: `ab_test`
- Label: `hero-cta-placement_[variant]_[location]`
- Value: 1

### Modified Elements

1. **Header GitHub Source** (`.ab-test-header-source`)
   - Lines: ~918-934
   - Added click tracking
   - Variant B: Reduced opacity

2. **Hero Section** (`.ab-test-hero-section`)
   - Lines: ~1002-1041
   - Only visible in Variant B
   - Contains enhanced stats and CTA button

3. **Sidebar GitHub Source**
   - Lines: ~1097-1113
   - Added click tracking

## CSS Classes

### Variant-Specific
- `body[data-ab-variant="A"]` - Control variant styling
- `body[data-ab-variant="B"]` - Treatment variant styling

### Component Classes
- `.ab-test-header-source` - Header GitHub stats container
- `.ab-test-hero-section` - Hero section container
- `.hero-cta-container` - Hero content wrapper with gradient
- `.hero-cta-content` - Content area within hero
- `.hero-cta-title` - Hero title
- `.hero-cta-description` - Hero description text
- `.hero-github-stats` - Stats container
- `.hero-stat-card` - Individual stat display
- `.hero-stat-icon` - SVG icons for stats
- `.hero-stat-content` - Stat text content
- `.hero-stat-number` - Star/fork count
- `.hero-stat-label` - "Stars" or "Forks" label
- `.hero-cta-button` - Call-to-action button
- `.hero-button-icon` - Button icon

## Metrics to Track

### Primary Metrics
1. **Click-Through Rate (CTR)**: Percentage of users who click any GitHub link
   - By variant
   - By location (header, sidebar, hero)

2. **Star Conversion Rate**: Percentage of users who actually star the repository
   - Requires backend integration to track actual GitHub stars
   - Compare conversion by variant

### Secondary Metrics
1. **Time to First GitHub Interaction**: How long before user clicks a GitHub link
2. **Engagement Rate**: Repeat clicks on GitHub links
3. **Bounce Rate**: Impact on overall page engagement

### Statistical Significance
- Recommended minimum sample size: 1000 users per variant
- Target confidence level: 95%
- Minimum detectable effect: 10% improvement in CTR

## Testing the Implementation

### Manual Testing

1. **Clear Test Assignment**:
   ```javascript
   localStorage.removeItem('ab_test_hero-cta-placement');
   ```

2. **Force Variant A**:
   ```javascript
   localStorage.setItem('ab_test_hero-cta-placement', 'A');
   location.reload();
   ```

3. **Force Variant B**:
   ```javascript
   localStorage.setItem('ab_test_hero-cta-placement', 'B');
   location.reload();
   ```

4. **Check Current Variant**:
   ```javascript
   console.log('Current variant:', document.body.getAttribute('data-ab-variant'));
   ```

### Verify Tracking

Open browser console and click GitHub links to see tracking events:
```javascript
[A/B Test] GitHub click tracked: {test: "hero-cta-placement", variant: "B", location: "hero", timestamp: "..."}
```

## Analysis Recommendations

### Data Collection
1. Set up proper analytics integration (Google Analytics, Mixpanel, etc.)
2. Capture all tracking events in your analytics platform
3. Track actual GitHub stars (requires GitHub API integration)
4. Monitor for at least 2-4 weeks to account for traffic variations

### Analysis Checklist
- [ ] Calculate CTR by variant and location
- [ ] Perform chi-square test for statistical significance
- [ ] Analyze by traffic source (direct, referral, search)
- [ ] Check for mobile vs desktop differences
- [ ] Monitor for any negative impacts on other metrics

### Decision Criteria
- **Ship Variant B if**: CTR improvement ≥10% with p-value <0.05
- **Keep Variant A if**: No significant difference or negative impact
- **Iterate if**: Positive signal but not significant (try larger treatment effect)

## Rollback Procedure

If issues arise, rollback is simple:

1. **Quick Disable**: Add to CSS to default to Variant A:
   ```css
   body[data-ab-variant="B"] .ab-test-hero-section {
     display: none !important;
   }
   body[data-ab-variant="B"] .ab-test-header-source {
     opacity: 1 !important;
   }
   ```

2. **Full Removal**: Remove the following sections from `g0.html`:
   - A/B test configuration script (lines ~803-846)
   - Hero section HTML (lines ~1002-1041)
   - A/B test CSS (lines ~612-757)
   - `onclick="trackGitHubClick(...)"` attributes
   - `.ab-test-header-source` class

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ Requires JavaScript enabled
- ⚠️ Requires localStorage support (falls back to random assignment each page load if unavailable)

## Responsive Design

The hero section is fully responsive:
- **Desktop**: Full layout with horizontal stats
- **Tablet**: Adjusted spacing
- **Mobile** (<45em):
  - Stacked stat cards
  - Reduced padding
  - Smaller text sizes

## Notes

- The test is self-contained within `g0.html`
- No external dependencies required
- User assignment is deterministic (same user sees same variant)
- All tracking is currently console-based (integrate with your analytics platform)
- GitHub stats are static (42 stars, 5 forks) - update as needed

## Next Steps

1. ✅ Implementation complete
2. ⏳ Deploy to production
3. ⏳ Monitor tracking data
4. ⏳ Collect minimum sample size
5. ⏳ Analyze results
6. ⏳ Make decision (ship B, keep A, or iterate)
7. ⏳ Remove test code and implement winning variant permanently

## Questions or Issues?

Contact the team or review the inline documentation in `g0.html`.
