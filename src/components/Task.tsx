import React, { useState } from 'react';

// Representation of the shape of our Props, here we pass the task as a prop, and onDelete and onEdit functions.
interface TaskProps {
  task: {
    id: number;
    title: string;
    createdDate: Date;
    color: string;
  };
  onDelete: (id: number) => void;
  onEdit: (task: any, title: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit }) => {
    // State used to store data from our textarea.
    const [title, setTitle] = useState(task.title)

    // Handler for editing the title of task in state.
    const handleOnEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value)
        // Not implemented since we are not storing state, so it wont persist after reload.
        // onEdit(task, title);
    }

    // Handler which calls the onDelete method to handle deletion of a task.
    const handleDeleteClick = () => {
        onDelete(task.id);
    };

  return (
    <article className={`${task.color} rounded-md shadow-md hover:cursor-pointer drop-shadow-md overflow-hidden`}>
        <div className='flex flex-row justify-between items-center bg-black/70 px-4 py-2 rounded-sm'>
            <span className='text-white text-xs'><span className='text-gray-400 font-semibold'>Created: </span>{task.createdDate.toLocaleDateString(undefined, 
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }
            )}</span>
            <button onClick={handleDeleteClick} className="text-white hover:text-white/50 hover:scale-125">&#10005;</button>
        </div>
        <textarea value={title} onChange={handleOnEdit}  className='bg-transparent w-full p-4 text-[#0a0909] resize-none !outline-none text-sm font-semibold' rows={3} />
    </article>
  );
};

export default Task;
