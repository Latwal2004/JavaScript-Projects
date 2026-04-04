# Sidebar Menu with Dark/Light Theme

> A responsive, collapsible sidebar navigation with dark/light mode toggle — built with pure HTML, CSS & JavaScript. No frameworks, no build tools.

---

## 📸 Preview

| Light Mode | Dark Mode |
|------------|-----------|
| Sidebar expands to 270px with labels | Same layout with dark color palette |
| Icon-only collapsed strip (90px) | Theme persists via localStorage |

---

## ✨ Features

- 🗂️ **Collapsible sidebar** — smooth CSS width transition (270px ↔ 90px)
- 🌙 **Dark / Light theme toggle** — saved to `localStorage`
- 🖥️ **System preference detection** — auto-applies OS dark/light mode on first visit
- 📱 **Fully responsive** — overlay drawer mode on mobile (≤ 768px)
- 🔍 **Search form** — auto-expands sidebar when clicked in collapsed state
- 🎨 **CSS custom properties** — easy theming via CSS variables
- ✅ **Active menu highlighting** — visual indicator on the current page link
- 🔤 **Material Symbols Rounded** icons from Google Fonts

---

## 📁 File Structure

```
project/
│
├── index.html       # Main HTML — sidebar, navbar, menu items, main content
├── style.css        # All styling — layout, theming, transitions, responsive
├── script.js        # JS — toggle logic, theme switching, localStorage
└── logo.png         # Logo shown in the sidebar header
```

---

## 🚀 Getting Started

### Prerequisites

No build tools or package managers required. Just a modern browser.

### Run Locally

**Option 1 — Open directly:**
```
Double-click index.html in your file explorer
```

**Option 2 — Local dev server (recommended):**
```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## ⚙️ How It Works

### Sidebar Toggle
Both toggle buttons (navbar + sidebar header) listen for `click` events and toggle `.collapsed` on the `<aside>`. CSS transitions animate the width change. On mobile, `left` is animated instead of `width` to slide the sidebar in/out.

### Theme Switching
The `dark-theme` class is toggled on `<body>`. All colors are CSS custom properties defined in `:root` (light) and `body.dark-theme` (dark), so switching one class updates the entire UI instantly.

### System Preference Detection
On first visit (no `localStorage` entry), the script reads `window.matchMedia('(prefers-color-scheme: dark)')` and applies the OS preference automatically.

### Responsive Behaviour

| Screen Width | Sidebar Behaviour |
|---|---|
| `> 768px` | Sticky, collapses to 90px icon strip. Navbar hidden. |
| `≤ 768px` | Fixed overlay at full 270px width. Slides in/out via `left`. Dimmed backdrop via `body::before`. |

---

## 🎨 Customization

### Add a Menu Item

```html
<li class="menu-item">
  <a href="#" class="menu-link">
    <span class="material-symbols-rounded">ICON_NAME</span>
    <span class="menu-label">Your Label</span>
  </a>
</li>
```

Browse icons at [fonts.google.com/icons](https://fonts.google.com/icons).

### Change the Accent Color

```css
:root {
  --color-hover-primary: #695CFE; /* change this to any color */
}
```

### Change the Sidebar Width

```css
.sidebar          { width: 270px; } /* expanded */
.sidebar.collapsed { width: 90px;  } /* collapsed */
```

---

## 🐛 Bug Reference

Bugs fixed from the original files — documented here for reference:

| # | File | Bug | Fix |
|---|------|-----|-----|
| 1 | HTML | `class="conatiner"` typo | Change to `class="container"` |
| 2 | HTML | Missing `active` on first menu link | Add `active` to Dashboard `menu-link` |
| 3 | HTML | Missing `theme-icon` class on icon span | Add `class="theme-icon material-symbols-rounded"` |
| 4 | HTML | Missing `collapsed` class on sidebar | Add `collapsed` to `<aside class="sidebar">` |
| 5 | CSS | `background: c=var(...)` typo | Remove `c=` prefix |
| 6 | CSS | `.sidebar.collapsed.sidebar-content` (no space) | Add space → `.sidebar.collapsed .sidebar-content` |
| 7 | CSS | `.menu-link:is(:hover, .action)` typo | Change `.action` to `.active` |
| 8 | CSS | `flex-shrink: 1` on sidebar content | Change to `flex: 1` |

---

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome / Edge | 88+ |
| Firefox | 89+ |
| Safari | 15+ |
| Mobile Chrome/Safari | iOS 15+ |

Requires: CSS custom properties, `:has()` pseudo-class, CSS transitions.

---

## 📦 Dependencies

| Resource | Purpose |
|----------|---------|
| [Material Symbols Rounded](https://fonts.google.com/icons) | Icons |
| [Poppins — Google Fonts](https://fonts.google.com/specimen/Poppins) | Typeface |

No npm packages. No build step. Zero external JS dependencies.

---

## 📄 Credits

Original concept by [CodingNepal](https://www.youtube.com/@codingnepal). Extended and debugged with full fixes applied.

---

## 📝 License

Free to use and adapt for personal and commercial projects.