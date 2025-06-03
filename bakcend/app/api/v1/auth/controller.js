const modelAuth = require("./model.js");
const modelUser = require("../users/model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// === REGISTER ===
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah user sudah terdaftar
    const existing = await modelAuth.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke tabel auth
    const authUser = await modelAuth.create({
      username,
      email,
      password: hashedPassword,
      role: "member", // default role
    });

    res.status(200).json({ message: "Registrasi berhasil!", data: authUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// === LOGIN ===
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Cari user di tabel auth
    const dataAuth = await modelAuth.findOne({ where: { username } });
    if (!dataAuth) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // 2. Validasi password
    const passwordValid = await bcrypt.compare(password, dataAuth.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Password tidak valid!" });
    }

    // 3. Cek user di tabel users
    let dataUserLogin = await modelUser.findOne({
      where: { authId: dataAuth.id },
    });

    let currentRole = "member"; // default role

    if (!dataUserLogin) {
      // 3a. Kalau belum ada, buat user baru dengan role 'member'
      dataUserLogin = await modelUser.create({
        username: dataAuth.username,
        password: dataAuth.password,
        email: dataAuth.email,
        role: currentRole,
        authId: dataAuth.id,
      });
    } else {
      // 3b. Kalau sudah ada, ambil role dari tabel user
      currentRole = dataUserLogin.role;
    }

    // 4. Buat token
    const token = jwt.sign(
      {
        id: dataAuth.id,
        role: currentRole,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // 5. Kirim respons
    res.status(200).json({
      message: "Login berhasil",
      data: dataUserLogin,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
