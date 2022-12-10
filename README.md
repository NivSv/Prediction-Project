<h1 align="center" id="title">Prediction Project</h1>

<p align="center"><img src="https://socialify.git.ci/NivSv/Prediction-Project/image?description=1&amp;font=Inter&amp;language=1&amp;name=1&amp;owner=1&amp;stargazers=1&amp;theme=Auto" alt="project-image"></p>

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Technical Info](#technical-info)

## General info
This project takes a user’s input (a person’s name) and returns a predicted gender and nationality.

## Technologies
Project is created with:
Docker: 
* Image of SQL server

Backend:
* Fastify(node.js framework) - Typescript

Frontend:
* React - Typescript

## Setup
__step 1:__

use the following command in the db-docker folder to run the image and create a basic database that works with the project:
```
docker compose up -d
```
DB Credentials:
* Port: 27017
* Username: root 
* Password: example

__step 2:__
#### Dev run
run the backend with the command
```
npm run dev
```
 run the frontend with the command
```
npm start
```
#### Prod run
run the backend with the command
```
npm run build
npm run start
```
run the frontend with the command
```
npm run build
npm run serve
```

## Technical Info
Backend Dependencies:
* Axios
* Graphql
* Mongoose
* Mercurius

Frontend Dependencies:
* Apollo Client
* Material UI
* Vite
* Redux (toolkit)
* Vite
* Sass
* Graphql

