# Vacays App - Hotel Booking Website 🏨

Welcome to the **Vacays App**, a modern and responsive hotel booking platform designed to make your travel planning seamless and enjoyable. This project is open to contributions, and we welcome any ideas or suggestions to improve it. If you find this project helpful, don't forget to leave a ⭐!

---

## Features ✨

- **Responsive Design**: Works flawlessly on all devices, from desktops to mobile phones.
- **Pagination**: Easily navigate through large lists of hotels.
- **Search Functionality**: Quickly find hotels based on your preferences.
- **Automated Tests**: Ensures the app is reliable and bug-free.

---

## Setting Up the Vacays App 🛠️

This guide will walk you through the process of setting up the Vacays App on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download and install from [here](https://nodejs.org/).

---

## Cloning the Repository

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/himuexe/Hotel-Booking-Website.git
   cd Hotel-Booking-Website
   ```

---

## Backend Configuration ⚙️

1. **Environment Files**:
   - Navigate to the `backend` folder and create two files: `.env` and `.env.e2e`.
   - Add the following content to both files:

     ```plaintext
     MONGODB_CONNECTION_STRING=
     JWT_SECRET_KEY=
     FRONTEND_URL=

     # Cloudinary Variables
     CLOUDINARY_CLOUD_NAME=
     CLOUDINARY_API_KEY=
     CLOUDINARY_API_SECRET=

     # Stripe
     STRIPE_API_KEY=
     ```

2. **MongoDB Setup**:
   - Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new cluster and database.
   - Add your MongoDB connection string to the `MONGODB_CONNECTION_STRING` variable in your `.env` files.

3. **Cloudinary Setup**:
   - Create an account at [Cloudinary](https://cloudinary.com/).
   - Add your Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) to the `.env` files.

4. **Stripe Setup**:
   - Sign up for a Stripe account at [Stripe](https://stripe.com/).
   - Add your Stripe API key to the `STRIPE_API_KEY` variable in the `.env` files.

5. **JWT Secret Key**:
   - Generate a random string for `JWT_SECRET_KEY` (you can use an online secret key generator).

6. **Frontend URL**:
   - Set `FRONTEND_URL` to `http://localhost:5173` for local development.

---

## Frontend Configuration 🖥️

1. **Environment Files**:
   - Navigate to the `frontend` folder and create a `.env` file.
   - Add the following content:

     ```plaintext
     VITE_API_BASE_URL=http://localhost:7000
     VITE_STRIPE_PUB_KEY=<your-stripe-publishable-key>
     ```

2. **Stripe Publishable Key**:
   - Retrieve your Stripe publishable key from the Stripe dashboard and add it to `VITE_STRIPE_PUB_KEY`.

---

## Running the Application 🚀

1. **Backend**:
   - Navigate to the `backend` directory.
   - Install dependencies: `npm install`.
   - Start the server: `npm start`.

2. **Frontend**:
   - Open a new terminal and navigate to the `frontend` directory.
   - Install dependencies: `npm install`.
   - Start the frontend application: `npm run dev`.
   - The app will be available at `http://localhost:5173`.

---

## Running Automated Tests 🧪

1. **MongoDB Setup for Tests**:
   - Create a new MongoDB database for testing purposes.
   - Add the connection string to the `MONGODB_CONNECTION_STRING` variable in the `.env.e2e` file.

2. **Importing Test Data**:
   - The repository contains a `data` folder with JSON files for test users and hotels.
   - Use MongoDB Compass to import `test-users.json` and `test-hotel.json` into your test database.

3. **Running Tests**:
   - Install the [Playwright extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) in VS Code.
   - Navigate to the `e2e-tests` directory.
   - Install dependencies: `npm install`.
   - Start the frontend and backend servers.
   - Use the Playwright extension to run the tests.

---

## Contributing 🤝

We welcome contributions! If you have any ideas or suggestions, feel free to submit a pull request. Here's how you can contribute:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


## Acknowledgments 🙏

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com/)
- [Stripe](https://stripe.com/)
- [Playwright](https://playwright.dev/)

---

Leave a ⭐ if this project helped you! Happy coding! 🚀
