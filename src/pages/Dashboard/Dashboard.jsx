import { useState, useEffect } from 'react'
import { Box, Grid, Typography, Paper, Tabs, Tab, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week')
  const [tabValue, setTabValue] = useState(0)
  const [tasksByStatus, setTasksByStatus] = useState([])
  const [taskTrends, setTaskTrends] = useState([])

  // Dummy data for demonstration
  useEffect(() => {
    // Task status counts
    setTasksByStatus([
      { name: 'To Do', value: 8, color: '#FF8042' },
      { name: 'In Progress', value: 5, color: '#FFBB28' },
      { name: 'Review', value: 3, color: '#00C49F' },
      { name: 'Done', value: 12, color: '#0088FE' }
    ])

    // Task trends over time
    if (timeRange === 'week') {
      setTaskTrends([
        { name: 'Mon', todo: 4, inProgress: 3, review: 1, done: 7 },
        { name: 'Tue', todo: 5, inProgress: 4, review: 2, done: 8 },
        { name: 'Wed', todo: 6, inProgress: 5, review: 2, done: 9 },
        { name: 'Thu', todo: 7, inProgress: 6, review: 3, done: 10 },
        { name: 'Fri', todo: 8, inProgress: 5, review: 3, done: 12 },
        { name: 'Sat', todo: 8, inProgress: 5, review: 3, done: 12 },
        { name: 'Sun', todo: 8, inProgress: 5, review: 3, done: 12 }
      ])
    } else {
      setTaskTrends([
        { name: 'Week 1', todo: 10, inProgress: 8, review: 3, done: 15 },
        { name: 'Week 2', todo: 12, inProgress: 9, review: 4, done: 20 },
        { name: 'Week 3', todo: 8, inProgress: 7, review: 3, done: 25 },
        { name: 'Week 4', todo: 8, inProgress: 5, review: 3, done: 28 }
      ])
    }
  }, [timeRange])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Personal Dashboard</Typography>
      
      <Grid container spacing={3}>
        {/* Summary Statistics */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Task Summary</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>Total Tasks</Typography>
                <Typography variant="h4">{tasksByStatus.reduce((sum, item) => sum + item.value, 0)}</Typography>
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>Completed</Typography>
                <Typography variant="h4">{tasksByStatus.find(item => item.name === 'Done')?.value || 0}</Typography>
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>In Progress</Typography>
                <Typography variant="h4">{tasksByStatus.find(item => item.name === 'In Progress')?.value || 0}</Typography>
              </Box>
              <Box>
                <Typography color="text.secondary" gutterBottom>Pending</Typography>
                <Typography variant="h4">{tasksByStatus.find(item => item.name === 'To Do')?.value || 0}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Task Distribution */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Task Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tasksByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {tasksByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Progress Over Time */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Task Progress</Typography>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={handleTimeRangeChange}
                  size="small"
                >
                  <MenuItem value="week">Week</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="All Tasks" />
              <Tab label="By Status" />
            </Tabs>
            
            {tabValue === 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={taskTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="todo" name="To Do" stackId="a" fill="#FF8042" />
                  <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#FFBB28" />
                  <Bar dataKey="review" name="Review" stackId="a" fill="#00C49F" />
                  <Bar dataKey="done" name="Done" stackId="a" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={taskTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="todo" name="To Do" fill="#FF8042" />
                  <Bar dataKey="inProgress" name="In Progress" fill="#FFBB28" />
                  <Bar dataKey="review" name="Review" fill="#00C49F" />
                  <Bar dataKey="done" name="Done" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard 