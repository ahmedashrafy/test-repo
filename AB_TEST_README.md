# A/B Test: Risk Section Order Test

## Overview

**Test Name:** `risk-section-order-test`

**Hypothesis:** Presenting stakeholder impacts before technical risk details improves user engagement and comprehension.

**File Modified:** `g0.html`

## Test Description

This A/B test reorders two major content sections in the Crosschain Risk Framework documentation to determine which order resonates better with readers:

- **Control (Variant A):** Stakeholders section → Security Risks section (original order)
- **Treatment (Variant B):** Security Risks section → Stakeholders section (new order)

## Implementation Details

### How It Works

1. **Variant Assignment:**
   - Users are randomly assigned to either the control or treatment variant (50/50 split)
   - Assignment is stored in browser localStorage for consistency across sessions
   - Can be overridden using URL parameter: `?ab_test_variant=control` or `?ab_test_variant=treatment`

2. **Section Reordering:**
   - JavaScript dynamically reorders the DOM elements based on the assigned variant
   - Sections are wrapped in divs with data attributes indicating their order for each variant
   - The reordering happens on page load before content is visible to the user

3. **Analytics Tracking:**
   The test tracks multiple engagement metrics:
   - **Time on page:** Total time user spends on the page
   - **Scroll depth:** Maximum scroll percentage reached
   - **Bounce rate:** Whether user left quickly without engagement
   - **Section visibility:** Time spent viewing each section
   - **Section views:** Number of times each section enters viewport

## Testing the A/B Test

### View Control Variant (Original Order)

Open the page with this URL parameter:
```
g0.html?ab_test_variant=control
```

Expected order:
1. Stakeholders section
2. Security Risks section

### View Treatment Variant (New Order)

Open the page with this URL parameter:
```
g0.html?ab_test_variant=treatment
```

Expected order:
1. Security Risks section
2. Stakeholders section

### View Random Assignment

Open the page without parameters:
```
g0.html
```

You'll be randomly assigned to one of the two variants. Check the console to see which variant you received.

## Accessing Analytics Data

### Browser Console

Open the browser console to see real-time tracking events:
- Each event is logged with `[A/B Test Event]` prefix
- On page exit, a summary is logged with `[A/B Test Summary]` prefix

### LocalStorage

Analytics data is stored in localStorage for each session:

```javascript
// View your variant assignment
localStorage.getItem('ab_test_risk-section-order-test');

// View analytics data (find your session ID in the console)
// Keys are in format: ab_test_risk-section-order-test_analytics_{sessionId}
Object.keys(localStorage).filter(key => key.includes('analytics'));
```

### Inspecting the DOM

The page includes data attributes for debugging:

```javascript
// Check current variant
document.body.getAttribute('data-ab-variant');

// Check section container
document.getElementById('section-container').getAttribute('data-variant');
```

## Metrics to Analyze

When analyzing the results, focus on these key metrics:

1. **Engagement Metrics:**
   - Average time on page (by variant)
   - Average scroll depth (by variant)
   - Bounce rate (% of users with < 25% scroll and < 10s time)

2. **Comprehension Metrics:**
   - Time spent on each section (by variant)
   - Section view counts (by variant)
   - Sequence of section views

3. **Success Criteria:**
   - Treatment variant should show:
     - ≥ 10% increase in time on page
     - ≥ 15% increase in scroll depth
     - ≥ 20% decrease in bounce rate

## Integration with Analytics Services

The implementation includes hooks for popular analytics services:

### Google Analytics

If Google Analytics (gtag.js) is installed, events are automatically sent:

```javascript
gtag('event', 'ab_test_complete', {
  'event_category': 'AB_Test',
  'event_label': 'risk-section-order-test',
  'variant': 'control' or 'treatment',
  'time_on_page': 123,
  'max_scroll_depth': 85
});
```

### Custom Endpoint

Uncomment and configure this line in the code to send data to your own endpoint:

```javascript
// Line ~1309 in g0.html
navigator.sendBeacon('/api/ab-test-analytics', JSON.stringify(analyticsData));
```

## Configuration

