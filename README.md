# 📚 School Management API

This repository contains a **Node.js** and **Express.js** based API for managing school data. The API allows users to **add new schools** and **retrieve a list of schools sorted by proximity** to a user-specified location. The data is stored in **MySQL**, and the application is deployed on **Render**.

## 🚀 Features

✅ **Add School API (`POST /addSchool`)**  
- Adds a new school with `name`, `address`, `latitude`, and `longitude`.  
- Validates input before inserting into the database.  

✅ **List Schools API (`GET /listSchools?latitude=<lat>&longitude=<long>`)**  
- Fetches all schools and sorts them by **geographical distance** from the user's location.  
- Uses the **Haversine formula** for accurate distance calculation.  

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Deployment:** Render  

## 📂 Project Structure

📦 school-management-api
 ┣ 📂 config
 ┃ ┗ 📜 db.js             # Database connection setup
 ┣ 📂 controllers
 ┃ ┣ 📜 schoolController.js  # Business logic for API endpoints
 ┣ 📂 routes
 ┃ ┗ 📜 schoolRoutes.js    # Express route handlers
 ┣ 📂 models
 ┃ ┗ 📜 schoolModel.js     # School database schema
 ┣ 📜 .env                 # Environment variables (for database credentials)
 ┣ 📜 app.js               # Main application file
 ┣ 📜 package.json         # Project dependencies
 ┣ 📜 README.md            # Documentation
🏗️ Setup & Installation


## 🏗️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/school-management-api.git
cd school-management-api

## Install Dependencies
npm install

## Configure Environment Variables
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name


📡 API Endpoints
➕ Add a School
    -**Endpoint:** /addSchool
    -**Method:** POST

## Payload Example:
{
  "name": "Green Valley School",
  "address": "123 Main St, New York, NY",
  "latitude": 40.7128,
  "longitude": -74.0060
}

## Response:
{
  "message": "School added successfully"
}


##🌍 Deployment on Render
This API is deployed on Render, making it accessible publicly.

Live API URL: https://assignment-k6pu.onrender.com


---

- **Project description** 📝
- **Tech stack** 🔧
- **Setup instructions** ⚡
- **API documentation with examples** 📡
- **Live deployment link** 🌍
- **Future improvements** 🚀
- **License & contribution guidelines** 🛠️
- **Contact info** 📩

Let me know if you need any modifications! 🚀🔥
