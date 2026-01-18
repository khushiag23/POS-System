# Modern POS System

A production-ready Point of Sale (POS) system built with Next.js 14+, Redux Toolkit, and Tailwind CSS.

## Features

- **Authentication**: Email/Password login with secure state management.
- **Dashboard**: Real-time sales overview with key metrics and responsive layout.
- **Mobile POS Interface**: Optimized mobile experience with full-screen grid and slide-up cart drawer.
- **Cart System**: Dynamic cart with tax calculations, item persistence, and shared logic.
- **Checkout**: Seamless checkout process supporting Cash and Card payments.
- **Sales History**: Detailed searchable history of all completed transactions.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

1.  **Clone and Install**

    ```bash
    git clone <your-repo-url>
    cd <your-project-name>
    npm install
    ```

2.  **Run Development**

    ```bash
    npm run dev
    ```

3.  **Demo Credentials**
    - **Email**: `admin@example.com` (or any valid email)
    - **Password**: `admin123` (or any string min 4 characters)

## Project Structure

- `app/`: Next.js App Router root.
  - `(main)/`: Route group for authenticated pages (Dashboard, POS, History). These share the persistent Sidebar layout.
  - `layout.tsx`: Root layout containing Redux and Toaster providers.
- `lib/`: Core application logic and components.
  - `components/`:
    - `pos/`: Specialized components like the `CartSection` (shared between desktop Sidebar and mobile Drawer).
    - `layout/`: Shared layout components like `Sidebar.tsx`.
    - `ui/`: Base Shadcn/UI components.
  - `store/`: Redux Toolkit setup.
    - `slices/`: State logic for `auth`, `cart`, and `orders`.
    - `provider.tsx`: Client-side provider for Redux.
  - `data/`: Mock product and category data.
  - `utils.ts`: Utility for merging Tailwind classes (`cn`).

## Recent Updates

- ✅ **Mobile POS Redesign**: Implemented a "Product-First" layout with a sticky bottom bar and cart drawer.
- ✅ **Responsive Dashboard**: Optimized header and stats grid for mobile devices.
- ✅ **Redux Integration**: Full migration from Zustand to Redux Toolkit with persistence.
- ✅ **Performance Cleanup**: Removed unused libraries (`sonner`, `date-fns`, `next-themes`, `react-query`).
- ✅ **Accessibility**: Fixed Radix UI accessibility warnings in the Sidebar.
- ✅ **Standardization**: Unified import aliases using `@/` throughout the codebase.