### Changing Split Ratio

To change from 50/50 split to another ratio, modify line ~1085:

```javascript
// Current: 50/50 split
const variant = Math.random() < 0.5 ? 'control' : 'treatment';

// Example: 70/30 split (70% control, 30% treatment)
const variant = Math.random() < 0.7 ? 'control' : 'treatment';
```

### Disabling Tracking

To disable console logging and tracking:

```javascript
// Line ~1045 in g0.html
trackingEnabled: false  // Change from true to false
```

### Clearing Stored Variant

To reset and get a new variant assignment:

```javascript
localStorage.removeItem('ab_test_risk-section-order-test');
// Then reload the page
```

## Code Structure

### HTML Changes

1. **Section Wrapping** (lines 827-968):
   - Wrapped sections in container div with `id="section-container"`
   - Each section has class `ab-test-section`
   - Each section has `data-order-control` and `data-order-treatment` attributes

2. **Comments:**
   - Clear markers indicating test boundaries
   - Variant descriptions

### JavaScript Implementation (lines 1006-1347)

1. **Configuration** (lines 1034-1046):
   - Test name and storage keys
   - Variant definitions
   - Feature flags

2. **Variant Assignment** (lines 1048-1088):
   - URL parameter checking
   - localStorage persistence
   - Random assignment logic

3. **DOM Manipulation** (lines 1090-1124):
   - Section reordering based on variant
   - Attribute setting for debugging

4. **Analytics Engine** (lines 1126-1319):
   - Event tracking
   - Scroll depth measurement
   - Time tracking
   - Section visibility observation
   - Exit intent detection
   - Data persistence

5. **Initialization** (lines 1321-1344):
   - DOM ready detection
   - Variant application
   - Analytics setup

## Best Practices

1. **Consistent Experience:**
   - Once assigned, users see the same variant across sessions
   - Use URL parameters to override for testing/QA

2. **Statistical Significance:**
   - Run the test for at least 2-4 weeks
   - Aim for minimum 1000 visitors per variant
   - Use proper statistical analysis tools

3. **Monitoring:**
   - Check console for errors during initial rollout
   - Monitor localStorage usage
   - Verify analytics data is being collected

4. **Clean Up:**
   - After test concludes, implement winning variant permanently
   - Remove A/B test code and analytics
   - Clear test-related localStorage entries for users

## Troubleshooting

### Sections Not Reordering

Check:
1. Console for errors
2. Section elements have correct IDs (`stakeholders-section`, `security-risks-section`)
3. Container element exists (`section-container`)
4. JavaScript is executing (check console logs)

### Analytics Not Tracking

Check:
1. `trackingEnabled` is set to `true`
2. Console shows event logs
3. Browser allows localStorage
4. No console errors

### Variant Not Persisting

Check:
1. Browser allows localStorage
2. No browser extensions blocking storage
3. Not in incognito/private mode (some browsers limit storage)

## Example Analysis Query

When analyzing the data, you might query your analytics like this:

```sql
SELECT
  variant,
  COUNT(*) as sessions,
  AVG(time_on_page) as avg_time,
  AVG(max_scroll_depth) as avg_scroll,
  SUM(CASE WHEN bounced = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as bounce_rate
FROM ab_test_sessions
WHERE test_name = 'risk-section-order-test'
  AND timestamp >= '2024-01-01'
GROUP BY variant;
```

## Next Steps

1. **Deploy the test** to production
2. **Monitor** for the first 24 hours to ensure proper operation
3. **Collect data** for 2-4 weeks or until statistical significance
4. **Analyze results** using the metrics defined above
5. **Implement winner** by permanently applying the winning variant's order
6. **Document findings** for future reference

## Questions or Issues?

If you encounter any issues or have questions about the implementation:
1. Check browser console for error messages
2. Verify all code changes were applied correctly
3. Test with URL parameters to confirm both variants work
4. Review the analytics data structure in localStorage

## References

- Original issue: A/B test for risk section ordering
- Test hypothesis: Stakeholder-first approach improves engagement
- Implementation date: 2025
- Status: Active
