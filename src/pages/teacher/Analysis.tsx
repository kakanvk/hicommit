import { useEffect, useState } from "react";
import CourseTree from "./CourseTree";

const initialData = [
    {
        // unit
        id: Math.random().toString(36).substring(7),
        name: "Chat Rooms",
        children: [
            // work
            { id: "c1", name: "General" },
            { id: "c2", name: "Random" },
            { id: "c3", name: "Open Source Projects"},
        ],
    },
    {
        // unit
        id: Math.random().toString(36).substring(7),
        name: "Direct Messages",
        children: [
            // work
            { id: "d1", name: "Alice" },
            { id: "d2", name: "Bob" },
            { id: "d3", name: "Charlie" },
            { id: "d4", name: "Charlie 2" },
        ],
    },
    {
        // unit
        id: Math.random().toString(36).substring(7),
        name: "Threads",
        children: [
            // work
            { id: "t1", name: "Thread 1" },
            { id: "t2", name: "Thread 2" },
            { id: "t3", name: "Thread 3" },
        ],
    }
];

function Analysis() {

    const [dataFromAPI, setDataFromAPI] = useState<any[]>(initialData);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [dataFromAPI]);

    return (
        <div className="Analysis p-2 px-4">
            <CourseTree dataFromAPI={dataFromAPI} setDataFromAPI={setDataFromAPI} key={key}/>
        </div>
    );
};

export default Analysis;
