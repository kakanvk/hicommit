
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getSubmissionsByContestID } from "@/service/API/Contest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Ranking() {

    const { contest_id } = useParams<{ contest_id: string }>();

    let sampleData = [
        {
            rank: 1,
            account: 'INV001',
            A: {
                score: 10,
                status: "AC",
                time: "00:34:33",
                try: 1
            },
            B: {
                score: 0,
                status: "WA",
                time: "00:34:33",
                try: 2
            },
            C: {
                score: 10,
                status: "AC",
                time: "00:34:33",
                try: 1
            },
            D: {
                score: 10,
                status: "PD",
                time: "00:34:33",
                try: 1
            },
            score: 40
        },
        // Random data (status: AC, WA, NULL) (score: [0, 100]) (time: [00:00:00, 4:59:59])
        {
            rank: 2,
            account: 'INV002',
            A: {
                score: 0,
                status: "AC",
                time: "00:34:33",
                try: 1
            },
            B: {
                score: 10,
                status: "AC",
                time: "00:34:33",
                try: 1
            },
            C: {
                score: 10,
                status: "WA",
                time: "00:34:33",
                try: 2
            },
            D: {
                score: 10,
                status: "NULL",
                time: "00:34:33",
                try: 4
            },
            score: 30
        },
        {
            rank: 3,
            account: 'INV003',
            A: {
                score: 10,
                status: "AC",
                time: "00:34:33",
                try: 2
            },
            B: {
                score: 10,
                status: "PD",
                time: "00:34:33",
                try: 1
            },
            C: {
                score: 10,
                status: "NULL",
                time: "00:34:33",
                try: 1
            },
            D: {
                score: 10,
                status: "WA",
                time: "00:34:33",
                try: 1
            },
            score: 40
        },
        {
            rank: 4,
            account: 'INV004',
            A: {
                score: 10,
                status: "NULL",
                time: "00:34:33",
                try: 1
            },
            B: {
                score: 10,
                status: "AC",
                time: "00:34:33",
                try: 1
            },
            C: {
                score: 10,
                status: "PD",
                time: "00:34:33",
                try: 1
            },
            D: {
                score: 10,
                status: "NULL",
                time: "00:34:33",
                try: 3
            },
            score: 40
        },
        {
            rank: 5,
            account: 'INV005',
            A: {
                score: 10,
                status: "NULL",
                time: "00:34:33",
                try: 1
            },
            B: {
                score: 10,
                status: "NULL",
                time: "00:34:33",
                try: 3
            },
            C: {
                score: 10,
                status: "NULL",
                time: "00:34:33",
                try: 2
            },
            D: {
                score: 10,
                status: "PD",
                time: "00:34:33",
                try: 2
            },
            score: 40
        },

    ];

    const sampleProblem = ["A", "B", "C", "D"];

    const [data, setData] = useState(sampleData);

    const getSubmissions = async () => {
        const data = await getSubmissionsByContestID(contest_id as any);
        console.log(data);
    }

    useEffect(() => {
        getSubmissions();
    }, []);

    // Mỗi 5 giây, đổi thứ tự ngẫu nhiên của data
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setData([...data.sort(() => Math.random() - 0.5)]);
    //     }, 5000);
    //     return () => clearInterval(interval);
    // }, [data]);

    return (
        <div className="Ranking w-full">
            <div className="border overflow-hidden rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary hover:bg-secondary">
                            <TableHead className="w-[80px] text-center font-bold text-">Hạng</TableHead>
                            <TableHead className="border-x border-white/70 dark:border-white/10 font-bold text-">Tài khoản</TableHead>
                            {sampleProblem.map((problem, index) => (
                                <TableHead key={index} className="w-[70px] border-x border-white/70 dark:border-white/10 text-center font-bold text-">{problem}</TableHead>
                            ))}
                            <TableHead className="w-[100px] text-center font-bold text-">Điểm số</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((data, index) => (
                            <TableRow key={index} className="hover:bg-secondary/10 h-[65px]">
                                <TableCell className="text-center">{data.rank}</TableCell>
                                <TableCell className="border-x">{data.account}</TableCell>
                                {sampleProblem.map((problem, index) => (
                                    <TableCell key={index} className={`
                                        ${(data[problem as keyof typeof data] as { status: string }).status === "AC" && "bg-green-500 text-white"}
                                        ${(data[problem as keyof typeof data] as { status: string }).status === "WA" && "bg-red-500 text-white"}
                                        ${(data[problem as keyof typeof data] as { status: string }).status === "PD" && "bg-indigo-500 text-white"}
                                        text-center border-x border-secondary aspect-square p-0`
                                    }>
                                        <div className="flex flex-col gap-0 leading-4">
                                            {
                                                (data[problem as keyof typeof data] as { status: string }).status === "AC" &&
                                                <span className="font-bold text-base">
                                                    {
                                                        (data[problem as keyof typeof data] as { score: number }).score
                                                    }
                                                </span>
                                            }
                                            {
                                                (data[problem as keyof typeof data] as { status: string }).status !== "NULL" &&
                                                <p className="text-[11px] font-medium italic">{(data[problem as keyof typeof data] as { try: number }).try} lần</p>
                                            }
                                        </div>
                                    </TableCell>
                                ))}
                                <TableCell className="text-center">{data.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-secondary hover:bg-secondary">
                            <TableCell colSpan={2} className="text-left pl-5">Tổng cộng</TableCell>
                            {sampleProblem.map((problem, index) => (
                                <TableCell key={index} className="text-center border-x border-white/90 dark:border-white/10">{sampleData.filter(data => (data[problem as keyof typeof data] as { status: string }).status === "AC").length}</TableCell>
                            ))}
                            <TableCell className="text-center">{sampleData.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default Ranking;