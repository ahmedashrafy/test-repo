# Visual Comparison: Variant A vs Variant B

## Header Layout Comparison

### Variant A (Control) - 50% of Users
```
┌─────────────────────────────────────────────────────────────────────┐
│ [☰] [Logo]  Crosschain Risk Framework            [🔍] [GitHub]     │
│      Navigation Drawer                            Search  Source    │
└─────────────────────────────────────────────────────────────────────┘
```

**Elements (left to right):**
1. Drawer toggle (mobile menu)
2. Logo/site title
3. Page title (dynamic)
4. Search button
5. GitHub source link

---

### Variant B (Treatment) - 50% of Users
```
┌─────────────────────────────────────────────────────────────────────┐
│ [☰] [Logo]  Crosschain Risk Framework    [🔍] [GitHub] [Assess]    │
│      Navigation Drawer                    Search  Source   CTA      │
└─────────────────────────────────────────────────────────────────────┘
```

**Elements (left to right):**
1. Drawer toggle (mobile menu)
2. Logo/site title
3. Page title (dynamic)
4. Search button
5. GitHub source link
6. **NEW: "Assess Your Protocol" CTA button** ← Added element

---

## Button Styling Details

### CTA Button (Variant B Only)

```css
┌────────────────────────────┐
│  Assess Your Protocol  →   │  ← Accent color background
└────────────────────────────┘
     ↑ White text
```

