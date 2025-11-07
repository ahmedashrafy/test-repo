# Navigation A/B Test Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Visits Page                      │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Check for Variant Assignment                    │
│  1. URL parameter (?nav_variant=flat|nested)                │
│  2. Config override (forceVariant)                           │
│  3. localStorage (previous assignment)                       │
│  4. Random assignment (50/50 split) → Store in localStorage  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
         ┌────────────────┴────────────────┐
         │                                  │
         ▼                                  ▼
┌──────────────────┐              ┌──────────────────┐
│   VARIANT A      │              │   VARIANT B      │
│   (Control)      │              │   (Treatment)    │
│                  │              │                  │
│  Flat List Nav   │              │  Nested Nav      │
│  ▪ Introduction  │              │  ▸ Getting Start │
│  ▪ Categories... │              │    - Intro...    │
│  ▪ Network Con...│              │  ▸ Risk Framewrk │
│  ▪ Protocol Arc..│              │    - Categories..│
└────────┬─────────┘              └────────┬─────────┘
         │                                  │
         └────────────────┬─────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Metrics Tracking                          │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Time on Page │  │ Nav Clicks   │  │ Scroll Depth │      │
│  │ (continuous) │  │ (on click)   │  │ (debounced)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Sections     │  │ Section      │  │ Page View    │      │
│  │ Explored     │  │ Toggles      │  │ Events       │      │
│  │ (Variant B)  │  │ (Variant B)  │  │ (all)        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                Analytics Transmission                         │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Real-time: trackEvent() → sendToAnalytics()        │     │
│  │  ▪ Google Analytics (gtag)                         │     │
│  │  ▪ Custom endpoint (fetch)                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │ On page unload: Beacon API                         │     │
│  │  → /api/ab-test-metrics (final metrics)            │     │
│  └────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         g0.html                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │              CSS (Lines 612-654)               │         │
│  │                                                 │         │
│  │  ▪ Navigation item styling                     │         │
│  │  ▪ Expand/collapse animations                  │         │
│  │  ▪ Variant visibility control                  │         │
│  │  ▪ Icon rotation transitions                   │         │
│  └────────────────────────────────────────────────┘         │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │              HTML (Lines 765-854)              │         │
│  │                                                 │         │
│  │  Control Items (.nav-control-item)             │         │
│  │  ├─ Introduction                                │         │
│  │  ├─ Categories of Risk                          │         │
│  │  ├─ Network Consensus Risk                      │         │
│  │  └─ Protocol Architecture Risk                  │         │
│  │                                                 │         │
│  │  Variant Items (.nav-variant-item)             │         │
│  │  ├─ Getting Started (expandable)                │         │
│  │  │  └─ Introduction                             │         │
│  │  └─ Risk Framework (expandable)                 │         │
│  │     ├─ Categories of Risk                       │         │
│  │     ├─ Network Consensus Risk                   │         │
│  │     └─ Protocol Architecture Risk               │         │
│  └────────────────────────────────────────────────┘         │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │          JavaScript (Lines 1095-1372)          │         │
│  │                                                 │         │
│  │  AB_TEST_CONFIG                                 │         │
│  │  ├─ testName: 'navigation-structure-test'      │         │
│  │  ├─ testId: 'nav-structure-v1'                 │         │
│  │  ├─ variants: { CONTROL, VARIANT_B }           │         │
│  │  └─ forceVariant: null                          │         │
│  │                                                 │         │
│  │  Core Functions                                 │         │
│  │  ├─ assignVariant()                             │         │
│  │  ├─ trackEvent()                                │         │
│  │  ├─ sendToAnalytics()                           │         │
│  │  ├─ calculateScrollDepth()                      │         │
│  │  ├─ trackScrollDepth()                          │         │
│  │  ├─ trackNavigationClicks()                     │         │
│  │  ├─ trackTimeOnPage()                           │         │
│  │  └─ initializeABTest()                          │         │
│  │                                                 │         │
│  │  Event Listeners                                │         │
│  │  ├─ scroll (debounced, 100ms)                   │         │
│  │  ├─ click (navigation items)                    │         │
│  │  ├─ beforeunload (final metrics)                │         │
│  │  └─ DOMContentLoaded (initialization)           │         │
│  └────────────────────────────────────────────────┘         │
└───────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
User Action → Event Detection → Track Event → Store Metrics → Send Analytics
     │              │                │              │               │
     │              │                │              │               ▼
     │              │                │              │        ┌──────────────┐
     │              │                │              │        │   Google     │
     │              │                │              │        │  Analytics   │
     │              │                │              │        └──────────────┘
     │              │                │              │               │
     │              │                │              │               ▼
     │              │                │              │        ┌──────────────┐
     │              │                │              │        │   Custom     │
     │              │                │              │        │   Endpoint   │
     │              │                │              │        └──────────────┘
     │              │                │              │
     │              │                │              ▼
     │              │                │        ┌──────────────┐
     │              │                │        │  metrics obj │
     │              │                │        │  - events[]  │
     │              │                │        │  - clicks    │
     │              │                │        │  - scrolls   │
     │              │                │        │  - time      │
     │              │                │        └──────────────┘
     │              │                │
     │              │                ▼
     │              │         ┌──────────────┐
     │              │         │   Event      │
     │              │         │   Object     │
     │              │         │ {timestamp,  │
     │              │         │  event,      │
     │              │         │  variant,    │
     │              │         │  data...}    │
     │              │         └──────────────┘
     │              │
     │              ▼
     │       ┌──────────────┐
     │       │  addEventListener
     │       │  - scroll    │
     │       │  - click     │
     │       │  - unload    │
     │       └──────────────┘
     │
     ▼
