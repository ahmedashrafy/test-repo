# A/B Test Quick Start Guide

## navigation-cta-visibility

Quick reference for managing the Contribute button A/B test.

---

## 🎯 What This Test Does

Tests if adding a prominent "Contribute" button in the header increases GitHub engagement.

**Treatment (Test):** Shows Contribute button next to GitHub link
**Control (Baseline):** No Contribute button (existing behavior)

---

## 🔄 Switch Between Variants

Edit `g0.html` around **line 704**:

### Show Button (Treatment)
```javascript
window.abTestConfig = {
  'navigation-cta-visibility': {
    enabled: true,
    variant: 'treatment',  // ← Test variant
    trackingEnabled: true
  }
};
```

### Hide Button (Control)
```javascript
window.abTestConfig = {
  'navigation-cta-visibility': {
    enabled: true,
    variant: 'control',  // ← Baseline variant
    trackingEnabled: true
  }
};
```

### Disable Test Completely
```javascript
window.abTestConfig = {
  'navigation-cta-visibility': {
    enabled: false,  // ← Test disabled
    variant: 'treatment',
    trackingEnabled: true
  }
};
```

---

## 📊 View Tracking Data

### In Browser Console:
```javascript
// See all events
const events = JSON.parse(localStorage.getItem('ab_test_events_navigation-cta-visibility') || '[]');
console.table(events);

// Clear data
localStorage.removeItem('ab_test_events_navigation-cta-visibility');
```

### Check if Test is Active:
```javascript
isABTestActive('navigation-cta-visibility');
```

---

## ✅ Quick Test Checklist

- [ ] Open page on desktop (width ≥ 960px)
- [ ] Verify button appears in treatment variant
- [ ] Click button and check console for event
- [ ] Click GitHub link and check console for event
- [ ] Resize to mobile and verify button hides
- [ ] Switch to control and verify button disappears

---

## 📈 Key Metrics

**Primary:**
- Click-through rate on Contribute button
- GitHub stars, forks, pull requests

**Tracked Events:**
- `impression` - Button shown to user
- `click` - User clicked button/link

---

## 🚨 Need to Rollback?

1. **Quick:** Change `variant` to `'control'`
2. **Immediate:** Set `enabled` to `false`
3. **Full:** Revert to main branch

---

## 📁 Files Changed

- `g0.html` - All implementation code
- `AB_TEST_README.md` - Full documentation
- `AB_TEST_QUICK_START.md` - This file

---

## 🔗 Links

**Button Target:** https://github.com/crosschainriskframework/crosschainriskframework.github.io

**Test Branch:** `ab-test/navigation-cta-visibility`

---

For complete documentation, see **AB_TEST_README.md**
