import { Link, useLocation, useParams } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"

import { CornerDownRight, MessageSquareCode, ChevronRight, Info, ChevronLeft, History, MessagesSquare, Code, AlignLeft, Tags, Tag, CodeXml, Gem, LayoutList } from 'lucide-react';
import RingProgress from "@/components/ui/ringProcess";
import { Button } from "@/components/ui/button";
import CodeArea from "@/components/ui/code-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SubmissionHistory from "./SubmissionHistory";

import { useMediaQuery } from 'react-responsive'

import { InlineMath, BlockMath } from 'react-katex';
import { useEffect, useState } from "react";
import { getProblemByIDorSlug } from "@/service/API/Problem";

import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getMySubmited, getSubmissionsByProblemSlug } from "@/service/API/Submission";
import { useLogin } from "@/service/LoginContext";
import BlurFade from "@/components/magicui/blur-fade";

const chartConfig = {
    quanlity: {
        label: "Số lượng",
    },
    PASSED: {
        label: "Kết quả chính xác",
    },
    FAILED: {
        label: "Sai kết quả",
    },
    ERROR: {
        label: "Gặp vấn đề",
    },
    COMPILE_ERROR: {
        label: "Lỗi biên dịch",
    },
} satisfies ChartConfig

function Problem() {

    const { problem_id } = useParams<{ problem_id: string }>();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    const is2XL = useMediaQuery({ query: '(min-width: 1536px)' });

    const loginContext = useLogin();

    const [problem, setProblem] = useState<any>();
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState("all");
    const [chartData, setChartData] = useState<any[]>([]);
    const [mySubmited, setMySubmited] = useState<any>({});

    const handleGetProblem = async () => {
        try {
            const response = await getProblemByIDorSlug(problem_id as any);
            setProblem(response);
            handleGetSubmissons(response.slug);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetSubmissons = async (slug: any) => {
        const data = await getSubmissionsByProblemSlug(slug);
        setSubmissions(data);
    }

    const handleGetMySubmited = async () => {
        const data = await getMySubmited();
        setMySubmited(data);
    }

    const handleBuildChart = () => {
        let data = [
            { status: "PASSED", quanlity: 0, fill: "#22c55e" },
            { status: "FAILED", quanlity: 0, fill: "#ef4444" },
            { status: "ERROR", quanlity: 0, fill: "#fbbf24" },
            { status: "COMPILE_ERROR", quanlity: 0, fill: "#d3d3d3" }
        ]
        submissions.forEach((submission: any) => {
            if (selectedType === "all") {
                data.forEach((item: any) => {
                    if (item.status === submission.status) {
                        item.quanlity += 1;
                    }
                })
            } else {
                if (submission.username === loginContext.user.username) {
                    data.forEach((item: any) => {
                        if (item.status === submission.status) {
                            item.quanlity += 1;
                        }
                    })
                }
            }
        })
        setChartData(data);
    }

    useEffect(() => {
        handleBuildChart();
    }, [submissions, selectedType]);

    useEffect(() => {
        handleGetProblem();
        handleGetMySubmited();
    }, []);

    return (
        <div className="Problem p-6 px-8 pb-[90px] flex flex-col gap-8">
            <Breadcrumb>
                <BlurFade delay={0.1} yOffset={0} blur="2px">
                    <BreadcrumbList>
                        {
                            problem?.type === "COURSE" &&
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="/">Khoá học của tôi</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        <Link to={`/course/${problem?.parent?.id}`}>{problem?.parent?.name}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        }
                        {
                            problem?.type === "FREE" &&
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="/problems">Các bài tập</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        }
                        <BreadcrumbItem>
                            {problem?.name}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </BlurFade>
            </Breadcrumb>
            <div className="flex gap-8 2xl:gap-10 items-start relative flex-col lg:flex-row">
                <div className="flex-1 flex flex-col gap-5 w-full">
                    <BlurFade delay={0.2} yOffset={0} blur="2px">
                        <div className="flex gap-4 justify-between">
                            <div className="flex-1 flex flex-col gap-3">
                                <h1 className="text-2xl font-bold">
                                    {problem?.name}
                                    {mySubmited?.[problem?.slug] === "PASSED" && <i className="fa-solid fa-circle-check text-green-600 ml-2.5 text-[18px]"></i>}
                                    {mySubmited?.[problem?.slug] === "FAILED" && <i className="fa-solid fa-circle-xmark text-red-500 ml-2.5 text-[18px]"></i>}
                                    {mySubmited?.[problem?.slug] === "ERROR" && <i className="fa-solid fa-circle-exclamation text-amber-500 ml-2.5 text-[18px]"></i>}
                                    {mySubmited?.[problem?.slug] === "COMPILE_ERROR" && <i className="fa-solid fa-triangle-exclamation text-zinc-400 ml-2.5 text-[18px]"></i>}
                                    {(mySubmited[problem?.slug] === "PENDING" || !mySubmited[problem?.slug]) &&
                                        <i className="fa-solid fa-circle-minus text-zinc-400 ml-2.5 text-[18px]"></i>
                                    }
                                </h1>
                                {
                                    problem?.type === "COURSE" ?
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Link className="flex items-center gap-2 text-sm font-medium opacity-60 hover:text-green-600 dark:hover:text-green-500 hover:opacity-100 duration-300 w-fit" to={`/course/${problem?.parent?.id}`}>
                                                <CornerDownRight className="w-3" />{problem?.parent?.name}
                                            </Link>
                                            <Badge variant="outline" className="rounded-md px-2 text-green-600 dark:text-green-500 border-primary">{problem?.unit?.name}</Badge>
                                        </div> :
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`rounded-md bg-green-500/20 border border-green-500 text-green-600 dark:text-green-400 text-[12px] p-0.5 px-2 font-medium leading-5 text-nowrap`} >
                                                Bài tập tự do
                                            </span >
                                            {
                                                problem?.level === "EASY" &&
                                                <span className={`rounded-md bg-green-500/20 border border-green-500 text-green-600 dark:text-green-400 text-[12px] p-0.5 px-2 font-medium leading-5 text-nowrap`} >
                                                    Mức độ: Dễ
                                                </span >
                                            }
                                            {
                                                problem?.level === "MEDIUM" &&
                                                <span className={`rounded-md bg-sky-500/20 border border-sky-500 text-sky-600 dark:text-sky-400 text-[12px] p-0.5 px-2 font-medium leading-5 text-nowrap`} >
                                                    Mức độ: Trung bình
                                                </span >
                                            }
                                            {
                                                problem?.level === "HARD" &&
                                                <span className={`rounded-md bg-orange-500/20 border border-orange-500 text-orange-600 dark:text-orange-400 text-[12px] p-0.5 px-2 font-medium leading-5 text-nowrap`} >
                                                    Mức độ: Khó
                                                </span >
                                            }
                                        </div>
                                }
                            </div>
                            <div className="flex items-start gap-2">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon" variant="outline"><i className="fa-regular fa-star"></i></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            Đánh dấu bài tập này
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </BlurFade>
                    <BlurFade delay={0.3} yOffset={0} blur="2px">
                        <Tabs defaultValue={tab || "content" as any} className="w-full">
                            <TabsList className="bg-transparent justify-start rounded-none pb-3 px-0 border-b-[2px] border-secondary/40 w-full">
                                <TabsTrigger
                                    value="content"
                                    className="px-1 border-b-2 border-b-transparent drop-shadow-none data-[state=active]:border-b-primary rounded-none bg-transparent data-[state=active]:bg-transparent duration-500"
                                >
                                    <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                                        <AlignLeft className="w-4 mr-2" />Nội dung bài tập
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="discuss"
                                    className="px-1 border-b-2 border-b-transparent drop-shadow-none data-[state=active]:border-b-primary rounded-none bg-transparent data-[state=active]:bg-transparent duration-500"
                                >
                                    <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                                        <MessagesSquare className="w-4 mr-2" />
                                        Thảo luận
                                        <Badge variant="secondary" className="px-1.5 rounded-md ml-2 inline">
                                            12
                                        </Badge>
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="history"
                                    className="px-1 border-b-2 border-b-transparent drop-shadow-none data-[state=active]:border-b-primary rounded-none bg-transparent data-[state=active]:bg-transparent duration-500"
                                >
                                    <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                                        <History className="w-4 mr-2" />Bài nộp của tôi
                                    </Button>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="content">
                                <div className="p-4 py-7 flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-bold text-green-600 dark:text-green-500">Mô tả đề bài:</span>
                                        <div className=" text-justify dark:font-normal font-medium">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: problem?.description,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-bold text-green-600 dark:text-green-500">Input:</span>
                                        <div className=" text-justify dark:font-normal font-medium">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: problem?.input,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-bold text-green-600 dark:text-green-500">Output:</span>
                                        <div className=" text-justify dark:font-normal font-medium">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: problem?.output,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {
                                        problem?.limit &&
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm font-bold text-green-600 dark:text-green-500">Giới hạn:</span>
                                            <div className="text-justify dark:font-normal font-medium text-base">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: problem?.limit,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    }

                                    <div className="">
                                        <Accordion type="multiple">
                                            {
                                                problem?.examples.length > 0 && problem?.examples.map((example: any, index: number) => (
                                                    <AccordionItem key={example.id} value={example.id} className="border-0">
                                                        <AccordionTrigger className="hover:no-underline">
                                                            <span className="flex items-center gap-2 text-lg font-semibold">
                                                                <MessageSquareCode className="w-5 translate-y-[2px] text-green-600 dark:text-green-500" />Ví dụ {index + 1}
                                                            </span>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="flex flex-col gap-7 pt-3 pb-8">
                                                            <div className="flex flex-col gap-3">
                                                                <span className="text-sm font-semibold opacity-60">Input:</span>
                                                                <CodeArea>
                                                                    {example.input}
                                                                </CodeArea>
                                                            </div>
                                                            <div className="flex flex-col gap-3">
                                                                <span className="text-sm font-semibold opacity-60">Output:</span>
                                                                <CodeArea>
                                                                    {example.output}
                                                                </CodeArea>
                                                            </div>
                                                            {
                                                                example.note && example.note.length > 0 &&
                                                                <div className="flex flex-col gap-3">
                                                                    <span className="text-sm font-semibold opacity-70">Ghi chú:</span>
                                                                    <div className="text-justify dark:font-normal font-medium text-base">
                                                                        <p>
                                                                            {example.note}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))
                                            }
                                        </Accordion>
                                    </div>

                                    <div className="flex items-center justify-end gap-3.5 mt-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="secondary" className="gap-2"><Info className="w-4" />Hướng dẫn nộp bài</Button>
                                            </DialogTrigger>
                                            <DialogContent className="min-w-[650px]">
                                                <DialogHeader>
                                                    <DialogTitle className="mb-5 flex items-center gap-2 text-green-600 dark:text-green-500">
                                                        <i className="fa-solid fa-circle-info text-[14px] translate-y-[1.5px]"></i>Hướng dẫn nộp bài
                                                    </DialogTitle>
                                                    <DialogDescription className="text-">
                                                        <ScrollArea className={'[&>[data-radix-scroll-area-viewport]]:max-h-[400px] pr-4 pb-2 translate-x-1'}>
                                                            <div className="flex flex-col gap-7">
                                                                <div className="border-l-4 pl-3 text-sm">
                                                                    <p className="dark:font-normal text-zinc-500 dark:text-zinc-400">
                                                                        Lưu ý: Đảm bảo rằng Git đã được cài đặt trước khi thực hiện các bước bên dưới. Có thể tham khảo tại: <Link to="https://git-scm.com" className="font-semibold text-green-600 dark:text-green-500" target="blank">https://git-scm.com</Link>
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-col gap-2.5">
                                                                    <span className="font-bold text-sm">Bước 1: Clone dự án về máy</span>
                                                                    <CodeArea>
                                                                        {`git clone https://github.com/hicommit/hicommit-works.git`}
                                                                    </CodeArea>
                                                                </div>
                                                                <div className="flex flex-col gap-2.5">
                                                                    <span className="font-bold text-sm">Bước 2: Di chuyển vào thư mục của bài tập</span>
                                                                    <CodeArea>
                                                                        {`cd hicommit-works`}
                                                                    </CodeArea>
                                                                </div>
                                                                <div className="flex flex-col gap-2.5">
                                                                    <span className="font-bold text-sm">Bước 3: Chuyển sang nhánh của bài tập</span>
                                                                    <CodeArea>
                                                                        {`git checkout work-hello-world`}
                                                                    </CodeArea>
                                                                </div>
                                                                <div className="flex flex-col gap-2.5">
                                                                    <span className="font-bold text-sm">Bước 4: Viết mã nguồn</span>
                                                                    <p className="dark:font-normal text-zinc-500 dark:text-zinc-400">
                                                                        Dựa vào yêu cầu đề bài, hãy viết mã nguồn vào file <Badge variant="secondary" className="rounded px-1.5">main.*</Badge> để xử lý tất cả các trường hợp cần thiết.
                                                                    </p>
                                                                    <div className="border-l-4 pl-3 text-sm">
                                                                        <p className="dark:font-normal text-zinc-500 dark:text-zinc-400">
                                                                            <strong>*</strong> là phần mở rộng của ngôn ngữ lập trình bạn sử dụng (c, cpp, java).
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-2.5">
                                                                    <span className="font-bold text-sm">Bước 5: Thêm các thay đổi vào Git</span>
                                                                    <CodeArea>
                                                                        {`git add .`}
                                                                    </CodeArea>
                                                                </div>
                                                                <div className="flex flex-col gap-2.5">
                                                                    <span className="font-bold text-sm">Bước 6: Xác nhận các thay đổi</span>
                                                                    <CodeArea>
                                                                        {`git commit -m "Submit work"`}
                                                                    </CodeArea>
                                                                </div>
                                                                <div className="flex flex-col gap-2.5">
                                                                    <span className="font-bold text-sm">Bước 7: Cập nhật các thay đổi lên GitHub</span>
                                                                    <CodeArea>
                                                                        {`git push`}
                                                                    </CodeArea>
                                                                </div>
                                                            </div>
                                                        </ScrollArea>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter className="mt-2">
                                                    <DialogClose asChild>
                                                        <Button variant="secondary" size="sm">Đóng</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        <Button className="gap-2 pr-3" asChild>
                                            <Link to="submit">
                                                Gửi bài giải<ChevronRight className="w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="discuss">
                                <div className="p-4 py-7">
                                    Thảo luận ở đây
                                </div>
                            </TabsContent>
                            <TabsContent value="history">
                                <div className="pl-4 py-7 pt-2">
                                    <SubmissionHistory problem={problem} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </BlurFade>
                    <BlurFade delay={0.4} yOffset={0} blur="2px">
                        <div className="flex justify-between items-center mt-16 text-sm dark:text-zinc-200">
                            <Link to="" className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-500 duration-200"><ChevronLeft className="w-4" />Bài trước</Link>
                            <Link to="" className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-500 duration-200">Bài tiếp theo<ChevronRight className="w-4" /></Link>
                        </div>
                    </BlurFade>
                </div>

                <BlurFade delay={0.4} yOffset={0} blur="2px">
                    <div className="sticky top-6 w-[270px] 2xl:w-[300px] flex flex-col items-center gap-6">
                        <Card className="flex flex-col w-full bg-zinc-100/70 dark:bg-zinc-900/50">
                            <CardHeader className="items-center pb-0 pt-4">
                                <p className="text-start w-full text-sm mb-1">Tỉ lệ hoàn thành bài tập</p>
                                <Select onValueChange={setSelectedType} value={selectedType}>
                                    <SelectTrigger className="dark:bg-transparent">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toàn hệ thống</SelectItem>
                                        <SelectItem value="me">Chỉ mình tôi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardHeader>
                            <CardContent className="flex-1 px-2 pb-0">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-[5/6] w-full"
                                >
                                    {
                                        // Nếu tổng quantity = 0 thì hiển thị thông báo
                                        chartData.reduce((acc, cur) => acc + cur.quanlity, 0) === 0 ?
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <LayoutList className="w-10 h-10 opacity-30 mb-3" />
                                                <p className="text-center text-sm dark:text-zinc-300 opacity-60">Chưa có dữ liệu</p>
                                            </div> :
                                            <PieChart>
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent hideLabel className="w-[165px]" />}
                                                />
                                                <Pie
                                                    data={chartData}
                                                    dataKey="quanlity"
                                                    nameKey="status"
                                                    innerRadius={is2XL ? 62 : 53}
                                                >
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text
                                                                        x={viewBox.cx}
                                                                        y={viewBox.cy}
                                                                        textAnchor="middle"
                                                                        dominantBaseline="middle"
                                                                        className="-translate-y-2"
                                                                    >
                                                                        <tspan
                                                                            x={viewBox.cx}
                                                                            y={viewBox.cy}
                                                                            className="fill-foreground text-2xl 2xl:text-3xl font-bold"
                                                                        >
                                                                            {/* Làm tròn 2 chữ số thập phân */}
                                                                            {((chartData.find((item) => item.status === "PASSED")?.quanlity || 0) / chartData.reduce((acc, cur) => acc + cur.quanlity, 0) * 100).toFixed(0)}%
                                                                        </tspan>
                                                                        <tspan
                                                                            x={viewBox.cx}
                                                                            y={viewBox.cy as any + (is2XL ? 25 : 22)}
                                                                            className="fill-foreground text-xs opacity-80"
                                                                        >
                                                                            Hoàn thành
                                                                        </tspan>
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </Pie>
                                                <ChartLegend
                                                    content={<ChartLegendContent nameKey="status" />}
                                                    className="-translate-y-2 flex-col gap-2 items-start px-3 pb-1"
                                                />
                                            </PieChart>
                                    }
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <div className="w-full flex flex-col gap-2">
                            <h3 className="font-medium"><Tag className="w-[16px] inline mr-1 text-primary" />Tags:</h3>
                            {
                                problem?.tags.length > 0 &&
                                <div className="flex gap-1 gap-y-1.5 flex-wrap">
                                    {problem?.tags.map((tag: any, index: any) => (
                                        <Badge key={index} variant="outline" className="capitalize text-[12px] p-0.5 px-2.5 font-normal dark:font-light leading-5">{tag}</Badge>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className="w-full flex gap-2">
                            <h3 className="font-medium text-base"><CodeXml className="w-[20px] inline mr-1.5 text-primary" />Ngôn ngữ lập trình:</h3>
                            <Badge className="w-fit px-1.5 rounded" variant="secondary">
                                {problem?.language === "c" && "C"}
                                {problem?.language === "cpp" && "C++"}
                                {problem?.language === "java" && "Java"}
                            </Badge>
                        </div>
                        <div className="w-full flex gap-2">
                            <h3 className="font-medium text-base"><Gem className="w-4 h-4 inline mr-1.5 text-primary -translate-y-[2.5px]" />Điểm:</h3>
                            <Badge className="w-fit px-1.5 rounded" variant="secondary">{problem?.score}</Badge>
                        </div>
                    </div>
                </BlurFade>
            </div>
        </div >
    );
};

export default Problem;