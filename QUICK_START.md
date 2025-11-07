# Quick Start Guide: Header CTA A/B Test

## 🚀 Launch Checklist

### Pre-Launch (Required)

- [ ] **Update CTA Destination URL**
  - Open `g0.html`
  - Find line 692: `<a class="md-header__cta-button" href="#assess-protocol"...`
  - Replace `#assess-protocol` with actual destination URL
  - Example: `href="/risk-assessment"` or `href="/docs/getting-started"`

- [ ] **Configure Analytics Endpoint** (if using custom analytics)
  - Open `g0.html`
  - Find line 1125: `fetch('/api/analytics/ab-test', {`
  - Update URL to your analytics API endpoint
  - Ensure endpoint accepts POST requests with JSON payload
  - Or disable by commenting out lines 1124-1132

- [ ] **Test Both Variants**

  **Test Variant A (Control):**
  ```javascript
  // In browser console:
  document.cookie = "ab_test_header_cta=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "ab_test_header_cta=A; path=/; max-age=2592000";
  location.reload();
  // Verify: No CTA button in header
  ```

  **Test Variant B (Treatment):**
  ```javascript
  // In browser console:
  document.cookie = "ab_test_header_cta=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "ab_test_header_cta=B; path=/; max-age=2592000";
  location.reload();
  // Verify: "Assess Your Protocol" button visible in header
  ```

- [ ] **Verify Analytics Tracking**
  - Open browser DevTools Console
  - Navigate through the site
  - Look for `[A/B Test Analytics]` log entries
  - Confirm events are firing:
    - `ab_test_page_view` on page load
    - `ab_test_nav_click` when clicking navigation
    - `ab_test_cta_click` when clicking CTA (variant B)
    - `ab_test_scroll_depth` when scrolling

- [ ] **Test Mobile Responsiveness**
  - Open DevTools and toggle device emulation
  - Resize browser to < 1220px width (76.234375em)
  - Verify CTA button is hidden on mobile
  - Test on actual mobile devices if possible

- [ ] **Cross-Browser Testing**
  - Chrome/Edge ✓
  - Firefox ✓
  - Safari ✓
  - Mobile browsers ✓

### Launch Day

1. **Deploy to production**
   ```bash
   # Deploy g0.html with A/B test implementation
   # Ensure no caching issues (clear CDN cache if applicable)
   ```

2. **Monitor initial traffic**
   - Watch analytics dashboard for first 100-500 visitors
   - Verify 50/50 split distribution
   - Check for JavaScript errors in production monitoring

3. **Confirm tracking**
   - Verify events are being recorded in analytics platform
   - Check that all event types are captured
   - Ensure data is attributed to correct variants

### During Test Period

**Daily Monitoring (First Week):**
- Check variant distribution (should be ~50/50)
- Monitor for any JavaScript errors
- Verify analytics data collection
- Watch for anomalies in metrics

**Weekly Review:**
- Analyze preliminary results (but don't stop early!)
- Check statistical significance
- Review qualitative feedback
- Adjust if critical issues found

**Recommended Test Duration:** 2-4 weeks minimum

### Post-Test Analysis

1. **Collect Final Data**
   - Export data from analytics platform
   - Calculate conversion rates for each variant
   - Determine statistical significance

2. **Key Metrics to Compare:**
   ```
   Variant A vs Variant B:

   - CTA Click Rate (primary metric, B only)
   - Navigation Engagement (clicks per session)
   - Average Time on Page
   - Average Scroll Depth
   - Bounce Rate
   ```

3. **Statistical Analysis:**
   - Use two-proportion z-test for CTR
   - Calculate 95% confidence intervals
   - Check p-value < 0.05 for significance
   - Consider practical significance (effect size)

4. **Make Decision:**
   - **Variant B Wins:** Roll out CTA permanently
   - **Variant A Wins:** Keep original header
   - **Inconclusive:** Consider extending test or redesigning

## 🔧 Quick Configuration Changes

### Change Split Ratio (Default: 50/50)

Edit `g0.html` around line 1060:
```javascript
splitRatio: 0.5,  // Change to 0.7 for 70% A / 30% B
```

### Change CTA Button Text

Edit `g0.html` line 692:
```html
<a class="md-header__cta-button" ...>
  Your Custom Text Here
</a>
```

### Change Cookie Duration (Default: 30 days)

Edit `g0.html` around line 1062:
```javascript
cookieExpiry: 30  // Change to desired number of days
```

### Disable Console Logging (Production)

Comment out line 1111 in `g0.html`:
```javascript
// console.log('[A/B Test Analytics]', event);
```

## 🐛 Troubleshooting

### Issue: CTA button not showing for Variant B

**Check:**
1. Clear cookies and reload
2. Verify variant assignment in console:
   ```javascript
   document.body.getAttribute('data-ab-test-variant')
   ```
3. Check if element exists:
   ```javascript
   document.getElementById('header-cta-test')
   ```
4. Verify display style is set to 'flex' for variant B

### Issue: Analytics events not firing

**Check:**
1. Open browser console for JavaScript errors
2. Verify tracking function exists:
   ```javascript
   typeof trackEvent
   ```
3. Check network tab for API requests (if using custom endpoint)
4. Verify Google Analytics is loaded (if using gtag)

### Issue: Users seeing different variants on different pages

**Expected behavior** - this means cookie isn't persisting.

**Check:**
1. Verify cookies are enabled in browser
2. Check if domain/path is correct in cookie
3. Look for cookie in DevTools > Application > Cookies
4. Verify SameSite attribute compatibility

### Issue: Uneven split distribution

**Check:**
1. Sample size (need significant traffic for 50/50 split)
2. Clear cookies and test assignment multiple times
3. Verify random number generation logic
4. Check for caching issues (CDN, browser cache)

## 📊 Sample Analytics Query

If using SQL-based analytics, here's a sample query template:

```sql
-- Calculate CTA Click-Through Rate by Variant
SELECT
  variant,
  COUNT(DISTINCT user_id) as total_users,
  SUM(CASE WHEN event = 'ab_test_cta_click' THEN 1 ELSE 0 END) as cta_clicks,
  SUM(CASE WHEN event = 'ab_test_nav_click' THEN 1 ELSE 0 END) as nav_clicks,
  AVG(time_on_page) as avg_time_on_page,
  AVG(max_scroll_depth) as avg_scroll_depth,
  (SUM(CASE WHEN event = 'ab_test_cta_click' THEN 1 ELSE 0 END) * 100.0 /
   NULLIF(COUNT(DISTINCT CASE WHEN variant = 'B' THEN user_id END), 0)) as cta_ctr
FROM ab_test_events
WHERE test_name = 'header-cta-visibility'
  AND timestamp >= '2025-11-07'
GROUP BY variant;
```

## 📞 Support

For issues or questions:
1. Review `AB_TEST_README.md` for detailed documentation
2. Check browser console for debug messages
3. Verify implementation against this quick start guide
4. Review `ab-test-config.json` for test configuration

## 🎯 Success Checklist

Before declaring test complete:

- [ ] Minimum sample size reached (200+ per variant)
- [ ] Test ran for at least 2 weeks
- [ ] Statistical significance achieved (p < 0.05)
- [ ] All metrics analyzed (primary + secondary)
- [ ] Results documented and shared with team
- [ ] Decision made on winner
- [ ] Implementation plan created for rollout or rollback

---

**Quick Links:**
- 📖 [Full Documentation](AB_TEST_README.md)
- ⚙️ [Configuration File](ab-test-config.json)
- 🔍 [View Modified File](g0.html)

**Last Updated:** 2025-11-07
