# Club Component Custom Classes Reference

This document lists all custom `bd-*` classes used in club components and their SCSS file locations.

## Summary

All custom classes used in club components have corresponding SCSS definitions. Classes are organized as follows:

- **Club base classes**: `public/assets/scss/layout/_class.scss` (nested under `.bd-club`)
- **Booking form classes**: `public/assets/scss/components/_booking-form.scss`
- **Verification badge**: `public/assets/scss/components/_verification-badge.scss`
- **Routine/Schedule classes**: `public/assets/scss/layout/_routine.scss`
- **Gallery classes**: `public/assets/scss/layout/_gallery.scss`
- **Section title classes**: `public/assets/scss/components/_section-title.scss`
- **Button classes**: `public/assets/scss/components/_buttons.scss`

## Class Inventory

### Club Base Classes (`.bd-club` nested)

All these classes are nested under `.bd-club` in `_class.scss`:

- ✅ `.bd-club` - Base club class
- ✅ `.bd-club-2` - Club variant 2 (for HomeTwoClubArea)
- ✅ `.bd-club-3` - Club listing variant (matches bd-class-3)
- ✅ `.bd-club-area` - Section wrapper
- ✅ `.bd-club-active` - Swiper/carousel container
- ✅ `.bd-club-active-2` - Alternative carousel container
- ✅ `.bd-club-badge` - Badge container
- ✅ `.bd-club-btn` - Button container
- ✅ `.bd-club-btn-3` - Button variant 3
- ✅ `.bd-club-card` - Card container
- ✅ `.bd-club-content` - Content area
- ✅ `.bd-club-content-3` - Content variant 3
- ✅ `.bd-club-description` - Description text
- ✅ `.bd-club-icon` - Icon container
- ✅ `.bd-club-icon-2` - Icon variant 2
- ✅ `.bd-club-icon-wrapper` - Icon wrapper
- ✅ `.bd-club-location` - Location display
- ✅ `.bd-club-meta` - Meta information
- ✅ `.bd-club-meta-price` - Price display
- ✅ `.bd-club-meta-wrapper` - Meta wrapper
- ✅ `.bd-club-pagination` - Pagination container
- ✅ `.bd-club-price` - Price display
- ✅ `.bd-club-sport` - Sport display
- ✅ `.bd-club-sport-icon` - Sport icon
- ✅ `.bd-club-thumb` - Image container
- ✅ `.bd-club-title` - Title
- ✅ `.bd-club-title-3` - Title variant 3
- ✅ `.bd-club-wrapper` - Content wrapper
- ✅ `.bd-club-wrapper-2` - Content wrapper variant 2
- ✅ `.bd-club-age` - Age display
- ✅ `.bd-club-age-groups` - Age groups display

### Club Details Classes (`.bd-club-details` nested)

All nested under `.bd-club-details` in `_class.scss`:

- ✅ `.bd-club-details-widget` - Widget container
- ✅ `.bd-club-details-widget-content` - Widget content
- ✅ `.bd-club-details-widget-title` - Widget title
- ✅ `.bd-club-details-btn` - Button container
- ✅ `.bd-club-details-thumb` - Image container
- ✅ `.bd-club-details-slider` - Slider container
- ✅ `.bd-club-details-slider-thumb` - Slider image
- ✅ `.bd-club-details-info-wrapper` - Info wrapper
- ✅ `.bd-club-details-info` - Info item
- ✅ `.bd-club-details-sport` - Sport info
- ✅ `.bd-club-details-location` - Location info
- ✅ `.bd-club-details-pricing` - Pricing info
- ✅ `.bd-club-details-age` - Age info
- ✅ `.bd-club-details-levels` - Levels info
- ✅ `.bd-club-details-verified` - Verification info
- ✅ `.bd-club-details-contact` - Contact info
- ✅ `.bd-club-details-list` - List container

### Club Filters Classes (`.bd-club-filters` nested)

All nested under `.bd-club-filters` in `_class.scss`:

- ✅ `.bd-club-filters-area` - Filter section
- ✅ `.bd-club-filters-wrapper` - Filter container
- ✅ `.bd-club-filters-header` - Filter header

### Club Map Classes (`.bd-club-map` nested)

All nested under `.bd-club-map` in `_class.scss`:

- ✅ `.bd-club-map-area` - Map section
- ✅ `.bd-club-map-wrapper` - Map container
- ✅ `.bd-club-address-info` - Address information display

### Booking Form Classes (`.bd-booking-form` nested)

All nested under `.bd-booking-form` in `components/_booking-form.scss`:

- ✅ `.bd-booking-form` - Base form container
- ✅ `.bd-booking-form-section` - Form section wrapper
- ✅ `.bd-booking-form-wrapper` - Form wrapper
- ✅ `.bd-booking-form-header` - Form header
- ✅ `.bd-booking-form-input` - Input container
- ✅ `.bd-booking-form-submit` - Submit button container

### Routine/Schedule Classes (`.bd-routine` nested)

All nested under `.bd-routine` in `layout/_routine.scss`:

- ✅ `.bd-routine-area` - Routine section wrapper
- ✅ `.bd-routine-empty` - Empty state
- ✅ `.bd-routine-table` - Schedule table

### Gallery Classes

In `layout/_gallery.scss`:

- ✅ `.bd-gallery-area` - Gallery section wrapper
- ✅ `.bd-gallery` - Gallery item
- ✅ `.bd-gallery-thumb` - Gallery thumbnail
- ✅ `.bd-gallery-thumb-wrapper` - Thumbnail wrapper
- ✅ `.bd-gallery-icon` - Gallery icon overlay

### Other Classes

- ✅ `.bd-verification-badge` - `components/_verification-badge.scss`
- ✅ `.bd-section-title` - `components/_section-title.scss`
- ✅ `.bd-section-title-wrapper` - `components/_section-title.scss`
- ✅ `.bd-btn` - `components/_buttons.scss`
- ✅ `.bd-btn-grey` - `components/_buttons.scss`
- ✅ `.bd-btn-inner` - `components/_buttons.scss` (nested)
- ✅ `.bd-btn-normal` - `components/_buttons.scss` (nested)
- ✅ `.bd-btn-hover` - `components/_buttons.scss` (nested)
- ✅ `.bd-dots-pagination` - `components/_pagination.scss`

## Notes

1. **Nested SCSS Structure**: Most club classes are nested under `.bd-club`, which means they compile to `.bd-club-{modifier}`. This is the standard SCSS pattern used throughout the codebase.

2. **Component Files**: New component-specific files have been created:
   - `components/_booking-form.scss` - Booking form styles
   - `components/_verification-badge.scss` - Verification badge styles

3. **Import Order**: All component files are imported in `main.scss` in the correct order.

4. **Bootstrap Classes**: Many utility classes (like `d-flex`, `mb-3`, `text-center`, etc.) are Bootstrap 5.3.3 utilities and don't need custom SCSS.

## Verification

All classes used in club components have corresponding SCSS definitions. The nested structure ensures proper compilation and maintainability.
