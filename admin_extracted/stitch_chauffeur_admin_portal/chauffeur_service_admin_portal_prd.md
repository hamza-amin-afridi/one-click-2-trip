# 🧾 Complete Production Prompt — Chauffeur Service Admin Portal
---
## ROLE & CONTEXT
You are a Senior Full-Stack Developer with 10+ years of experience building production-grade SaaS dashboards. You are tasked with building a **complete Admin Portal** for a chauffeur/luxury car hire business. This portal is used exclusively by internal staff and administrators — not customers. It must be professional, fast, scalable, and require minimal maintenance.
---
## TECH STACK
```
Framework:        Next.js 14 (App Router)
Language:         TypeScript (strict mode)
Styling:          Tailwind CSS + shadcn/ui component library
State Management: Zustand (global) + React Query / TanStack Query (server state)
Forms:            React Hook Form + Zod validation
Tables:           TanStack Table v8
Charts:           Recharts
Maps:             Google Maps React (@react-google-maps/api)
Auth:             NextAuth.js (JWT strategy, role-based)
HTTP Client:      Axios with interceptors
Date/Time:        date-fns
Export:           react-to-pdf, xlsx (SheetJS)
Notifications:    react-hot-toast + Sonner
Icons:            Lucide React
```
---
## DESIGN SYSTEM
```
Theme:        Dark-first with light mode toggle
Primary:      #C9A84C  (Gold — luxury feel)
Background:   #0A0A0A (near-black)
Surface:      #111111 and #1A1A1A (cards, sidebars)
Border:       #2A2A2A
Text:         #F5F5F5 (primary), #888888 (muted)
Success:      #22C55E
Warning:      #F59E0B
Danger:       #EF4444
Info:         #3B82F6
Font:         'Neue Haas Grotesk' or 'DM Sans' for UI,
              'Playfair Display' for headings/logo
Spacing:      8px base grid system
Radius:       6px (subtle rounding, not bubbly)
Shadows:      Layered, subtle — no harsh drop shadows
Motion:       Framer Motion — page transitions, modal reveals,
              staggered list animations (200ms delay between items)
```
---
## ARCHITECTURE
```
/app
  /dashboard          → Main overview
  /bookings           → All booking management
  /bookings/[id]      → Single booking detail
  /bookings/new       → Create manual booking
  /drivers            → Driver management
  /drivers/[id]       → Driver profile
  /customers          → Customer management  
  /customers/[id]     → Customer profile & history
  /fleet              → Vehicle/fleet management
  /fleet/[id]         → Vehicle detail & maintenance log
  /payments           → Payment records & reconciliation
  /pricing            → Pricing rules & zones
  /zones              → Pickup/dropoff zone management
  /reports            → Analytics & reports
  /notifications      → Push & SMS notification center
  /settings           → System configuration
  /settings/users     → Admin user management
  /settings/roles     → Roles & permissions
  /auth/login         → Login page
/components
  /ui                 → shadcn/ui base components
  /layout             → Sidebar, Topbar, Breadcrumbs
  /bookings           → Booking-specific components
  /drivers            → Driver-specific components
  /shared             → DataTable, StatusBadge, FileUpload,
                        ConfirmDialog, EmptyState, Skeleton,
                        StatCard, FilterBar, ExportButton
/lib
  /api                → All API calls (grouped by domain)
  /auth               → NextAuth config & helpers
  /validations        → All Zod schemas
  /utils              → Date, currency, string formatters
  /constants          → Enums: booking status, roles, vehicle types
  /hooks              → Custom React hooks
  /types              → All TypeScript interfaces and types
```
---
## MODULE 1 — AUTHENTICATION & ROLES
### Login Page
- Email + password login form
- Show/hide password toggle
- Remember me checkbox
- JWT token stored in httpOnly cookie
- Auto-refresh token on expiry
- Rate limiting display (lock after 5 failed attempts)
- Redirect to last attempted URL after login
### Role-Based Access Control (RBAC)
Define these roles with permission matrices:
```
SUPER_ADMIN   → Full access including delete, settings, user management
ADMIN         → Full access except user management and system settings
DISPATCHER    → Bookings (read/write), Drivers (read), Fleet (read)
ACCOUNTANT    → Payments, Reports (read only)
SUPPORT       → Bookings (read), Customers (read)
DRIVER        → (future: mobile only — not in this portal)
```
Implement middleware that protects all routes based on role. Every UI element (buttons, tabs, actions) must be conditionally rendered based on permissions — not just routes.
---
## MODULE 2 — DASHBOARD (Main Overview)
### Top KPI Cards (animated count-up on load)
- Total Bookings Today
- Active Rides Right Now
- Revenue Today / This Month
- Pending Payments
- Drivers Online / Offline
- New Customers This Week
### Charts (using Recharts)
- **Revenue Line Chart** — Daily revenue for last 30 days (with comparison to previous period toggle)
- **Bookings Bar Chart** — Bookings per day grouped by status (Confirmed / Completed / Cancelled)
- **Vehicle Utilization Donut Chart** — % usage per vehicle type
- **Peak Hours Heatmap** — Bookings by hour of day vs day of week
### Live Activity Feed
- Real-time feed of booking events (new booking, payment received, driver assigned, trip started/ended)
- Each event is color-coded by type
- Timestamped with relative time ("2 min ago")
- Limit to last 50 events, auto-scroll with pause on hover
### Upcoming Bookings Table
- Next 10 bookings sorted by pickup time
- Columns: Time, Customer, Vehicle, Driver, Pickup Location, Status
- Click row → navigate to booking detail
### Map Panel (Google Maps)
- Show all active/in-progress rides as live markers
- Driver icon with tooltip: driver name, customer, ETA
- Pickup (green marker) and Dropoff (red marker) shown per ride
---
## MODULE 3 — BOOKINGS MANAGEMENT
### Bookings List Page
Full data table with:
**Columns:**
```
Booking ID | Created Date | Customer Name | Pickup Location
Dropoff Location | Pickup DateTime | Vehicle Type | Driver Assigned
Total Price | Payment Status | Booking Status | Actions
```
**Filters (all combinable):**
- Date range picker (from / to)
- Booking status: All / Pending / Confirmed / In Progress / Completed / Cancelled / No-show
- Payment status: All / Paid / Unpaid / Refunded / Partial
- Vehicle type
- Driver
- Search by customer name, phone, or booking ID
**Bulk Actions:**
- Assign driver to selected bookings
- Export selected to CSV/Excel/PDF
- Cancel selected (with reason modal)
**Table Features:**
- Column visibility toggle
- Column sorting
- Pagination (25/50/100 per page)
- Sticky header
- Row click → booking detail
### Booking Detail Page
**Header Section:**
- Booking ID (large), Status badge, Created date, Last updated
- Quick action buttons: Edit, Cancel, Print, Export PDF
**Timeline Component:**
Vertical stepper showing the booking lifecycle:
```
Booking Created → Payment Received → Driver Assigned →
Driver En Route → Trip Started → Trip Completed
```
Each step shows timestamp and actor (who triggered it).
**Booking Info Panel (editable):**
- Pickup / Dropoff address (with Google Maps autocomplete)
- Pickup date & time
- Flight number (if airport transfer)
- Passenger count
- Special requests / notes
- Meet & greet (Yes/No toggle)
- Baby seat, wheelchair, extra luggage toggles
**Customer Panel:**
- Name, email, phone (click to open customer profile)
- Booking count, total spent
**Vehicle & Driver Panel:**
- Assigned vehicle (dropdown to reassign)
- Assigned driver (dropdown to reassign — shows only available drivers)
- Driver contact button
**Pricing Panel:**
- Base fare, extras, discount, VAT, total
- Editable line items (for manual adjustments)
- Override price with reason field
**Payment Panel:**
- Payment method, Telr transaction reference
- Payment status badge
- Refund button (with amount input + reason)
- Payment history log
**Documents Panel:**
- Upload / view booking-related documents (voucher, invoice)
- Auto-generate PDF invoice button
**Activity Log:**
- Every change to this booking shown with: timestamp, actor, what changed
### Create Booking (Manual)
Multi-step form:
```
Step 1: Customer → Search existing or create new
Step 2: Journey → Pickup/dropoff (Google Maps), date/time, type (hourly/transfer)
Step 3: Vehicle → Select vehicle type (show availability)
Step 4: Extras → Meet & greet, baby seat, etc.
Step 5: Pricing → Auto-calculated, manual override option
Step 6: Payment → Mark as paid (cash/card) or send payment link
Step 7: Confirm → Summary + send confirmation to customer (email/SMS toggle)
```
---
## MODULE 4 — DRIVER MANAGEMENT
### Driver List
Table with: Name, Phone, Status (Online/Offline/On Trip/Inactive), Vehicle Assigned, Total Trips, Rating, Documents Status, Actions
Filters: Status, Vehicle type, Rating range, Document expiry
### Driver Profile Page
- **Personal Info:** Name, DOB, nationality, photo, phone, email, emergency contact
- **License Info:** License number, expiry date, upload scan
- **Documents Panel:** Upload/view/set expiry for: Driving License, Passport/ID, Background Check, Insurance, Medical Certificate. Each shows expiry status with color (green/amber/red)
- **Vehicle Assignment:** Current assigned vehicle with swap option
- **Performance Stats:** Total trips, completion rate, cancellation rate, average rating, on-time %
- **Reviews:** List of customer reviews with rating and comment
- **Trip History:** Paginated table of all past trips
- **Availability Schedule:** Weekly grid to set working hours
- **Status Toggle:** Active / Suspended / Inactive
### Driver Document Expiry Alerts
- Global alert banner on dashboard when any driver document expires within 30 days
- Email notification trigger settings (30 days, 14 days, 7 days, 1 day before)
---
## MODULE 5 — CUSTOMER MANAGEMENT
### Customer List
Table: Name, Email, Phone, Total Bookings, Total Spent, Last Booking Date, Status, Actions
Search + filters: Status, date joined, total bookings range
### Customer Profile Page
- Personal info (editable)
- Booking history (full table)
- Payment history
- Notes section (internal admin notes, not visible to customer)
- Communication log (emails/SMS sent)
- Block/unblock customer toggle with reason
- Merge duplicate accounts tool
---
## MODULE 6 — FLEET MANAGEMENT
### Vehicle List
Table: Photo, Plate Number, Make/Model/Year, Type, Capacity, Status, Assigned Driver, Last Service Date, Actions
### Vehicle Detail Page
- **Specs:** Photo gallery, make, model, year, color, plate, VIN, fuel type, capacity, amenities (WiFi, child seat, etc.)
- **Status:** Available / In Use / Maintenance / Retired
- **Driver Assignment:** Current driver + history
- **Maintenance Log:** Table of service records (date, type, cost, mileage, notes, attachments)
- **Add Maintenance Record** form
- **Insurance & Registration:** Upload docs with expiry dates
- **Booking History:** All bookings made with this vehicle
---
## MODULE 7 — PAYMENTS & INVOICING
### Payments List
Full table: Booking ID, Customer, Amount, Currency, Method, Telr Ref, Status, Date
Filters: Status, date range, method, amount range
Export: CSV, Excel, PDF
### Payment Detail
- Full Telr transaction data
- Link to booking
- Refund form: amount (partial/full), reason, send refund confirmation toggle
### Revenue Reconciliation
- Daily/weekly/monthly summary table
- Totals by: payment method, vehicle type, booking type
- Variance tracking
### Invoice Generator
- Auto-generate PDF invoice per booking
- Custom invoice header (company logo, address, VAT number)
- Bulk invoice generation + download as ZIP
---
## MODULE 8 — PRICING ENGINE
### Pricing Rules
CRUD table for pricing rules with fields:
```
Name | Vehicle Type | Booking Type (transfer/hourly) |
Base Price | Price Per KM | Price Per Hour |
Min Fare | Currency | Active Toggle
```
### Zone-Based Pricing
- Define geographic zones using Google Maps polygon drawing tool
- Set price overrides per zone pair (Zone A → Zone B = fixed price)
- Zone table with activate/deactivate
### Extras & Add-ons Pricing
- Meet & greet surcharge
- Baby seat fee
- Extra stops fee
- Night surcharge (define hours)
- Airport surcharge
- Long distance surcharge
### Promotions & Discounts
- Promo codes table: Code, Discount type (% / fixed), Min booking value, Usage limit, Expiry, Status
- CRUD for promo codes
- Usage report per code
---
## MODULE 9 — REPORTS & ANALYTICS
All reports must have:
- Date range filter
- Group by: day / week / month
- Export to CSV, Excel, PDF
- Printable view
### Available Reports:
```
1. Revenue Report          → Total revenue, by vehicle, by booking type
2. Booking Report          → Volume, status breakdown, cancellation rate
3. Driver Performance      → Trips, rating, on-time rate, earnings
4. Customer Report         → New vs returning, top customers, LTV
5. Fleet Utilization       → Usage per vehicle, idle time
6. Payment Report          → Collected, pending, refunded, by method
7. Cancellation Report     → Rate, reason breakdown, financial impact
8. Airport Transfer Report → Volumes by airport, delays, flight tracking stats
```
---
## MODULE 10 — NOTIFICATIONS CENTER
### Template Management
CRUD for notification templates (Email & SMS):
- Template name, channel (email/SMS/both), trigger event, subject, body
- Variables using {{booking_id}}, {{customer_name}}, {{pickup_time}}, etc.
- Preview mode with sample data
### Trigger Events Available:
```
Booking Confirmed | Payment Received | Driver Assigned |
Driver En Route | Trip Started | Trip Completed |
Booking Cancelled | Refund Processed | Upcoming Booking Reminder |
Document Expiry Warning
```
### Manual Broadcast
- Send a custom email or SMS to: all customers / specific customer / all drivers / filtered segment
- Message composer with character count (SMS)
- Schedule for later option
- Delivery report
---
## MODULE 11 — SETTINGS
### Company Settings
- Company name, logo upload, address, phone, email
- VAT/Tax number
- Currency and timezone
- Booking reference prefix (e.g., "CHF-2024-")
- Business hours
### Integrations
- Telr: API Key, Secret, Merchant ID, Mode (sandbox/live), test connection button
- Google Maps: API Key input
- SMTP Email: Host, port, username, password, from name, test send
- SMS Provider: API key, sender ID, test send
- Firebase (push notifications): config JSON upload
### Admin User Management
- Table of admin users: Name, Email, Role, Last Login, Status
- Invite new admin (sends email with set-password link)
- Edit role, deactivate/reactivate
- Force password reset
### Roles & Permissions
- Visual permissions matrix table
- Rows = Roles, Columns = Features/Actions
- Toggle checkboxes to grant/revoke permissions
- Save with confirmation
### Audit Log
- Full system audit trail: Who did what, when, from which IP
- Filters: User, action type, date range
- Cannot be deleted or modified
---
## GLOBAL COMPONENTS TO BUILD
```
<DataTable />          → Reusable with sorting, filtering, pagination, export
<StatusBadge />        → Color-coded pill for all status types
<StatCard />           → KPI card with icon, value, trend arrow, sparkline
<FilterBar />          → Consistent filter UI across all list pages
<ConfirmDialog />      → Modal for destructive actions (delete/cancel/refund)
<FileUpload />         → Drag & drop with preview, size limit, type validation
<AddressInput />       → Google Maps autocomplete input
<DateRangePicker />    → Calendar-based range selector
<EmptyState />         → Illustrated empty state for each context
<LoadingSkeleton />    → Skeleton screens matching each page layout
<ExportButton />       → Dropdown: CSV / Excel / PDF
<PageHeader />         → Title + breadcrumbs + action buttons
<ActivityLog />        → Timestamped event list component
<NotificationToast />  → Top-right toast for all actions
```
---
## NON-FUNCTIONAL REQUIREMENTS
```
Performance:
- Page load under 2 seconds (LCP)
- Tables virtualized for 10,000+ rows
- API responses cached with stale-while-revalidate
- Images lazy loaded and optimized (Next/Image)
Security:
- All routes protected by middleware
- RBAC enforced server-side (not just UI)
- Input sanitization on all forms
- CSRF protection
- Rate limiting on login endpoint
- httpOnly cookies for auth tokens
- All API keys stored in environment variables only
Reliability:
- Global error boundary with fallback UI
- API error handling with retry logic (3 attempts)
- Offline detection banner
- Form auto-save (draft) for long forms
- Optimistic UI updates where appropriate
Accessibility:
- WCAG 2.1 AA compliant
- Full keyboard navigation
- ARIA labels on all interactive elements
- Focus management in modals
- Screen reader friendly tables
Code Quality:
- ESLint + Prettier configured
- Husky pre-commit hooks
- TypeScript strict mode — no 'any' types
- Component-level unit tests (Vitest)
- E2E tests on critical flows (Playwright)
- Storybook for component documentation
```
---
## ENVIRONMENT VARIABLES NEEDED
```env
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
TELR_STORE_ID=
TELR_AUTH_KEY=
TELR_MODE=sandbox
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMS_API_KEY=
SMS_SENDER_ID=
DATABASE_URL=
REDIS_URL=
```