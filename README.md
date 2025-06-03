# Tim-Task-Manager

📄 Pages / Halaman
Project ini memiliki beberapa halaman utama:

Register

Login

Dashboard

User / Member Management

Tambah User / Member

Edit User / Member

Detail User / Member

Project Management

Tambah Project

Edit Project

Detail Project

Tambah Task

Edit Task

🔐 Cara Register & Login
Pendaftaran dapat menggunakan username, email, dan password secara bebas.

Saat login, pastikan data username/email dan password sama persis dengan yang digunakan saat register, jika tidak login akan gagal.

Untuk login sebagai admin, gunakan password: admin123 saat register.

🧑‍💼 Role & Akses Fitur
Aplikasi ini menggunakan sistem role-based access control (RBAC) dengan tiga level akses:

🛠️ Admin
Mengubah role user lain

Menghapus user lain

Menambah & menghapus project

Mengubah detail project

Melihat semua detail project dan user

👑 Owner
Menambah & menghapus project

Mengubah detail project

Melihat detail project dan user

Membuat task & menentukan siapa yang mengerjakannya

Mengubah status task

CRUD task (Create, Read, Update, Delete)

👤 Member
Melihat detail project

Melihat detail user

💡 Saran / Catatan Tambahan
Pastikan backend berjalan terlebih dahulu sebelum menjalankan frontend.

Gunakan database MySQL sesuai konfigurasi di file environment.

Role default user saat register adalah member. Untuk membuat user sebagai admin, ubah role-nya melalui fitur yang hanya bisa diakses oleh admin.
