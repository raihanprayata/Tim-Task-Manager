import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // <--- ambil id user

      if (!token || !userId) return alert("Anda belum login!");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/id/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data); // .data.data karena format response kamu
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        alert("Gagal mengambil data profile.");
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <p>Memuat data profile...</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Profil Saya</h3>
      <ul>
        <li>
          <strong>Username:</strong> {user.username}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Role:</strong> {user.role}
        </li>
      </ul>
    </div>
  );
};

export default Profile;
