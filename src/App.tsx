import "./App.css";
import DragFile from "./components/DragFile";

const initialData = {
    Todo: ["Task 1", "Task 2", "Task 3"],
    InProgress: ["Task 4", "Task 5"],
    IsComplete: ["Task 6", "Task 7"],
};

function App() {
    return (
        <>
            <DragFile initialData={initialData} />
        </>
    );
}

export default App;
