# A/B Test: CTA Button Prominence

## Overview
This A/B test evaluates the impact of adding prominent call-to-action (CTA) buttons in the header navigation on user engagement metrics.

**Test Name:** `cta-button-prominence`
**Status:** Active
**File Modified:** `g0.html`

## Hypothesis
Adding a prominent "Get Started" or "Read Framework" call-to-action button in the header navigation will increase user engagement by providing clear entry points to key sections of the security framework documentation.

## Test Variants

### Control Group
- **Description:** Minimal header with no CTA buttons (original design)
- **Configuration:** `enabled: false`

### Treatment Group - Variant A
- **Description:** Single "Get Started" button
- **Configuration:** `enabled: true, variant: 'get-started'`

### Treatment Group - Variant B
- **Description:** Single "Read Framework" button
- **Configuration:** `enabled: true, variant: 'read-framework'`

### Treatment Group - Variant C
- **Description:** Both "Get Started" and "Read Framework" buttons
- **Configuration:** `enabled: true, variant: 'both'`

## Implementation Details

### 1. Feature Flag Configuration
Located in the `<head>` section (lines 655-664):

```javascript
window.abTestConfig = {
  ctaButtonProminence: {
    enabled: true,  // Set to false for control group
    variant: 'get-started',  // Options: 'get-started', 'read-framework', 'both'
    trackingEnabled: true
  }
};
```

### 2. CSS Styling
Custom styles added (lines 612-653) that:
- Use the accent color (`--md-accent-fg-color`) for button background
- Provide hover effects with color inversion and subtle lift
- Hide buttons on mobile devices (< 600px) to maintain minimal header
- Follow the existing Material design system

### 3. Analytics Tracking
Two types of tracking implemented:

#### CTA Click Tracking
- Function: `trackCTAClick(buttonName)`
- Captures: button name, timestamp, test variant
- Stores data in: localStorage and console (can be extended to GA4/Google Analytics)

#### Engagement Metrics Tracking
- Function: `trackEngagementMetrics()`
- Captures:
  - **Scroll Depth:** Maximum percentage of page scrolled
  - **Time on Page:** Duration in seconds
  - **Test Variant:** Which variant the user saw
- Stores data on page unload for comparison between control and treatment groups

### 4. Dynamic Button Injection
CTA buttons are dynamically created based on configuration (lines 808-845):
- Prevents layout shift
- Maintains accessibility with ARIA labels
- Attaches click event handlers for tracking

## Metrics to Track

### Primary Metrics
1. **CTA Click-Through Rate (CTR):**
   - Formula: (CTA Clicks / Page Views) × 100
   - Goal: > 5% improvement over baseline

2. **Time on Page:**
   - Measure average session duration
   - Goal: > 10% increase vs control

3. **Scroll Depth:**
   - Measure how far users scroll through documentation
   - Goal: > 15% increase vs control

### Secondary Metrics
- Bounce rate
- Return visitor rate
- Documentation section navigation patterns

## How to Use

### Enable the Test (Treatment Group)
```javascript
window.abTestConfig = {
  ctaButtonProminence: {
    enabled: true,
    variant: 'get-started',  // or 'read-framework', 'both'
    trackingEnabled: true
  }
};
```

### Disable the Test (Control Group)
```javascript
window.abTestConfig = {
  ctaButtonProminence: {
    enabled: false,
    variant: 'get-started',
    trackingEnabled: true
  }
};
```

### View Analytics Data
Open browser console and check localStorage:

```javascript
// View CTA click events
console.log(JSON.parse(localStorage.getItem('abTestEvents')));

// View engagement metrics
console.log(JSON.parse(localStorage.getItem('abTestMetrics')));
```

### Clear Analytics Data
```javascript
localStorage.removeItem('abTestEvents');
localStorage.removeItem('abTestMetrics');
```

## Integration with Analytics Platforms

### Google Analytics 4 (GA4)
The implementation includes GA4 integration. Ensure `gtag` is loaded:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Events will be tracked with:
- Event Name: `cta_click`
- Event Category: `ab_test`
- Event Label: `cta-button-prominence`
- Button Name: `get-started` or `read-framework`

### Custom Analytics
Modify the `trackCTAClick()` function to send data to your analytics endpoint:

```javascript
fetch('/api/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(event)
});
```

## Testing Checklist

- [x] Feature flag is configurable
- [x] CTA buttons appear in correct location (before GitHub source link)
- [x] Buttons use accent color styling
- [x] Hover effects work properly
- [x] Click tracking is functioning
- [x] Engagement metrics (scroll depth, time on page) are tracked
- [x] Mobile view hides CTA buttons appropriately
- [x] Accessibility (ARIA labels) implemented
- [x] Control group shows minimal header
- [x] Data persists in localStorage

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used (arrow functions, const/let, template literals)
- localStorage API required
- Fallbacks included for missing analytics functions

## Rollout Plan

### Phase 1: Internal Testing (Week 1)
- Test with internal team
- Verify tracking works correctly
- Check styling across devices

### Phase 2: Soft Launch (Week 2-3)
- 10% of users see treatment variant
- Monitor for errors and performance issues

### Phase 3: Full A/B Test (Week 4-7)
- 50% control, 50% treatment (split across variants)
- Collect statistically significant data
- Aim for minimum 1000 sessions per variant

### Phase 4: Analysis & Decision (Week 8)
- Analyze metrics
- Determine winning variant
- Roll out to 100% if successful

## Success Criteria
The test is considered successful if:
1. CTR on CTA buttons > 5%
2. Time on page increases by > 10%
3. Scroll depth increases by > 15%
4. No negative impact on page load time
5. No increase in bounce rate

## Notes
- The current implementation shows the CTA button by default
- To run a proper A/B test, implement server-side or client-side randomization to assign users to control vs treatment groups
- Consider using a tool like Google Optimize, Optimizely, or VWO for more sophisticated A/B testing
- Ensure sufficient sample size for statistical significance (recommend using a sample size calculator)

## Contact
For questions or issues with this A/B test implementation, please reach out to the development team.
