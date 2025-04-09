import React, { useState } from "react";
import { Box, Button, Modal, Typography, Snackbar, Alert } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskDetails from "./TaskDetails";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [viewDetails, setViewDetails] = useState(null);

  const handleOpenModal = (task = null) => {
    setCurrentTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentTask(null);
    setOpenModal(false);
  };

  const handleSaveTask = (task) => {
    if (currentTask) {
      // Edit task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === currentTask.id ? { ...currentTask, ...task } : t
        )
      );
      setToast({
        open: true,
        message: "Task updated successfully!",
        severity: "success",
      });
    } else {
      // Create new task
      setTasks((prev) => [...prev, { id: Date.now(), ...task }]);
      setToast({
        open: true,
        message: "Task created successfully!",
        severity: "success",
      });
    }
    handleCloseModal();
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa task này?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setToast({
        open: true,
        message: "Task deleted successfully!",
        severity: "success",
      });
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
      >
        Thêm task mới
      </Button>

      <Box mt={2}>
        {tasks.map((task) => (
          <Box
            key={task.id}
            mb={2}
            p={2}
            border="1px solid #ccc"
            borderRadius="8px"
          >
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2">{task.description}</Typography>
            <Typography variant="body2">Deadline: {task.deadline}</Typography>
            <Typography variant="body2">Priority: {task.priority}</Typography>
            <Typography variant="body2">Status: {task.status}</Typography>
            <Box mt={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOpenModal(task)}
                sx={{ mr: 1 }}
              >
                Sửa
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteTask(task.id)}
                sx={{ mr: 1 }}
              >
                Xóa
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setViewDetails(task)}
              >
                Chi tiết
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Modal for Create/Edit Task */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {currentTask ? "Chỉnh sửa Task" : "Tạo Task mới"}
          </Typography>
          <TaskForm
            initialData={currentTask}
            onSave={(task) => handleSaveTask(task)}
            onCancel={handleCloseModal}
          />
        </Box>
      </Modal>

      {/* Modal for Task Details */}
      {viewDetails && (
        <Modal open={!!viewDetails} onClose={() => setViewDetails(null)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
            }}
          >
            <TaskDetails task={viewDetails} />
          </Box>
        </Modal>
      )}

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskManager;

import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const TaskForm = ({ initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    deadline: initialData.deadline || '',
    priority: initialData.priority || 'Low',
    status: initialData.status || 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Tên Task"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Mô tả"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Deadline"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Lưu
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
