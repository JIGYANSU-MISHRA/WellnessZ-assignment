# Client Dashboard (WellnessZ)

A modern, responsive client dashboard built with React.js and Tailwind CSS. Designed with a focus on "human" aesthetics, clean typography, and a seamless user experience.

## Features

- **Dashboard View**: 
  - List of clients with status indicators.
  - **Responsive**: Adapts from a detailed table view on desktop to a clean card layout on mobile.
  - **Pagination**: Efficient client-side pagination.
  - **Search**: Instant filtering by name or email.
- **Client Details**: 
  - Click any client to view detailed profile information in an elegant modal.
- **Add Client**: 
  - Simple form with validation to add new mock clients.
- **States Handling**: 
  - Dedicated Loading skeletons/spinners.
  - Error states with retry options.
  - Empty states when search yields no results.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS 
- **Font**: Outfit (Clean, modern sans-serif)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Utilities**: clsx, tailwind-merge

## Setup Steps

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher) or yarn/pnpm

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd Assignment_WellnessZ
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required dependencies including React, Vite, Tailwind CSS, Axios, and other packages listed in `package.json`.

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:5173` (or the next available port). The dev server includes Hot Module Replacement (HMR) for instant updates.

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build** (optional)
   ```bash
   npm run preview
   ```
   Preview the production build locally before deployment.

6. **Lint Code** (optional)
   ```bash
   npm run lint
   ```
   Run ESLint to check for code quality issues.

## Approach & Assumptions

### Development Approach

1. **Component-Driven Development**: Built using a component-first approach with reusable UI components (Button, Input, Card, Badge, Modal) that can be easily composed to create complex features.

2. **Feature-Based Architecture**: Organized code by features rather than file types, keeping related components, hooks, and logic together for better maintainability.

3. **Custom Hooks Pattern**: Created `useUsers` hook to encapsulate data fetching, state management, and user operations, making the logic reusable and testable.

4. **Service Layer Abstraction**: Implemented an API service layer (`api.js`) to centralize HTTP requests, making it easy to switch between mock data (JSONPlaceholder) and real APIs.

5. **Utility-First Styling**: Leveraged Tailwind CSS with custom utilities (`cn` function) for flexible, maintainable styling that supports dynamic class composition.

6. **Progressive Enhancement**: Implemented responsive design with mobile-first approach, ensuring the application works well on all device sizes.

### Key Assumptions

1. **Mock Data Source**: Used JSONPlaceholder API for demonstration purposes, assuming it will be replaced with a real backend API in production.

2. **Client-Side State**: Assumed that user data can be managed client-side for this MVP, with the understanding that server-side state management might be needed for larger applications.

3. **Status Generation**: Implemented random status generation (Active/Inactive) as a mock feature, assuming real status would come from the backend.

4. **No Authentication**: Built without authentication/authorization, assuming these features would be added based on actual requirements.

5. **Browser Support**: Assumed modern browser support (ES6+, CSS Grid, Flexbox) without extensive polyfills.

6. **Form Validation**: Implemented basic client-side validation, assuming server-side validation would be required for production.

7. **Pagination**: Used client-side pagination (6 items per page) assuming this would be replaced with server-side pagination for larger datasets.


## What I Would Improve If Given More Time

### 1. **Complete CRUD Operations**
   - Implement **Edit User** functionality: Currently, the `MoreVertical` button in the table row doesn't have any action. I would add an edit modal that allows users to update existing client information (name, email, phone, website).
   - Add **Delete User** functionality: Implement a delete action with a confirmation dialog to prevent accidental deletions. This would complete the CRUD operations alongside the existing "Add" and "View" features.
   - Update the `useUsers` hook to include `updateUser` and `deleteUser` methods that properly manage state updates.

### 2. **User Feedback & Notifications**
   - Implement **Toast Notifications**: Currently, when a user is added, there's no visual feedback. I would add a toast notification system (using a library like react-hot-toast or a custom solution) to show success/error messages for all user actions (add, edit, delete).
   - Add **Form Reset**: The `AddUserForm` component doesn't reset after successful submission. I would clear the form fields and reset validation errors after a user is successfully added.
   - Improve **Loading States**: Replace the simple spinner with skeleton loaders for the table/cards to provide better visual feedback during data fetching.

### 3. **Enhanced Form Validation & Error Handling**
   - Expand **Form Validation**: Currently, only name and email are validated. I would add validation for phone number format, website URL validation, and more comprehensive error messages.
   - Improve **Error Handling**: The current error handling in `useUsers` hook is basic. I would implement proper retry logic (exponential backoff) instead of just reloading the page, and add more specific error messages based on error types (network errors, API errors, etc.).
   - Add **Input Formatting**: Implement phone number formatting as the user types, and URL validation/formatting for the website field.

### 4. **Additional Filtering & Sorting Features**
   - Add **Status Filtering**: Implement filter buttons or dropdown to filter users by status (Active/Inactive), which would work alongside the existing search functionality.
   - Add **Sorting Capabilities**: Allow users to sort the table by name, email, company, or status by clicking on column headers. This would enhance the user experience when managing a large list of clients.
   - Improve **Search Functionality**: Extend the search to include company name and phone number, not just name and email.

### 5. **Testing & Code Quality**
   - Add **Unit Tests**: Write tests for utility functions (`helpers.js` - `generateStatus`, `getInitials`), the `cn` utility, and the `useUsers` hook using React Testing Library and Jest.
   - Implement **Component Tests**: Test the main components (UserList, AddUserForm, UserDetails) to ensure they render correctly and handle user interactions properly.
   - Add **Integration Tests**: Test complete user flows like searching, adding a user, viewing details, and pagination to ensure everything works together correctly.
