# Welcome to the React Base Version!

Thank you for your interest and for cloning our React base version! This development platform is designed to make it easy for everyone, from beginners to experienced **Frontend developers**, to access and efficiently develop web applications. This base version is built with a focus on clarity and high interactivity, featuring **`Next.js` - a popular framework for React applications**.

## Quick Start

To set up your development environment and start coding, follow these steps:

### Environment Setup

1. **Create Environment Variables:**
   - In the project's root directory, create a `.env.local` file.
   - Add the following environment variables:
     ```
     NODE_ENV=production

     PORT=3000
     HOST_URL=http://localhost:3000
     SERVER_URL=# Your Server Url, for example: http://localhost:8080
     ```
   This configures your development server to run on port 3000 and communicate with the backend service on port 8080.

2. **Start the Development Server:**
   - Run `npm run dev` to launch the development server. You'll be able to see your changes in real-time.

3. **Build the Application:**
   - Use `npm run build` to compile the application for deployment.

4. **Run in Production Environment**
   - After building, you can use `npm start` to run it in the production environment.
   - Learn more about deployment [here](https://ndng.net/blogs/huong-dan-deploy-react-len-server-vps-don-gian)

## Project Structure

This base version is organized clearly so you can easily understand and get started:

- **`src/`**: This directory contains the main source code of the application, including React components, pages, and business logic.
- **`public/`**: Stores static assets such as images, icons, and HTML files. These resources can be accessed directly via URL.
- **`apis/`**: Contains files defining API communication, helping manage requests to the backend server in an organized manner.
- **`config/`**: This directory includes configuration files, where you can set environment variables and other settings for the application.
- **`context/`**: Used to store React Contexts, helping manage and share state across the entire application efficiently.
- **`helpers/`**: Contains utility functions and common logic, helping reuse code and keep the source code clean.
- **`hooks/`**: This directory is for custom React hooks, allowing you to separate and reuse state logic or dependencies easily.
- **`i18n/`**: Contains configuration files and resources for internationalization, supporting multilingual applications.
- **`layout/`**: Includes common layout components like Header, Footer, and other layouts used across multiple pages of the application.
- **`router/`**: Manages application routing, including defining routes and connecting them with corresponding components.
- **`types/`**: Where TypeScript types are defined, helping manage data types in the application and enhance type safety.

## Contributing

We encourage all contributions, from code improvements to documentation:

1. **Familiarize Yourself with the Source Code:** Understand the project's structure and coding conventions.
2. **Create a New Branch:** For each new feature or bug fix, create a new branch.
3. **Submit a Pull Request:** Once your work is complete, submit a pull request with a clear description.

## Additional Resources

- [**LICENSE.md:**](./LICENSE.md) Read to understand the rights to use and distribute the project.
- **Other Documentation:** Search the repository for more guides and project details.

This base version of React is your first step towards easily accessing and developing web applications. We look forward to your contributions and hope you find this project useful for your personal and professional development. Wishing you an excellent coding experience!
