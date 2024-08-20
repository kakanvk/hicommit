import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useParams } from "react-router-dom";

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
import { Button } from "@/components/ui/button";
import { getContestByID, getContestDescriptionByID } from "@/service/API/Contest";
import BlurFade from "@/components/magicui/blur-fade";
import { timestampChange } from "@/service/DateTimeService";

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
        timeLeft: `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`,
        percent,
    };
};

function Contest() {

    const { contest_id } = useParams<{ contest_id: string }>();

    const totalTime = 8 * 60 * 60; // Total contest duration in seconds (5 hours)
    const startTime = 1721730628 - totalTime; // Example start timestamp
    const endTime = 1721730628; // Example end timestamp

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(0, 0));
    const [contest, setContest] = useState<any>(null);
    const [description, setDescription] = useState<any>(null);

    const getData = async () => {
        const data = await getContestByID(contest_id as any);
        console.log(data);
        setContest(data);
        setTimeLeft(calculateTimeLeft(data.end_time as any, data.duration as any));
    }

    const getDescription = async () => {
        const data = await getContestDescriptionByID(contest_id as any);
        // console.log(data);
        setDescription(data);
    }

    useEffect(() => {
        Promise.allSettled([getData(), getDescription()]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(contest.end_time, contest.duration));
        }, 1000);

        return () => clearInterval(interval);
    }, [contest]);

    return (
        <div className="Contest p-6 px-8 flex flex-col gap-8">
            <Breadcrumb>
                <BlurFade delay={0} yOffset={0}>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/contest">Các cuộc thi</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {contest ? contest?.name : "..."}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </BlurFade>
            </Breadcrumb>
            <div className="flex w-full gap-8 2xl:gap-10 relative items-start">
                <div className="flex-1 flex flex-col gap-3">
                    <BlurFade delay={0.1} yOffset={0}>
                        <h1 className="text-2xl font-bold">
                            <span className="mr-2">{contest?.name}</span>
                            {
                                contest?.public &&
                                <Badge variant="outline" className="text-[12px] p-0 px-2 pr-3 font-normal leading-6 -translate-y-0.5">
                                    <Eye className="h-3 w-3 mr-2" />Công khai
                                </Badge>
                            }
                        </h1>
                    </BlurFade>
                    <div className="flex flex-col gap-2">
                        <Tabs defaultValue="content" className="w-full">
                            <TabsList className="mt-3 bg-transparent justify-start rounded-none pb-3 px-0 border-b-[2px] border-secondary/40 w-full">
                                <TabsTrigger
                                    value="content"
                                    className="px-1 border-b-2 border-b-transparent drop-shadow-none data-[state=active]:border-b-primary rounded-none bg-transparent data-[state=active]:bg-transparent duration-500"
                                >
                                    <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                                        <AlignLeft className="w-4 mr-2" />Chi tiết
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="ranking"
                                    className="px-1 border-b-2 border-b-transparent drop-shadow-none data-[state=active]:border-b-primary rounded-none bg-transparent data-[state=active]:bg-transparent duration-500"
                                >
                                    <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                                        <BarChartBig className="w-4 mr-2" />Bảng xếp hạng
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="history"
                                    className="px-1 border-b-2 border-b-transparent drop-shadow-none data-[state=active]:border-b-primary rounded-none bg-transparent data-[state=active]:bg-transparent duration-500"
                                >
                                    <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                                        <History className="w-4 mr-2" />Lịch sử nộp bài
                                    </Button>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="content" className="w-full">
                                <div className="flex flex-col gap-5 py-3">
                                    {
                                        description &&
                                        <BlurFade delay={0.2} yOffset={0}>
                                            <div
                                                className="ck-content hicommit-content leading-7 text-justify flex-1"
                                                dangerouslySetInnerHTML={{ __html: description }}
                                            />
                                        </BlurFade>
                                    }
                                    <BlurFade delay={0.3} yOffset={0} blur="2px">
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
                                    </BlurFade>
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
                            <span className="text-nowrap italic opacity-60 text-sm mt-1">
                                <History className="size-[14px] mr-1 inline -translate-y-[1px]" />
                                {timestampChange(contest?.duration).hours > 0 && `${timestampChange(contest?.duration).hours.toString().padStart(2, "0")} giờ `}
                                {`${timestampChange(contest?.duration).minutes.toString().padStart(2, "0")} phút `}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contest;
