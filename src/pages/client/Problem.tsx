import { Link, useParams } from "react-router-dom";

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

import { CornerDownRight, MessageSquareCode, ChevronRight, Info, ChevronLeft, History, MessagesSquare, Code, AlignLeft, Tags, Tag, CodeXml, Gem } from 'lucide-react';
import RingProgress from "@/components/ui/ringProcess";
import { Button } from "@/components/ui/button";
import CodeArea from "@/components/ui/code-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SubmissionHistory from "./SubmissionHistory";

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { useEffect, useState } from "react";
import { getProblemByIDorSlug } from "@/service/API/Problem";

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@radix-ui/react-dropdown-menu";

const chartData = [
    { status: "chrome", visitors: 275, fill: "#22c55e" },
    { status: "safari", visitors: 200, fill: "#fbbf24" },
    { status: "firefox", visitors: 187, fill: "#ef4444" }
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Hoàn thành",
    },
    safari: {
        label: "Chưa hoàn thành",
    },
    firefox: {
        label: "Gặp vấn đề",
    }
} satisfies ChartConfig

function Problem() {

    const { problem_id } = useParams();

    const [problem, setProblem] = useState<any>();

    const handleGetProblem = async () => {
        try {
            const response = await getProblemByIDorSlug(problem_id as any);
            setProblem(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetProblem();
    }, []);

    return (
        <div className="Problem p-6 px-8 pb-[90px] flex flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Khoá học của tôi</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={`/course/${problem?.parent.id}`}>{problem?.parent.name}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        {problem?.name}
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-8 items-start relative flex-col lg:flex-row">
                <div className="flex-1 flex flex-col gap-5 w-full">
                    <div className="flex gap-4 justify-between">
                        <div className="flex-1 flex flex-col gap-3">
                            <h1 className="text-2xl font-bold">
                                {problem?.name}
                                <i className="fa-solid fa-circle-minus text-zinc-400 ml-2 text-[18px]"></i>
                                {/* <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[18px]"></i> */}
                                {/* <i className="fa-solid fa-circle-xmark text-red-500"></i> */}
                            </h1>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Link className="flex items-center gap-2 text-sm font-medium opacity-60 hover:text-green-600 dark:hover:text-green-500 hover:opacity-100 duration-300 w-fit" to={`/course/${problem?.parent.id}`}>
                                    <CornerDownRight className="w-3" />{problem?.parent.name}
                                </Link>
                                <Badge variant="outline" className="rounded-md px-2 text-green-600 dark:text-green-500 border-primary">{problem?.unit.name}</Badge>
                            </div>
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
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="bg-transparent justify-start rounded-none pb-0 px-0">
                            <TabsTrigger
                                value="content"
                                className="border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                            >
                                <AlignLeft className="w-4 mr-2" />Nội dung bài tập
                            </TabsTrigger>
                            <TabsTrigger
                                value="discuss"
                                className="border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                            >
                                <MessagesSquare className="w-4 mr-2" />Thảo luận<Badge className="px-2 ml-2" variant="secondary">12</Badge>
                            </TabsTrigger>
                            <TabsTrigger
                                value="history"
                                className="border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                            >
                                <History className="w-4 mr-2" />Lịch sử nộp bài
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
                                <SubmissionHistory />
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-between items-center mt-16 text-sm dark:text-zinc-200">
                        <Link to="" className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-500 duration-200"><ChevronLeft className="w-4" />Bài trước</Link>
                        <Link to="" className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-500 duration-200">Bài tiếp theo<ChevronRight className="w-4" /></Link>
                    </div>

                </div>

                <div className="sticky top-6 w-[270px] 2xl:w-[300px] flex flex-col items-center gap-6">
                    <Card className="flex flex-col w-full bg-zinc-100/70 dark:bg-zinc-900/50">
                        <CardHeader className="items-center pb-0 pt-4">
                            <CardTitle className="text-xl">Thống kê</CardTitle>
                            <CardDescription>Tỉ lệ hoàn thành bài tập</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 px-2 pb-0">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square w-full"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                        className="w-[165px]"
                                    />
                                    <Pie data={chartData} dataKey="visitors" nameKey="status" />
                                    <ChartLegend
                                        content={<ChartLegendContent nameKey="status" />}
                                        className="-translate-y-2 flex-col gap-2 items-start px-3 pb-1"
                                    />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <div className="w-full flex flex-col gap-2">
                        <h3 className="font-medium"><Tag className="w-[16px] inline mr-1 text-primary" />Tags:</h3>
                        {
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
                        <Badge className="w-fit px-1.5 rounded" variant="secondary">100</Badge>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Problem;