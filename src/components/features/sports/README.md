# Sports Components

Sports feature components for displaying sport listings and details. All components have been updated with enhanced styling, improved content, and consistent design system patterns.

## Components

### SportCard

Reusable card component for displaying sport information in listings. Features enhanced styling with category badges, icon displays, and hover effects.

**Props:**

- `sport: Sport` - Sport data object
- `className?: string` - Additional CSS classes

**Usage:**

```tsx
import SportCard from "@/components/features/sports/SportCard";

<SportCard sport={sport} />;
```

**Features:**

- Category badges with category-specific colors
- Large icon display with gradient background
- Age range and club count metadata
- Hover effects with smooth transitions
- Responsive design
- Memoized for performance optimization

**CSS Classes:**

- `.bd-sport-card` - Main card container
- `.bd-sport-card-thumb` - Icon/thumbnail area with gradient background
- `.bd-sport-card-icon-wrapper` - Icon wrapper container
- `.bd-sport-card-icon` - Sport icon
- `.bd-sport-card-category-badge` - Category badge (with color variants: `bd-sport-category-echipa`, `bd-sport-category-individual`, `bd-sport-category-combat`, `bd-sport-category-artistic`, `bd-sport-category-altul`)
- `.bd-sport-card-content` - Content area
- `.bd-sport-card-title` - Title
- `.bd-sport-card-description` - Description text
- `.bd-sport-card-meta-wrapper` - Meta information wrapper
- `.bd-sport-card-meta` - Meta information container
- `.bd-sport-card-age` - Age range display
- `.bd-sport-card-clubs` - Club count display
- `.bd-sport-card-clubs-count` - Club count number
- `.bd-sport-card-clubs-text` - Club count text
- `.bd-sport-card-clubs-verified` - Verified clubs count
- `.bd-sport-card-btn` - Action button container
- `.bd-sport-card-btn-link` - Action button link

### SportsMain

Main listing component with enhanced category filtering, improved empty state, and better results display.

**Props:**

- `sports: Sport[]` - Array of sports to display
- `initialCategory?: SportCategory` - Initial category filter

**Usage:**

```tsx
import SportsMain from "@/components/features/sports/SportsMain";

<SportsMain sports={sports} />;
```

**Features:**

- Enhanced category filtering with icons for each category
- Visual feedback for active filters
- Improved results count display with category context
- Enhanced empty state with icon, message, and CTA button
- WOW.js animations for cards
- Responsive grid layout

**Category Icons:**

- `echipa` - `flaticon-friends`
- `individual` - `flaticon-user`
- `combat` - `flaticon-karate`
- `artistic` - `flaticon-color-palette`
- `altul` - `flaticon-sports`

**CSS Classes:**

- `.bd-sports-main-area` - Main section wrapper
- `.bd-sports-main-filter-row` - Filter buttons row
- `.bd-sports-main-results-row` - Results count row
- `.bd-sports-main-grid-row` - Sports grid row
- `.bd-sports-filter` - Filter buttons container
- `.bd-sports-filter-btn` - Individual filter button (with `.active` state)
- `.bd-sports-filter-icon` - Filter button icon
- `.bd-sports-filter-text` - Filter button text
- `.bd-sports-results-text` - Results count text
- `.bd-sports-results-count` - Results count number
- `.bd-sports-results-category` - Category context text
- `.bd-sports-main-empty-state` - Empty state container
- `.bd-sports-main-empty-icon` - Empty state icon
- `.bd-sports-main-empty-title` - Empty state title
- `.bd-sports-main-empty-text` - Empty state text

### SportDetailsMain

Detail page component for individual sports with enhanced styling, improved info display, and better CTA buttons.

**Props:**

- `sport: Sport` - Sport data object

**Usage:**

```tsx
import SportDetailsMain from "@/components/features/sports/SportDetailsMain";

<SportDetailsMain sport={sport} />;
```

**Features:**

- Large icon display with gradient background
- Redesigned info items with icons and better layout
- Enhanced CTA buttons with icons
- Improved spacing and typography
- Responsive design

**CSS Classes:**

