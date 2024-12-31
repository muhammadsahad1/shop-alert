# Real-Time Product Notification System

admin -> email : muhammadsahad2022@gmail.com
         pass : Sahad321@

A feature-rich, real-time product notification system that allows users to:

1. **Subscribe to notifications for new products.**
2. **Receive updates for subscribed products.**
3. **Authenticate securely to manage subscriptions and access features.**

---

## Features

### **User Authentication**
- Secure login and registration using modern authentication techniques.
- Password hashing and secure token-based authentication.

### **Product Subscription Notifications**
- Users can subscribe to receive notifications when new products are added.
- Real-time notifications for all subscribed users via WebSockets.

### **Product Update Notifications**
- Users can subscribe to specific products to get real-time updates about changes.
- Notifications are sent instantly whenever the subscribed product is updated.

---

## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Framework for building the backend API.
- **Socket.io**: Real-time communication between client and server.
- **MongoDB**: Database for storing user data, products, and subscriptions.

### Frontend:
- **React.js**: For building a responsive and interactive UI.
- **React-Hook-Form**: Simplified form validation and state management.
- **Toast Notifications**: For user-friendly alerts.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-notifications.git
   cd real-time-notifications
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     PORT=5000
     MONGO_URI=your-mongodb-uri
     JWT_SECRET=your-secret-key
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. Run the frontend (if separate):
   ```bash
   cd client
   npm install
   npm start
   ```

---

## Usage

### Authentication:
- **Register** as a new user.
- **Login** to access your account and manage subscriptions.

### Subscribing to New Product Notifications:
- Click the "Subscribe to New Products" button.
- Receive real-time notifications when new products are added.

### Subscribing to Specific Products:
- Navigate to a product and click the "Subscribe" button.
- Get instant notifications about updates to that product.

### Notifications:
- Notifications are displayed in real-time as toast messages.
- The notification history is accessible in your dashboard.

---

## API Endpoints

### **Authentication Endpoints**
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user.

### **Product Endpoints**
- `GET /api/products`: Fetch all products.
- `POST /api/products`: Add a new product (admin-only).
- `PUT /api/products/:id`: Update a product (admin-only).

### **Subscription Endpoints**
- `POST /api/subscribe`: Subscribe to a product.
- `DELETE /api/subscribe/:id`: Unsubscribe from a product.

---

## Future Enhancements

- **Email Notifications**: Send email updates alongside real-time notifications.
- **User Preferences**: Allow users to customize notification settings.
- **Analytics Dashboard**: Track subscription trends and popular products.

---

## Contributing

We welcome contributions! Please fork the repository and submit a pull request with your proposed changes.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For questions or feedback, please contact:

- **Name**: Muhammad Sahad
- **GitHub**: [muhammadsahad](https://github.com/muhammadsahad)

