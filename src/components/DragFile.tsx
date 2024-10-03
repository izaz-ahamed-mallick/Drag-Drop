import { useRef, useState } from "react";

interface PageProps {
    Todo: string[];
    InProgress: string[];
    IsComplete: string[];
}

interface InitialDataProps {
    initialData: PageProps;
}

interface IDragStartArgument {
    e: React.DragEvent<HTMLDivElement>;
    item: string;
    container: string;
}

const DragFile: React.FC<InitialDataProps> = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    const containerRef = useRef<string | null>(null);
    const itemRef = useRef<string | null>(null);

    const handleDragStart = ({ e, item, container }: IDragStartArgument) => {
        const target = e.target as HTMLElement;
        target.style.opacity = "0.5";
        target.style.transform = "scale(1.1)";
        containerRef.current = container;
        itemRef.current = item;
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        target.style.opacity = "1";
        target.style.transform = "scale(1)"; // Reset scale effect
    };

    const handleDrop = (targetContainer: keyof PageProps) => {
        const selectItem = itemRef.current as string;
        const selectContainer = containerRef.current as keyof PageProps;
        if (selectItem && selectContainer) {
            setData((prev) => {
                const newData = { ...prev };
                const findIndex = newData[selectContainer].findIndex(
                    (item) => item === selectItem
                );
                if (findIndex !== -1) {
                    newData[selectContainer].splice(findIndex, 1);
                }
                newData[targetContainer] = [
                    ...newData[targetContainer],
                    selectItem,
                ];
                return newData;
            });
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="flex w-full justify-center gap-8 p-6 bg-gray-100 rounded-lg shadow-lg">
            {Object.keys(data).map((container) => (
                <div
                    onDrop={() => handleDrop(container as keyof PageProps)}
                    onDragOver={handleDragOver}
                    key={container}
                    className="w-64 bg-white rounded-lg shadow-md p-4 transition duration-300 hover:shadow-xl"
                >
                    <h1 className="text-xl font-bold text-center mb-4 text-gray-700">
                        {container}
                    </h1>
                    {(data[container as keyof PageProps] as string[]).map(
                        (item, i) => (
                            <div
                                onDragStart={(e) =>
                                    handleDragStart({ e, item, container })
                                }
                                onDragEnd={handleDragEnd}
                                draggable
                                className="bg-blue-500 my-2 px-3 py-2 rounded-md cursor-pointer text-white shadow transition duration-200 transform hover:bg-blue-600"
                                key={i}
                            >
                                {item}
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default DragFile;
