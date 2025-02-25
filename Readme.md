 
# Inventory Management System (IMS)

An Inventory Management System built with Vite, React.js for the frontend, and Node.js, Express, and MongoDB for the backend.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)


## Features

- User authentication and authorization
- Manage products, companies, locations, and brands
- Track product history
- Dashboard with analytics
- Responsive design with Tailwind CSS


### User Routes

- **POST** `/api/v1/users/signup` - Sign up a new user
- **POST** `/api/v1/users/login` - Log in a user
- **GET** `/api/v1/users/logout` - Log out a user

### Product Routes

- **GET** `/api/v1/products` - Get all products
- **POST** `/api/v1/products` - Add a new product
- **PUT** `/api/v1/products/:id` - Update a product
- **DELETE** `/api/v1/products/:id` - Delete a product

### History Routes

- **GET** `/api/v1/history/:productId` - Get product history

### Company Routes

- **GET** `/api/v1/companies` - Get all companies
- **POST** `/api/v1/companies` - Add a new company

### Location Routes

- **GET** `/api/v1/locations` - Get all locations
- **POST** `/api/v1/locations` - Add a new location

### Analytics Routes

- **GET** `/api/v1/analytics` - Get analytics data

