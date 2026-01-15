# Bearsi Website Style Guide

## Brand Theme: Crafty & Warm
**Color Palette:** Warm Cream • Tan • Espresso

---

## Color Variables

### Light Backgrounds
```css
--cream-100: #f8f6f2;  /* Primary background */
--cream-200: #f1ede6;  /* Card backgrounds */
--cream-300: #e7e1d7;  /* Borders & subtle accents */
```

### Brand Tans (Primary Actions)
```css
--tan-300: #d9c6a3;  /* Light tan */
--tan-400: #cbb089;  /* Medium tan (hover states) */
--tan-500: #b89a6b;  /* Primary tan (buttons, links) */
```

### Dark Accents (Text & Headers)
```css
--brown-700: #7a6346;  /* Subtext */
--brown-800: #4f402e;  /* Dark buttons */
--brown-900: #2b241c;  /* Primary text, navbar */
--black-soft: #16130f; /* Deepest contrast */
```

---

## Typography

### Font Family
- **Coiny:** Logo, site name, hero headings (h1)
- **Schoolbell:** Body text, UI elements, labels, buttons, checkout, forms
- **Fallback:** system-ui, sans-serif

### Font Loading
```html
<!-- Add to index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Coiny&family=Schoolbell&display=swap" rel="stylesheet">
```

### CSS Variables
```css
--font-display: "Coiny", system-ui, sans-serif;
--font-body: "Schoolbell", system-ui, sans-serif;
```

### Usage Guidelines

**Coiny (Display Font):**
- Logo and site name "Bearsi"
- Hero section headings (h1)
- Large, attention-grabbing text
- Playful, crafty brand identity

**Schoolbell (Body Font):**
- All body text and paragraphs
- Navigation links
- Button labels
- Form inputs and labels
- Product descriptions
- UI elements and cards
- Checkout and cart text

### Headings
- **h1:** Use Coiny, color `var(--brown-900)` - Hero sections only
- **h2, h3:** Use Schoolbell, color `var(--brown-900)` - Section headings

### Body Text
- Font: Schoolbell
- Color: `var(--brown-900)`

### Subtext
- Font: Schoolbell
- Color: `var(--brown-700)`
- Use for secondary information, captions

---

## Component Patterns

### Containers
```css
.container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}
```
**Usage:** Main content wrapper for pages

### Cards
```css
.card {
  background: var(--cream-200);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  border: 1px solid var(--cream-300);
}
```
**Usage:** Product cards, feature sections, content blocks

---

## Buttons

### Primary Button (`.btn`)
- **Background:** `var(--tan-500)`
- **Text Color:** `var(--brown-900)`
- **Border Radius:** 999px (pill shape)
- **Padding:** 0.75rem 1.4rem
- **Hover:** Background changes to `var(--tan-400)`

### Dark Button (`.btn-dark`)
- **Background:** `var(--brown-800)`
- **Text Color:** `var(--cream-100)`
- **Hover:** Background changes to `var(--brown-700)`

**When to use:**
- `.btn` → Primary actions (Add to Cart, Learn More)
- `.btn-dark` → Secondary actions, footer CTAs

---

## Navigation

### Navbar (`.navbar`)
- **Background:** `var(--brown-900)`
- **Text Color:** `var(--cream-100)`
- **Link Hover:** `var(--tan-400)`
- **Padding:** 1rem 2rem

**Structure:**
- Dark navbar for strong contrast
- Cream text with tan hover states
- Consistent spacing between links (1.5rem)

---

## Forms & Inputs

### Input Fields
```css
input, textarea, select {
  background: var(--cream-100);
  border: 1px solid var(--cream-300);
  border-radius: 10px;
  padding: 0.8rem;
  color: var(--brown-900);
}

/* Focus state */
border-color: var(--tan-500);
```

**Best Practices:**
- Always show focus state with tan border
- Maintain consistent border radius (10px)
- Use cream background for subtle contrast