┌──────────────┐
│ User Actions │
│ - Scroll     │
│ - Click nav  │
│ - Toggle sec │
│ - Time spent │
│ - Leave page │
└──────────────┘
```

---

## Variant Assignment Logic

```
                    ┌──────────────┐
                    │ Page Loads   │
                    └──────┬───────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ URL param exists?    │
                │ ?nav_variant=X       │
                └──────┬───────────────┘
                       │
            ┌──────────┴──────────┐
            │ YES                 │ NO
            ▼                     ▼
    ┌──────────────┐    ┌──────────────────┐
    │ Use URL      │    │ Config override? │
    │ parameter    │    │ forceVariant     │
    └──────────────┘    └──────┬───────────┘
            │                   │
            │        ┌──────────┴──────────┐
            │        │ YES                 │ NO
            │        ▼                     ▼
            │  ┌──────────────┐  ┌──────────────────┐
            │  │ Use config   │  │ localStorage     │
            │  │ override     │  │ exists?          │
            │  └──────────────┘  └──────┬───────────┘
            │        │                   │
            │        │        ┌──────────┴──────────┐
            │        │        │ YES                 │ NO
            │        │        ▼                     ▼
            │        │  ┌──────────────┐  ┌──────────────────┐
            │        │  │ Use stored   │  │ Random assign    │
            │        │  │ assignment   │  │ Math.random()<0.5│
            │        │  └──────────────┘  │ Store in         │
            │        │        │           │ localStorage     │
            │        │        │           └────────┬─────────┘
            │        │        │                    │
            └────────┴────────┴────────────────────┘
                           │
                           ▼
                 ┌──────────────────┐
                 │ Apply variant    │
                 │ data-nav-variant │
                 │ = 'flat'/'nested'│
                 └──────────────────┘
