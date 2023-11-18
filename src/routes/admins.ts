// routes/admin.ts
import { Router } from "express";
import db from "./../db";

//set up role booleans
const adminBoolean = 1;
const studentBoolean = 0;

const router = Router();

//================= POST REQUESTS =================//

// route to create a new course
router.post("/course", async (req, res) => {
    const { title, date, studentList } = req.body;
    let connection;
  
    try {
      // Obtenir une connexion à partir du pool
      connection = await db.getConnection();
  
      // Démarrez une transaction
      await connection.beginTransaction();
  
      // Insérez le cours
      const courseQuery = "INSERT INTO courses (title, date) VALUES (?, ?)";
      const [courseResult] = await connection.query(courseQuery, [title, date]);
  
      const courseId = courseResult.insertId; // Récupérez l'ID du cours inséré
  
      // Insérez les relations dans student_courses
      if (studentList && studentList.length > 0) {
        const studentCoursesQuery = "INSERT INTO student_courses (course_id, student_id) VALUES (?, ?)";
        for (const studentId of studentList) {
          await connection.query(studentCoursesQuery, [courseId, studentId]);
        }
      }
  
      // Validez et committez la transaction
      await connection.commit();
  
      res.status(201).send("Course created");
    } catch (error) {
      // En cas d'erreur, annulez la transaction et renvoyez une réponse d'erreur
      if (connection) {
        await connection.rollback();
      }
      console.error(error);
      res.status(500).send("Error creating course");
    } finally {
      // Libérez la connexion dans le pool après utilisation
      if (connection) {
        connection.release();
      }
    }
  });

// route to create a new admin
router.post("/admin", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const query = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
  db.query(query, [email, password, adminBoolean], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).send("admin created");
    }
  });
});

// route to create a new student
router.post("/student", (req, res) => {
  const { email, password } = req.body;

  const query = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
  db.query(query, [email, password, studentBoolean], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).send("student created");
    }
  });
});

//================= GET REQUESTS =================//

// route to get all users
router.get("/", (req, res) => {
  const query = "SELECT email, role FROM users";
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error fetching users");
    } else {
      res.status(200).json(results);
    }
  });
});

// route to get all admins
router.get("/admin", (req, res) => {
  const query = "SELECT email FROM users WHERE role = ?";
  db.query(query, [adminBoolean], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error fetching admins");
    } else {
      res.status(200).json(results);
    }
  });
});
// route to get all students
router.get("/student", (req, res) => {
  const query = "SELECT email FROM users WHERE role = ?";
  db.query(query, [studentBoolean], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error fetching students");
    } else {
      res.status(200).json(results);
    }
  });
});

// route to get all courses
router.get("/course", (req, res) => {
  const query = "SELECT title, date FROM courses";
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error fetching courses");
    } else {
      res.status(200).json(results);
    }
  });
});
// route to get a specific user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT email, role FROM users WHERE id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error fetching user");
    } else {
      res.status(200).json(results);
    }
  });
});

//route to get specific course by id
router.get("/course/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT title, date FROM courses WHERE id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error fetching course");
    } else {
      res.status(200).json(results);
    }
  });
});

//================= PUT REQUESTS =================//

// route to update a specific user by id
router.put("/admin/:id", (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  const query = "UPDATE users SET email = ?, password = ? WHERE id = ?";
  db.query(query, [email, password, id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating admin");
    } else {
      res.status(200).send("Admin updated");
    }
  });
});

// route to update a specific course by id
router.put("/course/:id", (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;

  const query = "UPDATE courses SET title = ?, date = ? WHERE id = ?";
  db.query(query, [title, date, id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating course");
    } else {
      res.status(200).send("Course updated");
    }
  });
});

//================= DELETE REQUESTS =================//

// route to delete a specific user by id
router.delete("/admin/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting admin");
    } else {
      res.status(200).send("Admin deleted");
    }
  });
});

// route to delete a specific course by id
router.delete("/course/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM courses WHERE id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting course");
    } else {
      res.status(200).send("Course deleted");
    }
  });
});



export default router;
