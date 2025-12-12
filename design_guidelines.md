# Design Guidelines: Multi-Image Upload Component

## Design Approach
This is a utility-focused component with clear functional requirements. The design follows a modern, card-based upload interface pattern with drag-and-drop functionality, matching the provided reference image exactly.

## Core Design Elements

### Typography
- **Primary Font**: Inter or SF Pro (system font stack)
- **Headers**: font-semibold, text-lg for "Upload Media"
- **Body Text**: text-sm for labels, filenames, helper text
- **Small Text**: text-xs for file counts, step indicators
- **Color Hierarchy**: Dark gray (#1F2937) for primary text, medium gray (#6B7280) for secondary text

### Layout System
- **Spacing Units**: Tailwind spacing scale - primarily p-4, p-6, gap-4, gap-3, mb-2, mb-4
- **Component Padding**: p-6 for main container, p-4 for cards
- **Gaps**: gap-4 for image grid, gap-3 for button groups
- **Border Radius**: rounded-lg for main container, rounded-md for cards and buttons

### Component Structure

**Upload Container**
- White background with subtle border (border-gray-200)
- Dashed border drag-and-drop zone with centered upload icon and text
- "Browse" button as secondary action within upload area
- File format and size limit text below upload area: ".jpg .png .jpeg .webp (max 10 MB)"

**Image Preview Cards**
- Grid layout (grid-cols-2 md:grid-cols-3)
- Each card contains: thumbnail image (aspect-square, object-cover), filename, drag handle icon (left), delete icon (right)
- Hover state: slight elevation or border highlight
- Active drag state: reduced opacity, elevated shadow

**Status Indicators**
- Success state: Green checkmark icon + "3 photos uploaded" text in green (#10B981)
- Progress feedback positioned above image grid
- Image count badge on each preview card

**Cover Selection**
- Active cover: Purple button with "Cover" label (#8B5CF6)
- Non-cover images: White/outlined button with "Set as Cover" text
- Only one image can be cover at a time

**Header Section**
- "Step 8 of 9" indicator in top right (text-sm, gray)
- Main title "Upload Media" (text-lg, font-semibold)
- Subtitle/description text below title

**Action Buttons**
- Primary (Next): Purple background (#8B5CF6), white text, px-6, py-2.5
- Secondary (Back): White background, gray border, gray text
- Tertiary (Cancel): Text-only, gray color
- Delete All: Red text button (text-red-600), positioned near upload count
- Button group alignment: space-between with Cancel left, Back/Next right

### Interaction Patterns

**Drag and Drop**
- Visual feedback on drag over: border color change, background tint
- Drop zone highlights when files are dragged over it
- Drag handles (six-dot icon) visible on each image card for reordering

**File Validation**
- Instant validation on drop/select
- Error messages appear below upload area for invalid files
- Accepted formats clearly displayed

**Reordering**
- Click and drag using drag handle icon
- Visual placeholder shows drop position
- Smooth transitions when reordering (transition-all duration-200)

**Deletion**
- Individual delete: Trash icon button on each card (hover shows red tint)
- Delete All: Confirmation step before removing all images

### Visual Hierarchy
1. Upload area (prominent when empty)
2. Preview grid (dominant when images uploaded)
3. Status indicator and Delete All
4. Navigation buttons
5. Step indicator

### Responsive Behavior
- Mobile: Single column grid (grid-cols-1)
- Tablet: Two columns (md:grid-cols-2)
- Desktop: Three columns (lg:grid-cols-3)
- Button stack on mobile, inline on desktop

### Accessibility
- Clear focus states on all interactive elements
- Drag handle icons large enough for touch targets (min 40x40px)
- Alternative "Browse" button for keyboard users
- ARIA labels for icon buttons
- File input hidden but accessible

### Images
No external images required. Component uses:
- Upload cloud icon (from Heroicons or similar)
- Checkmark icon (success state)
- Trash icon (delete action)
- Drag handle icon (six-dot grid pattern)

All icons should be consistent from a single icon library (Heroicons recommended).