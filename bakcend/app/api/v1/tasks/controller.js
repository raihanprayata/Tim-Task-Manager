const modelTask = require("./model.js");
const modelProject = require("../projects/model.js");
const users = require("../users/model.js");

const { Task, Project, User } = require("../../../utils/relasi.js"); // sesuaikan path

const getAllTask = async (req, res) => {
  try {
    const task = await modelTask.findAll();
    res.status(200).json({
      message: "Data task",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await modelTask.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan!" });
    }

    res.status(200).json({
      message: "Detail task",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    console.log("Project ID:", projectId);

    const dataTaskByProject = await Task.findAll({
      where: { projectId },
      // Hapus order by "order" karena field tidak ada, atau ganti dengan field yang ada
      order: [["id", "ASC"]], // atau field lain yang ada seperti createdAt
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    if (!dataTaskByProject || dataTaskByProject.length === 0) {
      return res
        .status(404)
        .json({ message: "Task tidak ditemukan untuk project ini" });
    }

    res.status(200).json({
      message: `Task dari project ${projectId}`,
      data: dataTaskByProject,
    });
  } catch (error) {
    console.error("Error detail:", error);
    res.status(500).json({ message: error.message });
  }
};

const getTaskByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const task = await modelTask.findAll({ where: { status: status } });

    if (task.length === 0) {
      return res
        .status(404)
        .json({ message: `Tidak ada task dengan status ${status}` });
    }

    res.status(200).json({
      message: `Task dengan status ${status}`,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskByAssignedTo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const tasks = await Task.findAll({
      where: { assignedTo: userId },
      include: [
        {
          model: Project,
          as: "project",
          attributes: ["id", "project_name"],
        },
        {
          model: User,
          as: "assignee",
          attributes: ["id", "username", "email"],
        },
      ],
      order: [["deadline", "ASC"]], // urutkan berdasarkan deadline, bisa diubah
    });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        message: `Tidak ada task yang diberikan kepada user dengan ID ${userId}`,
      });
    }

    res.status(200).json({
      message: `Daftar task yang diassign ke user ${userId}`,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterTaskByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const task = await modelTask.findByPk({ where: { assignedTo: userId } });

    if (!task) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({
      message: `Data task user ${userId}`,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { task_name, description, status, deadline, projectId, assignedTo } =
      req.body;

    if (!task_name || !description || !status || !deadline) {
      return res.status(400).json({ message: "Semua data harus diisi!" });
    }

    if (!projectId) {
      return res.status(404).json({ message: "Project tidak ditemukan" });
    }

    // Validasi format deadline (opsional tapi disarankan)
    if (isNaN(Date.parse(deadline))) {
      return res.status(400).json({ message: "Format deadline tidak valid!" });
    }

    const newTask = await modelTask.create({
      task_name,
      description,
      status,
      deadline,
      projectId,
      assignedTo,
    });

    res.status(201).json({
      message: "Data berhasil ditambahkan.",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { task_name, description, deadline, status, projectId, assignedTo } =
      req.body;

    const dataTask = await modelTask.findByPk(id);
    if (!dataTask) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    await modelTask.update(
      {
        task_name: task_name || dataTask.task_name,
        description: description || dataTask.description,
        deadline: deadline || dataTask.deadline,
        status: status || dataTask.status,
        projectId: projectId || dataTask.projectId,
        assignedTo: assignedTo || dataTask.assignedTo,
      },
      {
        where: { id: id },
      }
    );

    // Ambil ulang data setelah diupdate
    const updatedTask = await modelTask.findByPk(id);

    res.status(200).json({
      message: "Data berhasil diubah.",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const task = await modelTask.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      message: "Status berhasil diubah",
      data: task,
    });
  } catch (error) {}
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const dataTask = await modelTask.findByPk(id);

    if (!dataTask) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    await modelTask.destroy({ where: { id: id } });

    res.status(200).json({
      message: "Data berhasil dihapus.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTask,
  getTaskById,
  getTaskByProject,
  getTaskByStatus,
  getTaskByAssignedTo,
  createTask,
  updateTask,
  filterTaskByUser,
  updateTaskStatus,
  deleteTask,
};
