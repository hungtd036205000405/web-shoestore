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
👉 (Add screenshots or GIFs here to showcase the project)  
<img width="1712" height="1028" alt="image" src="https://github.com/user-attachments/assets/19f9f528-fd73-4f33-991e-2ae2955cfe8a" />

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
