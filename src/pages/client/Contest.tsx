import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import RingProgress from "@/components/ui/ringProcess";
import { AlignEndHorizontal, AlignLeft, ArrowRight, BarChartBig, Eye, History, LogOut, MessagesSquare, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import Ranking from "./Ranking";
import { Button } from "@/components/ui/button";
import { exitContest, getContestByID, getContestDescriptionByID, getJoinedContest, joinContest } from "@/service/API/Contest";
import BlurFade from "@/components/magicui/blur-fade";
import { timestampChange } from "@/service/DateTimeService";
import moment from "moment";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { getMySubmited } from "@/service/API/Submission";

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

// Function to calculate the countdown time until the event starts
const calculateCountdown = (startTime: number): string => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    let countdownTime = startTime - currentTime; // Time left until the event starts

    if (countdownTime < 0) countdownTime = 0; // If the event has already started, set countdownTime to 0

    // Calculate hours, minutes, and seconds left
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

function Contest() {

    const { contest_id } = useParams<{ contest_id: string }>();

    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(0, 0));
    const [countdown, setCountdown] = useState<any>(null);

    const [contest, setContest] = useState<any>(null);
    const [joinedContest, setJoinedContest] = useState<any>(null);
    const [description, setDescription] = useState<any>(null);
    const [mySubmited, setMySubmited] = useState<any>(null);

    const [warningShow, setWarningShow] = useState(true);
    const [inputKey, setInputKey] = useState<string>("");

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

    const getJoinedContestData = async () => {
        const response = await getJoinedContest();
        console.log(response);
        setJoinedContest(response);
    }

    const handleGetMySubmited = async () => {
        const response = await getMySubmited();
        setMySubmited(response);
    }

    const handleExitContest = async () => {
        const response = await toast.promise(
            exitContest(contest_id as any),
            {
                loading: 'Đang kiểm tra...',
                success: 'Rời cuộc thi thành công',
                error: (err) => `${err.response.data.message}`,
            },
            {
                style: {
                    borderRadius: '8px',
                    background: '#222',
                    color: '#fff',
                    paddingLeft: '15px',
                    fontFamily: 'Plus Jakarta Sans',
                    maxWidth: '600px',
                }
            });

        setTimeout(() => {
            navigate(`/contest`);
        }, 500);
    }

    useEffect(() => {
        Promise.allSettled([getData(), getDescription(), getJoinedContestData(), handleGetMySubmited()]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(contest.end_time, contest.duration));
            setCountdown(calculateCountdown(contest.start_time));
        }, 1000);

        return () => clearInterval(interval);
    }, [contest]);

    const pushError = (message: string) => {
        toast.error(message, {
            style: {
                borderRadius: '8px',
                background: '#222',
                color: '#fff',
                paddingLeft: '15px',
                fontFamily: 'Plus Jakarta Sans',
                maxWidth: '700px',
            }
        });
    }

    const handleJoinContest = async () => {

        if (!contest?.public && inputKey === "") {
            pushError("Mã tham gia không được để trống");
            return;
        }

        setInputKey("");

        const response = await toast.promise(
            joinContest(contest_id as any, inputKey),
            {
                loading: 'Đang kiểm tra...',
                success: 'Tham gia cuộc thi thành công',
                error: (err) => `${err.response.data.message}`,
            },
            {
                style: {
                    borderRadius: '8px',
                    background: '#222',
                    color: '#fff',
                    paddingLeft: '15px',
                    fontFamily: 'Plus Jakarta Sans',
                    maxWidth: '600px',
                }
            });

        setTimeout(() => {
            window.location.reload();
        }, 500);

    }

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
                    {
                        timeLeft.percent <= 0 && warningShow && (
                            <div className="flex items-center justify-between border rounded-md p-2 px-3 pr-2 text-[13px] italic text-amber-500 font-medium dark:text-amber-400 border-amber-400/50 bg-amber-500/10">
                                <span>
                                    <i className="fa-solid fa-circle-info mr-2"></i>
                                    Cuộc thi này đã kết thúc
                                </span>
                                <Button size="icon" variant="ghost" className="size-5" onClick={() => setWarningShow(false)}>
                                    <X className="size-4" />
                                </Button>
                            </div>
                        )
                    }
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
                            <BlurFade delay={0.25} yOffset={0} blur="2px">
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
                            </BlurFade>
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
                                    {
                                        joinedContest?.id === contest_id ?
                                            <BlurFade delay={0.3} yOffset={0} blur="2px">
                                                <div className="w-full flex flex-col gap-2">
                                                    <h2 className="">Đề bài:</h2>
                                                    <div className="border rounded-lg overflow-hidden">
                                                        <Table>
                                                            <TableHeader className="bg-secondary/50">
                                                                <TableRow className="hover:bg-transparent">
                                                                    <TableHead className="w-[60px]">ID</TableHead>
                                                                    <TableHead>Tên bài</TableHead>
                                                                    <TableHead>Ngôn ngữ</TableHead>
                                                                    <TableHead className="text-right">Điểm</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {
                                                                    contest?.problems.map((problem: any, index: number) => (
                                                                        <TableRow key={index} className="hover:bg-transparent">
                                                                            <TableCell className="font-medium">
                                                                                {String.fromCharCode(65 + index)}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Link to={`/problem/${problem?.slug}`} className="hover:text-green-600 dark:hover:text-green-500 font-semibold">
                                                                                    <span className="mr-2">{problem.name}</span>
                                                                                    {mySubmited[problem?.slug as keyof typeof mySubmited] === "PASSED" && <i className="text-[12px] translate-y-[1px] fa-solid fa-circle-check text-green-600"></i>}
                                                                                    {mySubmited[problem?.slug as keyof typeof mySubmited] === "FAILED" && <i className="text-[12px] translate-y-[1px] fa-solid fa-circle-xmark text-red-500"></i>}
                                                                                    {mySubmited[problem?.slug as keyof typeof mySubmited] === "ERROR" && <i className="text-[12px] translate-y-[1px] fa-solid fa-circle-exclamation text-amber-500"></i>}
                                                                                    {mySubmited[problem?.slug as keyof typeof mySubmited] === "COMPILE_ERROR" && <i className="text-[12px] translate-y-[1px] fa-solid fa-triangle-exclamation text-zinc-400"></i>}
                                                                                    {(mySubmited[problem?.slug] === "PENDING" || !mySubmited[problem?.slug]) && <i className="fa-solid fa-circle-minus text-zinc-400"></i>}
                                                                                </Link>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Badge variant="secondary" className="text-[11px] p-0 px-1.5 leading-5 rounded-sm">
                                                                                    {problem.language === "c" && "C"}
                                                                                    {problem.language === "cpp" && "C++"}
                                                                                    {problem.language === "java" && "Java"}
                                                                                </Badge>
                                                                            </TableCell>
                                                                            <TableCell className="text-right">
                                                                                <Badge variant="secondary" className="text-[11px] p-0 px-1.5 leading-5 rounded-sm">
                                                                                    {problem.score}
                                                                                </Badge>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </BlurFade> :
                                            <BlurFade delay={0.3} yOffset={0} blur="2px">
                                                <div className="w-full flex flex-col gap-2">
                                                    <h2 className="">Đề bài:</h2>
                                                    <div className="h-[200px] border rounded-lg bg-secondary/40 dark:bg-secondary/10 flex flex-col items-center justify-center gap-2">
                                                        <i className="fa-solid fa-lock mr-3 text-2xl opacity-50"></i>
                                                        <span className="opacity-60 text-sm">Chỉ hiển thị với những người tham gia cuộc thi</span>
                                                    </div>
                                                </div>
                                            </BlurFade>
                                    }
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
                {
                    contest?.start_time > moment(new Date().getTime()).unix() ?
                        <BlurFade delay={0.2} yOffset={0}>
                            <div className="w-[280px] 2xl:w-[300px] p-4 py-7 border rounded-lg bg-secondary/10 sticky top-4">
                                <div className="relative flex flex-col items-center justify-center gap-2">
                                    <h2 className="font-bold text-lg">Bắt đầu sau</h2>
                                    <span className="font-semibold text-green-600 dark:text-green-500 mx-1.5">
                                        <span className="text-3xl font-extrabold">{countdown}</span>
                                    </span>
                                </div>
                            </div>
                        </BlurFade> :
                        timeLeft.percent <= 0 ? (
                            <BlurFade delay={0.2} yOffset={0}>
                                <div className="w-[290px] 2xl:w-[320px] p-4 pb-2 border rounded-lg bg-secondary/10 sticky top-4">
                                    <div className="relative flex flex-col items-center justify-center gap-6">
                                        <h2 className="font-bold text-lg">Kết quả cuộc thi</h2>
                                        <div className="flex flex-col gap-2.5 w-full">
                                            <BlurFade delay={0.25}>
                                                <div className="flex items-center gap-2 w-full border rounded-lg p-3 pl-4 bg-primary text-white">
                                                    <span className="w-4 text-sm font-bold">1</span>
                                                    <div className="flex items-center">
                                                        <img src="https://avatars.githubusercontent.com/u/93561031?v=4" className="size-[26px] rounded-full inline mr-2 border border-white" />
                                                        <span className="lowercase text-sm font-semibold line-clamp-1 break-words">kakanvk</span>
                                                    </div>
                                                    <Badge variant="secondary" className="ml-auto rounded-md bg-white text-primary text-[12px] p-0.5 px-2 font-black leading-5 text-nowrap">
                                                        500
                                                    </Badge>
                                                </div>
                                            </BlurFade>
                                            <BlurFade delay={0.3}>
                                                <div className="flex items-center gap-2 w-full border border-foreground/10 rounded-lg p-3 pl-4 bg-secondary">
                                                    <span className="w-4 text-sm font-bold opacity-70">2</span>
                                                    <div className="flex items-center">
                                                        <img src="https://avatars.githubusercontent.com/u/168247648?v=4" className="size-[26px] rounded-full inline mr-2 border border-foreground/20" />
                                                        <span className="lowercase text-sm font-semibold text-l line-clamp-1 break-words">kakaintest</span>
                                                    </div>
                                                    <Badge variant="secondary" className="ml-auto rounded-md bg-foreground/10 dark:bg-foreground/20 text-[12px] p-0.5 px-2 font-black leading-5 text-nowrap">
                                                        300
                                                    </Badge>
                                                </div>
                                            </BlurFade>
                                            <BlurFade delay={0.35}>
                                                <div className="flex items-center gap-2 w-full border rounded-lg p-3 pl-4 bg-secondary/10">
                                                    <span className="w-4 text-sm font-bold opacity-70">3</span>
                                                    <div className="flex items-center">
                                                        <img src="https://avatars.githubusercontent.com/u/167604394?v=4" className="size-[26px] rounded-full inline mr-2 border border-foreground/20" />
                                                        <span className="lowercase text-sm font-semibold text-l line-clamp-1 break-words">nguyenthuhakt</span>
                                                    </div>
                                                    <Badge variant="secondary" className="ml-auto rounded-md bg-secondary/50 dark:bg-secondary/60 text-[12px] p-0.5 px-2 font-black leading-5 text-nowrap">
                                                        200
                                                    </Badge>
                                                </div>
                                            </BlurFade>
                                            <BlurFade delay={0.4}>
                                                <Button variant="ghost" className="group/more w-full">
                                                    Xem tất cả<ArrowRight className="size-[14px] ml-2 duration-100 group-hover/more:ml-3" />
                                                </Button>
                                            </BlurFade>
                                        </div>
                                    </div>
                                </div>
                            </BlurFade>
                        ) :
                            <BlurFade delay={0.2} yOffset={0}>
                                <div className="w-[280px] sticky top-4 flex flex-col gap-4">
                                    <div className="relative border p-4 rounded-lg bg-secondary/10 aspect-square flex flex-col items-center justify-center">
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
                                    {
                                        joinedContest?.id === contest_id ?
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="destructive" className="w-full">
                                                        Rời khỏi cuộc thi<ArrowRight className="size-[14px] ml-2 duration-100 group-hover/more:ml-3" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Xác nhận rời khỏi cuộc thi này</DialogTitle>
                                                    </DialogHeader>
                                                    <DialogDescription>
                                                        Sau khi rời khỏi, mọi kết quả sẽ bị huỷ và bạn sẽ không thể tham gia lại cuộc thi này.
                                                    </DialogDescription>
                                                    <DialogFooter className="mt-2">
                                                        <DialogClose>
                                                            <Button variant="ghost">
                                                                Đóng
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose>
                                                            <Button className="w-fit px-4" variant="destructive" onClick={() => handleExitContest()}>
                                                                Tôi hiểu và muốn rời khỏi
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog> :
                                            <BlurFade delay={0.3}>
                                                <div className="sticky top-6 w-full flex flex-col items-center gap-2">
                                                    <p className="text-[13px] w-full mt-3">
                                                        <i className="fa-solid fa-circle-info mr-2 opacity-40 text-xs"></i>
                                                        <span className="opacity-60">Bạn chưa tham gia cuộc thi này</span>
                                                    </p>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button className="w-full">
                                                                {!contest?.public && <i className="fa-solid fa-lock mr-3 text-xs translate-y-[1px]"></i>}
                                                                Tham gia ngay
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Xác nhận tham gia cuộc thi này</DialogTitle>
                                                            </DialogHeader>
                                                            <DialogDescription className="-mt-0.5 leading-6">
                                                                Bạn có chắc chắn rằng bạn muốn tham gia cuộc thi này. {contest?.join_key && 'Vui lòng nhập mã tham gia để tiếp tục.'}
                                                            </DialogDescription>
                                                            {
                                                                !contest?.public &&
                                                                <Input
                                                                    placeholder="Mã tham gia"
                                                                    className="placeholder:italic"
                                                                    value={inputKey}
                                                                    onChange={(e) => setInputKey(e.target.value)}
                                                                />
                                                            }
                                                            <DialogFooter className="mt-4">
                                                                <DialogClose asChild>
                                                                    <Button variant="ghost">
                                                                        Đóng
                                                                    </Button>
                                                                </DialogClose>
                                                                <DialogClose asChild>
                                                                    <Button onClick={() => handleJoinContest()}>Xác nhận</Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </BlurFade>
                                    }
                                </div>
                            </BlurFade>
                }
            </div>
        </div>
    );
};

export default Contest;
