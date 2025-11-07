# A/B Test: Navigation CTA Button

## Overview

**Test Name:** `navigation-cta-button`

**Hypothesis:** Adding a prominent "Contribute" call-to-action button in the header navigation next to the GitHub repository stats will increase repository stars and contributions by making the action more visible and reducing friction for users interested in contributing.

**Test Status:** Ready for implementation

**Implementation Date:** 2025-11-07

---

## Test Details

### What's Being Tested

- **Control Group:** Users see the standard header with GitHub repository information (stars and forks) but no additional CTA button
- **Treatment Group:** Users see an additional prominent "Contribute" button next to the GitHub stats, styled with the accent color to draw attention

### Visual Changes

The treatment variant adds a button with:
- **Text:** "Contribute"
- **Position:** Header navigation, immediately after the GitHub repository stats
- **Styling:** Accent color background (`--md-accent-fg-color`), with hover effects
- **Link:** Points to the GitHub repository for contributions

---

## Implementation Guide

### 1. Feature Flag Setup

The A/B test uses the following data attributes for segmentation:

```html
<div data-ab-test="navigation-cta-button" data-ab-variant="treatment">
  <!-- Contribute button -->
</div>
```

### 2. Controlling Variant Display

#### For Control Group (No Button):
```javascript
// Hide the CTA button for control group users
document.querySelectorAll('[data-ab-variant="treatment"]').forEach(el => {
  el.style.display = 'none';
});
```

#### For Treatment Group (Show Button):
```javascript
// Button is visible by default - no action needed
// Or explicitly ensure visibility:
document.querySelectorAll('[data-ab-variant="treatment"]').forEach(el => {
  el.style.display = 'flex';
});
```

### 3. User Segmentation

Implement user segmentation in your analytics/experimentation platform:

```javascript
// Example: Assign users to control or treatment group
const userId = getUserId(); // Your user identification method
const variantGroup = hashUserId(userId) % 2 === 0 ? 'control' : 'treatment';

// Store the assignment
localStorage.setItem('ab-test-navigation-cta-button', variantGroup);

// Apply the variant
if (variantGroup === 'control') {
  document.querySelectorAll('[data-ab-variant="treatment"]').forEach(el => {
    el.style.display = 'none';
  });
}
```

---

## Analytics & Tracking

### Event Tracking

The button includes tracking attributes for analytics:

```html
data-tracking="contribute-cta-click"
data-tracking-location="header-navigation"
```

### Implementing Click Tracking

```javascript
// Track button clicks
document.querySelectorAll('[data-tracking="contribute-cta-click"]').forEach(button => {
  button.addEventListener('click', function(e) {
    // Send to your analytics platform
    analytics.track('CTA Button Click', {
      test_name: 'navigation-cta-button',
      variant: localStorage.getItem('ab-test-navigation-cta-button'),
      location: this.getAttribute('data-tracking-location'),
      timestamp: new Date().toISOString(),
      user_id: getUserId()
    });
  });
});
```

---

## Success Metrics

### Primary Metrics

1. **GitHub Stars:** Increase in repository stars from users in treatment group vs control
   - Measure via GitHub API
   - Track time between page visit and star action
   - Compare star rates between groups

### Secondary Metrics

1. **Repository Forks:** Increase in forks from treatment group users
2. **Click-Through Rate (CTR):** Percentage of treatment group users who click the button
3. **Engagement Time:** Time users spend on GitHub after clicking
4. **Contribution Rate:** Actual PRs/issues created by users who clicked

### Measurement Approach

```javascript
// Example: Track GitHub stars correlation
async function trackGitHubEngagement(userId, variant) {
  const engagement = {
    user_id: userId,
    variant: variant,
    clicked_contribute: hasClickedContribute(userId),
    timestamp: new Date().toISOString()
  };

  // Check GitHub API for user's star/fork status
  const gitHubStatus = await checkGitHubEngagement(userId);

  analytics.track('GitHub Engagement', {
    ...engagement,
    ...gitHubStatus
  });
}
```

