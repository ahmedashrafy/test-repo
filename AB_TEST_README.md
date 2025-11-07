# A/B Test: Call-to-Action Button

## Overview

This A/B test implements a prominent "Contribute to Framework" call-to-action (CTA) button in the header navigation to increase community engagement with the Crosschain Risk Framework GitHub repository.

## Test Details

- **Test Name:** call-to-action-button
- **File Modified:** g0.html
- **Location:** Header navigation (around line 742)
- **Implementation Date:** 2025-11-07

## Hypothesis

Adding a visible and accessible "Contribute" button in the header will increase GitHub repository engagement by:
- Making the contribution pathway more discoverable
- Reducing friction for potential contributors
- Increasing awareness of the project's open-source nature

## Variants

### Control Group (50%)
- **Experience:** Default page with no CTA button
- **CSS Class:** `ab-test-variant-control`
- **Description:** Users see the standard header with GitHub icon but no explicit CTA

### Treatment Group (50%)
- **Experience:** Page with prominent "Contribute" button in header
- **CSS Class:** `ab-test-variant-treatment`
- **Button Style:** Accent color background with hover effects
- **Button Location:** Header navigation, positioned after the GitHub source info
- **Button Text:** "Contribute"
- **Button Link:** https://github.com/runtimeverification/crosschain-security-framework

## Success Metrics

### Primary Metrics
1. **CTA Click-Through Rate (CTR):** Percentage of users who click the "Contribute" button
2. **GitHub Repository Clicks:** Total clicks to the GitHub repository (comparing both variants)
3. **GitHub Stars Growth:** Increase in repository stars during test period

### Secondary Metrics
1. **New Contributors:** Number of new contributors making their first commit
2. **Pull Requests:** Number of new pull requests opened
3. **Issues Created:** Number of new issues opened by first-time contributors
4. **Time on Site:** Average session duration (may increase if users explore contribution options)

## Technical Implementation

### 1. CSS Styling
- Custom styles added for `.ab-test-cta-button` class
- Accent color background matching the site's design system
- Hover effects with subtle transform animation
- Responsive design: smaller on tablets, hidden on mobile devices
- Follows existing Material Design theme variables

### 2. HTML Structure
```html
<a
  href="https://github.com/runtimeverification/crosschain-security-framework"
  class="ab-test-cta-button"
  target="_blank"
  rel="noopener noreferrer"
  data-ab-test="cta-button"
  aria-label="Contribute to the Crosschain Risk Framework on GitHub"
>
  <span>Contribute</span>
</a>
```

### 3. JavaScript A/B Test Framework

#### User Assignment
- Users are randomly assigned to control or treatment (50/50 split)
- Assignment is persistent using localStorage
- Consistent hashing ensures same user always sees same variant
- User ID generated on first visit: `user_<timestamp>_<random>`

#### Variant Application
- Body element receives class: `ab-test-variant-control` or `ab-test-variant-treatment`
- CSS shows/hides button based on variant class
- No page flicker due to early execution

#### Event Tracking
The following events are tracked:

1. **ab_test_impression**
   - Fired on page load
   - Properties: test_name, variant, user_id, timestamp

2. **ab_test_cta_click**
   - Fired when treatment group clicks CTA button
   - Properties: test_name, variant, user_id, button_text, href, timestamp

## Analytics Integration

The implementation includes placeholder code for popular analytics platforms. To enable tracking, uncomment and configure your analytics provider in the `trackEvent()` function:

### Google Analytics (GA4)
```javascript
if (window.gtag) {
  gtag('event', eventName, properties);
}
```

### Mixpanel
```javascript
if (window.mixpanel) {
  mixpanel.track(eventName, properties);
}
```

### Segment
```javascript
if (window.analytics) {
  analytics.track(eventName, properties);
}
```

## Testing the Implementation

### Manual Testing

1. **View Control Variant:**
   ```javascript
   window.setABTestVariant('control')
   ```
   - Page will reload
   - No CTA button should be visible in header

2. **View Treatment Variant:**
   ```javascript
   window.setABTestVariant('treatment')
   ```
   - Page will reload
   - "Contribute" button should appear in header

3. **Check Console:**
   - Open browser DevTools console
   - Look for: `[A/B Test] User assigned to variant: <variant>`
   - Click tracking events will appear as: `[A/B Test Analytics]`

### Automated Testing

Test checklist:
- [ ] Button appears only for treatment variant
- [ ] Button is not visible on mobile screens (<45em)
- [ ] Button links to correct GitHub repository
- [ ] Click events are tracked (check console)
- [ ] User assignment persists across page reloads
- [ ] Button styling matches site theme
- [ ] Button is keyboard accessible
- [ ] Button has proper ARIA label

## Configuration

### Adjust Traffic Split

Modify the `treatmentProbability` in the script:

```javascript
const AB_TEST_CONFIG = {
  testName: 'call-to-action-button',
  variants: {
    control: 'control',
    treatment: 'treatment'
  },
  treatmentProbability: 0.5  // 0.0 = 0% treatment, 1.0 = 100% treatment
};
```

### Change Button Appearance

Modify CSS variables in the stylesheet:
- Background color: `var(--md-accent-fg-color)`
- Text color: `var(--md-accent-bg-color)`
- Hover color: `var(--md-primary-fg-color--light)`

## Data Collection

### Required Data Points

1. **User-level data:**
   - User ID (anonymized)
   - Variant assignment
   - Session duration
   - Page views

2. **Event data:**
   - Button impressions (treatment only)
   - Button clicks (treatment only)
   - GitHub link clicks (both variants)
   - Timestamps for all events

3. **External data:**
   - GitHub repository metrics:
     - Stars (before, during, after test)
     - Forks (before, during, after test)
     - Contributors (new vs. returning)
     - Pull requests (opened, merged)
     - Issues (created by new contributors)

### Statistical Significance

- **Minimum sample size:** ~385 users per variant (for 95% confidence, 5% margin of error)
- **Recommended duration:** 2-4 weeks for sufficient data
- **Statistical test:** Chi-square test for CTR comparison
- **Significance level:** p < 0.05

## Results Analysis

### Key Questions to Answer

1. **Did the CTA button increase GitHub clicks?**
   - Compare click-through rates between variants
   - Calculate percentage increase/decrease

2. **Did engagement quality improve?**
   - Compare new contributors between groups
   - Analyze PR/issue creation rates

3. **Was there any negative impact?**
   - Check if treatment group had shorter sessions
   - Monitor bounce rate differences

### Sample Analysis Query

```javascript
// Count button clicks in treatment group
const treatmentClicks = events.filter(e =>
  e.name === 'ab_test_cta_click' &&
  e.properties.variant === 'treatment'
).length;

// Count impressions in treatment group
const treatmentImpressions = events.filter(e =>
  e.name === 'ab_test_impression' &&
  e.properties.variant === 'treatment'
).length;

// Calculate CTR
const ctr = (treatmentClicks / treatmentImpressions) * 100;
console.log(`Treatment CTR: ${ctr.toFixed(2)}%`);
```

## Rollout Plan

### Phase 1: Validation (Week 1)
- Deploy to 10% of traffic
- Monitor for technical issues
- Verify tracking is working correctly

### Phase 2: Testing (Weeks 2-4)
- Increase to 50/50 split
- Collect sufficient data for statistical significance
- Monitor metrics dashboard

### Phase 3: Analysis (Week 5)
- Analyze results
- Determine winning variant
- Make rollout decision

### Phase 4: Rollout (Week 6)
- If treatment wins: Deploy to 100% of users
- If control wins: Remove CTA button code
- Document learnings

## Maintenance

### Monitoring
- Check error logs for JavaScript errors
- Verify localStorage is working (some users may have it disabled)
- Monitor analytics dashboard for data flow

### Cleanup
After test conclusion:
- Remove losing variant code
- Clean up CSS for unused variant
- Update analytics to track winning variant permanently
- Document results in test archive

## Known Limitations

1. **Mobile Users:** CTA button hidden on mobile (<45em) due to space constraints
2. **localStorage Required:** Users with disabled localStorage will see random assignments
3. **Single Page:** Test only affects g0.html; navigation to other pages may reset context
4. **External Metrics:** GitHub metrics require manual collection via GitHub API

## Contact & Support

For questions about this A/B test implementation:
- Review the inline code comments in g0.html
- Check browser console for debug logs
- Verify variant assignment in localStorage: `ab_test_call-to-action-button`

## Changelog

### 2025-11-07 - Initial Implementation
- Added CTA button HTML in header navigation
- Implemented CSS styling with responsive design
- Created JavaScript A/B test framework
- Added analytics tracking placeholders
- Documented test plan and metrics
