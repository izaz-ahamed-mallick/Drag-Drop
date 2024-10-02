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
        target.style.color = "red";

        containerRef.current = container;
        itemRef.current = item;
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        target.style.opacity = "1";
    };

    const handleDrop = (targetContainer: keyof PageProps) => {
        const selectItem = itemRef.current as string;
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
                                className="bg-gray-300 my-2 px-2 mx-2 rounded-sm cursor-pointer"
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
