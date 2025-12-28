

const STORAGE_KEY = 'task_tracker_tasks';

const initialTasks = [
  {
    id: '1',
    title: 'Complete React project',
    description: 'Build a task tracker application with all features',
    dueDate: '2024-01-20',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Team meeting',
    description: 'Weekly team sync to discuss progress',
    dueDate: '2024-01-18',
    status: 'done',
    priority: 'medium',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'Code review',
    description: 'Review pull requests from team members',
    dueDate: '2024-01-19',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-16'
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Document the new API endpoints',
    dueDate: '2024-01-25',
    status: 'pending',
    priority: 'low',
    createdAt: '2024-01-17'
  }
];

// Helper to get tasks from localStorage
const getTasksFromStorage = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : initialTasks;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return initialTasks;
  }
};

// Helper to save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTasks = async () => {
  await delay(300); // Simulate network delay
  return getTasksFromStorage();
};

export const createTask = async (taskData) => {
  await delay(300);
  const tasks = getTasksFromStorage();
  const newTask = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    status: taskData.status || 'pending'
  };
  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);
  return newTask;
};

export const updateTask = async (taskId, updates) => {
  await delay(300);
  const tasks = getTasksFromStorage();
  const index = tasks.findIndex(task => task.id === taskId);
  
  if (index === -1) {
    throw new Error('Task not found');
  }
  
  const updatedTask = { ...tasks[index], ...updates };
  tasks[index] = updatedTask;
  saveTasksToStorage(tasks);
  return updatedTask;
};

export const deleteTask = async (taskId) => {
  await delay(300);
  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasksToStorage(updatedTasks);
  return { success: true };
};