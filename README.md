# Dashboard Application Documentation

This documentation describes the structure and functionality of the Dashboard application. The application is a React-based user interface with dynamic data fetching and management capabilities. It includes features such as data display in tables, form submission, and file upload.

---

## Table of Contents
1. [Overview](#overview)
2. [Components](#components)
   - [Dashboard](#dashboard)
   - [Navbar](#navbar)
   - [Sidebar](#sidebar)
   - [Table](#table)
   - [AddComponent](#addcomponent)
3. [Features](#features)
4. [How to Run](#how-to-run)
5. [Dependencies](#dependencies)

---

## Overview
The Dashboard application is a React project that allows users to:
- View dynamically fetched data from an API.
- Add new items via a form submission.
- Preview and upload images with drag-and-drop functionality.

The main components include a responsive table, a sidebar for navigation, and a modal for detailed data display.

---

## Components

### Dashboard
The `Dashboard` component acts as the root container and manages the application layout:
- Includes a navigation bar (`Navbar`) and a sidebar (`Sidebar`).
- Dynamically renders either a table (`Table`) or an add item form (`AddComponent`) based on the selected type.
- Uses `useState` to manage the current view.

### Navbar
The `Navbar` provides the top navigation bar with:
- A logo placeholder.
- A search bar with an input field and button.
- User navigation buttons for logging out and accessing user settings.

### Sidebar
The `Sidebar` component serves as a navigation menu:
- Displays a list of categories such as `posts`, `comments`, `albums`, etc.
- Each category is represented by a button with an icon.
- Tooltips are provided for each button.
- On clicking a button, the type of data displayed in the table changes.

### Table
The `Table` component displays data dynamically fetched from an API:
- Fetches data based on the `head` prop, which specifies the endpoint.
- Automatically determines and displays nested data keys as column headers.
- Includes a modal to display row details on click.
- Provides sorting buttons (currently placeholders).

#### Key Functions:
- `getData`: Fetches data from the JSONPlaceholder API.
- `getNestedValue`: Safely retrieves nested values from objects.
- `openModal` and `closeModal`: Handle the modal visibility and content.

### AddComponent
The `AddComponent` allows users to add new items:
- Includes a form with fields for name, quantity, and price.
- Supports file upload with preview functionality.
- Handles drag-and-drop for file selection.

#### Key Functions:
- `handleChange`: Updates form field values.
- `handleSubmit`: Logs form data and file details (upload functionality not yet implemented).
- `processFile`: Validates and processes the uploaded file for preview.
- `handleDragOver`, `handleDragLeave`, and `handleDrop`: Manage drag-and-drop file selection.

---

## Features
1. **Dynamic Data Fetching**: The application fetches data based on user selection from the sidebar.
2. **Responsive Table**: Automatically adapts to different types of nested data.
3. **Modal View**: Displays detailed information of a selected row in a modal.
4. **File Upload with Preview**: Drag-and-drop or select files for upload and preview before submission.
5. **User Navigation**: Includes buttons for logging out and user profile navigation.

---

## How to Run
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

---

## Dependencies
- **React**: Core library for building the user interface.
- **Lucide-React**: Provides icon components used in the application.
- **React-Router-Dom**: For navigation and routing.
- **Classnames**: Utility for managing class names.
- **JSONPlaceholder**: API for fetching mock data.
- **TailwindCSS**: For styling the components.

---

## Future Improvements
1. Add proper file upload handling and integrate with a backend service.
2. Implement sorting and filtering functionality in the table.
3. Enhance drag-and-drop UX for file uploads.
4. Improve accessibility and keyboard navigation.

---

This documentation provides a comprehensive overview of the Dashboard application. For further questions or contributions, feel free to open an issue or submit a pull request.

