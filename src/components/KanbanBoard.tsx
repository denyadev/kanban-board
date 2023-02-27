import React, { useState } from "react";
import Task from "./Task";

// Representation of the shape of our Task object
interface Task {
    id: number;
    title: string;
    columnId: string;
    createdDate: Date;
    color: string;
}

// Representation of the shape of our Column object
interface Column {
    id: string;
    title: string;
}

// Our task data. This could be stored in a separate tasks.json file or fetched from an api
const initialTasks: Task[] = [
    {
        id: 1,
        title: "Create board layout",
        columnId: "todo",
        createdDate: new Date("2023-02-20"),
        color: "bg-[#ff5c5c]",
    },
    {
        id: 2,
        title: "Implement drag and drop functionality",
        columnId: "todo",
        createdDate: new Date("2023-01-01"),
        color: "bg-[#39da8a]",
    },
    {
        id: 3,
        title: "Implement the ability to add new tasks",
        columnId: "todo",
        createdDate: new Date("2023-02-05"),
        color: "bg-[#5b8dee]",
    },
    {
        id: 4,
        title: "Implement task deletion",
        columnId: "todo",
        createdDate: new Date("2023-01-10"),
        color: "bg-[#fdac41]",
    },
    {
        id: 5,
        title: "Add mobile responsiveness to the application",
        columnId: "inprogress",
        createdDate: new Date("2023-02-15"),
        color: "bg-[#fedd49]",
    },
    {
        id: 6,
        title: "Add column editing form",
        columnId: "inprogress",
        createdDate: new Date("2023-01-20"),
        color: "bg-[#74e0e6]",
    },
    {
        id: 7,
        title: "Add persistence using local storage",
        columnId: "complete",
        createdDate: new Date("2023-01-25"),
        color: "bg-[#ac5cd9]",
    },
];

// Our column data. This could be stored in a separate columns.json file or fetched from an api
const initialColumns: Column[] = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "complete", title: "Complete" },
];

// Some of the handler function we could store in a separate utils folder and import them. For a larger scale project it would be easier to manage
const KanbanBoard: React.FC = () => {
    // Here we are defining two states to represent our tasks and our columns.
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [columns] = useState<Column[]>(initialColumns);

    // This api gives us the taskId and columnId of the task which we are dragging.
    const handleOnDrag = (
        e: React.DragEvent,
        taskId: number,
        columnId: string
    ) => {
        // This comes from the Drag and Drop HTML5 api, we store the data with our event
        e.dataTransfer.setData("taskId", taskId.toString());
        e.dataTransfer.setData("columnId", columnId);
    };

    // This is defined by the column area, when we drop a task into a new column, we change the states columnId to the appropriate task.
    const handleOnColumnDrop = (e: React.DragEvent, columnId: string) => {
        // Store the taskId and the columnId of our dragged task.
        const taskId = parseInt(e.dataTransfer.getData("taskId"));
        const prevColumnId = e.dataTransfer.getData("columnId");

        // Check to see if we are in a different column
        if (prevColumnId !== columnId) {
            // get the task by its index and set a new column id
            const taskIndex = tasks.findIndex((task) => task.id === taskId);
            const updatedTask = { ...tasks[taskIndex], columnId };
            // Here we create a new copy of task list, change the old task with our updated column task and update our state.
            const updatedTasks = [...tasks];
            updatedTasks[taskIndex] = updatedTask;
            setTasks(updatedTasks);
        }
    };

    // This is defined by the tasks area, we can drop a task onto another to rearrange the tasks.
    const handleOrderSwap = (
        e: React.DragEvent,
        taskId: number,
        columnId: string
    ) => {
        // Store the taskId and the columnId of our dragged task.
        const draggedTaskId = parseInt(e.dataTransfer.getData("taskId"));
        const prevColumnId = e.dataTransfer.getData("columnId");
        // Check to see if the task is in the same column
        if (prevColumnId === columnId) {
            // Create a new copy of the list
            const updatedTasks = [...tasks];
            // Update the new copy with the new index
            const draggedTaskIndex = updatedTasks.findIndex(
                (task) => task.id === draggedTaskId
            );
            const taskIndex = updatedTasks.findIndex(
                (task) => task.id === taskId
            );
            // If the task is dropped on itself, do nothing
            if (draggedTaskIndex !== taskIndex) {
                // Move the dragged task to the new position in the array
                const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
                updatedTasks.splice(taskIndex, 0, draggedTask);
                setTasks(updatedTasks);
            }
        }
    };

    // Handler for deleting a task from our state based on id.
    const handleDelete = (taskId: number) => {
        // We simply filter the list to remove the task with the given id.
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    // Handler for editing the title of a task based on id.
    const handleEdit = (task: Task, taskTitle: string) => {
        // create task with new title
        // replace the task list with new task item
    };

    // This is a function responsible for assigning a random color in the form of tailwind class. Used for creating a new task.
    const getRandomColor = (): string => {
        const colors = [
            "#ff5c5c",
            "#39da8a",
            "#5b8dee",
            "#fdac41",
            "#fedd49",
            "#74e0e6",
            "#ac5cd9",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        console.log(`bg-[${colors[randomIndex]}]`);
        return `bg-[${colors[randomIndex]}]`;
    };

    // Handler for adding a new task to our state according to the column from which the task is added.
    const handleTaskAdd = (columnId: string) => {
        const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        const newTask: Task = {
            id: newTaskId,
            title: "New Task",
            columnId: columnId,
            createdDate: new Date(),
            color: getRandomColor(),
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <div className="min-h-screen p-10 text-white">
            <h1 className="mb-10 text-center text-4xl font-bold">
                <span className="text-[#19a35e]">K</span>anban{" "}
                <span className="text-[#19a35e]">B</span>oard{" "}
                <span className="text-base">by Denis</span>
            </h1>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                {columns.map((column) => (
                    <section
                        key={column.id}
                        className="rounded-sm bg-[#28293d]"
                        // We attach handlers which represent the Column area
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleOnColumnDrop(e, column.id)}>
                        <div className="flex items-center justify-between rounded-sm bg-black/50 p-4 uppercase">
                            <h2 className="font-bold">{column.title}</h2>
                            <button
                                className="rounded-sm bg-[#19a35e] p-1 px-4 text-base"
                                onClick={() => handleTaskAdd(column.id)}>
                                Add
                            </button>
                        </div>
                        <ul className="space-y-4 p-4">
                            {tasks
                                .filter((task) => task.columnId === column.id)
                                .map((task) => (
                                    <li
                                        key={task.id}
                                        // We attach handlers which represent another task
                                        draggable
                                        onDragStart={(e) =>
                                            handleOnDrag(
                                                e,
                                                task.id,
                                                task.columnId
                                            )
                                        }
                                        onDrop={(e) =>
                                            handleOrderSwap(
                                                e,
                                                task.id,
                                                task.columnId
                                            )
                                        }
                                        onDragOver={(e) => e.preventDefault()}>
                                        <Task
                                            task={task}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
