# Visual Guide: risk-section-order-test A/B Test

## Overview

This visual guide shows exactly what changed between the control and treatment variants of the A/B test.

---

## Page Structure: Before A/B Test

```
┌─────────────────────────────────────────┐
│         Crosschain Risk Framework       │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Introduction Section           │   │
│  │  (not part of A/B test)        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Types of Crosschain           │   │
│  │  Interaction                   │   │
│  │  (not part of A/B test)        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  STAKEHOLDERS Section          │   │  ← Original Position
│  │  - Users                       │   │
│  │  - Liquidity Providers         │   │
│  │  - Bridge-wrapped Token Holders│   │
│  │  - Bridge Validators           │   │
│  │  - Bridge Operators            │   │
│  │  - Bridge Developers           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  SECURITY RISKS Section        │   │  ← Original Position
│  │  - Valid States                │   │
│  │  - Timely Relay                │   │
│  │  - Invariant Preservation      │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## Variant A: Control (Original Order)

**URL:** `g0.html?ab_test_variant=control`

```
┌─────────────────────────────────────────┐
│         Crosschain Risk Framework       │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Introduction Section           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Types of Crosschain           │   │
│  │  Interaction                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ╔═════════════════════════════════╗   │
│  ║  1️⃣  STAKEHOLDERS Section      ║   │  ← FIRST (Control)
│  ║  data-order-control="1"        ║   │
│  ║  ─────────────────────────────  ║   │
│  ║  Who is affected:              ║   │
│  ║  • Users                       ║   │
│  ║  • Liquidity Providers         ║   │
│  ║  • Bridge-wrapped Token Holders║   │
│  ║  • Bridge Validators           ║   │
│  ║  • Bridge Operators            ║   │
│  ║  • Bridge Developers           ║   │
│  ╚═════════════════════════════════╝   │
│                                         │
│  ╔═════════════════════════════════╗   │
│  ║  2️⃣  SECURITY RISKS Section    ║   │  ← SECOND (Control)
│  ║  data-order-control="2"        ║   │
│  ║  ─────────────────────────────  ║   │
│  ║  Technical requirements:       ║   │
│  ║  • Valid States                ║   │
│  ║  • Timely Relay                ║   │
│  ║  • Invariant Preservation      ║   │
│  ╚═════════════════════════════════╝   │
│                                         │
└─────────────────────────────────────────┘

HYPOTHESIS: Starting with "who is affected" helps
readers understand the human context before diving
into technical security details.
```

---

## Variant B: Treatment (New Order)

**URL:** `g0.html?ab_test_variant=treatment`

```
┌─────────────────────────────────────────┐
│         Crosschain Risk Framework       │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Introduction Section           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Types of Crosschain           │   │
│  │  Interaction                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ╔═════════════════════════════════╗   │
│  ║  1️⃣  SECURITY RISKS Section    ║   │  ← FIRST (Treatment) 🔄
│  ║  data-order-treatment="1"      ║   │
│  ║  ─────────────────────────────  ║   │
│  ║  Technical requirements:       ║   │
│  ║  • Valid States                ║   │
│  ║  • Timely Relay                ║   │
│  ║  • Invariant Preservation      ║   │
│  ╚═════════════════════════════════╝   │
│                                         │
│  ╔═════════════════════════════════╗   │
│  ║  2️⃣  STAKEHOLDERS Section      ║   │  ← SECOND (Treatment) 🔄
│  ║  data-order-treatment="2"      ║   │
│  ║  ─────────────────────────────  ║   │
│  ║  Who is affected:              ║   │
│  ║  • Users                       ║   │
│  ║  • Liquidity Providers         ║   │
│  ║  • Bridge-wrapped Token Holders║   │
│  ║  • Bridge Validators           ║   │
│  ║  • Bridge Operators            ║   │
│  ║  • Bridge Developers           ║   │
│  ╚═════════════════════════════════╝   │
│                                         │
└─────────────────────────────────────────┘

