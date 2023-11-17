// routes/admin.ts
import { Router } from 'express';
import db from './../db';

//set up role booleans
const adminBoolean = 1;
const studentBoolean = 0;

const router = Router();

//================= POST REQUESTS =================//

// route to create a new admin
router.post('/admin', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
  
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(query, [email, password, adminBoolean], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error creating user');
      } else {
        res.status(201).send('admin created');
      }
    });
  });

// route to create a new student
router.post('/student', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(query, [email, password, studentBoolean], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error creating user');
      } else {
        res.status(201).send('student created');
      }
    });
  });


//================= GET REQUESTS =================//

// route to get all users
router.get('/', (req, res) => {
    const query = 'SELECT email, role FROM users';
    db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error fetching users');
      } else {
        res.status(200).json(results);
      }
    });
  });

// route to get all admins
router.get('/admin', (req, res) => {
    const query = 'SELECT email FROM users WHERE role = ?';
    db.query(query, [adminBoolean], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error fetching admins');
      } else {
        res.status(200).json(results);
      }
    });
  });
  // route to get all students
router.get('/student', (req, res) => {
    const query = 'SELECT email FROM users WHERE role = ?';
    db.query(query, [studentBoolean], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error fetching students');
      } else {
        res.status(200).json(results);
      }
    });
  });

//================= PUT REQUESTS =================//

router.put('/admin/:id', (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
  
    const query = 'UPDATE users SET email = ?, password = ? WHERE id = ?';
    db.query(query, [email, password, id], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error updating admin');
      } else {
        res.status(200).send('Admin updated');
      }
    });
  }
    );
  

export default router;