---

## Statistical Significance

### Minimum Sample Size

- **Recommended Test Duration:** 2-4 weeks
- **Minimum Users per Variant:** 1,000 (for reliable results)
- **Confidence Level:** 95%
- **Statistical Power:** 80%

### Analysis Checklist

- [ ] Sufficient sample size reached in both groups
- [ ] Test ran for minimum duration (2 weeks)
- [ ] Results are statistically significant (p < 0.05)
- [ ] No significant external factors during test period
- [ ] Similar traffic patterns between control and treatment groups

---

## Integration with Popular A/B Testing Platforms

### Google Optimize

```html
<script>
gtag('event', 'experiment_impression', {
  'experiment_id': 'navigation-cta-button',
  'variant_id': variantGroup
});
</script>
```

### Optimizely

```javascript
window.optimizely = window.optimizely || [];
window.optimizely.push({
  type: "activate",
  experimentId: "navigation-cta-button"
});
```

### VWO (Visual Website Optimizer)

```javascript
window._vwo_code = window._vwo_code || [];
_vwo_code.push(['activate', {
  experimentId: 'navigation-cta-button'
}]);
```

---

## Testing Checklist

Before launching the test, ensure:

- [ ] Control group properly hides the CTA button
- [ ] Treatment group displays button with correct styling
- [ ] Button link correctly points to GitHub repository
- [ ] Click tracking is firing correctly
- [ ] User assignment is random and persisted across sessions
- [ ] Mobile responsive design works correctly
- [ ] No console errors or performance issues
- [ ] Analytics events are being captured
- [ ] GitHub API integration is set up for star/fork tracking

---

## Rollout Plan

### Phase 1: Validation (Days 1-3)
- Deploy to 5% of traffic
- Monitor for errors and performance issues
- Validate tracking is working correctly

### Phase 2: Ramp-up (Days 4-7)
- Increase to 50% of traffic (25% control, 25% treatment)
- Monitor initial metrics
- Ensure balanced traffic distribution

### Phase 3: Full Test (Days 8-28)
- Run at 100% of traffic (50% control, 50% treatment)
- Collect data for statistical significance
- Monitor for anomalies

### Phase 4: Analysis & Decision (Days 29-35)
- Analyze results
- Make decision to ship, iterate, or abandon
- Document learnings

---

## Expected Results

### Success Criteria

The test will be considered successful if:

1. **Primary:** ≥10% increase in GitHub stars from treatment group
2. **Secondary:** ≥5% increase in repository forks
3. **Secondary:** CTR on button ≥2%
4. No negative impact on page load time or user experience

### Decision Matrix

| Outcome | Action |
|---------|--------|
| Significant positive lift (>10%) | Ship to 100% of users |
| Moderate positive lift (5-10%) | Consider variations or iterate |
| No significant difference | Abandon or redesign test |
| Negative impact | Immediately stop test |

---

## Potential Risks & Mitigations

### Risk 1: Button Overwhelms Header
**Mitigation:** Button is sized proportionally and uses existing design system colors

### Risk 2: Low Click-Through Rate
**Mitigation:** Button placement is prominent but not intrusive; can iterate on copy/design

### Risk 3: Mobile Display Issues
**Mitigation:** Test thoroughly on mobile devices; header already responsive

---

## Next Steps

1. Review and approve this implementation
2. Set up analytics tracking in your platform
3. Implement user segmentation logic
4. Configure A/B testing platform (if using)
5. Test in staging environment
6. Deploy to production with Phase 1 rollout
7. Monitor metrics daily
8. Analyze results after minimum test duration
9. Make decision and document learnings

---

## Questions or Issues?

For questions about this A/B test implementation, please refer to:
- Code location: `g0.html` lines 690-717 and documentation lines 2-50
- Test configuration: See HTML comments in `g0.html`
- Attribution: `data-ab-test="navigation-cta-button"`

---

## Changelog

- **2025-11-07:** Initial implementation of navigation-cta-button test
