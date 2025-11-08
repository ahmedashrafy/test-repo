# A/B Test: Header CTA Button Visibility

## Summary

This repository contains an A/B test implementation for the Crosschain Risk Framework documentation site. The test evaluates whether adding a prominent "Get Started" call-to-action (CTA) button in the header improves user engagement compared to the current minimal header design.

## Test Overview

- **Test Name**: `cta-button-visibility`
- **Hypothesis**: A prominent CTA button will increase user engagement and navigation to framework content
- **Target Metrics**: Click-through rate, time on page, section navigation

## What Changed

### Control (Variant A)
The original minimal header with no CTA button.

### Treatment (Variant B)
A prominent "Get Started" button added to the header that:
- Uses the site's accent color for visibility
- Includes smooth hover animations
- Links to the introduction section
- Hides on mobile devices to prevent crowding
- Follows existing design system patterns

## Files Modified

1. **g0.html**
   - Added CTA button HTML (lines 690-697)
   - Added CSS styling (lines 612-654)
   - All changes clearly marked with comments

2. **ab-test-config.md** (New)
   - Detailed test configuration
   - Tracking implementation guide
   - Success criteria and metrics
   - Feature flag examples

3. **AB_TEST_README.md** (This file)
   - Quick reference guide
   - Usage instructions

## Quick Start

### Viewing the Test

1. Open `g0.html` in a web browser
2. The CTA button will be visible in the header on desktop screens
3. Resize browser to tablet/mobile size to see responsive behavior

### Implementing Tracking

Choose one of the following approaches:

#### Option 1: Google Analytics (Recommended)
```javascript
// Add to your analytics script
document.querySelector('.md-header__cta-button')?.addEventListener('click', function() {
  gtag('event', 'cta_click', {
    'event_category': 'engagement',
    'event_label': 'header_get_started',
    'test_variant': 'treatment'
  });
});
```

#### Option 2: Feature Flag System
```javascript
// Control variant visibility with feature flag
const showCtaButton = featureFlags.get('cta-button-visibility');
if (!showCtaButton) {
  document.querySelector('.md-header__cta').style.display = 'none';
}
```

#### Option 3: A/B Testing Platform
- Import g0.html to your A/B testing platform
- Use selector: `[data-ab-test="cta-button-visibility"]`
- Configure 50/50 traffic split
- Set up conversion tracking

## Customization

### Change Button Text
Find line 694 in g0.html:
```html
Get Started
```
Replace with your preferred text (e.g., "Read the Framework", "Explore", etc.)

### Change Button Destination
Find line 693 in g0.html:
```html
href="#introduction"
```
Change to your desired URL or anchor link.

### Adjust Button Styling
Modify CSS in the `<style>` section (lines 612-654) to change:
- Colors (uses CSS variables by default)
- Padding and sizing
- Hover effects
- Responsive breakpoints

### Button Color Options
The button uses CSS variables for easy theming:
- `--md-accent-fg-color`: Button background
- `--md-accent-bg-color`: Button text color
- `--md-primary-fg-color`: Hover state background

## Testing Checklist

- [ ] Button displays correctly on desktop (> 1220px width)
- [ ] Button hides on tablet/mobile (< 1220px width)
- [ ] Button hover effects work smoothly
- [ ] Button link navigates to correct destination
- [ ] Button is accessible (keyboard navigation, screen readers)
- [ ] Analytics tracking fires on button click
- [ ] A/B test variant assignment works correctly
- [ ] Page performance is not impacted

## Metrics to Monitor

### Primary Metrics
1. **CTA Click Rate**: % of visitors clicking the button
2. **Time on Page**: Average session duration
3. **Section Navigation**: Users navigating to framework sections

### Secondary Metrics
1. Bounce rate
2. Pages per session
3. Scroll depth
4. Return visitor rate

## Success Criteria

The treatment will be considered successful if:
- **CTR ≥ 5%**: At least 5% of visitors click the CTA
- **Time +20%**: Time on page increases by 20% or more
- **Navigation +15%**: Section navigation increases by 15% or more
- **Statistical Significance**: Results are significant at 95% confidence level

## Timeline

1. **Week 1**: Deploy test, monitor for technical issues
2. **Week 2-3**: Collect data from both variants
3. **Week 4**: Analyze results and make decision
4. **Week 5**: Ship winning variant or iterate

Minimum sample size: 1,000 visitors per variant

## Rollback Instructions

If you need to remove the CTA button:

1. Remove HTML (lines 690-697 in g0.html):
```html
<!-- BEGIN A/B TEST: cta-button-visibility -->
...
<!-- END A/B TEST: cta-button-visibility -->
```

2. Remove CSS (lines 612-654 in g0.html):
```css
/* BEGIN A/B TEST: cta-button-visibility */
...
/* END A/B TEST: cta-button-visibility */
```

3. Save and deploy

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS uses standard properties (no vendor prefixes needed)
- Graceful degradation for older browsers

### Performance
- Minimal CSS added (~40 lines)
- No JavaScript required for basic functionality
- No additional HTTP requests
- No impact on page load time

### Accessibility
- Semantic HTML structure
- Proper link with title attribute
- Keyboard navigable
- Sufficient color contrast
- Works with screen readers

## Alternative Implementations

### Different Button Positions
The current implementation places the button after the GitHub link. Consider:
- Before the search box
- In a separate row below the header
- Floating button on mobile

### Multiple CTAs
For testing multiple call-to-action options:
```html
<div class="md-header__cta" data-ab-test="cta-button-visibility">
  <a class="md-header__cta-button" href="#introduction">Get Started</a>
  <a class="md-header__cta-button md-header__cta-button--secondary" href="#categories-of-risk">
    Explore Risks
  </a>
</div>
```

## Troubleshooting

### Button Not Showing
- Check if viewport width > 76.25em (1220px)
- Verify CSS is loading correctly
- Check browser console for errors
- Ensure HTML structure is correct

### Button Styling Issues
- Clear browser cache
- Check for CSS conflicts with existing styles
- Verify CSS variables are defined in theme

### Analytics Not Tracking
- Verify analytics script is loaded
- Check event listener is attached
- Test in browser console
- Review analytics dashboard configuration

## Resources

- [ab-test-config.md](./ab-test-config.md) - Full test configuration
- [Material Design Guidelines](https://material.io/design) - Design system reference
- [A/B Testing Best Practices](https://www.optimizely.com/optimization-glossary/ab-testing/) - Testing methodology

## Questions?

For questions about this A/B test implementation:
1. Review the [ab-test-config.md](./ab-test-config.md) for detailed information
2. Check the code comments in g0.html
3. Contact the growth/product team

## License

This A/B test implementation maintains the same license as the parent repository.
