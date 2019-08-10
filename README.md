# Learn Coding



## Web Application Description 
This web application will gather the most valuable free programming video tutorials to get you started in the programming world .


---
## Prerequisites

npm  
```
$ npm install
```

Run server
```
$npm start
```

---
## Data Modeling
| User           | Type   |
| -------------- | ------ |
| email          | String |
| hashedPassword | String |
| token          | String |

---

| Video       | Type                  |
| ----------- | --------------------- |
| title       | String                |
| source      | String                |
| videoId     | String                |
| category    | String                |
| description | String                |
| owner       | ObjectId  ref: 'User' |

---

| Comment  | Type                   |
| -------- | ---------------------- |
| content  | String                 |
| userName | String                 |
| owner    | ObjectId  ref: 'User'  |
| videoId  | ObjectId  ref: 'Video' |


---

| List   | Type                   |
| ------ | ---------------------- |
| owner  | ObjectId  ref: 'User'  |
| videos | ObjectId  ref: 'Video' |











## Technologies
* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON APIs

## Front-End Repository
[Here](https://github.com/wijdan1995/project-4-frontend)

## Developer

Wijdan Kuddah
