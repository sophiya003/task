
function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {

    const getPriorityClass = () => {
        switch (priority){
         case 'High': return 'priority-high';
         case 'Medium': return 'priority-medium';
         case 'Low': return 'priority-low';
         default: return '';
        }


    };

const formDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}    

const isOverdue =  new Date(task.dueDate) < new Date() && task.status !== 'Completed';







  return (
    <div className={`task-item ${task.status === 'done' ? 'done' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-content">
       <div className="task-header">
        <div className='task-title-row'>
            <input
              type="checkbox"
              checked={task.status === 'done'}
              onChange={() => onToggleStatus(task.id)}
            />
            <h3 className='task-title'>{task.title}</h3>
            <span className={`priority-badge ${getPriorityClass(task.priority)}`}
>{task.priority}</span>
             {isOverdue && <span className="overdue-badge">Overdue</span>}

        </div>
        <div className='task-actions'>
            <button className='btn btn-edit' onClick={() => onEdit(task)} aria-label="Edit Task">Edit</button>
            <button className='btn btn-delete' onClick={() => onDelete(task)} aria-label = "delete task" >Delete</button>

        </div>

        </div>

        {task.description &&  <p className='task-description'>{task.description}</p>}

        <div className='task-footer'>
            <div className='task-meta'>
                <span className='task-due'>
                    <strong>Due:</strong> {formDate(task.dueDate)}
                </span>
                <span className='task-created'>
                    <strong>Created:</strong> {formDate(task.createdAt)}
                </span>
            </div>
            <span className= {`task-status ${task.status }`}>
                {task.status === 'done' ? "Completed" : "Pending"}
            </span>

        </div>
        
      </div>
    
    </div>
  )
}

export default TaskItem;
