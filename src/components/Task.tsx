import React, { useState } from "react";

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
    const [title, setTitle] = useState(task.title);

    // Handler for editing the title of task in state.
    const handleOnEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
        // Not implemented since we are not storing state, so it wont persist after reload.
        // onEdit(task, title);
    };

    // Handler which calls the onDelete method to handle deletion of a task.
    const handleDeleteClick = () => {
        onDelete(task.id);
    };

    return (
        <article
            className={`${task.color} overflow-hidden rounded-md shadow-md drop-shadow-md hover:cursor-pointer`}>
            <div className="flex flex-row items-center justify-between rounded-sm bg-black/70 px-4 py-2">
                <span className="text-xs text-white">
                    <span className="font-semibold text-gray-400">
                        Created:{" "}
                    </span>
                    {task.createdDate.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
                <button
                    onClick={handleDeleteClick}
                    className="text-white hover:scale-125 hover:text-white/50">
                    &#10005;
                </button>
            </div>
            <textarea
                value={title}
                onChange={handleOnEdit}
                className="w-full resize-none bg-transparent p-4 text-sm font-semibold text-[#0a0909] !outline-none"
                rows={3}
            />
        </article>
    );
};

export default Task;