HYPOTHESIS: Starting with technical security
requirements provides context for understanding
why different stakeholders are affected.
```

---

## Side-by-Side Comparison

```
┌───────────────────────────┬───────────────────────────┐
│    CONTROL VARIANT        │    TREATMENT VARIANT      │
│    (Original Order)       │    (New Order)            │
├───────────────────────────┼───────────────────────────┤
│  Introduction             │  Introduction             │
│  ↓                        │  ↓                        │
│  Types of Interaction     │  Types of Interaction     │
│  ↓                        │  ↓                        │
│  ╔═══════════════════╗    │  ╔═══════════════════╗    │
│  ║ 1. STAKEHOLDERS   ║    │  ║ 1. SECURITY RISKS ║ 🔄 │
│  ║    (Who)          ║    │  ║    (What)         ║    │
│  ╚═══════════════════╝    │  ╚═══════════════════╝    │
│  ↓                        │  ↓                        │
│  ╔═══════════════════╗    │  ╔═══════════════════╗    │
│  ║ 2. SECURITY RISKS ║    │  ║ 2. STAKEHOLDERS   ║ 🔄 │
│  ║    (What)         ║    │  ║    (Who)          ║    │
│  ╚═══════════════════╝    │  ╚═══════════════════╝    │
└───────────────────────────┴───────────────────────────┘
```

---

## HTML Structure Changes

### Before A/B Test
```html
<h2 id="stakeholders">Stakeholders</h2>
<p>Crosschain protocols can have several distinct stakeholders...</p>
<!-- Content continues -->

<h2 id="security-risks">Security Risks</h2>
<p>At its essence, crosschain communication creates...</p>
<!-- Content continues -->
```

### After A/B Test
```html
<!-- A/B Test: risk-section-order-test -->
<div id="section-container" data-ab-test="risk-section-order-test">

  <!-- Section 1: Stakeholders -->
  <div id="stakeholders-section"
       class="ab-test-section"
       data-section="stakeholders"
       data-order-control="1"      <!-- First in control -->
       data-order-treatment="2">   <!-- Second in treatment -->
    <h2 id="stakeholders">Stakeholders</h2>
    <p>Crosschain protocols can have several distinct stakeholders...</p>
    <!-- Content continues -->
  </div>

  <!-- Section 2: Security Risks -->
  <div id="security-risks-section"
       class="ab-test-section"
       data-section="security-risks"
       data-order-control="2"      <!-- Second in control -->
       data-order-treatment="1">   <!-- First in treatment -->
    <h2 id="security-risks">Security Risks</h2>
    <p>At its essence, crosschain communication creates...</p>
    <!-- Content continues -->
  </div>

</div>
<!-- End A/B Test -->
```

---

## JavaScript Reordering Logic

```javascript
function applySectionOrder(variant) {
  // Get the container
  const container = document.getElementById('section-container');
  const sections = container.querySelectorAll('.ab-test-section');

  // Choose which order attribute to use
  const orderAttr = variant === 'control'
    ? 'data-order-control'   // Control: [1, 2] → Stakeholders, Security
    : 'data-order-treatment'; // Treatment: [2, 1] → Security, Stakeholders

  // Create array with sections and their order
  const sectionsArray = Array.from(sections).map(section => ({
    element: section,
    order: parseInt(section.getAttribute(orderAttr), 10)
  }));

  // Sort by order: [1, 2] or [1, 2] but different elements
  sectionsArray.sort((a, b) => a.order - b.order);

  // Reorder in DOM
  sectionsArray.forEach(item => {
    container.appendChild(item.element);
  });
}
```

### Example Execution

**Control Variant:**
```
Input sections: [stakeholders, security-risks]
Order values:   [1, 2]
After sort:     [stakeholders(1), security-risks(2)]
Result:         Stakeholders → Security Risks
```

**Treatment Variant:**
```
Input sections: [stakeholders, security-risks]
Order values:   [2, 1]
After sort:     [security-risks(1), stakeholders(2)]
Result:         Security Risks → Stakeholders
```

---

## Visual Analytics Flow

```
USER VISITS PAGE
       ↓
   ┌───────────────────────┐
   │ Variant Assignment    │
   │ • Check URL param     │
   │ • Check localStorage  │
   │ • Random assignment   │
   └───────────────────────┘
       ↓
   ┌───────────────────────┐
   │ Section Reordering    │
   │ Control: S → SR       │
   │ Treatment: SR → S     │
   └───────────────────────┘
       ↓
   ┌───────────────────────┐
   │ User Reads Content    │
   │                       │
   │ 📊 TRACKING:          │
   │ • Time on page        │
   │ • Scroll depth        │
   │ • Section visibility  │
   └───────────────────────┘
       ↓
   ┌───────────────────────┐
   │ User Leaves Page      │
   │                       │
   │ 💾 SAVE DATA:         │
   │ • Console log         │
   │ • localStorage        │
   │ • Analytics service   │
   └───────────────────────┘
       ↓
   ┌───────────────────────┐
   │ Analysis              │
   │ • Aggregate metrics   │
   │ • Statistical tests   │
   │ • Determine winner    │
   └───────────────────────┘
