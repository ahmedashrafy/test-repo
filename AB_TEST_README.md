# A/B Test: intro-content-length-test

## Overview

This A/B test compares user engagement between two different approaches to presenting the introduction section of the Crosschain Risk Framework documentation.

## Test Details

- **Test Name**: intro-content-length-test
- **File Modified**: g0.html
- **Lines Modified**: 758-953 (introduction section)
- **Test Duration**: Recommended 2-4 weeks minimum for statistical significance

## Hypothesis

Users prefer shorter, more scannable content in documentation and will demonstrate better engagement (higher scroll depth, longer time-on-page) with a condensed introduction that includes an expandable "Read more" section.

## Variants

### Variant A (Control): Full Detailed Introduction
- Displays the complete introduction text by default
- All 6 paragraphs visible immediately
- Traditional documentation format
- No user interaction required to read full content

### Variant B (Treatment): Condensed Introduction
- Shows 3 bullet-point paragraphs with key takeaways:
  - "The future is multichain"
  - "Rapid growth, significant risks"
  - "This framework provides"
- Includes a "Read full introduction" button
- Full content available via expandable section
- More scannable and concise initial view

## Metrics Tracked

### Primary Metrics
1. **Scroll Depth**: Maximum scroll percentage reached by user
   - Tracked at milestones: 25%, 50%, 75%, 100%
   - Indicates content engagement

2. **Time on Page**: Total time user spends on page
   - Measured in milliseconds
   - Tracks both active viewing and tab visibility

### Secondary Metrics (Variant B only)
3. **Read More Click Rate**: Percentage of users who click "Read full introduction"
4. **Time to Click**: How quickly users expand the full content

## Implementation Details

### Variant Selection
- 50/50 split between variants A and B
- Variant assignment stored in cookie for 30 days
- Ensures consistent experience across sessions
- Cookie name: `ab_test_intro_variant`

### Tracking
All tracking data is logged to browser console and can be sent to analytics service:

```javascript
{
  "testName": "intro-content-length-test",
  "variant": "variant-a" | "variant-b",
  "pageLoadTime": 1234567890,
  "maxScrollDepth": 85,
  "timeOnPage": 45000,
  "readMoreClicked": true,
  "readMoreClickTime": 5000,
  "events": [
    {
      "type": "page_view",
      "timestamp": 0,
      "data": {...}
    },
    {
      "type": "scroll_milestone",
      "timestamp": 2500,
      "data": { "milestone": 25 }
    }
  ]
}
```

### Events Tracked
- `page_view`: Initial page load
- `scroll_milestone`: User reaches 25%, 50%, 75%, or 100% scroll depth
- `read_more_clicked`: User expands full content (Variant B only)

## Testing the Implementation

### Enable Debug Mode
To test both variants and see real-time tracking data:

1. Open `g0.html` in a text editor
2. Find the A/B test script (around line 1140)
3. Change `enableDebug: false` to `enableDebug: true`
4. Save and open in browser

This will show a debug panel in the bottom-right corner with:
- Current variant
- Real-time scroll depth
- Time on page counter
- "Switch Variant" button to toggle between A and B

### Manual Testing Steps

1. **Test Variant A**:
   - Open g0.html in browser
   - Verify full introduction text is visible
   - Scroll down and check scroll tracking in console
   - Leave page and verify data is logged

2. **Test Variant B**:
   - Clear cookies or use incognito mode
   - Open g0.html (or click "Switch Variant" in debug mode)
   - Verify condensed introduction with 3 key points
   - Click "Read full introduction" button
   - Verify content expands smoothly
   - Button should change to "Hide full introduction"
   - Click again to collapse
   - Test scroll and time tracking

3. **Test Cookie Persistence**:
   - Refresh page multiple times
   - Verify same variant is shown
   - Check cookie in browser DevTools (Application → Cookies)

### Browser Console Commands

```javascript
// View current tracking data
console.log(trackingData);

// Manually switch variant (requires debug mode)
// Change cookie and reload
document.cookie = "ab_test_intro_variant=variant-b; path=/; max-age=2592000";
location.reload();

// Clear variant cookie
document.cookie = "ab_test_intro_variant=; path=/; max-age=0";
```

## Analytics Integration

To send data to your analytics service, modify the `logTrackingData()` function in the script:

```javascript
function logTrackingData() {
  // Send to your analytics endpoint
  fetch('/api/ab-test/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackingData)
  }).catch(err => console.error('Tracking error:', err));
}
```

## Success Criteria

The test will be considered successful for Variant B if:

1. **Scroll depth increases by ≥10%**: More users scroll through content
2. **Time on page increases by ≥15%**: Users spend more time engaging
3. **≥40% read more click rate**: Significant interest in expanded content
4. **No decrease in downstream metrics**: Users still navigate to other sections

## Analyzing Results

After collecting sufficient data (minimum 1000 sessions per variant recommended):

1. Calculate mean and median for each metric per variant
2. Perform statistical significance test (t-test or Mann-Whitney U)
3. Check for confidence level ≥95% (p-value < 0.05)
4. Analyze segment differences (device type, traffic source, etc.)
5. Review qualitative feedback if available

## Code Location

### HTML Structure
- **Lines 758-864**: A/B test container with both variants
- Variant A: Lines 765-804
- Variant B: Lines 807-863

### CSS Styles
- **Lines 612-692**: All A/B test related styles
- Includes variant styles, button styles, animations, and debug panel

### JavaScript
- **Lines 1140-1458**: Complete A/B test script
- Self-contained, no external dependencies
- Uses vanilla JavaScript for maximum compatibility

## Configuration Options

Modify `AB_TEST_CONFIG` object to adjust test parameters:

```javascript
const AB_TEST_CONFIG = {
  testName: 'intro-content-length-test',     // Test identifier
  testId: 'ab-test-intro',                   // HTML element ID
  variants: ['variant-a', 'variant-b'],      // Variant names
  variantWeights: [0.5, 0.5],                // Traffic split
  cookieName: 'ab_test_intro_variant',       // Cookie identifier
  cookieExpireDays: 30,                      // Variant persistence
  enableDebug: false                         // Debug mode toggle
};
```

## Rollout Plan

1. **Week 1**: Deploy with debug mode on, monitor for errors
2. **Week 2-3**: Collect data with debug mode off
3. **Week 4**: Analyze results
4. **Week 5**: Implement winning variant permanently or run follow-up tests

## Rollback Procedure

If issues arise:

1. Open `g0.html`
2. Remove lines 612-692 (CSS) and 1139-1458 (JavaScript)
3. Replace lines 758-864 with original introduction markup
4. Or set `variantWeights: [1.0, 0.0]` to force Variant A for all users

## Best Practices

- Don't modify test during active data collection
- Wait for statistical significance before concluding
- Consider external factors (holidays, marketing campaigns)
- Document any changes to the page that might affect results
- Archive test data before making permanent changes

## Support

For questions or issues with the A/B test implementation, please refer to:
- Browser console for real-time tracking data
- Debug mode for visual feedback
- This README for configuration details
