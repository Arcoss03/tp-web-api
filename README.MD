# TP Web-API

## Author:
- #### FRIN Arthur: ESGI-B2

### This is a simple API that allows admins to manage a list of student, create courses and assign students to courses. Students can also sign up when there assist to a course.

### This project is made with:
- #### NodeJS
- #### Express
- #### MySQL
- #### Prisma
- #### Typescript

### install dependencies:
```
npm install
```
### generate prisma schema in your node_modules:
```
npx prisma generate --schema=src/prisma/schema.prisma
```
### install the mysql database dump in 
```
dumps/dump1.sql
```

### configure your own .env file, exemple: 
```
DATABASE_URL=mysql://root:root@localhost:8889/web_sign
MY_UNIQUE_SALT=BlQWa1y5PbbOmxqy68dpXPOlbJV
JWT_SECRET=dsjkgfhseughezugbezvbez
```
### run in dev mode
```
npm run dev
```
### build the project
```
npm run build
```
### run the server
```
npm start
```


