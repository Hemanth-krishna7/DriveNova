# Hero Composition Grid Specification

## 1. Composition Philosophy

The Hero is defined as one continuous editorial composition. It must never be treated as independent UI elements placed beside each other. Every element exists solely to support the overall composition, creating a cohesive scene rather than a collection of separate interface elements. 

The overall composition should always feel:
- **Intentional**: Every element is deliberately positioned and spaced.
- **Quiet**: The design exercises extreme restraint, avoiding unnecessary noise or decorative elements.
- **Premium**: Luxury is conveyed through high-quality typography, rich negative space, and atmosphere.
- **Architectural**: The layout aligns to structured but asymmetrical proportional systems.
- **Cinematic**: The visual hierarchy, lighting, and depth work together to tell a single atmospheric story.

---

## 2. Horizontal Composition System

The horizontal layout is organized into proportional regions that dictate visual relationships across the viewport. Rather than using fixed pixel or grid values, the composition is defined by the following proportional ranges:

- **Editorial Region**: 
  - Begins approximately 10–15% from the left viewport edge.
  - Occupies approximately 30–40% of the viewport width.
  - Houses the core typographic content.
- **Negative Space Region**: 
  - Occupies approximately 15–25% of the viewport width.
  - Acts as a buffer zone to separate text and the vehicle.
- **Ferrari Region**: 
  - Occupies approximately 30–35% of the viewport width.
  - Anchored to the right side of the screen.
  - Intentionally cropped by the right viewport edge to create a sense of scale and off-screen continuation.

These proportions represent visual relationships and relative visual weight, not strict implementation units.

---

## 3. Vertical Composition System

The vertical layout reinforces the editorial nature of the Hero:
- Typography aligns slightly above the visual vertical center of the viewport to feel elevated and dominant.
- The Ferrari sits slightly lower than the typography, establishing visual grounding and weight near the bottom-right.
- Perfect vertical centering of any component is strictly avoided to prevent a static, mechanical appearance.
- Generous breathing room (whitespace) must be preserved above and below the entire composition to isolate the scene and elevate the feeling of luxury.

---

## 4. Ferrari Bounding Region

The Ferrari functions purely as a supporting visual element to complete the scene:
- It occupies approximately one-third of the Hero's spatial composition.
- The vehicle is viewed from a front three-quarter angle.
- It is partially cropped by the viewport edge.
- It is never the largest visual element in the layout.
- It is never the first element that attracts the viewer's attention.
- Camera values, model transforms, and WebGL rendering configurations are details of implementation and are not defined here; the visual role of the vehicle is strictly to balance the composition, not dominate it.

---

## 5. Typography Bounding Region

Typography acts as the primary visual anchor:
- The Headline is the dominant visual anchor that establishes the initial entry point.
- The Supporting Paragraph remains secondary in visual scale and weight.
- Call to Action (CTA) elements support the reading flow without competing with the headline.
- Typography occupies a dedicated editorial column rather than a centered content box, visually leading the eye toward the Ferrari.
- Typography must establish its visual hierarchy and presence before the Ferrari is consciously noticed.

---

## 6. Reading Flow

The intended visual sequence moves the viewer's eye through the Hero in the following order:

1. **Headline** (Primary visual entry point)
2. **Supporting Copy** (Contextual continuation)
3. **CTA** (Actionable destination)
4. **Ferrari** (Supporting visual resolution)
5. **Remaining Negative Space** (Quiet transition and breathing room)

The Ferrari should serve as the visual punctuation that completes the reading journey, rather than an interruption that halts it.

---

## 7. Negative Space

Whitespace is treated as an active, structural design element rather than blank space. It intentionally separates:
- Typography from the Ferrari
- Main composition from the navigation system
- Foreground elements from future glass overlays

Negative space must never be reduced or compromised to fit more content. It exists to create a feeling of calmness, openness, and perceived luxury.

---

## 8. Responsive Composition

The layout must preserve the proportional relationships between typography, the Ferrari, and negative space across common desktop viewport sizes:
- The spatial relationship and balance must adapt proportionally rather than relying on fixed-pixel or static layouts.
- Specific implementation breakpoints are not defined here; instead, the spatial ratios and relative horizontal and vertical alignments must scale cohesively.

---

## 9. Composition Constraints

The following layout treatments are explicitly prohibited:
- Centered Heroes (all elements centered on the screen)
- Equal-width columns (e.g., standard 50/50 splits)
- Dashboard layouts or card-first compositions
- Boxed content boundaries or visible container borders
- The Ferrari centered in the viewport
- Typography centered directly beneath the navigation
- The Ferrari dominating the composition or being the largest visual anchor
- Layouts resembling typical SaaS or tech landing pages
- Decorative symmetry and non-functional visual details

Every composition decision must reinforce a quiet, editorial, luxury experience.

---

## Authority

This document is authoritative. If any future implementation milestone conflicts with the principles or spatial relationships defined in this document, this document takes precedence. Future implementation milestones may refine implementation details but must never violate the spatial relationships defined here. Changes to this document require a dedicated documentation milestone.
