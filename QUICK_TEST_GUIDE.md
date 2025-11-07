# Quick Testing Guide: intro-content-length-test

## Quick Start Testing

### 1. Enable Debug Mode (Recommended for testing)

Edit `g0.html` line 1157:
```javascript
enableDebug: true  // Change from false to true
```

### 2. Open in Browser

Open `g0.html` in your web browser. You'll see a debug panel in the bottom-right corner.

### 3. Test Both Variants

**Variant A (Full Introduction)**:
- Shows all 6 paragraphs of introduction text immediately
- No "Read more" button
- Traditional format

**Variant B (Condensed Introduction)**:
- Shows 3 key bullet points
- Has "Read full introduction" button
- Click button to expand/collapse full content

### 4. Switch Between Variants

Click the "Switch Variant" button in the debug panel to toggle between A and B.

## What to Check

### Visual Checks
- [ ] Both variants display properly
- [ ] Variant B button works (expand/collapse)
- [ ] Animations are smooth
- [ ] Styling matches the page design
- [ ] Text is readable and properly formatted

### Functional Checks
- [ ] Variant assignment persists on page reload
- [ ] Scroll tracking works (check debug panel)
- [ ] Time counter updates every second
- [ ] Console shows tracking events
- [ ] Cookie is set in browser

### Browser Console

Open Developer Tools (F12) and check Console tab:
- Should see `[A/B Test Initialized]` message
- Should see `[A/B Test Event]` messages as you interact
- Should see `[A/B Test Data]` on page leave

## Common Issues

### "Nothing happens / No variant shown"
- Check browser console for JavaScript errors
- Verify the script is loading (lines 1140-1458)
- Check that element with id="ab-test-intro" exists

### "Same variant always shows"
- Clear cookies: Application → Cookies → Delete `ab_test_intro_variant`
- Use Incognito/Private mode for fresh session
- Use debug mode "Switch Variant" button

### "Button doesn't work"
- Check browser console for errors
- Verify you're testing Variant B
- Make sure JavaScript is enabled

## Quick Reset

To start fresh:
1. Open Developer Tools (F12)
2. Application tab → Cookies
3. Delete `ab_test_intro_variant` cookie
4. Refresh page

Or run in console:
```javascript
document.cookie = "ab_test_intro_variant=; path=/; max-age=0";
location.reload();
```

## Force Specific Variant

### Always show Variant A:
```javascript
document.cookie = "ab_test_intro_variant=variant-a; path=/; max-age=2592000";
location.reload();
```

### Always show Variant B:
```javascript
document.cookie = "ab_test_intro_variant=variant-b; path=/; max-age=2592000";
location.reload();
```

## Expected Behavior

### On First Visit
1. Random variant assigned (50/50 chance)
2. Cookie created for 30 days
3. Tracking starts immediately
4. Scroll depth updates as you scroll
5. Time counter increments every second

### On Variant B
1. See 3 condensed paragraphs with bold headings
2. See "Read full introduction" button
3. Click button → content expands smoothly
4. Button text changes to "Hide full introduction"
5. Click again → content collapses

### On Page Leave
1. Final tracking data logged to console
2. Can be sent to analytics server (currently logs only)

## Debug Panel Info

- **Variant**: Current variant (variant-a or variant-b)
- **Scroll**: Maximum scroll depth percentage (0-100%)
- **Time**: Seconds spent on page
- **Switch Variant**: Button to toggle between variants

## Disable Debug Mode

When ready for production:

Edit `g0.html` line 1157:
```javascript
enableDebug: false  // Change back to false
```

This hides the debug panel but keeps all tracking active.

## Need More Help?

See `AB_TEST_README.md` for complete documentation.
