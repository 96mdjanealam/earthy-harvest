# Earthy Harvest

A full-stack e-commerce web application designed to connect environmentally conscious consumers with sustainable products. Built using the MERN stack, powered by modern frontend and backend technologies, Earth Harvest offers secure transactions, product management, image uploads, and an intuitive user experience.

🔗 **Live Site:** [earthy-harvest-client.vercel.app](https://earthy-harvest-client.vercel.app/)  
🔗 **GitHub Repo:** [github.com/96mdjanealam/earthy-harvest](https://github.com/96mdjanealam/earthy-harvest.git)

---

## 🌍 Introduction

**Earthy Harvest** is a modern e-commerce platform tailored for the eco-conscious market. Users can explore and purchase eco-friendly products while sellers can securely manage listings and orders. Admin functionality, cloud-based image uploads, and Stripe integration provide a complete online shopping solution.

---

## ✨ Features

- 🛍 Product listing, browsing, and purchasing  
- 🔐 Secure user authentication using JWT  
- 🧾 Admin/seller dashboard for product management  
- ☁️ Cloudinary integration for image uploads  
- 💳 Stripe integration for secure payments  
- 💬 Real-time toast notifications  
- 🎨 Responsive UI with Tailwind CSS  
- ⚡ Optimized React 19 frontend with Vite

---

## ⚙️ Installation

### Prerequisites

- Node.js (v18+)
- MongoDB URI (local or Atlas)
- Stripe account and keys
- Cloudinary credentials

### Clone the Repository

```bash
git clone https://github.com/96mdjanealam/earthy-harvest.git
cd earthy-harvest
```

### Install Client

```bash
cd client
npm install
```

### Install Server

```bash
cd ../server
npm install
```

---

## 🚀 Usage

### Start Development Servers

**Client:**

```bash
cd client
npm run dev
```

**Server:**

```bash
cd server
npm run server
```

Access the application at: `http://localhost:5173`

### Login Options

- 👤 **User Access:**
  - Visitors can **create a new account** or log in using the default user:
    ```
    Email:    user@gmail.com
    Password: 123456
    ```

- 🧑‍💼 **Seller/Admin Access:**
  - Seller/admin accounts **cannot be created by users**. Use the built-in admin account:
    ```
    Email:    admin@123.com
    Password: admin123
    ```

---

## 🔧 Configuration

### `client/.env`

```env
VITE_CURRENCY='$'
VITE_BACKEND_URL="http://localhost:4000"
```

### `server/.env`

```env
NODE_ENV=development
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

# Admin Credentials
SELLER_EMAIL=admin@123.com
SELLER_PASSWORD=admin123

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# Stripe
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
```

---

## 📦 Dependencies

### Client

- `react` `^19.0.0`
- `react-router-dom` `^7.5.0`
- `axios`, `tailwindcss`, `react-hot-toast`, `react-icons`
- `vite`, `eslint`, `@vitejs/plugin-react`

### Server

- `express` `^5.1.0`
- `mongoose`, `jsonwebtoken`, `bcryptjs`
- `cloudinary`, `multer`, `stripe`, `dotenv`, `cors`
- `nodemon` for development

---

## 🧪 Examples

- ✅ Try the [live demo](https://earthy-harvest-client.vercel.app/)
- 🔑 **Demo User Account:**
  ```
  Email:    user@gmail.com
  Password: 123456
  ```
- 🧑‍💼 **Demo Admin/Seller Account:**
  ```
  Email:    admin@123.com
  Password: admin123
  ```
- 🌱 Visitors can also register a **new user account** via the signup form.

---

## 🧯 Troubleshooting

- **MongoDB Connection Error:** Check `MONGODB_URI` in `.env`  
- **Stripe issues:** Verify all API keys and webhook secret  
- **Cloudinary upload errors:** Ensure Cloudinary credentials are correct  
- **CORS issues:** Confirm correct URL and port usage across frontend/backend  

---

## 👥 Contributor

[@96mdjanealam](https://github.com/96mdjanealam) | Full Stack Developer
