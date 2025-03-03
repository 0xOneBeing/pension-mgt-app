# Pension Management Application

This application is a web-based Pension Management System designed to help users manage their pension contributions, view statements, receive notifications, and get a preview of their projected benefits.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
  - [Login Page](#login-page)
  - [Dashboard](#dashboard)
  - [Contributions](#contributions)
  - [Statements](#statements)
  - [Notifications](#notifications)
  - [Benefits](#benefits)
  - [Contribution management](#contribution-management)
- [API Endpoint](#api-endpoint)
- [Error Handling](#error-handling)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Pension Management Application is a React-based web application that allows users (administrators and members) to interact with a pension management system. It provides a user-friendly interface for managing contributions, viewing statements, and checking benefit projections.

## Features

- **User Authentication:** Secure login for both administrators and Member users.
- **Contribution Management:**
  - View contribution history.
  - Add new contributions (mandatory or voluntary).
  - Validate contributions (e.g., only one mandatory contribution per month).
- **Statement Generation:**
  - Generate contribution statements for specific date ranges.
  - Download statements as PDF files.
  - Share statements via email.
- **Benefit Preview:**
  - View projected benefits based on current contributions.
- **Notifications:**
  - Receive in-app notifications.
  - Manage notification preferences (e.g., email notifications).
- **Responsive Design:** Adapts to various screen sizes.
- **Error handling:** Provides clear error handling and reporting.

## Architecture

The application follows a modern React-based architecture:

- **Component-Based:** The UI is built using reusable components (e.g., `Card`, `Table`, `Form`, `DashboardLayout`).
- **State Management:** Redux Toolkit is used for centralized state management (e.g., `authSlice`, `contributionSlice`, `notificationsSlice`).
- **Routing:** React Router is used for navigation between different pages.
- **API Communication:** Axios/Fetch API (preferred) is used to communicate with the backend API.
- **Modularity**: The application is made in several files for modularity.
- **Protected Routes**: The dashboard and all the functionalities are protected and can only be accessed after login.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript for improved code quality.
- **Redux Toolkit:** For state management.
- **React Router:** For client-side routing.
- **Ant Design:** A UI library for React, providing pre-built components.
- **Fetch API:** A JavaScript API for 'fetching' data.
- **Axios:** A promise-based HTTP client for making API requests.
- **react-hot-toast**: A library for displaying notifications.
- **jsPDF:** A library for generating PDF files.
- **React Chart.js:** A React-based version of the Chart.js library for building charts.
- **Dayjs:** A library to manage dates.

## Setup and Installation

1. **Clone the repository:**
   `git clone [repository](https://github.com/0xOneBeing/pension-management-application.git)`
2. **Navigate to the project directory:**
   `cd pension-management-application`
3. **Install dependencies:**
   `npm install`
4. **Start the development server:**
   `npm run dev`
5. **Localhost server setup:**
   `Visit http://localhost:8080/ in your browser to the access application`

## Usage

### Login Page

- **URL:** `/login`
- **Functionality:**
  - Users can log in with their username and password.
  - **Admin Credentials:**
    - Username: `admin`
    - Password: `password`
  - **Member Credentials:**
    - Username: `member`
    - Password: `password`
  - Successful login redirects to the `/dashboard`.
  - Error messages are displayed for invalid credentials.
  - The login page shows error and success toast notifications.
- **Components:**
  - `Login.tsx`
- **Slices:**
  - `authSlice`

### Dashboard

- **URL:** `/dashboard`
- **Functionality:**
  - The main landing page after successful login.
  - Displays a navigation sidebar to access other sections.
  - Displays a title in the header.
- **Components:**
  - `Dashboard.tsx`
  - `DashboardLayout.tsx`
  - `Navbar.tsx`

### Contributions

- **URL:** `/contributions`
- **Functionality:**
  - Displays a list of contributions.
  - Allows users to view their contribution history.
- **Components:**
  - `Contributions.tsx`
- **Slices:**
  - `contributionSlice`

### Statements

- **URL:** `/statements`
- **Functionality:**
  - Allows users to generate contribution statements.
  - Users can select a date range to filter statements.
  - Provides options to download statements as PDF or share them via email.
  - displays a contribution chart.
- **Components:**
  - `Statements.tsx`
  - `StatementForm.tsx`
  - `ContributionChart.tsx`
- **Libraries:**
  - `jsPDF`
  - `Recharts`

### Notifications

- **URL:** `/notifications`
- **Functionality:**
  - Allows users to view their notification settings.
  - Provides a way to turn on/off email notifications.
  - Displays an unread badge of the number of unread notifications.
- **Components:**
  - `NotificationSettings.tsx`
  - `NotificationDropdown.tsx`
- **Slices:**
  - `notificationsSlice`

### Benefits

- **URL:** `/benefits`
- **Functionality:**
  - Displays a preview of projected benefits.
  - Calculates the total contributions and projected growth.
- **Components:**
  - `BenefitPreview.tsx`

### Contribution Management

- **URL:** `/contributions/manage`
- **Functionality:**
  - Allows admin users to add new contributions.
  - Provides input fields for contribution type, amount, and date.
  - Validates user inputs.
- **Components:**
  - `ContributionsManagement.tsx`
  - `ContributionForm.tsx`
- **utils:**
  - `Validators`
- **Slices:**
  - `contributionSlice`

## API Endpoint

- **Base URL:** `https://api.example.com`
- **Contributions**
  - `GET /contributions`: to get contributions
  - `POST /contributions`: to create a contribution
  - `PUT /contributions/:id`: to update a contribution
  - `DELETE /contributions/:id`: to delete a contribution

## Error Handling

- **React error boundaries:** Used to catch unhandled errors in component rendering, preventing the entire app from crashing.
- **try...catch blocks:** Used to handle errors in asynchronous operations and calculations.
- **User feedback:** Informative error messages are displayed to guide the user.
- **Error logging:** Errors are logged to the console for development and debugging.
- **Error toast messages:** toast messages are used to notify the user of errors that may occur.
- **Error and success messages**: `antd` messages and `react-hot-toast` notifications.

## Future Enhancements

- **User Management:** Adding user management functionalities.
- **Enhanced Reporting:** Creating more comprehensive reports and analytics.
- **Advanced Benefit Calculation:** Implementing more complex benefit projection models.
- **Payment Integration:** Adding the ability to make actual contributions online.
- **More pages and functionalities:** Adding more pages and more functionalities.

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

## License

[MIT](LICENSE)
