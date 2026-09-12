import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simple login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@example.com" && password === "1234") {
    res.json({ message: "Login successful ✅" });
  } else {
    res.status(401).json({ message: "Invalid credentials ❌" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
