# A/B Test: CTA GitHub Button Position

## Test Overview

**Test Name:** `cta-github-button-position`
**File:** `g0.html`
**Status:** Active
**Start Date:** 2025-11-07

## Objective

Test whether placing a prominent "Contribute on GitHub" call-to-action button in the main content area increases user engagement and contributions to the framework compared to keeping the GitHub link only in the header.

## Hypothesis

We hypothesize that a prominent, visually appealing CTA button placed directly after the introduction paragraph (which explicitly mentions community contributions) will:
1. Increase click-through rates to the GitHub repository
2. Increase actual contributions (issues, PRs, discussions)
3. Improve overall user engagement with the project

The rationale is that users who read the introduction are already primed for contribution, and a contextual, prominent CTA will convert intent into action more effectively than a small header link.

## Variants

### Variant A (Control)
- **Description:** Current design with GitHub link only in the header
- **Traffic Allocation:** 50%
- **Implementation:** No changes to existing design
- **User Experience:** Users must look to the header to find the GitHub repository link

### Variant B (Treatment)
- **Description:** Prominent CTA banner after the introduction paragraph
- **Traffic Allocation:** 50%
- **Implementation:**
  - Attractive gradient banner with primary theme colors
  - Clear heading: "Help Improve This Framework"
  - Motivational text about community contributions
  - Large, styled button with GitHub icon: "Contribute on GitHub"
  - Positioned immediately after line 797 (introduction paragraph about community contributions)
- **User Experience:** Clear, contextual call-to-action in the content flow

## Implementation Details

### HTML Structure (Lines 800-824)

```html
<!-- A/B Test: cta-github-button-position -->
<!-- Variant B: Prominent GitHub CTA -->
<div id="github-cta-variant-b" class="github-cta-banner" style="display: none;">
  <div style="background: linear-gradient(...); ...">
    <h3>Help Improve This Framework</h3>
    <p>Your contributions and feedback are essential...</p>
    <a href="[github-url]"
       class="md-button md-button--primary github-cta-link"
       data-ab-test="cta-github-button-position"
       data-ab-variant="b">
      <!-- GitHub Icon SVG -->
      Contribute on GitHub
    </a>
  </div>
</div>
```

### JavaScript Logic (Lines 1017-1217)

The A/B test script implements:

1. **Variant Assignment**
   - Cookie-based persistent assignment (`ab_test_cta_github_position`)
   - 50/50 traffic split using `Math.random()`
   - 30-day cookie duration for consistent experience

2. **Variant Application**
   - Variant A: Default state (no changes)
   - Variant B: Shows CTA banner by setting `display: block`
   - Adds CSS class `ab-test-a` or `ab-test-b` to body

3. **Event Tracking**
   - `variant_exposed`: When user is assigned to a variant
   - `cta_clicked`: When variant B CTA button is clicked
   - `github_link_clicked`: When any GitHub link is clicked (header or content)
   - `scroll_depth_X`: Engagement metric at 25%, 50%, 75%, 100% scroll

4. **Analytics Integration**
   - Google Analytics (gtag.js and analytics.js)
   - Custom analytics endpoint (`/api/analytics/ab-test`)
   - Console logging for debugging

## Tracking & Metrics

### Primary Metrics

1. **Click-Through Rate (CTR)**
   - Variant A: Clicks on header GitHub link / Total exposures
   - Variant B: Clicks on CTA button / Total exposures
   - Expected lift: 200-400% increase in CTR

2. **GitHub Engagement**
   - Repository visits from referrer
   - New issues created
   - Pull requests submitted
   - Repository stars/forks

### Secondary Metrics

1. **Scroll Depth**
   - Percentage of users reaching various scroll depths
   - Measures engagement with content

2. **Time on Page**
   - Track via analytics to ensure CTA doesn't cause premature exits

3. **Bounce Rate**
   - Monitor for any negative impact on user experience

## Analytics Events

All events include the following data:
```javascript
{
  test_name: "cta-github-button-position",
  variant: "A" or "B",
  event_name: "event_type",
  timestamp: ISO timestamp,
  // Additional event-specific data
}
```

### Event Types

| Event Name | Description | Additional Data |
|------------|-------------|-----------------|
| `variant_exposed` | User assigned to variant | `variant` |
| `cta_clicked` | Variant B button clicked | `link_location`, `link_url` |
| `github_link_clicked` | Any GitHub link clicked | `link_location`, `link_url`, `variant` |
| `scroll_depth_25/50/75/100` | User scrolled to depth | `scroll_depth` |

## Code Style & Best Practices

✅ **Implemented:**
- Clean, well-documented code with JSDoc-style comments
- Follows existing Material for MkDocs CSS patterns
- Uses CSS variables for theme consistency
- Responsive design using existing breakpoints
- Non-intrusive implementation (hidden by default)
- Graceful degradation (works without JavaScript)
- IIFE pattern to avoid global scope pollution
- Event delegation for performance
- Cookie-based persistence with proper security flags

