import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import RingProgress from "@/components/ui/ringProcess";
import { AlignEndHorizontal, AlignLeft, BarChartBig, Eye, History, MessagesSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import Ranking from "./Ranking";

// Function to calculate the remaining time and the progress percentage
const calculateTimeLeft = (endTime: number, totalTime: number): { timeLeft: string; percent: number } => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    let timeLeft = endTime - currentTime; // Time left in seconds

    if (timeLeft < 0) timeLeft = 0; // If time has passed, set timeLeft to 0

    // Calculate hours, minutes, and seconds left
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // Calculate the percentage of time left
    const percent = Math.min(100, (timeLeft / totalTime) * 100);

    return {
        timeLeft: `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`,
        percent,
    };
};

function ContestByID() {
    const totalTime = 8 * 60 * 60; // Total contest duration in seconds (5 hours)
    const startTime = 1721642400 - totalTime; // Example start timestamp
    const endTime = 1721642400; // Example end timestamp

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime, totalTime));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(endTime, totalTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime, totalTime]);

    // 5 giây cập nhật thứ tự của mảng sampleData random

    return (
        <div className="ContestByID p-6 px-8 flex flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/contest">Các cuộc thi</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        Code Tour 2024 - Semi-final Round
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex w-full gap-8 2xl:gap-10 relative items-start">
                <div className="flex-1 flex flex-col gap-3">
                    <div className="aspect-[6/1] mb-2 rounded-md border bg-secondary/40 flex justify-center items-center">
                        Banner
                    </div>
                    <h1 className="text-2xl font-bold">
                        <span className="mr-2">Code Tour 2024 - Semi-final Round</span>
                        <Badge variant="outline" className="text-[12px] p-0 px-2 pr-3 font-normal leading-6 -translate-y-0.5">
                            <Eye className="h-3 w-3 mr-2" />Công khai
                        </Badge>
                    </h1>
                    <div className="flex flex-col gap-2">
                        <Tabs defaultValue="content" className="w-full">
                            <TabsList className="bg-transparent justify-start rounded-none pb-0 px-0 border-b-[2px] border-secondary/40 w-full">
                                <TabsTrigger
                                    value="content"
                                    className="px-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                                >
                                    <AlignLeft className="w-4 mr-2" />Thông tin
                                </TabsTrigger>
                                <TabsTrigger
                                    value="ranking"
                                    className="px-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                                >
                                    <BarChartBig className="w-4 mr-2" />Bảng xếp hạng
                                </TabsTrigger>
                                <TabsTrigger
                                    value="history"
                                    className="px-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                                >
                                    <History className="w-4 mr-2" />Lịch sử nộp bài
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="content" className="w-full">
                                <div className="flex flex-col gap-5 py-3">
                                    <p className="opacity-90 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                    <div className="w-full flex flex-col gap-2">
                                        <h2 className="">Đề bài:</h2>
                                        <div className="border rounded-lg overflow-hidden">
                                            <Table>
                                                <TableHeader className="bg-secondary/50">
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableHead className="w-[100px]">ID</TableHead>
                                                        <TableHead>Tên bài</TableHead>
                                                        <TableHead>Ngôn ngữ</TableHead>
                                                        <TableHead className="text-right">Điểm</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableCell className="font-medium">A</TableCell>
                                                        <TableCell>
                                                            <Link to="#" className="text-green-600 dark:text-green-500 font-semibold">
                                                                Số hoàn thiện
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary" className="text-[11px] p-0 px-1.5 leading-5 rounded-sm">
                                                                C++
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">250</TableCell>
                                                    </TableRow>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableCell className="font-medium">B</TableCell>
                                                        <TableCell>
                                                            <Link to="#" className="text-green-600 dark:text-green-500 font-semibold">
                                                                Số nguyên tố đầu tiên
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary" className="text-[11px] p-0 px-1.5 leading-5 rounded-sm">
                                                                C++
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">250</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="ranking" className="w-full">
                                <div className="flex flex-col gap-5 py-3">
                                    <Ranking />
                                </div>
                            </TabsContent>
                            <TabsContent value="history" className="w-full">
                                <div className="flex flex-col gap-5 py-3">
                                    Ranking here.
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="w-[280px] p-4 border rounded-lg bg-secondary/10 sticky top-4">
                    <div className="relative aspect-square flex flex-col items-center justify-center">
                        <RingProgress radius={120} stroke={10} progress={timeLeft.percent} textSize={25} label=" " />
                        <div className="flex flex-col items-center absolute">
                            <span className="text-[14px] opacity-80 font-light">Thời gian còn lại</span>
                            <span className="text-3xl font-extrabold">{timeLeft.timeLeft}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestByID;