**Visual Properties:**
- **Background:** Accent color (#526cfe - vibrant blue)
- **Text:** White, bold (700 weight)
- **Padding:** Comfortable click target (0.4rem × 1rem)
- **Border Radius:** Slightly rounded (0.2rem)
- **Shadow:** Subtle elevation (2px depth)
- **Font Size:** 0.7rem (matches header elements)

**Hover State:**
```css
┌────────────────────────────┐
│  Assess Your Protocol  →   │  ← Changes to primary color
└────────────────────────────┘
     ↑ Lifts up slightly
     ↑ Shadow increases
```

**Active State:**
```css
┌────────────────────────────┐
│  Assess Your Protocol  →   │  ← Pressed down
└────────────────────────────┘
     ↑ Shadow reduces
```

---

## Responsive Behavior

### Desktop (> 1220px width)

**Variant A:**
```
┌──────────────────────────────────────────────────────────────────────────┐
│  [☰] [Logo]  Crosschain Risk Framework               [🔍] [GitHub]      │
└──────────────────────────────────────────────────────────────────────────┘
```

**Variant B:**
```
┌──────────────────────────────────────────────────────────────────────────┐
│  [☰] [Logo]  Crosschain Risk Framework       [🔍] [GitHub] [Assess]     │
└──────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1220px)

**Variant A:**
```
┌────────────────────────────────────────────────────┐
│  [☰] Crosschain Risk...    [🔍] [GitHub]          │
└────────────────────────────────────────────────────┘
```

**Variant B:** (Same as Variant A - CTA hidden)
```
┌────────────────────────────────────────────────────┐
│  [☰] Crosschain Risk...    [🔍] [GitHub]          │
└────────────────────────────────────────────────────┘
```
*Note: CTA button is HIDDEN to preserve mobile UX*

### Mobile (< 768px)

**Both Variants:** (Identical)
```
┌─────────────────────────────────┐
│  [☰] Risk Framework    [🔍]    │
└─────────────────────────────────┘
```
*Note: CTA button is HIDDEN on mobile*

---

## User Flow Comparison

### Variant A User Journey

1. **Lands on page** → Sees standard header
2. **Wants to assess protocol** → Must:
   - Scroll to find assessment section
   - Use search to find assessment page
   - Navigate through menu structure
3. **Takes action** → Multiple steps required

**Pros:**
- Familiar interface
- Clean, uncluttered header
- Focus on content navigation

**Cons:**
- No clear path to primary action
- Requires user to explore
- Potential friction in conversion

---

### Variant B User Journey

1. **Lands on page** → Sees header with CTA
2. **Wants to assess protocol** → Immediately sees:
   - Prominent "Assess Your Protocol" button
   - Clear call-to-action
   - One-click access
3. **Takes action** → Single click required

**Pros:**
- Clear call-to-action
- Reduced friction
- Guides user to primary goal

**Cons:**
- Additional visual element
- Potential distraction from content
- Slightly busier header

---

## Color Scheme

### Variant A
```
Header Background: #4051b5 (Primary Blue)
├─ Logo/Text: #ffffff (White)
├─ Search Icon: #ffffff (White)
└─ GitHub Link: #ffffff (White)
```

### Variant B
```
Header Background: #4051b5 (Primary Blue)
├─ Logo/Text: #ffffff (White)
├─ Search Icon: #ffffff (White)
├─ GitHub Link: #ffffff (White)
└─ CTA Button:
    ├─ Background: #526cfe (Accent Blue - Brighter)
    ├─ Text: #ffffff (White)
    ├─ Hover: #4051b5 (Primary Blue)
    └─ Shadow: rgba(0,0,0,0.1-0.15)
```

---

## Interaction States

### Normal State (Variant B CTA)
```
┌──────────────────────────┐
│  Assess Your Protocol    │  Background: #526cfe
└──────────────────────────┘  Shadow: 0 2px 4px rgba(0,0,0,0.1)
```

### Hover State
```
┌──────────────────────────┐
│  Assess Your Protocol    │  Background: #4051b5
└──────────────────────────┘  Shadow: 0 4px 8px rgba(0,0,0,0.15)
     ↑ Lifts 1px up            Transform: translateY(-1px)
```

### Active/Click State
```
┌──────────────────────────┐
│  Assess Your Protocol    │  Background: #4051b5
└──────────────────────────┘  Shadow: 0 2px 4px rgba(0,0,0,0.1)
                              Transform: translateY(0)
```

### Focus State (Keyboard Navigation)
```
┌──────────────────────────┐
│  Assess Your Protocol    │  Outline: #526cfe auto
└──────────────────────────┘  Outline-offset: 0.2rem
     ↑ Visible focus ring
```

---

## Accessibility Considerations

### Variant A
✅ Standard navigation accessible
✅ Keyboard navigable
✅ Screen reader friendly
✅ ARIA labels present

### Variant B
✅ All Variant A features PLUS:
✅ CTA button keyboard accessible (tab order)
✅ Clear focus indicators
✅ Semantic HTML (`<a>` element)
✅ Can add aria-label for clarity
✅ Color contrast meets WCAG AA standards

**Recommended Enhancement:**
```html
<a class="md-header__cta-button"
   href="#assess-protocol"
   aria-label="Assess your protocol using the risk framework">
  Assess Your Protocol
</a>
```

---

## Space & Layout

### Variant A Header Spacing
```
Total Width: 100%
├─ Left Section (Logo + Title): ~60%
├─ Spacer: ~20%
└─ Right Section (Search + GitHub): ~20%
```

### Variant B Header Spacing
```
Total Width: 100%
├─ Left Section (Logo + Title): ~50%
├─ Spacer: ~15%
└─ Right Section (Search + GitHub + CTA): ~35%
    ├─ Search: ~25%
    ├─ GitHub: ~25%
    └─ CTA Button: ~50%
```

---

## Animation Timeline

### Variant B CTA Hover Animation
```
Time: 0ms ──────────────────────────────> 250ms
State: Normal                              Hover

Background:  #526cfe ──────────────────> #4051b5
Transform:   Y(0)    ──────────────────> Y(-1px)
Shadow:      2px     ──────────────────> 4px
```

**Easing:** ease-in-out
**Duration:** 250ms
**Properties animated:**
- background-color
- transform (translateY)
- box-shadow

---

## Performance Impact

### Variant A
- **DOM Elements:** Baseline
- **CSS Rules:** Baseline
- **JavaScript:** Baseline tracking only
- **Paint Time:** Baseline

### Variant B
- **DOM Elements:** +2 (container + button)
- **CSS Rules:** +40 lines
- **JavaScript:** Same (CTA-specific tracking)
- **Paint Time:** +<1ms (negligible)
- **Layout Shift:** 0 (button hidden initially)

**Conclusion:** Negligible performance difference

---

## Expected User Perception

### Variant A
**First Impression:**
- "Clean, professional documentation site"
- "Standard navigation pattern"
- "Need to explore to find what I need"

**Cognitive Load:**
- Low (familiar pattern)
- Requires exploration
- Self-directed navigation

### Variant B
**First Impression:**
- "Clear call-to-action stands out"
- "I know where to go to assess"
- "Actionable and directive"

**Cognitive Load:**
- Slightly higher (extra element to process)
- Clear guidance provided
- Reduced decision-making

---

## Hypothesis Validation Metrics

| Metric | Variant A (Expected) | Variant B (Expected) |
|--------|---------------------|---------------------|
| CTA Clicks | N/A | 5-15% of page views |
| Nav Clicks | Baseline | ±5% (maintained) |
| Time on Page | Baseline | +5-10% (improvement) |
| Scroll Depth | Baseline | +5-10% (improvement) |
| Bounce Rate | Baseline | -5-10% (reduction) |

**Success Definition:**
Variant B wins if:
1. CTA receives meaningful clicks (>5% CTR)
2. Navigation engagement maintained (no >5% decrease)
3. Overall engagement metrics neutral or positive

---

## Visual Hierarchy

### Variant A
```
Importance (top to bottom):
1. Site Logo/Title ████████████
2. Page Title       ███████████
3. Search          ████████
4. GitHub Link     ██████
```

### Variant B
```
Importance (top to bottom):
1. CTA Button      ██████████████  ← Most prominent (accent color)
2. Site Logo/Title ████████████
3. Page Title      ███████████
4. Search         ████████
5. GitHub Link    ██████
```

**Strategic Design:**
CTA button intentionally most visually prominent to:
- Draw attention to primary action
- Stand out with accent color
- Encourage engagement with risk framework

---

## Summary

**Key Visual Difference:**
The only visible change is the addition of a prominent, well-styled CTA button in the header for Variant B. This change is:

✅ **Non-intrusive** - Fits naturally in existing layout
✅ **Responsive** - Hidden on mobile to preserve UX
✅ **Accessible** - Keyboard navigable with focus states
✅ **Performant** - Negligible performance impact
✅ **Reversible** - Easy to remove if test fails

**Design Philosophy:**
- Maintain existing design language
- Use established color variables
- Match existing component styles
- Progressive enhancement approach

---

**Document Version:** 1.0
**Last Updated:** 2025-11-07
