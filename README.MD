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

## all routes:
### login route (post):
```
/login
```
- params:
```json
{
  "email": "email.exemple@gmail.com",
  "password": "password"
}
```
#### you must use the response token as Bearer Token for authentificate (if role: true -> admin; false -> student)

#### you can use this admin account and student account whith the db dump:

- admin:
```json
{
  "email": "admin@admin.com",
  "password": "azerty"
}
```
- student:
```json
{
  "email": "student@student.com",
  "password": "azerty"
}
```


### admins routes:
#### create a new student (post):
```
/admin/student
```
- params:
```json
{
  "email": "student.exemple@gmail.com",
  "password": "password"
}
```

#### create a new admin (post):
```
/admin/student
```
- params:
```json
{
  "email": "admin.exemple@gmail.com",
  "password": "password"
}
```
#### create a new course (post):
```
/admin/course
```
- params:
```json
{
  "title": "course title",
  "date": "2028-07-30T18:00:00.000Z (dateTime format)",
  "userIds": [5, 6, 11]
}
```

#### get all courses (get):
```
/admin/course
```

#### route to get all the participants of a course (get):
(id is the courses id)
```
/student-courses/:id
```

#### get all students (get):
```
/admin/students
```
#### get all admins (get):
```
/admin/admin
```

#### get all users (get):
```
/admin/user
```

#### get one user by id (get):
```
/admin/user/:id
```

### student routes:
#### route for to sign to a course (id_student in the Bearer token) (path):
```
/student/sign/id_course
```

#### route for get all courses for one student (id_student in the Bearer token) (get):
```
/student/courses
```

#### route for get courses not passed for one student (id_student in the Bearer token) (get):
```
/student/current-courses
```


