import React from 'react'
import { Box, Typography } from '@mui/material';
import SubtaskChecklist from './SubtaskChecklist';
import FileAttachment from './FileAttachment';
import CommentsSection from './CommentsSection';

const TaskDetails = ({ task }) => {
  return (
    <Box>
      <Typography variant="h5">{task.name}</Typography>
      <Typography variant="body1">{task.description}</Typography>
      <Typography variant="body2">Deadline: {task.deadline}</Typography>
      <Typography variant="body2">Priority: {task.priority}</Typography>
      <Typography variant="body2">Status: {task.status}</Typography>

      <Box mt={2}>
        <SubtaskChecklist taskId={task.id} />
        <FileAttachment taskId={task.id} />
        <CommentsSection taskId={task.id} />
      </Box>
    </Box>
  );
};

export default TaskDetails;
