
import { useEffect, useState } from 'react';
import FilterControls from './components/FilterControls';
import SearchBar from './components/SearchBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { createTask, deleteTask, fetchTasks, updateTask } from './services/mockApi';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    loadTasks();
  }, []);

 
  useEffect(() => {
    let result = tasks;

    
    if (filter !== 'all') {
      result = result.filter(task => task.status === filter);
    }

   
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    }

  
    result = sortTasks(result, sortBy, sortOrder);

    setFilteredTasks(result);
  }, [tasks, filter, searchQuery, sortBy, sortOrder]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortTasks = (tasksToSort, sortBy, order) => {
    return [...tasksToSort].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'dueDate':
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
          break;
        default:
          comparison = 0;
      }

      return order === 'asc' ? comparison : -comparison;
    });
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await updateTask(taskId, updates);
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const toggleTaskStatus = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'done' ? 'pending' : 'done';
      await handleUpdateTask(taskId, { status: newStatus });
    }
  };

 const handleSortChange = (newSortBy) => {
  if (newSortBy === sortBy) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    setSortBy(newSortBy);
    setSortOrder('asc');
  }
};

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        <div className="controls-container">
          <SearchBar onSearch={setSearchQuery} />
          <div className="controls-row">
            <FilterControls
              currentFilter={filter}
              onFilterChange={setFilter}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingTask(null);
                setIsFormOpen(true);
              }}
            >
              + Add New Task
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <>
            <div className="stats">
              <span>Total: {tasks.length}</span>
              <span>Pending: {tasks.filter(t => t.status === 'pending').length}</span>
              <span>Done: {tasks.filter(t => t.status === 'done').length}</span>
              <span>Showing: {filteredTasks.length}</span>
            </div>

            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
              onToggleStatus={toggleTaskStatus}
            />
          </>
        )}

        {isFormOpen && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? 
              (data) => handleUpdateTask(editingTask.id, data) : 
              handleAddTask
            }
            onClose={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;