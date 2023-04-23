# FastTrackIT Course Project

![project](https://i.imgur.com/ev024cd.png)

I created a full-stack web application that aims to simplify project management and tracking for digital agencies. The main objective of the application is to provide a user-friendly platform for customer registration, adding projects with their individual services and values, keeping track of project's tasks and generating the total value of the project.

The application also offers a payment recording system to keep track of your finances and of cash flow for each project. In addition, the site has an authentication system that ensure only authorized personnel can access agency data.

One of the key features of the application is the ability to provide graphical reports for top clients, projects and payments, allowing agencies to easily monitor their performance. The dark mode feature is another plus that helps users work comfortable during extended working hours.

In conclusion, the application is an effective tool for digital agencies that want to streamline project management, cash flow and performance tracking. The site's features and functionality provide an intuitive and easy-to-use platform for
managing projects and tracking their performance while ensuring security
data through the login system.

## Used technologies and their purpose

-   `ReactJS`: The main purpose was to provide a fast and efficient way to render dynamic changes of data and update the user interface in real-time without the need for a refresh entire page. This makes React an ideal choice for building CRUD applications interactive and responsive, providing a smooth user experience.
-   `Redux Toolkit`: Used for the sole purpose of managing application state in a central store, making it easy tracking and managing data changes as users interact with the application.
-   `Axios`: Allowing to quickly manage data from the server as needed.
-   `PHP`: To create a back-end server to handle storage and retrieval the data.
-   `MySQL`: Provide a system for managing a relational databases for data storage, management and retrieval.
-   `TypeScript`: Identifying errors early in development, improving maintenance, and code scalability and increasing productivity with better completion and documentation a the code.
-   `TailwindCSS`: to simplify the process of beautifying UI components.

## Features

-   Authentication system for security and access control
-   Graphical reports for top clients, projects, and payments
-   Track statistics, projects in progress, clients and tasks directly from dashboard
-   User Roles (admin/user) - The admin can manage users role
-   Update user self profile
-   Create or Modify Client profiles
-   Add projects assigned to a client with the provided services and costs
-   Redux CRUD functionality for provided services before project creation
-   Track project payments with CRUD functionality
-   Assign Project and Task Status
-   Fully Responsive
-   Dark mode feature for extended working hours
-   Expand or shrink the sidebar on large screens

#### How to run locally

1. Clone the project

```bash
  git clone https://github.com/acmhub/fti-project.git
```

2. Execute `npm install` or `yarn` to install all the packages.
3. Create the database structure or import it directly from `/api/fasttrackit_project.sql`
4. Start the app

`npm run dev` or `yarn start`