- `.bd-sport-details-area` - Main section wrapper
- `.bd-sport-details-thumb` - Icon/thumbnail area with gradient background
- `.bd-sport-details-icon-wrapper` - Icon wrapper container
- `.bd-sport-details-icon` - Sport icon
- `.bd-sport-details-content` - Content area
- `.bd-sport-details-title` - Title
- `.bd-sport-details-description` - Description text
- `.bd-sport-details-info-wrapper` - Info section wrapper
- `.bd-sport-details-info-item` - Individual info item
- `.bd-sport-details-info-icon` - Info item icon
- `.bd-sport-details-info-content` - Info item content wrapper
- `.bd-sport-details-info-label` - Info item label
- `.bd-sport-details-info-value` - Info item value
- `.bd-sport-details-info-verified` - Verified clubs count
- `.bd-sport-details-actions` - CTA buttons container

## Styling

All sports components use custom CSS classes defined in separate SCSS files following the design system patterns.

### SCSS Files

- `public/assets/scss/layout/_sports-main.scss` - SportsMain component styling
- `public/assets/scss/layout/_sport-card.scss` - SportCard component styling
- `public/assets/scss/layout/_sport-details.scss` - SportDetailsMain component styling

### Key Style Features

- **Card Hover Effects**: Cards lift and show enhanced shadow on hover with icon animations
- **Category Badges**: Color-coded category badges with category-specific colors
- **Gradient Backgrounds**: Icon areas use Yuvoo brand gradients (theme-2-light to theme-1)
- **Smooth Transitions**: All interactive elements have smooth 0.3s transitions
- **Responsive Design**: All components are fully responsive with breakpoints for lg, md, sm, xs
- **Theme Colors**: Uses Yuvoo theme colors and CSS variables
- **Icon Display**: Large, prominent icon displays with proper sizing and positioning
- **Typography**: Consistent font sizes, weights, and line heights
- **Spacing**: Consistent padding and margins using design system tokens

### Category Badge Colors

- **Echipă** (Team): Blue (`rgba(33, 150, 243, 0.1)`)
- **Individual**: Green (`rgba(76, 175, 80, 0.1)`)
- **Combat**: Red (`rgba(244, 67, 54, 0.1)`)
- **Artistic**: Purple (`rgba(156, 39, 176, 0.1)`)
- **Altul** (Other): Orange (`rgba(255, 152, 0, 0.1)`)

## Integration

Sports components are integrated into:

- `/sporturi` - Sports listing page (with expanded intro and FAQ sections)
- `/sporturi/[slug]` - Sport detail page
- Homepage featured sports section (via FeaturedSports component)

## Related Files

- `src/modules/sports/` - Sports service layer
- `src/lib/db/seed-data/sports.ts` - Sports data
- `src/data/sports-faq-data.ts` - Sports-specific FAQ data
- `public/assets/scss/layout/_sports-main.scss` - SportsMain styling
- `public/assets/scss/layout/_sport-card.scss` - SportCard styling
- `public/assets/scss/layout/_sport-details.scss` - SportDetailsMain styling
- `public/assets/scss/layout/_sports-intro.scss` - Sports listing page intro section styling
- `public/assets/scss/layout/_sports-faq.scss` - Sports listing page FAQ section styling

## Recent Updates

### Enhanced Components (Latest)

1. **SportCard**:
   - Removed unused `variant` and `delay` props
   - Added category badges with color coding
   - Enhanced icon display with gradient backgrounds
   - Improved metadata display
   - Added hover effects and smooth transitions
   - Memoized for performance

2. **SportsMain**:
   - Enhanced category filter with icons
   - Improved empty state with CTA button
   - Better results count display with category context
   - Added WOW.js animations
   - Improved responsive design

3. **SportDetailsMain**:
   - Enhanced icon display with gradient background
   - Redesigned info items with icons
   - Improved CTA buttons with icons
   - Better spacing and typography
   - Enhanced responsive design

### Design System Compliance

All components now follow the Yuvoo design system:

- Custom SCSS classes (no inline styles)
- Consistent spacing and padding
- Hover effects and transitions
- Responsive breakpoints
- WOW.js animations
- Romanian content throughout
- SEO-friendly structure