---

## Links

### Default Links
- **Color:** `var(--tan-500)`
- **Hover:** `var(--brown-800)`
- **No underline** by default

### Navbar Links
- **Color:** `var(--cream-100)`
- **Hover:** `var(--tan-400)`

---

## Footer

### Footer Section (`.footer`)
- **Background:** `var(--brown-900)`
- **Text Color:** `var(--cream-200)`
- **Padding:** 3rem 2rem
- **Alignment:** Center

**Usage:** Site footer with links, copyright, contact info

---

## Spacing Guidelines

- **Small:** 0.5rem - 1rem
- **Medium:** 1.5rem - 2rem
- **Large:** 3rem - 4rem

**Consistent padding:**
- Cards: 1.5rem
- Containers: 2rem
- Footer: 3rem

---

## Border Radius Standards

- **Buttons:** 999px (pill shape)
- **Cards:** 16px (rounded corners)
- **Inputs:** 10px (subtle rounding)

---

## Shadows

### Card Shadow
```css
box-shadow: 0 6px 20px rgba(0,0,0,0.05);
```
**Usage:** Subtle elevation for cards and important elements

---

## Design Principles

1. **Warm & Approachable:** Use cream and tan tones to create a welcoming, handcrafted feel
2. **High Contrast Text:** Always use `var(--brown-900)` on light backgrounds for readability
3. **Consistent Rounding:** Maintain border radius hierarchy (buttons > cards > inputs)
4. **Subtle Shadows:** Use sparingly for depth, never harsh
5. **Tan for Actions:** Primary interactive elements use tan colors
6. **Dark for Navigation:** Brown-900 creates strong headers and navigation areas

---

## Responsive Considerations

- **Mobile-first approach**
- Container max-width: 1200px
- Flexible padding: Use rem units
- Touch-friendly button sizes (min 0.75rem padding)

---

## Common Patterns

### Hero Section
```
Background: var(--cream-100)
Heading: var(--brown-900)
CTA Button: .btn (tan)
```

### Product Card
```
Container: .card
Background: var(--cream-200)
Border: var(--cream-300)
Shadow: 0 6px 20px rgba(0,0,0,0.05)
```

### Call-to-Action Section
```
Background: var(--brown-900)
Text: var(--cream-100)
Button: .btn-dark
```

---

## Do's and Don'ts

### DO:
- Use tan colors for primary interactive elements
- Maintain consistent border radius across similar components
- Keep shadows subtle and soft
- Use cream backgrounds for main content areas

### DON'T:
- Mix border radius styles (keep buttons pill-shaped, cards at 16px)
- Use harsh shadows or borders
- Place light text on light backgrounds
- Overuse dark backgrounds (reserve for navbar/footer)

---

## Asset Organization

### Folder Structure
```
bearsi-website/src/assets/
├── images/
│   ├── products/     → Product photos and images
│   ├── icons/        → Icons and small graphics (SVG preferred)
│   └── cosmetics/    → Background images, decorative elements
└── react.svg         → Default Vite assets
```

### Image Import Example
```jsx
// Import product image
import productImage from './assets/images/products/product1.jpg'

// Use in component
<img src={productImage} alt="Product name" />
```

### Best Practices for Images
- **Products:** Use high-quality JPG/PNG, optimize for web (max 1MB)
- **Icons:** Prefer SVG for scalability, use PNG if necessary
- **Cosmetics:** Compress background images, consider WebP format
- **Alt text:** Always provide descriptive alt text for accessibility

---

## Future Development Notes

When adding new features to the Bearsi website:

1. **Always reference this guide** before creating new components
2. **Reuse existing CSS classes** (.btn, .card, .container) whenever possible
3. **Maintain color consistency** using CSS variables
4. **Test on mobile** to ensure responsive behavior
5. **Keep the warm, crafty aesthetic** in all design decisions
6. **Organize assets properly** in the designated folders (products/icons/cosmetics)
