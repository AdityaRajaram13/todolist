# Todo List Web Application

## Description

This is a simple Todo List web application built using Angular for the frontend and Node.js with Express for the backend. It allows users to create, update, and delete tasks, as well as sort tasks by due date or priority.

## Features

- **User Authentication**: Users can sign up for an account and log in to access their Todo List.
- **Create Tasks**: Users can create new tasks with a title, description, due date, and priority.
- **Update Tasks**: Users can edit existing tasks to modify their details.
- **Delete Tasks**: Users can delete tasks they no longer need.
- **Sort Tasks**: Users can sort tasks by due date or priority in ascending or descending order.

## Installation

1. **Clone the repository** to your local machine:

    ```bash
    git clone https://github.com/your-username/todo-list.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd todo-list
    ```

3. **Install dependencies** for the frontend:

    ```bash
    cd todolist
    npm install
    ```

4. **Install dependencies** for the backend:

    ```bash
    cd ../backend
    npm install
    ```

5. **Configure environment variables**:

    - Create a `.env` file in the `backend` directory.
    - Add the following variables to the `.env` file:

        ```
        PORT=4000
        MONGODB_URI=mongodb://localhost:27017/todo-list
        JWT_SECRET=your_secret_key
        ```

6. **Start the backend server**:

    ```bash
    npm start
    ```

7. **Start the frontend server**:

    ```bash
    ng serve
    ```

8. **Access the application** in your web browser at `http://localhost:4200`.

## Usage

- Sign up for an account if you're a new user, or log in if you already have an account.
- Once logged in, you'll be able to create new tasks, update existing tasks, and delete tasks as needed.
- You can also sort tasks by due date or priority by clicking on the respective headers in the task list.

## Technologies Used

- Angular
- Node.js
- Express
- MongoDB
- Bootstrap
- ngx-toastr (for notifications)
- ng-bootstrap (for UI components)
- JWT (JSON Web Tokens) for authentication

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. **Fork** the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. **Commit** your changes (`git commit -am 'Add new feature'`)
5. **Push** to the branch (`git push origin feature`)
6. Create a new **Pull Request**