```

---

## Metrics Collection Timeline

```
Page Load
│
├─ 0ms ────────────► page_view event
│                    ▪ variant assigned
│                    ▪ URL captured
│
├─ [continuous] ───► scroll tracking (debounced)
│                    ▪ 25% milestone
│                    ▪ 50% milestone
│                    ▪ 75% milestone
│                    ▪ 90% milestone
│                    ▪ 100% milestone
│
├─ [on click] ─────► navigation_click event
│                    ▪ link text
│                    ▪ total clicks
│                    ▪ time on page
│
├─ [on toggle] ────► section_toggle event (Variant B only)
│                    ▪ section name
│                    ▪ sections explored
│                    ▪ total toggles
│
├─ 10,000ms ───────► time_on_page snapshot (10s)
│
├─ 30,000ms ───────► time_on_page snapshot (30s)
│
├─ 60,000ms ───────► time_on_page snapshot (1m)
│
├─ 120,000ms ──────► time_on_page snapshot (2m)
│
└─ Page Unload ────► Final metrics via Beacon API
                     ▪ total time
                     ▪ max scroll depth
                     ▪ total clicks
                     ▪ sections explored
```

---

## CSS Variant Switching

```
HTML Attribute: data-nav-variant
│
├─ "flat" (Control)
│  │
│  ├─ .nav-control-item { display: visible }
│  └─ .nav-variant-item { display: none !important }
│
└─ "nested" (Variant B)
   │
   ├─ .nav-control-item { display: none !important }
   └─ .nav-variant-item { display: block !important }
      │
      └─ .md-nav__item--nested
         │
         ├─ .md-nav__toggle:unchecked
         │  └─ .md-nav { max-height: 0 }
         │
         └─ .md-nav__toggle:checked
            ├─ .md-nav { max-height: 500px }
            └─ .md-nav__icon { transform: rotate(90deg) }
```

---

## Integration Points

```
┌──────────────────────────────────────────────────┐
│              External Systems                     │
├──────────────────────────────────────────────────┤
│                                                   │
│  Google Analytics (gtag)                         │
│  └─ Auto-detected via typeof gtag !== 'undefined'│
│     Events sent with category/label/data         │
│                                                   │
│  Custom Analytics Endpoint                       │
│  └─ POST /api/analytics                          │
│     Content-Type: application/json               │
│     Body: { event data }                         │
│                                                   │
│  Final Metrics Endpoint                          │
│  └─ POST /api/ab-test-metrics (Beacon API)      │
│     Content-Type: application/json               │
│     Body: { final metrics summary }              │
│                                                   │
│  localStorage                                     │
│  └─ Key: 'ab_test_nav-structure-v1'             │
│     Value: 'flat' | 'nested'                     │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## Testing Flow

```
Developer Testing
│
├─ Manual Testing
│  ├─ Open ?nav_variant=flat
│  ├─ Open ?nav_variant=nested
│  └─ Check console.log output
│
├─ Metrics Verification
│  ├─ window.abTestMetrics
│  ├─ window.abTestMetrics.events
│  └─ window.abTestConfig
│
└─ Reset Testing
   └─ localStorage.clear()
      └─ Reload page

Production Testing
│
├─ Analytics Verification
│  ├─ Check Google Analytics dashboard
│  ├─ Verify custom endpoint receives data
│  └─ Monitor Beacon API calls
│
├─ Variant Distribution
│  └─ Verify ~50/50 split
│
└─ Performance Monitoring
   ├─ JavaScript errors
   ├─ Page load time
   └─ User experience
```

---

## Decision Tree for Rollout

```
                 ┌──────────────────┐
                 │ Collect Metrics  │
                 │ (1-2 weeks)      │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Analyze Results  │
                 └────────┬─────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐
    │ Variant B Wins   │    │ Variant A Wins   │
    │ (Nested better)  │    │ (Flat better)    │
    └────────┬─────────┘    └────────┬─────────┘
             │                       │
             ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐
    │ Deploy nested    │    │ Keep flat        │
    │ to 100%          │    │ (no changes)     │
    │                  │    │                  │
    │ Set forceVariant │    │ Optional:        │
    │ = 'nested'       │    │ Remove test code │
    └──────────────────┘    └──────────────────┘
```

---

This architecture provides a robust, scalable foundation for A/B testing navigation structures with comprehensive metrics tracking and easy rollout options.
