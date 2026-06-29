# 🛒 CampusCart

CampusCart is a secure campus-exclusive marketplace that enables college students to buy and sell second-hand items within their own campus community. The platform provides a safe, organized, and user-friendly environment for trading books, electronics, stationery, hostel essentials, clothing, and more.

---

## 📌 Features

### 👤 User Authentication
- Student Registration
- Secure Login
- College Email Verification
- Personalized Dashboard

### 🛍 Marketplace
- Browse all available products
- Search products by name
- Filter by category
- Filter by condition
- Sort by price (Low → High / High → Low)
- View detailed product information

### 📦 Product Management
- List new products
- Edit product details
- Delete products
- Mark products as Sold
- Sold products are automatically hidden from the marketplace

### 📞 Seller Contact
- View seller phone number
- Direct WhatsApp communication with seller

### 🎨 User Experience
- Responsive UI
- Modern interface
- Real-time product updates

---

# 🏗 System Architecture

```
Frontend (HTML, CSS, JavaScript)
            │
            ▼
Spring Boot REST APIs
            │
            ▼
Business Logic Layer
            │
            ▼
Spring Data JPA
            │
            ▼
PostgreSQL Database
```

---

# 🛠 Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Spring Boot
- Spring MVC
- Spring Data JPA

## Database
- PostgreSQL

## Deployment
- Render
- Docker
- Docker Hub

## Tools
- IntelliJ IDEA
- VS Code
- Git
- GitHub
- Postman

---

# 📂 Project Structure

```
CampusCart/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── marketplace.html
│   ├── product.html
│   ├── styles.css
│   └── script.js
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
│
├── Dockerfile
├── pom.xml
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/dstar28/CampusCart.git
```

```
cd CampusCart
```

---

## Backend

Configure PostgreSQL in

```
src/main/resources/application.properties
```

Run

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

## Frontend

Open

```
frontend/index.html
```

or deploy using Render Static Site.

---

# 🌐 Live Demo

Frontend:

```
https://campuscart-w7hi.onrender.com
```

Backend:

```
https://campuscart-backend-latest.onrender.com
```

---

# 📸 Screenshots

- Home Page
- Login
- Signup
- Dashboard
- Marketplace
- Product Details

(Add screenshots here)

---

# 🚀 Future Enhancements

- Product Images
- Wishlist
- In-App Chat
- Payment Gateway
- AI Product Recommendations
- Admin Panel
- Email Notifications
- Product Reports
- Ratings & Reviews

---

# 👨‍💻 Contributors

- Darsh Kothari
- Mishti Shah

---

# 📚 References

- Spring Boot Documentation
- PostgreSQL Documentation
- React Documentation
- GitHub Documentation
- Postman Documentation

---

# 📄 License

This project is developed for educational purposes as a Mini Project.

```

### ⭐ If you find this project useful, don't forget to star the repository!
