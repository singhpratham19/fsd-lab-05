# FSD Lab Assignment 5: Blog Post Management System

Name: Pratham Singh  
PRN: 1032211384

A responsive web application to create, view, edit and delete blog posts, built with React, Express, Node.js and MongoDB.

## Run

Start MongoDB in one terminal (create the data folder first if it does not exist):

```bash
mkdir -p ~/mongodb-data
mongod --dbpath ~/mongodb-data
```

Install the packages, build the React app and start the server in a second terminal:

```bash
npm install
npm run build
npm start
```

Then open http://localhost:4000

## REST API

| Method | Endpoint | Action |
|---|---|---|
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get one post by ID |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |
