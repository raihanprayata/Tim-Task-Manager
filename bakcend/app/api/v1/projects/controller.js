const modelProject = require("./model.js");
const modelUser = require("../users/model.js");
const { Op } = require("sequelize");

const getAllProject = async (req, res) => {
  try {
    const dataProject = await modelProject.findAll({
      include: {
        association: "owner", // alias relasi belongsTo ke User
        attributes: ["id", "username", "email"], // hanya ambil data penting
      },
    });
    res.status(200).json({
      message: "Data Project",
      data: dataProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectWithOwner = async (req, res) => {
  try {
    const project = await modelProject.findAll({
      include: {
        association: "owner", // pakai alias dari relasi belongsTo
        attributes: ["id", "username", "email"], // pilih data yang ingin ditampilkan
      },
    });

    res.status(200).json({
      message: "Data Project",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectsWithMembers = async (req, res) => {
  try {
    const projects = await modelProject.findAll({
      include: [
        {
          model: modelUser,
          as: "members", // sesuai alias relasi many-to-many
          attributes: ["id", "username", "email"], // hanya ambil data penting
        },
      ],
    });

    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const dataProjectById = await modelProject.findByPk(id, {
      include: {
        association: "owner", // ambil data pemilik (user)
        attributes: ["id", "username", "email"],
      },
    });

    if (!dataProjectById) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({
      message: "Data Project",
      data: dataProjectById,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectByUser = async (req, res) => {
  try {
    const projectByUser = await modelProject.findAll({
      where: { ownerId: req.user.id },
      include: [
        {
          association: "owner",
          attributes: ["id", "username", "email"],
        },
        {
          model: modelUser,
          as: "members",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    res.status(200).json({
      message: "Data project User",
      data: projectByUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { project_name, description, ownerId } = req.body;
    if (!project_name || !description || !ownerId) {
      return res.status(400).json({ message: "Semua data harus diisi!" });
    }
    const newProject = await modelProject.create({
      project_name,
      description,
      ownerId,
    });
    res.status(200).json({
      message: "Data berhasil ditambahkan.",
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const { project_name, description, ownerId } = req.body;

    // Cari project yang akan diupdate
    const dataProject = await modelProject.findByPk(id);
    if (!dataProject) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Cek jika ada perubahan nama, lalu cek apakah nama project sudah dipakai oleh project lain
    if (project_name && project_name !== dataProject.project_name) {
      const projectExists = await modelProject.findOne({
        where: {
          project_name,
          id: { [Op.ne]: id }, // id yang bukan dirinya sendiri
        },
      });
      if (projectExists) {
        return res
          .status(400)
          .json({ message: "Nama project sudah digunakan" });
      }
    }

    // Update data
    await dataProject.update({
      project_name: project_name || dataProject.project_name,
      description: description || dataProject.description,
      ownerId: ownerId || dataProject.ownerId,
    });

    res.status(200).json({
      message: "Data berhasil diubah",
      data: dataProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const dataProject = await modelProject.findByPk(id);
    if (!dataProject) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const projectDeleted = await modelProject.destroy({ where: { id: id } });
    res.status(200).json({
      message: "Data berhasil dihapus",
      data: projectDeleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMemberToProject = async (req, res) => {
  const { userId } = req.body;
  const projectId = req.params.projectId;
  const currentUserId = req.user.id;

  try {
    const project = await modelProject.findByPk(projectId);
    if (!project || project.ownerId !== currentUserId) {
      return res.status(403).json({ message: "Bukan pemilik proyek" });
    }

    const isAlreadyMember = await project.hasMember(userId);
    if (isAlreadyMember) {
      return res.status(400).json({ message: "User sudah anggota" });
    }

    await project.addMember(userId);
    res.status(200).json({ message: "Anggota berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeMemberFromProject = async (req, res) => {
  const { userId } = req.body;
  const projectId = req.params.projectId;
  const currentUserId = req.user.id;

  try {
    const project = await modelProject.findByPk(projectId);
    if (!project || project.ownerId !== currentUserId) {
      return res.status(403).json({ message: "Bukan pemilik proyek" });
    }

    const isMember = await project.hasMember(userId);
    if (!isMember) {
      return res.status(404).json({ message: "User bukan anggota proyek" });
    }

    await project.removeMember(userId);
    res.status(200).json({ message: "Anggota berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchProjects = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const projects = await modelProject.findAll({
      where: {
        project_name: {
          [Op.like]: `%${keyword}%`, // cari yang mengandung keyword
        },
      },
    });

    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProject,
  getProjectWithOwner,
  getProjectsWithMembers,
  getProjectById,
  getProjectByUser,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
  removeMemberFromProject,
  searchProjects,
};
