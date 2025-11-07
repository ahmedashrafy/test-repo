# A/B Test: CTA Button Emphasis

## Test ID
`cta-button-emphasis`

## Description
This A/B test evaluates the impact of adding a prominent "Read Framework" call-to-action (CTA) button in the header navigation versus the current minimal navigation design. The goal is to improve user engagement and guide visitors more effectively to key content sections of the Crosschain Risk Framework.

## Hypothesis
Adding a prominent CTA button in the header navigation will:
- Increase user engagement with the framework content
- Improve click-through rates to the introduction section
- Reduce bounce rates by providing clear navigation guidance
- Make the site more actionable and user-friendly

## Implementation Details

### Location
- **File Modified**: `g0.html`
- **Section**: `.md-header__inner` navigation (lines ~645-649)

### Variants

#### Control
- **Description**: Original minimal navigation without CTA button
- **Behavior**: CTA button is hidden via CSS
- **Setting**: `window.AB_TEST_CTA_BUTTON_VARIANT = 'control'`

#### Treatment (Default)
- **Description**: Navigation with prominent "Read Framework" CTA button
- **Features**:
  - Accent-colored button with hover effects
  - Links to #introduction section
  - Responsive design (hidden on mobile to avoid crowding)
  - Accessible with focus states
- **Setting**: `window.AB_TEST_CTA_BUTTON_VARIANT = 'treatment'` (default)

### Technical Implementation

#### HTML Changes
```html
<!-- A/B Test: CTA Button (cta-button-emphasis) -->
<a href="#introduction" class="md-header__cta-button"
   title="Get Started with the Framework"
   data-ab-test="cta-button-emphasis">
  <span class="md-header__cta-text">Read Framework</span>
</a>
<!-- End A/B Test -->
```

#### CSS Styling
- Custom styling using Material Design color variables
- Smooth transitions and hover effects
- Box shadow for depth
- Responsive breakpoints
- Feature flag support via `data-ab-test-variant` attribute

#### JavaScript Configuration
- Self-contained IIFE for variant control
- Analytics integration hooks (compatible with Segment, GA, etc.)
- Event tracking for button clicks
- Console logging for debugging

## Configuration

### Setting the Variant

To set the variant, add this before the page loads:

```html
<script>
  // Set to 'control' or 'treatment'
  window.AB_TEST_CTA_BUTTON_VARIANT = 'control';
</script>
```

Or configure dynamically:

```javascript
// From external A/B testing tool
window.AB_TEST_CTA_BUTTON_VARIANT = getUserVariant('cta-button-emphasis');
```

### Analytics Integration

The implementation includes hooks for analytics tracking:

```javascript
// Variant exposure tracking
window.analytics.track('AB Test Viewed', {
  test_id: 'cta-button-emphasis',
  variant: 'treatment'
});

// Button click tracking
window.analytics.track('CTA Button Clicked', {
  test_id: 'cta-button-emphasis',
  button_text: 'Read Framework',
  destination: '#introduction'
});
```

## Metrics to Track

### Primary Metrics
1. **CTA Click-Through Rate (CTR)**
   - Clicks on "Read Framework" button / Page views
   - Target: Measure engagement increase

2. **Introduction Section Views**
   - Sessions reaching #introduction
   - Compare control vs. treatment

3. **Bounce Rate**
   - % of single-page sessions
   - Hypothesis: Treatment should reduce bounce rate

### Secondary Metrics
1. **Time on Site**
   - Average session duration

2. **Pages per Session**
   - Average page views per visit

3. **Scroll Depth**
   - % of page scrolled before exit

## Success Criteria

The treatment variant will be considered successful if:
- CTA CTR > 5% (minimum engagement threshold)
- Introduction section views increase by > 15%
- Bounce rate decreases by > 10%
- No negative impact on other navigation elements

## Responsive Behavior

- **Desktop (>76.234375em)**: CTA button visible
- **Tablet/Mobile (≤76.234375em)**: CTA button hidden to prevent header crowding

## Accessibility Considerations

- ✅ Keyboard navigable
- ✅ Focus states with visible outline
- ✅ Semantic HTML (`<a>` tag with href)
- ✅ Descriptive title attribute
- ✅ High contrast colors using theme variables
- ✅ Screen reader compatible

## Code Style Compliance

The implementation follows the existing codebase patterns:
- Uses Material Design CSS variable naming convention
- Follows existing class naming patterns (`.md-header__*`)
- Maintains consistent indentation and formatting
- Includes clear HTML comments marking test boundaries
- Uses rem units for sizing (consistent with framework)
- Applies existing transition timing patterns

## Rollback Plan

To disable the A/B test and revert to control:

1. **Temporary**: Set variant to 'control'
   ```javascript
   window.AB_TEST_CTA_BUTTON_VARIANT = 'control';
   ```

2. **Permanent Removal**: Remove the following from g0.html:
   - Lines ~645-649 (HTML button element)
   - Lines ~612-660 (CSS styling)
   - Lines ~1046-1103 (JavaScript configuration)

## Testing Checklist

- [ ] Button appears in header on desktop viewports
- [ ] Button hidden on mobile/tablet viewports
- [ ] Hover effects work correctly
- [ ] Focus states visible for keyboard navigation
- [ ] Link navigates to #introduction
- [ ] Control variant hides button
- [ ] Treatment variant shows button
- [ ] Analytics events fire correctly
- [ ] No console errors
- [ ] Button doesn't break layout on different screen sizes

## Notes

- The button text "Read Framework" can be easily changed in the HTML
- The destination link can be updated to point to different sections
- The feature flag approach allows for easy integration with third-party A/B testing tools
- All styling uses CSS variables for easy theme customization

## Contact

For questions or issues with this A/B test implementation, please contact the development team.

---

**Last Updated**: 2025-11-07
**Status**: Active
**Owner**: Development Team
