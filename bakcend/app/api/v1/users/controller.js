const modelUser = require("./model.js");

const getAllUser = async (req, res) => {
  try {
    const dataUser = await modelUser.findAll();
    res.status(200).json({
      message: "Data User",
      data: dataUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const dataUserById = await modelUser.findByPk(id);
    if (!dataUserById) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({
      message: `Data user id:${id}`,
      data: dataUserById,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, password } = req.body;

    const dataUser = await modelUser.findByPk(id);
    if (!dataUser) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const userUpdated = await modelUser.update(
      {
        username: username || dataUser.username,
        email: email || dataUser.email,
        password: password || dataUser.password,
      },
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      message: "Data berhasil diubah",
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const dataUser = await modelUser.findByPk(id);
    if (!dataUser) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const userDeleted = await modelUser.destroy({ where: { id: id } });
    res.status(200).json({
      message: "Data berhasil dihapus",
      data: userDeleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    const dataUser = await modelUser.findByPk(id);
    if (!dataUser) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await modelUser.update({ role }, { where: { id } });

    const updatedUser = await modelUser.findByPk(id); // ambil data terbaru

    res.status(200).json({
      message: "Role berhasil diubah",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  updateRole,
  deleteUser,
};