```

---

## Metrics Dashboard (Conceptual)

```
┌─────────────────────────────────────────────────────────┐
│  A/B Test: risk-section-order-test                      │
│  Status: Active | Duration: 14 days | Sample: 2,450     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐    │
│  │ CONTROL (A)          │  │ TREATMENT (B)        │    │
│  │ Stakeholders First   │  │ Security First       │    │
│  ├──────────────────────┤  ├──────────────────────┤    │
│  │ Users: 1,225         │  │ Users: 1,225         │    │
│  │ Avg Time: 58s        │  │ Avg Time: 64s        │ ✓  │
│  │ Scroll: 52%          │  │ Scroll: 61%          │ ✓  │
│  │ Bounce: 38%          │  │ Bounce: 29%          │ ✓  │
│  └──────────────────────┘  └──────────────────────┘    │
│                                                          │
│  Treatment Improvement:                                  │
│  • Time on Page: +10.3% ✓ (Target: +10%)               │
│  • Scroll Depth: +17.3% ✓ (Target: +15%)               │
│  • Bounce Rate:  -23.7% ✓ (Target: -20%)               │
│                                                          │
│  Statistical Significance: p = 0.023 ✓ (< 0.05)        │
│  Confidence: 95%                                         │
│                                                          │
│  [📊 View Details] [📥 Export Data] [🏁 End Test]      │
└─────────────────────────────────────────────────────────┘
```

---

## Testing Workflow

```
┌─────────────────────────────────────────────────┐
│ STEP 1: Test Control Variant                   │
├─────────────────────────────────────────────────┤
│ 1. Open: g0.html?ab_test_variant=control      │
│ 2. Verify order: Stakeholders → Security       │
│ 3. Check console logs                           │
│ 4. Inspect DOM attributes                       │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ STEP 2: Test Treatment Variant                 │
├─────────────────────────────────────────────────┤
│ 1. Open: g0.html?ab_test_variant=treatment    │
│ 2. Verify order: Security → Stakeholders       │
│ 3. Check console logs                           │
│ 4. Inspect DOM attributes                       │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ STEP 3: Test Random Assignment                 │
├─────────────────────────────────────────────────┤
│ 1. Clear localStorage                           │
│ 2. Open: g0.html (no params)                   │
│ 3. Note variant in console                      │
│ 4. Reload → should stay same                    │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ STEP 4: Test Analytics Tracking                │
├─────────────────────────────────────────────────┤
│ 1. Open page with either variant                │
│ 2. Scroll through content                       │
│ 3. Wait for time intervals                      │
│ 4. Check console for events                     │
│ 5. Close tab                                     │
│ 6. Check localStorage for data                  │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ ✅ ALL TESTS PASSED - READY TO DEPLOY          │
└─────────────────────────────────────────────────┘
```

---

## Browser DevTools Guide

### Console Output Example
```
[A/B Test Event] {
  timestamp: 1699999999999,
  event: "page_load",
  variant: "treatment",
  testName: "risk-section-order-test",
  sessionId: "1699999999999-abc123def",
  data: {
    url: "https://example.com/g0.html",
    referrer: ""
  }
}

A/B Test applied: risk-section-order-test Variant: treatment

[A/B Test Event] {
  timestamp: 1700000010000,
  event: "time_on_page",
  variant: "treatment",
  data: { seconds: 10 }
}

[A/B Test Event] {
  timestamp: 1700000025000,
  event: "scroll_depth",
  variant: "treatment",
  data: { depth: 45 }
}
```

### DOM Inspection
```html
<body data-ab-test="risk-section-order-test"
      data-ab-variant="treatment">
  ...
  <div id="section-container"
       data-variant="treatment"
       data-ab-test="risk-section-order-test">

    <!-- These divs are reordered by JavaScript -->
    <div id="security-risks-section" ...>   <!-- Appears FIRST -->
    <div id="stakeholders-section" ...>     <!-- Appears SECOND -->
  </div>
  ...
</body>
```

### LocalStorage Inspection
```javascript
// Application tab → Local Storage → your-domain

Key: ab_test_risk-section-order-test
Value: "treatment"

Key: ab_test_risk-section-order-test_analytics_1699999999999-abc123def
Value: { testName: "...", variant: "treatment", ... }
```

---

## Success! 🎉

The A/B test has been successfully implemented with:
- ✅ Clean, maintainable code
- ✅ Comprehensive tracking
- ✅ Easy testing via URL parameters
- ✅ Detailed documentation
- ✅ Ready for production deployment

**Next:** Deploy to production and start collecting data!

---

*Generated: 2025*
*Test: risk-section-order-test*
*Status: Implementation Complete*
