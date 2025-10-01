User Management Dashboard

Features
This application implements all the core and bonus features outlined in the challenge requirements.

Core Features

List Users: Fetches a list of users from the JSONPlaceholder API and displays them in a clean, card-based interface. User cards show their name, email, and company.


Search Functionality: A real-time, client-side search that filters users by name or email as you type. The search matches from the beginning of the string for a more intuitive experience.


User Details Page: Clicking on a user navigates to a dedicated, detailed profile page. This page displays the user's full address, phone number, and website.


Add New User: A feature to add a new user to the list. The form is revealed by a slide-down animation and includes validation for required fields (name and email).

Bonus Features Implemented

Sorting: The user list can be sorted by name or email in both ascending and descending order.


Redux for State Management: The entire application state (including the user list, API status, etc.) is managed globally using Redux Toolkit.


Update and Delete Functionality: Users can be deleted directly from the main list or have their details updated on their profile page.

Local State Persistence: All changes made to the user list (adds, updates, deletes) are automatically saved to the browser's localStorage using redux-persist.

Tech Stack
This project is built with a modern and powerful set of front-end technologies:

Framework: React (v18+) with TypeScript

Build Tool: Vite

Styling: Tailwind CSS

Routing: React Router

State Management: Redux Toolkit

State Persistence: Redux Persist