# A/B Test: Content Layout (Single-Column vs Two-Column)

## Overview
This A/B test compares a single-column content layout (Variant A) against a two-column layout (Variant B) to determine which provides better readability and user engagement.

## Test Details

### Test Name
`content-layout-single-vs-two-column`

### Hypothesis
A two-column layout for main content sections on wider screens (>1200px) will improve content readability and comprehension by reducing line length, making it easier for users to scan and read long-form content.

### Variants

#### Variant A (Control): Single-Column Layout
- Full-width content layout (default behavior)
- Long lines of text that span the entire content area
- Traditional documentation style

#### Variant B (Treatment): Two-Column Layout
- Content displayed in 2 columns on screens wider than 1200px
- 2rem gap between columns
- Visual column separator line
- Intelligent column breaks that avoid splitting:
  - Headings (h1-h4)
  - Code blocks
  - Admonitions/callouts
  - Figures
  - Tables

## Implementation Details

### Files Modified
- `g0.html` - Main HTML file with A/B test implementation

### Technical Implementation

1. **Variant Assignment**
   - 50/50 random split for new users
   - Assignment stored in cookie (`ab_test_content_layout`) for 30 days
   - URL parameter override: `?variant=a` or `?variant=b`

2. **CSS Implementation**
   - Media query restricts two-column layout to screens ≥1200px
   - Uses CSS columns with `column-count: 2`
   - Column gap: 2rem
   - Column rule (separator line) for visual clarity
   - Break-inside prevention for important elements

3. **JavaScript Logic**
   - Immediately invoked function expression (IIFE) for encapsulation
   - Cookie-based variant persistence
   - URL parameter support for testing/debugging
   - Data attribute (`data-ab-variant`) applied to `<body>` tag
   - Console logging for debugging
   - Google Analytics integration ready (gtag event)

### Usage

#### Testing Specific Variants
To test a specific variant, append the URL parameter:

- **Variant A (Single-column)**: `http://yoursite.com/g0.html?variant=a`
- **Variant B (Two-column)**: `http://yoursite.com/g0.html?variant=b`

#### Clearing Assignment
To clear the variant assignment and get a fresh random assignment:
1. Clear browser cookies for the site
2. Or delete the specific cookie: `ab_test_content_layout`

### Analytics Integration

The implementation includes hooks for analytics tracking:

```javascript
// Automatically logged to console
console.log('[A/B Test] content-layout-single-vs-two-column: variant ' + variant);

// Google Analytics integration (if gtag is available)
window.gtag('event', 'ab_test_exposure', {
  'test_name': 'content_layout_single_vs_two_column',
  'variant': variant
});
```

### Metrics to Track

**Primary Metrics:**
- Time on page
- Scroll depth
- Reading completion rate

**Secondary Metrics:**
- Bounce rate
- Page engagement (clicks, interactions)
- Exit rate
- Conversion rate (if applicable)

**Qualitative Metrics:**
- User feedback/surveys
- Usability testing observations

## Browser Compatibility

The implementation uses modern web standards:
- CSS Multi-column Layout (widely supported)
- ES6 JavaScript (can be transpiled if needed)
- URLSearchParams API
- Cookie API

**Minimum Browser Support:**
- Chrome 50+
- Firefox 52+
- Safari 10+
- Edge 15+

## Code Quality Features

1. **Clean and Well-Documented**
   - Inline comments explaining functionality
   - Clear variable naming
   - Structured code organization

2. **Follows Existing Code Style**
   - Consistent with Material for MkDocs styling
   - Uses existing CSS custom properties
   - Respects responsive design patterns

3. **Feature Flags**
   - URL parameter support for manual testing
   - Cookie-based persistence
   - Easy to enable/disable via URL

4. **Graceful Degradation**
   - Falls back to single-column on smaller screens
   - No JavaScript errors if analytics is unavailable
   - Progressive enhancement approach

## Testing Checklist

- [ ] Test Variant A on desktop (>1200px width)
- [ ] Test Variant B on desktop (>1200px width)
- [ ] Verify single-column layout on mobile/tablet (<1200px)
- [ ] Test URL parameter override (?variant=a and ?variant=b)
- [ ] Verify cookie persistence across page reloads
- [ ] Check console logging for variant assignment
- [ ] Test column breaks with various content types
- [ ] Verify responsive behavior when resizing window
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify analytics tracking (if integrated)

## Rollback Plan

To rollback the A/B test:

1. Remove the added `<style>` block (lines 612-644 in g0.html)
2. Remove the added `<script>` block (lines 645-719 in g0.html)
3. Restore the original spacing between `</style>` and `</head>`

Or simply revert the commit on this branch:
```bash
git revert HEAD
```

## Future Enhancements

- Server-side variant assignment for better performance
- Integration with A/B testing platforms (Optimizely, Google Optimize, etc.)
- More sophisticated column break logic
- Mobile-specific optimizations
- Multi-variant testing (3+ columns, different gaps, etc.)

## Notes

- The two-column layout only activates on screens wider than 1200px to ensure readability
- Column breaks are intelligently handled to avoid splitting important content blocks
- The test is non-intrusive and doesn't require backend changes
- Results should be analyzed after sufficient sample size and time period
