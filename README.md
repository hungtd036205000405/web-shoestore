# 🛍️ ShoeStore - Fullstack E-commerce Website  

## 🚀 Introduction  
**ShoeStore** is a full-featured online shoe store built using **Spring Boot (Backend)** and **React (Frontend)**.  
This project goes beyond the basic functionalities of an e-commerce website by leveraging modern technologies to enhance user experience and ensure robust security.  

---

## ✨ Key Features  

### 👤 User Management & Role-Based Access  
- **Registration/Login** with **Spring Security + JWT Token**.  
- Passwords securely hashed using **BCrypt**.  
- Three clear **role levels**:  
  - 👑 **Admin**: manage products, orders, and users.  
  - 🧑‍💼 **Staff**: process orders and provide customer support.  
  - 👤 **User**: shop, interact with AI Chatbot, review and save favorite products.  

### 🛒 E-commerce System  
- Full **Cart, Order, and Online Payment** management.  
- **Advanced search & filtering** by category, size, and price.  
- **Personalized Recommendations** based on purchase history.  
- **Promotions & Discounts** system.  

### ⭐ Product Reviews & Favorites  
- Users can **rate and review products** they purchased.  
- Users can **save favorite products** for easy access later.  
- Enhances **user engagement** and **personalized shopping experience**.  

### 🤖 AI Chatbot (OpenAI API)  
- Integrated **AI Chatbot** to assist customers.  
- Provides **product recommendations** based on user preferences.  
- Stores **conversation history** (Conversation + Message).  

### 📊 Admin Dashboard  
- **Revenue statistics** by day, month, year.  
- **Visual charts**: best-selling products, revenue trends.  
- Manage products, orders, and users efficiently.  

### 🔐 Security & Backend Techniques  
- **Spring Security + JWT** for Authentication & Authorization.  
- **CORS configuration** to protect API endpoints.  
- Built **RESTful APIs** following best practices.  

---

## 🛠️ Technology Stack  

### Backend  
- Java Spring Boot (REST API)  
- Spring Security + JWT (Authentication & Authorization)  
- MySQL (Relational Database)  
- Hibernate / JPA (ORM)  

### Frontend  
- React + React Router (Single Page Application)  
- Axios (API requests)  
- TailwindCSS / CSS Modules (UI/UX)  

### Others  
- Docker (Deployment)  
- Ngrok (API testing)  
- OpenAI API (AI Chatbot)  

---
## 📸 Demo Screenshots  

**Rating system with stars and comments.**

<img src="https://github.com/user-attachments/assets/19f9f528-fd73-4f33-991e-2ae2955cfe8a" width="500" alt="Screenshot 1" />

**BestSeller Page showcasing top-selling products.**

<img src="https://github.com/user-attachments/assets/2a980fa2-2f64-435b-b8c5-ee7bf11abd0d" width="500" alt="Screenshot 2" />

**Cart page: edit size, quantity, delete items, etc.**

<img src="https://github.com/user-attachments/assets/cc3fd42a-75ef-48af-b48a-eb38588b3776" width="500" alt="Screenshot 3" />

**Checkout and payment page.**

<img src="https://github.com/user-attachments/assets/0c0717a6-d212-42ce-81e2-50f4429bb987" width="500" alt="Screenshot 4" />

**Admin Dashboard - product management.**

<img src="https://github.com/user-attachments/assets/c6ea6a2e-3efe-4f20-9775-bf495b0b8b1e" width="500" alt="Screenshot 5" />

**Admin Dashboard - revenue statistics and charts.**

<img src="https://github.com/user-attachments/assets/9874d73e-5fd3-42b2-8c90-0ef505d89e13" width="500" alt="Screenshot 6" />

**ChatBox with AI.**

<img src="https://github.com/user-attachments/assets/c0eb531f-9ba0-4d5e-93fd-f1acb91a4d2e" width="500" alt="Screenshot 7" />
---

## ⚡ Highlights  
✅ Implemented **Spring Security + JWT** for full system security.  
✅ Multi-level **Role-Based Access Control** (**Admin / Staff / User**).  
✅ Integrated **AI Chatbot** for product recommendations using **OpenAI**.  
✅ Complete **Cart + Order + Payment** functionalities.  
✅ **Product Reviews & Favorites** to enhance engagement and shopping experience.  
✅ Modern **React frontend** design, scalable and maintainable.  
✅ **Clean Architecture** & **RESTful API** standards.  
✅ Admin Dashboard for managing **products, users, orders, and revenue**.  

---

## 🔮 Future Improvements  
- Online Payment: integrate **VNPay / PayPal / Stripe**.  
- Advanced AI Recommendations: personalized suggestions based on purchase history and user behavior.  
- **ElasticSearch**: for fast product search.  
- Mobile App (React Native): extend ShoeStore experience to mobile devices.  

---

## 🚀 Installation & Running the Project  

### Backend (Spring Boot)  
```bash
cd backend
mvn spring-boot:run
