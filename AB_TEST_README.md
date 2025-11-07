# A/B Test: CTA Visibility Test

## Overview

This A/B test measures the effectiveness of a prominent call-to-action (CTA) button versus subtle navigation links for encouraging GitHub repository engagement (stars/forks).

**Test Name:** `cta-visibility-test`

**Hypothesis:** A prominent, visually distinct "Star on GitHub" button will increase user engagement with the repository compared to the current subtle GitHub link display.

## Test Configuration

### Variants

- **Variant A (Control):** Current subtle GitHub link in the header
  - Small GitHub icon with star/fork counts in the top-right corner
  - Subtle design that blends with the header
  - Always visible but not prominent

- **Variant B (Treatment):** Prominent CTA button
  - Large, colorful "⭐ Star on GitHub" button in the header
  - Eye-catching design with hover effects
  - Positioned prominently in the header navigation
  - Subtle GitHub link remains but is dimmed (opacity: 0.6)

### Traffic Split

- 50% of users will see Variant A (Control)
- 50% of users will see Variant B (Treatment)

## Implementation Details

### File Modified

- `g0.html` - Main HTML file with embedded CSS and JavaScript

### Key Changes

1. **CSS Styling (lines 612-651)**
   - Added `.ab-test-cta-button` class for the prominent button
   - Hover effects with background color change and lift animation
   - Variant-specific styles (`.ab-test-variant-a`, `.ab-test-variant-b`)
   - Mobile responsiveness (hidden on screens < 60em)

2. **HTML Structure (lines 688-697)**
   - Added prominent CTA button after search icon in header
   - Includes tracking data attributes
   - Star emoji (⭐) for visual appeal

3. **Tracking Attributes (lines 724-748)**
   - Added data attributes to existing GitHub link
   - `data-ab-test`, `data-ab-element`, `data-ab-action` for tracking

4. **JavaScript Tracking (lines 1050-1213)**
   - Automatic variant assignment (50/50 split)
   - localStorage persistence of user's assigned variant
   - Click tracking on both CTA button and subtle link
   - Page view tracking
   - Conversion event tracking (GitHub interactions)
   - Debug API exposed via `window.ABTest`

## Tracking & Analytics

### Events Tracked

1. **variant_assigned** - When a user is first assigned to a variant
2. **page_view** - Each page load with the variant applied
3. **element_click** - Clicks on either the CTA button or subtle link
4. **github_interaction** - Conversion event when user clicks through to GitHub

### Data Storage

All events are stored in:
- `localStorage` key: `ab_test_cta_visibility` (variant assignment)
- `localStorage` key: `ab_test_events` (event log)

### Integration with Analytics Platforms

The code includes commented examples for integrating with:
- Google Analytics (gtag)
- Custom analytics endpoints

To integrate, uncomment and configure the appropriate section in the `trackEvent()` function (lines 1116-1131).

## Testing & Debugging

### Debug API

Open browser console and use:

```javascript
// Get current variant
ABTest.getVariant()
// Returns: "variant-a" or "variant-b"

// View all tracked events
ABTest.getEvents()
// Returns: Array of event objects

// Force a specific variant (requires page reload)
ABTest.forceVariant('variant-a')
ABTest.forceVariant('variant-b')

// Clear all A/B test data (requires page reload)
ABTest.clearData()
```

### Manual Testing

1. Open the page in a browser
2. Check browser console for `[A/B Test]` log messages
3. Use `ABTest.getVariant()` to see which variant you're viewing
4. Click the CTA button or GitHub link and observe tracked events
5. Use `ABTest.forceVariant()` to switch between variants

### Variant Verification

**Variant A (Control):**
- Body has class: `ab-test-variant-a`
- Prominent CTA button is hidden
- Subtle GitHub link at full opacity

**Variant B (Treatment):**
- Body has class: `ab-test-variant-b`
- Prominent CTA button is visible
- Subtle GitHub link at reduced opacity (0.6)

## Success Metrics

### Primary Metric
- **GitHub Click-Through Rate (CTR):** Percentage of users who click to visit GitHub
  - Formula: (Total GitHub clicks / Total page views) × 100

### Secondary Metrics
- **CTA Button CTR** (Variant B only): Clicks on prominent button / Page views
- **Subtle Link CTR** (Both variants): Clicks on subtle link / Page views
- **Star Conversion Rate:** Actual GitHub stars received during test period

## Expected Outcomes

- **Variant B should show higher CTR** if the prominent CTA is effective
- Monitor for any negative impacts on overall user experience
- Track whether the dimmed subtle link still receives clicks in Variant B

## Best Practices Followed

1. ✅ **Clean Implementation:** All changes are well-documented with comments
2. ✅ **Code Style:** Follows existing code formatting and structure
3. ✅ **Non-intrusive:** Changes don't affect core functionality
4. ✅ **Persistent Assignment:** Users see consistent experience across sessions
5. ✅ **Mobile Responsive:** CTA button hidden on small screens for UX
6. ✅ **Comprehensive Tracking:** All interactions are logged
7. ✅ **Debug Tools:** Easy testing and verification via console API
8. ✅ **Analytics Ready:** Prepared for integration with analytics platforms

## Running the Test

### Duration
Recommended minimum: 2-4 weeks to gather statistically significant data

### Sample Size
Aim for at least 1,000 users per variant for meaningful results

### Statistical Significance
Use a significance level of 95% (p-value < 0.05) to determine winner

### Next Steps After Results

1. **If Variant B wins:** Implement prominent CTA button permanently
2. **If Variant A wins:** Keep current subtle design
3. **If inconclusive:** Consider running follow-up tests with different designs

## Notes

- The test uses a 50/50 split for balanced comparison
- Variant assignment is persistent across sessions using localStorage
- All tracking data is stored locally for privacy
- The implementation is production-ready but should be connected to your analytics platform
- GitHub URL used: `https://github.com/crosschain-risk-framework/crosschain-risk-framework`

## Support

For questions or issues with this A/B test implementation, please refer to the inline code comments or contact the development team.
