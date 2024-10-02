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
    container: string; // Ensure that container is one of the keys
}

const DragFile: React.FC<InitialDataProps> = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    const containerRef = useRef<string | null>(null);
    const itemRef = useRef<string | null>(null);

    const handleDragStart = ({ e, item, container }: IDragStartArgument) => {
        console.log("drag");

        const target = e.target as HTMLElement;
        target.style.opacity = "0.5";

        containerRef.current = container;
        itemRef.current = item;
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        target.style.opacity = "1";
    };

    const handleDrop = (targetContainer: keyof PageProps) => {
        const selectItem = itemRef.current;
        const selectContainer = containerRef.current as keyof PageProps;
        if (selectItem && selectContainer) {
            setData((prev) => {
                const newData = { ...prev };
                const findindex = newData[selectContainer].findIndex(
                    (item) => item == selectItem
                );
                if (findindex !== -1) {
                    newData[selectContainer].splice(findindex, 1);
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
        <div className="flex w-full justify-center gap-4">
            {Object.keys(data).map((container) => (
                <div
                    onDrop={() => handleDrop(container as keyof PageProps)}
                    onDragOver={handleDragOver}
                    key={container}
                    className="w-[200px] bg-gray-200 "
                >
                    <h1>{container}</h1>
                    {(data[container as keyof PageProps] as string[]).map(
                        (item, i) => (
                            <div
                                onDragStart={(e) =>
                                    handleDragStart({ e, item, container })
                                }
                                onDragEnd={handleDragEnd}
                                draggable
                                className="bg-gray-400 my-2 px-2 mx-2 cursor-pointer"
                                key={i} // Use item as a key if unique
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
