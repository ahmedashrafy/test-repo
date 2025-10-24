# Quick Test Instructions for navigation-layout-test

## Quick Start Testing

### Option 1: Test Control Variant (Collapsible Sidebar)
```bash
# Open in browser with control parameter
open g0.html?nav_variant=control
# Or visit: file:///path/to/g0.html?nav_variant=control
```

Expected behavior on mobile (< 1220px width):
- ✓ Hamburger menu icon visible in header
- ✓ Sidebar hidden by default
- ✓ Click hamburger to open sidebar
- ✓ Overlay appears when sidebar opens
- ✓ Sidebar slides in from left

### Option 2: Test Treatment Variant (Always-Visible Sidebar)
```bash
# Open in browser with treatment parameter
open g0.html?nav_variant=treatment
# Or visit: file:///path/to/g0.html?nav_variant=treatment
```

Expected behavior on mobile (< 1220px width):
- ✓ No hamburger menu icon
- ✓ Sidebar always visible
- ✓ Navigation items in horizontal layout
- ✓ Can scroll horizontally through nav items
- ✓ No overlay blocking content

### Option 3: Test Random Assignment
```bash
# Open without parameters for 50/50 random assignment
open g0.html
```

Check browser console to see assigned variant:
```
A/B Test (navigation-layout-test): Variant control active
# or
A/B Test (navigation-layout-test): Variant treatment active
```

## Browser DevTools Testing

### Chrome DevTools:
1. Open g0.html in Chrome
2. Press F12 to open DevTools
3. Click "Toggle device toolbar" (Ctrl+Shift+M)
4. Select mobile device (e.g., iPhone 13)
5. Test both variants using URL parameters above

### Responsive Design Mode:
- Set width to 375px (iPhone size)
- Set width to 768px (iPad size)
- Set width to 1024px (small laptop)
- Set width to 1440px (desktop - should use default behavior)

## Visual Checklist

### Control Variant Checklist:
- [ ] Hamburger menu icon appears on mobile
- [ ] Sidebar is hidden by default
- [ ] Clicking hamburger opens sidebar
- [ ] Sidebar animation is smooth
- [ ] Overlay dims background
- [ ] Clicking overlay closes sidebar
- [ ] Navigation items are vertical
- [ ] Content area is full-width when closed

### Treatment Variant Checklist:
- [ ] No hamburger menu icon on mobile
- [ ] Sidebar is visible immediately
- [ ] Navigation items are horizontal
- [ ] Horizontal scroll works smoothly
- [ ] All nav items are accessible via scroll
- [ ] No overlay blocks content
- [ ] Content area adjusts for visible nav
- [ ] Layout looks clean and organized

## Testing Scenarios

### Scenario 1: First-Time Visitor
1. Clear browser cache and sessionStorage
2. Open g0.html (no parameters)
3. Verify random variant assignment
4. Reload page - variant should persist
5. Check console for variant log

### Scenario 2: Forced Variant Testing
1. Open with `?nav_variant=control`
2. Verify control behavior
3. Switch to `?nav_variant=treatment`
4. Verify treatment behavior
5. Test all breakpoints

### Scenario 3: Session Persistence
1. Open g0.html (random assignment)
2. Note assigned variant
3. Navigate to different pages (if applicable)
4. Verify variant persists in session
5. Open new tab - should get new random assignment

## Common Issues & Solutions

### Issue: Variant not applying
**Solution:** Check browser console for errors, ensure JavaScript is enabled

### Issue: Both variants look the same
**Solution:** Ensure browser width is < 1220px, clear cache

### Issue: Styles not loading
**Solution:** Check that CSS is embedded correctly in g0.html

### Issue: Random assignment always same
**Solution:** Clear sessionStorage: `sessionStorage.clear()`

## Console Commands for Testing

```javascript
// Check current variant
document.body.getAttribute('data-ab-variant')

// Force change variant (requires page reload)
sessionStorage.setItem('navigation-layout-test-variant', 'treatment')
location.reload()

// Clear variant assignment
sessionStorage.removeItem('navigation-layout-test-variant')
location.reload()

// Get random assignment
Math.random() < 0.5 ? 'control' : 'treatment'
```

## Browser Compatibility Test

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (iOS 15+)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## Performance Testing

1. Check page load time for both variants
2. Verify no JavaScript errors in console
3. Test scroll performance on mobile devices
4. Ensure no layout shifts during load

## Accessibility Testing

1. Test keyboard navigation for both variants
2. Verify screen reader compatibility
3. Check focus indicators
4. Test with reduced motion preferences

## Next Steps After Testing

1. Document any issues found
2. Collect user feedback if doing user testing
3. Set up analytics tracking for metrics
4. Monitor real user behavior
5. Analyze results after sufficient sample size
6. Make decision to keep winner
