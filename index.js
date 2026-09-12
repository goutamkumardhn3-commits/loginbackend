import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = new Map([
  ["test@example.com", { name: "Test User", password: "1234" }],
]);

app.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();

  if (!name?.trim() || !normalizedEmail || !password || !confirmPassword) {
    return res.status(400).json({
      message: "Name, email, password, and confirmPassword are required",
    });
  }

  if (!normalizedEmail.includes("@")) {
    return res.status(400).json({ message: "Please provide a valid email" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (users.has(normalizedEmail)) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  users.set(normalizedEmail, { name: name.trim(), password });

  res.status(201).json({
    message: "Registration successful",
    user: { name: name.trim(), email: normalizedEmail },
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.get(email?.trim().toLowerCase());

  if (user?.password === password) {
    res.json({
      message: "Login successful ✅",
      user: { name: user.name, email: email.trim().toLowerCase() },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials ❌" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