✅ **Design Consistency:**
- Uses existing `.md-button` and `.md-button--primary` classes
- Matches site color scheme with CSS variables
- Follows existing typography and spacing patterns
- GitHub icon SVG matches site style

## Configuration

The test can be easily configured by modifying the `AB_TEST_CONFIG` object:

```javascript
const AB_TEST_CONFIG = {
  testName: 'cta-github-button-position',
  cookieName: 'ab_test_cta_github_position',
  cookieDuration: 30, // days
  trafficAllocation: {
    A: 0.5,  // Control: 50%
    B: 0.5   // Treatment: 50%
  }
};
```

### Adjusting Traffic Split

To change traffic allocation (e.g., 25% B, 75% A):
```javascript
trafficAllocation: {
  A: 0.75,
  B: 0.25
}
```

### Disabling the Test

To turn off Variant B and show only control:
```javascript
trafficAllocation: {
  A: 1.0,
  B: 0.0
}
```

## Testing the Implementation

### Manual Testing

1. **Test Variant A:**
   - Clear cookies
   - Reload page multiple times until assigned to A
   - Verify no CTA banner appears
   - Check console for `variant_exposed` with variant: "A"
   - Click header GitHub link and verify tracking

2. **Test Variant B:**
   - Clear cookies
   - Reload page multiple times until assigned to B
   - Verify CTA banner appears after introduction
   - Verify styling and responsiveness
   - Click CTA button and verify tracking
   - Check console for proper event logging

3. **Test Persistence:**
   - Note assigned variant
   - Reload page multiple times
   - Verify same variant is shown consistently

### Browser Console Testing

```javascript
// Check current variant
document.body.getAttribute('data-ab-variant')

// View cookie
document.cookie.split('; ').find(row => row.startsWith('ab_test_cta_github_position'))

// Force variant assignment (clear cookie first)
document.cookie = 'ab_test_cta_github_position=B; path=/; max-age=2592000'
location.reload()
```

## Analytics Setup

### Google Analytics Setup

Ensure Google Analytics is loaded before the A/B test script:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Analytics Endpoint

The script sends data to `/api/analytics/ab-test`. Implement this endpoint to store:
- Variant assignments
- Click events
- Engagement metrics

Example backend implementation needed:
```javascript
POST /api/analytics/ab-test
{
  "test_name": "cta-github-button-position",
  "variant": "B",
  "event_name": "cta_clicked",
  "timestamp": "2025-11-07T...",
  "link_location": "main_content_banner",
  "link_url": "https://github.com/..."
}
```

## Results Analysis

### Statistical Significance

To determine if results are statistically significant:
- Minimum sample size: ~385 per variant (for 95% confidence, 5% margin of error)
- Use chi-square test for CTR comparison
- Calculate p-value (target: p < 0.05)

### Success Criteria

The test will be considered successful if Variant B shows:
1. **Statistically significant** increase in CTR (p < 0.05)
2. At least **150% lift** in GitHub link clicks
3. **No negative impact** on scroll depth or time on page
4. Evidence of **increased GitHub activity** (issues, PRs, stars)

## Rollout Plan

### Phase 1: Testing (Week 1)
- Monitor technical implementation
- Verify tracking accuracy
- Check for any bugs or UX issues

### Phase 2: Data Collection (Weeks 2-4)
- Collect data until statistical significance
- Monitor metrics daily
- Watch for any unexpected patterns

### Phase 3: Analysis (Week 5)
- Analyze results
- Calculate statistical significance
- Review GitHub activity correlation

### Phase 4: Decision (Week 6)
- If B wins: Roll out to 100% of users, remove variant A code
- If A wins: Remove variant B code, keep current design
- If inconclusive: Extend test or refine hypothesis

## Maintenance

### Removing the Test

When test concludes:

1. **If Variant B Wins:**
   - Remove A/B test script (lines 1017-1217)
   - Remove `style="display: none;"` from CTA banner
   - Remove data attributes: `data-ab-test`, `data-ab-variant`
   - Keep tracking on the CTA button

2. **If Variant A Wins:**
   - Remove CTA banner HTML (lines 800-824)
   - Remove A/B test script (lines 1017-1217)
   - Clean up any related comments

## Future Enhancements

Potential iterations to test:
1. Different CTA copy ("Start Contributing" vs "Join Us" vs "Contribute")
2. Button placement (after intro vs after each section)
3. Multiple CTAs throughout the page
4. Personalized CTAs based on user behavior
5. Different visual designs (minimal vs prominent)

## Notes

- The GitHub icon SVG is from GitHub's official SVG set
- The CTA uses a gradient background with theme colors for visual prominence
- All styles use CSS variables to maintain theme consistency
- The implementation is mobile-responsive using existing site breakpoints
- Cookie consent compliance: Consider GDPR/CCPA requirements for production

## Contact

For questions about this A/B test:
- Review the inline comments in `g0.html`
- Check browser console for debugging information
- Refer to this documentation for configuration changes
