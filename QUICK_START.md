# Navigation A/B Test - Quick Start Guide

## 🚀 What Was Implemented

An A/B test comparing **flat navigation** (control) vs. **nested expandable navigation** (variant).

---

## 🎯 Quick Test

### View Flat Navigation (Control)
```
http://yoursite.com/g0.html?nav_variant=flat
```

### View Nested Navigation (Variant)
```
http://yoursite.com/g0.html?nav_variant=nested
```

### View Random Assignment (Production Behavior)
```
http://yoursite.com/g0.html
```

---

## 📊 Check Metrics in Browser Console

```javascript
// View current test variant
console.log(window.abTestMetrics.variant);  // "flat" or "nested"

// View all metrics
console.log(window.abTestMetrics);

// View tracked events
console.log(window.abTestMetrics.events);
```

---

## 🔧 Configuration

Edit in g0.html around line 1111:

```javascript
const AB_TEST_CONFIG = {
  testName: 'navigation-structure-test',
  testId: 'nav-structure-v1',
  variants: {
    CONTROL: 'flat',
    VARIANT_B: 'nested'
  },
  forceVariant: null  // Set to 'flat' or 'nested' to force a variant
};
```

---

## 📈 Tracked Metrics

1. **Time on page** - How long users stay
2. **Sections explored** - Number of unique sections clicked
3. **Scroll depth** - How far users scroll (0-100%)
4. **Navigation clicks** - Total navigation interactions

---

## 🔄 Reset Test Assignment

```javascript
// In browser console
localStorage.clear();
// Then reload page
```

---

## ✅ What to Check

- [ ] Both variants display correctly
- [ ] Navigation items are clickable
- [ ] Nested variant sections expand/collapse
- [ ] Metrics appear in console
- [ ] Variant assignment persists across page reloads

---

## 📝 Files Modified

- **g0.html** - All changes in one file
  - Lines 721-810: Navigation HTML
  - Lines 612-654: CSS styling
  - Lines 1095-1372: JavaScript logic

---

## 🐛 Troubleshooting

### Both variants showing?
- Check browser console for errors
- Verify CSS loaded properly

### Metrics not tracking?
- Open browser console (F12)
- Look for `[A/B Test]` logs
- Check `window.abTestMetrics`

### Want to change variant?
- Add URL parameter: `?nav_variant=nested`
- Or clear localStorage: `localStorage.clear()`

---

## 🚢 Production Deployment

1. **Configure analytics endpoint** (line ~1193):
   ```javascript
   fetch('/api/analytics', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(event)
   });
   ```

2. **Deploy g0.html** to production

3. **Monitor metrics** in your analytics platform

4. **Run for 1-2 weeks** to collect sufficient data

5. **Analyze results** and choose winning variant

6. **Deploy winner** to 100% of users

---

## 📚 Full Documentation

- **NAVIGATION_AB_TEST_README.md** - Complete usage guide
- **AB_TEST_SUMMARY.md** - Implementation details

---

## 💡 Tips

- Test both variants manually before production
- Monitor console for any JavaScript errors
- Use URL parameters for easy testing
- Clear localStorage to test new user experience
- Check metrics collection in console

---

**Need Help?** Check the full README or browser console for debug info.
