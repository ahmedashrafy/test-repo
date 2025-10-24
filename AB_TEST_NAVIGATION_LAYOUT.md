# A/B Test: navigation-layout-test

## Overview
**Test Name:** `navigation-layout-test`
**Test ID:** `navigation-layout-test`
**Created:** 2025-10-24
**Status:** Active

## Hypothesis
Testing whether an always-visible sidebar navigation with horizontal scrolling improves user engagement and reduces bounce rate on mobile devices compared to the default collapsible sidebar behavior.

## Description
This A/B test compares two navigation layout variants on mobile devices:

- **Variant A (Control):** Default collapsible sidebar that requires user interaction (hamburger menu tap) to open
- **Variant B (Treatment):** Always-visible sidebar navigation with horizontal scrolling on mobile devices

## Implementation Details

### Files Modified
- `g0.html` - Main HTML file with embedded CSS and JavaScript

### Key Changes

#### 1. Feature Flag Configuration (Lines 11-43)
Added JavaScript code in the `<head>` section that:
- Randomly assigns users to either `control` or `treatment` variant (50/50 split)
- Stores variant assignment in `sessionStorage` for consistency during the user's session
- Supports manual testing via URL parameter: `?nav_variant=control` or `?nav_variant=treatment`
- Applies variant as `data-ab-variant` attribute on the `<body>` element
- Logs variant assignment to browser console for debugging

#### 2. CSS Variant Styles (Lines 647-717)
Added custom CSS styles that:
- **For Treatment Variant (lines 652-711):**
  - Overrides fixed positioning of sidebar on mobile (max-width: 76.234375em)
  - Converts vertical sidebar to horizontal layout with scrolling
  - Makes navigation items display inline
  - Hides the hamburger menu icon
  - Disables the overlay
- **For Control Variant (lines 713-717):**
  - Maintains default collapsible behavior (no style overrides needed)

### Breakpoints
- Mobile/tablet: `max-width: 76.234375em` (approximately 1220px)
- Desktop: `min-width: 76.25em` - no A/B test applied, uses default behavior

## Test Variants

### Variant A: Control (Default Collapsible Sidebar)
**Behavior:**
- Sidebar hidden by default on mobile devices
- User taps hamburger menu icon to reveal navigation
- Sidebar slides in from left side with overlay
- Tapping outside or close button hides sidebar

**User Experience:**
- Maximizes content viewing area
- Requires extra interaction to access navigation
- Standard mobile pattern (hamburger menu)

### Variant B: Treatment (Always-Visible Sidebar)
**Behavior:**
- Sidebar always visible on mobile devices
- Navigation items displayed horizontally
- Users swipe/scroll horizontally to view all items
- No hamburger menu icon displayed
- No overlay blocking content

**User Experience:**
- Immediate navigation visibility
- No menu interaction required
- May reduce content viewing area
- Horizontal scrolling for long navigation lists

## Testing Instructions

### Manual Testing

#### Test Control Variant:
1. Open `g0.html` in browser with `?nav_variant=control` parameter
2. Resize browser to mobile width (< 1220px)
3. Verify hamburger menu appears
4. Verify sidebar opens when hamburger is clicked
5. Verify overlay appears and sidebar is collapsible

#### Test Treatment Variant:
1. Open `g0.html` in browser with `?nav_variant=treatment` parameter
2. Resize browser to mobile width (< 1220px)
3. Verify sidebar is always visible
4. Verify navigation displays horizontally
5. Verify horizontal scroll works for long nav lists
6. Verify no hamburger menu icon is shown

#### Test Random Assignment:
1. Open `g0.html` without URL parameters
2. Check browser console for variant assignment log
3. Reload page multiple times to verify 50/50 distribution
4. Verify variant persists during session (use sessionStorage)

### Device Testing
Test on actual devices:
- iOS Safari (iPhone 13, iPhone 15)
- Android Chrome (various screen sizes)
- iPad (portrait and landscape)
- Various Android tablets

## Metrics to Track

### Primary Metrics:
1. **User Engagement:**
   - Time on page
   - Pages per session
   - Navigation interaction rate

2. **Bounce Rate:**
   - Overall bounce rate
   - Bounce rate by entry page
   - Single-page session percentage

### Secondary Metrics:
1. **Navigation Usage:**
   - Navigation click-through rate
   - Average navigation items viewed
   - Time to first navigation interaction

2. **User Behavior:**
   - Scroll depth
   - Content engagement
   - Return visitor rate

## Success Criteria
The treatment variant (always-visible sidebar) will be considered successful if:
1. Bounce rate decreases by ≥5% compared to control
2. User engagement (time on page) increases by ≥10%
3. Navigation interaction rate improves
4. No significant negative impact on content consumption

## Rollback Plan
If treatment variant shows negative results:
1. Stop assigning new users to treatment variant
2. Remove A/B test code from `g0.html`
3. Revert to default collapsible sidebar behavior
4. Document learnings and iterate on design

## Technical Notes

### Browser Compatibility:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript required for URLSearchParams
- CSS flexbox and media queries required

### Performance Considerations:
- Minimal JavaScript overhead (runs once on page load)
- CSS uses efficient selectors with variant attribute
- No external dependencies or API calls

### Known Limitations:
1. Variant assignment resets when sessionStorage is cleared
2. No server-side tracking integrated (requires separate analytics)
3. Desktop devices always use default behavior (no A/B test)

## Code Maintenance

### Adding New Navigation Items:
No special handling needed - works with existing HTML structure

### Updating Styles:
- Control variant: Modify default Material theme CSS
- Treatment variant: Update styles in lines 652-711 of g0.html

### Removing A/B Test:
1. Remove JavaScript block (lines 21-43)
2. Remove CSS styles (lines 647-717)
3. Keep winning variant as default behavior

## Results & Analysis
*To be completed after test runs for statistically significant duration*

### Test Duration:
- Start Date: TBD
- End Date: TBD
- Minimum Sample Size: TBD (calculate based on traffic)

### Winner:
- TBD after analysis

## Additional Resources
- Material for MkDocs documentation: https://squidfunk.github.io/mkdocs-material/
- Mobile navigation best practices
- A/B testing statistical significance calculators
