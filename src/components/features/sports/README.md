# Sports Components

Sports feature components for displaying sport listings and details.

## Components

### SportCard

Reusable card component for displaying sport information in listings.

**Props:**

- `sport: Sport` - Sport data object
- `variant?: "default" | "compact" | "featured"` - Card variant style
- `className?: string` - Additional CSS classes
- `delay?: string` - Animation delay for wow.js

**Usage:**

```tsx
import SportCard from "@/components/features/sports/SportCard";

<SportCard sport={sport} delay="0.2s" />;
```

**CSS Classes:**

- `.bd-sport-3` - Main card container
- `.bd-sport-thumb` - Icon/thumbnail area
- `.bd-sport-content-3` - Content area
- `.bd-sport-title-3` - Title
- `.bd-sport-meta-wrapper` - Meta information wrapper
- `.bd-sport-meta` - Meta information container
- `.bd-sport-category` - Category display
- `.bd-sport-age` - Age range display
- `.bd-sport-clubs` - Club count display
- `.bd-sport-btn` - Action button

### SportsMain

Main listing component with category filtering.

**Props:**

- `sports: Sport[]` - Array of sports to display
- `initialCategory?: SportCategory` - Initial category filter

**Usage:**

```tsx
import SportsMain from "@/components/features/sports/SportsMain";

<SportsMain sports={sports} />;
```

**Features:**

- Category filtering (echipa, individual, combat, artistic, altul)
- Results count display
- Responsive grid layout
- Empty state handling

**CSS Classes:**

- `.bd-sports-area` - Main section wrapper
- `.bd-sport-filter` - Filter buttons container

### SportDetailsMain

Detail page component for individual sports.

**Props:**

- `sport: Sport` - Sport data object

**Usage:**

```tsx
import SportDetailsMain from "@/components/features/sports/SportDetailsMain";

<SportDetailsMain sport={sport} />;
```

**CSS Classes:**

- `.bd-sport-details-widget` - Main widget container
- `.bd-sport-details-widget-content` - Content area
- `.bd-sport-details-widget-title` - Title
- `.bd-sport-details-thumb` - Icon/thumbnail area
- `.bd-sport-details-info-wrapper` - Info section wrapper
- `.bd-sport-details-info` - Individual info item
- `.bd-sport-details-category` - Category info
- `.bd-sport-details-age` - Age range info
- `.bd-sport-details-clubs` - Club count info
- `.bd-sport-details-btn` - Action buttons container

## Styling

All sports components use custom CSS classes defined in `public/assets/scss/layout/_sport.scss`. The styling follows the same patterns as club components for consistency.

### Key Style Features

- **Card Hover Effects**: Cards lift and show enhanced shadow on hover
- **Icon Animations**: Sport icons scale on hover
- **Gradient Backgrounds**: Icon areas use Yuvoo brand gradients
- **Responsive Design**: All components are fully responsive
- **Theme Colors**: Uses Yuvoo theme colors (primary: #00BBAE, secondary: #FF9B24)

## Integration

Sports components are integrated into:

- `/sporturi` - Sports listing page
- `/sporturi/[slug]` - Sport detail page
- Homepage featured sports section (via FeaturedSports component)

## Related Files

- `src/modules/sports/` - Sports service layer
- `src/lib/db/seed-data/sports.ts` - Sports data
- `public/assets/scss/layout/_sport.scss` - Sports styling
