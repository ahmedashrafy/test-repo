# Visual Comparison: Single-Column vs Two-Column Layout

## Quick Reference

| Aspect | Variant A (Control) | Variant B (Treatment) |
|--------|--------------------|-----------------------|
| **Layout** | Single-column, full width | Two-column (desktop only) |
| **Line Length** | Long (full content width) | Shorter (half content width) |
| **Screen Width Threshold** | N/A | 1200px minimum |
| **Column Gap** | N/A | 2rem |
| **Column Separator** | N/A | 1px solid line |
| **Mobile/Tablet** | Single column | Single column |
| **URL Test** | `?variant=a` | `?variant=b` |

## Variant A: Single-Column Layout (Current/Default)

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                           │
├─────────────────────────────────────────────────────┤
│ Sidebar │                                           │
│   Nav   │          Full Width Content              │
│         │                                           │
│  Menu   │  Lorem ipsum dolor sit amet, consectetur │
│ Items   │  adipiscing elit. Sed do eiusmod tempor  │
│         │  incididunt ut labore et dolore magna    │
│ • Link1 │  aliqua. Ut enim ad minim veniam, quis   │
│ • Link2 │  nostrud exercitation ullamco laboris... │
│ • Link3 │                                           │
│         │  This is a very long line of text that   │
│         │  spans the entire width of the content   │
│         │  area, which can sometimes make reading   │
│         │  difficult for users on wide screens.    │
│         │                                           │
└─────────┴───────────────────────────────────────────┘
```

**Characteristics:**
- Traditional documentation layout
- Content spans full available width
- Long line lengths on wide screens
- Can be harder to read on large monitors

## Variant B: Two-Column Layout (New)

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                           │
├─────────────────────────────────────────────────────┤
│ Sidebar │                                           │
│   Nav   │    Column 1         │    Column 2        │
│         │                     │                    │
│  Menu   │  Lorem ipsum dolor  │  aliqua. Ut enim  │
│ Items   │  sit amet, consect- │  ad minim veniam, │
│         │  etur adipiscing    │  quis nostrud     │
│ • Link1 │  elit. Sed do eius- │  exercitation     │
│ • Link2 │  mod tempor incidi- │  ullamco laboris  │
│ • Link3 │  dunt ut labore et  │  nisi ut aliquip  │
│         │  dolore magna       │  ex ea commodo... │
│         │                     │                    │
└─────────┴─────────────────────┴────────────────────┘
```

**Characteristics:**
- Newspaper/magazine-style layout
- Shorter line lengths (easier to scan)
- Content flows naturally between columns
- Better readability on wide screens
- Automatic revert to single column on smaller screens

## Responsive Behavior

### Desktop (≥1200px)
**Variant A:** Single column (full width)
**Variant B:** Two columns with 2rem gap

### Tablet (768px - 1199px)
**Both Variants:** Single column (full width)

### Mobile (<768px)
**Both Variants:** Single column (full width)

## Column Break Intelligence (Variant B)

### Elements That DON'T Break Across Columns
```
┌─────────────┬─────────────┐
│             │             │
│ # Heading 1 │             │
│ ─────────── │  [Content   │
│             │   continues │
│ Paragraph   │   here]     │
│ text flows  │             │
│ naturally   │             │
│             │             │
└─────────────┴─────────────┘
```

Protected elements:
- ✓ Headings (h1, h2, h3, h4)
- ✓ Code blocks
- ✓ Tables
- ✓ Figures/Images
- ✓ Admonition boxes
- ✓ Highlighted content

### Elements That CAN Break Naturally
```
┌─────────────┬─────────────┐
│             │             │
│ Paragraph   │ continues   │
│ text can    │ in the next │
│ flow from   │ column...   │
│ one column  │             │
│ and         │             │
│             │             │
└─────────────┴─────────────┘
```

## Real-World Example

### Before (Variant A)
```
Introduction
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With several layer-one protocols gaining meaningful
traction over the last few years and layer-two
protocols taking center stage in the scalability
roadmap for Ethereum, it is increasingly becoming
clear that the future will be multichain...
```

### After (Variant B)
```
Introduction
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With several layer-one      │  protocols taking center
protocols gaining meaningful │  stage in the scalability
traction over the last few   │  roadmap for Ethereum, it
years and layer-two          │  is increasingly becoming
                             │  clear that the future
                             │  will be multichain...
```

## Expected Benefits (Hypothesis)

### Variant B Two-Column Layout May Improve:

1. **Readability**
   - Optimal line length (45-75 characters)
   - Reduced eye movement
   - Less fatigue on wide screens

2. **Scanning**
   - Easier to skim content
   - Better visual hierarchy
   - More content visible at once

3. **Engagement**
   - Higher reading completion
   - Longer time on page
   - Better comprehension

4. **Professional Appearance**
   - Modern editorial design
   - Better use of white space
   - More polished look

## Testing the Variants

### Force Variant A (Single Column)
```
http://yoursite.com/g0.html?variant=a
```

### Force Variant B (Two Columns)
```
http://yoursite.com/g0.html?variant=b
```

### Random Assignment
```
http://yoursite.com/g0.html
```
(Clears cookies to get new random assignment)

## Browser DevTools Inspection

### Check Current Variant
Open browser console and look for:
```
[A/B Test] content-layout-single-vs-two-column: variant a
```
or
```
[A/B Test] content-layout-single-vs-two-column: variant b
```

### Check Data Attribute
In Elements/Inspector tab, look at `<body>` tag:
```html
<body dir="ltr" data-ab-variant="b">
```

### Check Cookie
In Application/Storage tab, find cookie:
- Name: `ab_test_content_layout`
- Value: `a` or `b`
- Max-Age: 30 days

## CSS Class Reference

### Selector for Variant B Styles
```css
[data-ab-variant="b"] .md-content__inner article {
  /* Two-column styles here */
}
```

### Media Query Constraint
```css
@media screen and (min-width: 1200px) {
  /* Styles only apply at this width and above */
}
```

## Performance Considerations

- **CSS:** Minimal impact - simple column properties
- **JavaScript:** Executes once on page load (~1ms)
- **Rendering:** No layout shift - variant applied before render
- **Load Time:** Negligible difference between variants

## Accessibility Notes

- Both variants maintain proper semantic HTML structure
- Screen readers read content in correct order
- Keyboard navigation works identically
- Color contrast maintained in both variants
- Column separator uses accessible colors

## Next Steps

1. **Deploy:** Push changes to staging/production
2. **Monitor:** Track metrics for both variants
3. **Analyze:** Compare user engagement and readability metrics
4. **Decide:** Choose winning variant or iterate further
5. **Implement:** Roll out winning variant permanently

## Additional Resources

- See `AB_TEST_README.md` for complete documentation
- See `IMPLEMENTATION_SUMMARY.md` for technical details
- Review `g0.html` for actual implementation code
