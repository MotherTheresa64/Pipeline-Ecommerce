# Advanced E-Commerce App with Firebase Integration

This project is an extension of a basic e-commerce application, enhanced to integrate Firebase services for product management, user authentication, and order handling. It replaces a previously used FakeStore API with Firebase Firestore for all backend data management and Firebase Authentication for user sign-up and login functionalities.

---

## Assignment Overview

The goal of this project is to extend a React e-commerce app by:

- Integrating Firebase Authentication for user registration, login, and logout.
- Migrating all user-related CRUD operations to Firestore.
- Migrating product management to Firestore, supporting full CRUD (Create, Read, Update, Delete).
- Implementing order creation and storing orders in Firestore.
- Displaying a user’s order history with full order details.

---

## Features Implemented

### Part 1: Firebase Setup
- Firebase project creation and SDK configuration.
- Enabled Firebase Authentication and Firestore in the Firebase console.

### Part 2: Firebase Authentication
- User registration with email and password.
- Automatic creation of a corresponding Firestore user document on registration.
- Secure login and logout functionality.

### Part 3: User Management
- Firestore-based CRUD operations on user profiles:
  - Create user document on registration.
  - Read user profile data for display.
  - Update user profile details (name, address, phone).
  - Delete user account and remove associated Firestore data.

### Part 4: Product Management
- Firestore collection to store product data.
- Users can view all products publicly without signing in.
- Admin users can create, update, and delete products.
- CRUD operations for products fully integrated with Firestore.

### Part 5: Order Management
- Users can place orders which are stored in Firestore.
- Orders include products purchased, quantities, user ID, and timestamps.
- Users can view their past orders with detailed information including total price and product list.

---

## Technologies Used

- React with TypeScript for frontend development.
- Redux Toolkit for state management.
- Firebase Authentication for user management.
- Firebase Firestore for real-time database.
- React Router for client-side routing.
- Tailwind CSS for styling.
- Vite as the build tool.

---

## Installation and Running the App

1. Clone the repository:
   ```bash
   git clone https://github.com/MotherTheresa64/Advanced-Ecommerce-App.git

2. Navigate into the project folder:
   ```bash
   cd Advanced-Ecommerce-App
   
3. Install Dependencies:
   ```bash
   npm install

4. Set up your Firebase project in the Firebase Console:

5. Enable Email/Password Authentication.

6. Enable Firestore Database.

7. Add your Firebase configuration credentials in the project’s src/firebase/firebase.ts file.

8. Start the development server:
   ```bash
   npm run dev

9. Connect to your designated localhost

## Project Structure Highlights

src/  
 ├── app/                  # Redux store and typed hooks  
 ├── components/           # UI components (e.g., ProductCard, Navbar)  
 ├── context/              # Authentication context provider  
 ├── features/  
 │    ├── cart/            # Cart management slice and components  
 │    ├── orders/          # Order management services and UI  
 │    ├── products/        # Product management slices and UI components  
 ├── firebase/             # Firebase configuration and service helpers  
 ├── pages/                # Route components like Login, Register, Profile, Orders  
 └── types/                # TypeScript types and interfaces  

## Example Images

This project includes example screenshots to demonstrate key app features and UI:

- `AdminAdd.png` — Admin product add page  
- `AdminLogin.png` — Admin login page  
- `AdminProducts.png` — Admin product management page  
- `CheckoutConfirm.png` — Order confirmation page  
- `CheckoutPage.png` — Checkout page  
- `CustomerPOV.png` — Customer point of view of products  
- `DeleteConfirmation.png` — Confirmation dialog for deleting user profile  
- `Home.png` — Home page  
- `OrderPage.png` — Orders history page  
- `UpdateUserInfo.png` — User profile update form  
- `UserProfile.png` — User profile display page  

Refer to the `/ExampleImages` folder for these screenshots.

How to Use
-Browse products publicly without login.

-Add products to your cart; if not logged in, you will be redirected to login/register before adding.

-Register or login to manage your profile, place orders, and view order history.

-Admin users can add, edit, and delete products.

Security
-Firestore security rules enforce that users can only access and modify their own data.

-Product management features are restricted to admin users.

-Private routes protect checkout, orders, profile, and product management pages.

Future Enhancements
-Implement role-based admin management instead of hardcoded checks.

-Add payment gateway integration.

-Enhance UI/UX with better notifications and error handling.

-Write tests for critical components and flows.

Author
Noah Ragan (MotherTheresa64)