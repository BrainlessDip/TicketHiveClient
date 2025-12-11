# TicketHiveClient

An **Online Ticket Booking Platform** built with the **MERN stack**. Users can explore, book, and manage travel tickets for Bus, Train, Launch, and Plane. The platform supports three user roles: **User**, **Vendor**, and **Admin**.

---

## 🚀 Project Overview

TicketHive is a complete ticket booking system where:

- **Users** can browse and book tickets, view booking history, and make payments.
- **Vendors** can add tickets, manage bookings, and track revenue.
- **Admins** can manage users, approve/reject tickets, and advertise tickets on the homepage.

The system is designed for full responsiveness and provides a clean, modern UI with proper spacing, alignment, and accessible design.

---

## 🌐 Live Demo

[Live Site Link](https://ticket-hive-gilt.vercel.app)

---

## 📌 Key Features

### General

- Fully responsive design for mobile, tablet, and desktop
- Dark/Light mode toggle
- Secure Firebase & MongoDB credentials via environment variables
- Loading spinners & error pages for smooth UX
- JWT/Firebase token authentication

### Home Page

- Hero Banner/Slider
- Advertisement Section (admin-controlled, 6 tickets)
- Latest Tickets Section
- Two custom sections (e.g., Popular Routes, Why Choose Us)

### Authentication

- User login & registration with email/password
- Google social login
- Password validation (uppercase, lowercase, min 6 characters)
- Private routes for authenticated users

### All Tickets Page

- Display only approved tickets
- Search by From → To locations
- Filter by transport type
- Sort by price (low → high / high → low)
- Pagination (6–9 tickets per page)

### Ticket Details Page

- Full ticket details
- Book Now button with quantity validation
- Countdown timer for ticket departure
- Disabled booking for expired or sold-out tickets

### User Dashboard

- Profile overview
- My Booked Tickets (with payment integration via Stripe)
- Transaction History

### Vendor Dashboard

- Add Ticket form with perks and image upload
- My Added Tickets (update/delete, verification status)
- Requested Bookings (accept/reject)
- Revenue Overview with charts

### Admin Dashboard

- Manage Tickets (approve/reject)
- Manage Users (assign roles, mark vendor fraud)
- Advertise Tickets (max 6 at a time)

### Optional Enhancements

- PDF ticket download after payment
- Booking cancellation (before vendor acceptance)
- Live seat map for buses
- React Hook Form integration
- Swiper.js for homepage slider

---

## 📦 Technologies Used

**Frontend**

- React 19
- TailwindCSS & DaisyUI
- React Router
- React Query
- Recharts
- React Spinners
- React Toastify
- SweetAlert2

**Backend**

- Node.js & Express
- MongoDB
- Firebase (Authentication & Storage)
- Stripe for payments

**Utilities**

- Axios for API requests
- Date-fns for date management
- ESLint for code quality
