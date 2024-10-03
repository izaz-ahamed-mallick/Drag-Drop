import "./App.css";
import DragFile from "./components/DragFile";

const initialData = {
    Todo: ["Task 1", "Task 2", "Task 3"],
    InProgress: ["Task 4", "Task 5"],
    IsComplete: ["Task 6", "Task 7"],
};

function App() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">
                Drag and Drop
            </h1>
            <DragFile initialData={initialData} />
        </div>
    );
}

export default App;
