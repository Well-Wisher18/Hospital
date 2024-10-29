const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Hospital = require("./models/hospital"); // Ensure the path to the model is correct
const Patient = require("./models/patient");
const app = express();
const dburl = "mongodb+srv://jk1817:test123@vijay.t7vymtr.mongodb.net/?retryWrites=true&w=majority&appName=vijay";

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Established");
        app.listen(3001, () => {
            console.log("Server is running on port 3001");
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/index", (req, res) => {
    res.render("index");
});
app.get("/review", (req, res) => {
    res.render("review");
});
app.get("/service", (req, res) => {
    res.render("service");
});
app.get("/doctors", (req, res) => {
    res.render("doctors");
});
app.get("/appointment", (req, res) => {
    res.render("appointment");
});

app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/fabout", (req, res) => {
    res.render("fabout");
});
app.get("/fdoc", (req, res) => {
    res.render("fdoc");
});
app.get("/fambulance", (req, res) => {
    res.render("fambulance");
});
app.get("/fmed", (req, res) => {
    res.render("fmed");
});
app.get("/fbed", (req, res) => {
    res.render("fbed");
});
app.get("/fcare", (req, res) => {
    res.render("fcare");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/after_login", (req, res) => {
   res.render("after_login");
});

app.get("/blogs", (req, res) => {
    res.render("blogs");
})

app.get("/patient", (req, res) => {
    res.render("patient");
});
app.get("/pdetails", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render("pdetails", { patients });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/details", async (req, res) => {
    try {
      const hospitals = await Hospital.find(); 
      res.render("details", { hospitals:hospitals }); // Pass the records to the template
    } catch (error) {
      console.error("Error fetching hospital details:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  app.get("/aservice", (req, res) => {
    res.render("aservice");
});
app.get("/aabout", (req, res) => {
    res.render("aabout");
});
app.get("/areview", (req, res) => {
    res.render("areview");
});
app.get("/adoctors", (req, res) => {
    res.render("adoctors");
});
app.get("/ablogs", (req, res) => {
    res.render("ablogs");
});
app.get("/aapointment", (req, res) => {
    res.render("aapointment");
});

app.get("/fchecks", (req, res) => {
    res.render("fchecks");
});

app.post("/patient", async (req, res) => {
    const { fullname, gender, age, phone, date, address, city, state, nationality, pincode } = req.body;
    try {
        const patient = new Patient({ fullname, gender, age, phone, date, address, city, state, nationality, pincode });
        await patient.save();
        console.log("Patient registered successfully and saved to database");
        res.send(`<script>alert("Patient registered successfully"); window.location.href = "/after_login";</script>`);
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send("An error occurred during registration");
    }
});



app.post('/register', async (req, res) => {
    const { email, pass, uname } = req.body;
    try {
        // Check if the email already exists in the database
        const existingUser = await Hospital.findOne({ email });
        if (existingUser) {
            // If the email already exists, send an appropriate response
            res.status(400).send(`<script>alert("Email already in use. Please choose another email."); window.location.href = "/register";</script>`);
        } else {
            // If the email does not exist, proceed with registration
            const hashedPassword = await bcrypt.hash(pass, 10);
            const hospital = new Hospital({ email, password: hashedPassword,  uname  });
            await hospital.save();
            console.log("Registered Successfully and saved to database");
            res.send(`<script>alert("Registration successful"); window.location.href = "/login";</script>`);
        }
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send("An error occurred during registration");
    }
});



app.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
        const hospital = await Hospital.findOne({ email });
        if (!hospital) {
            console.log("No user found with that email");
            return res.status(400).send("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(pass, hospital.password);
        if (isMatch) {
            console.log("Login successful");
            // res.send(`<script>window.location.href = "/after_login";</script>`);
            res.send(`<script> window.location.href = "/after_login";</script>`);
            
        } else {
            console.log("Invalid email or password");
            res.status(400).send("Invalid email or password");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("An error occurred during login");
    }
});



// Handle 404 - Keep this as a last route
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

