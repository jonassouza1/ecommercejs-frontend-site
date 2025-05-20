# 🛒 E-commerce Frontend — HTML, JavaScript & Bootstrap
[<img src="./ecommerce-front.gif" >]

A complete e-commerce frontend built **from scratch** using **HTML5**, **vanilla JavaScript**, and **Bootstrap (via CDN)**. The focus is on accessibility, responsiveness, and user experience, with **client-side form validation** and **full backend integration**.

> 🚫 No frameworks or build systems were used.  
> 📡 This frontend communicates directly with two backend servers (payments and database).

---

## 🧱 Technologies Used

- ✅ **HTML5** — semantic markup
- ✅ **Vanilla JavaScript** — DOM manipulation and business logic
- ✅ **Bootstrap 5** — responsive layout and components via CDN
- ✅ **Fetch API** — backend communication

---

## ✨ Key Features

### 🛍️ Online Store

- Dynamic product catalog
- Shopping cart with:
  - Quantity updates
  - Duplicate item prevention
  - Persistent state after reload

### 🧾 Smart Forms

- Field validation (e.g., valid email, required fields)
- Visual feedback for errors
- Secure data submission to backend

### 💳 Mercado Pago Integration

- Generates **payment preferences**
- Redirects users to **Checkout Pro**
- Supports **Mercado Envios (ME2)** for automated shipping
- Webhook receives payment confirmations
- Automatically sends confirmation email to seller after purchase

---

## 📦 Integration Architecture

This frontend communicates with two distinct backend services:

| Service         | Handles                                                        |
|----------------|-----------------------------------------------------------------|
| `backend-api`   | Payments (Mercado Pago) + email sending via Nodemailer         |
| `backend-db`    | Communication with Neon/PostgreSQL database                    |

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/jonassouza1/ecommercejs-frontend-site.git
