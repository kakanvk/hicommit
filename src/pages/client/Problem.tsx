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

import { CornerDownRight, MessageSquareCode, ChevronRight, Info, ChevronLeft, History, MessagesSquare, Code, AlignLeft } from 'lucide-react';
import RingProgress from "@/components/ui/ringProcess";
import { Button } from "@/components/ui/button";
import CodeArea from "@/components/ui/code-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SubmissionHistory from "./SubmissionHistory";

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function Problem() {

    const { problem_id } = useParams();

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
                            <Link to={`/course/123`}>Olympic Sinh Viên 2023 Khối Chuyên tin</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Ước số
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-8 items-start relative flex-col lg:flex-row">
                <div className="flex-1 flex flex-col gap-5 w-full">
                    <div className="flex gap-4 justify-between">
                        <div className="flex-1 flex flex-col gap-3">
                            <h1 className="text-2xl font-bold">
                                Olympic Sinh Viên 2023 - Chuyên tin - Ước số
                                <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[20px]"></i>
                            </h1>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <Link className="flex items-center gap-2 text-sm font-medium opacity-60 hover:text-green-600 dark:hover:text-green-500 hover:opacity-100 duration-300 w-fit" to={`/course/123`}>
                                    <CornerDownRight className="w-3" />Olympic Tin học Sinh viên 2023
                                </Link>
                                <Badge variant="outline" className="rounded-md px-2 text-green-600 dark:text-green-500 border-primary">Khối chuyên tin</Badge>
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
                                        <p>Số <InlineMath math="fib(n)" /> với <InlineMath math="n\ge0" /> được tính theo công thức sau:</p>
                                        <BlockMath math={`
                                            fib(n) = 
                                            \\begin{cases} 
                                            n & \\text{nếu } n \\leq 1 \\\\
                                            fib(n-1) + fib(n-2) & \\text{nếu } n \\geq 2 
                                            \\end{cases}
                                        `} />
                                        <p>
                                            Cho ba số nguyên dương <InlineMath math="a, b, M" />, gọi <InlineMath math="u" /> là ước số chung lớn nhất của <InlineMath math="fib(a)" /> và <InlineMath math="fib(b)" />,
                                            hãy tính phần dư của phép chia <InlineMath math="u" /> cho <InlineMath math="M" />.
                                        </p>
                                    </div>
                                </div>


                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-green-600 dark:text-green-500">Input:</span>
                                    <div className=" text-justify dark:font-normal font-medium">
                                        <p>
                                            Vào từ thiết bị vào chuẩn gồm ba số nguyên dương <InlineMath math="a, b, M \, (a, b, M \leq 10^{12})" />.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-green-600 dark:text-green-500">Output:</span>
                                    <div className=" text-justify dark:font-normal font-medium">
                                        <p>
                                            Ghi ra thiết bị ra chuẩn một số là phần dư của phép chia <InlineMath math="u" /> cho <InlineMath math="M" />.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-green-600 dark:text-green-500">Giới hạn:</span>
                                    <div className="text-justify dark:font-normal font-medium text-base">
                                        <p>
                                            Subtask 1 (70% số điểm): <InlineMath math="a, b, M \leq 50" />;
                                        </p>
                                        <p>
                                            Subtask 2 (20% số điểm): <InlineMath math="a, b, M \leq 10^9" />;
                                        </p>
                                        <p>
                                            Subtask 3 (10% số điểm): Không có ràng buộc nào thêm.
                                        </p>
                                    </div>
                                </div>

                                <div className="">
                                    <Accordion type="multiple">
                                        <AccordionItem value="item-1" className="border-0">
                                            <AccordionTrigger className="hover:no-underline">
                                                <span className="flex items-center gap-2 text-lg font-semibold">
                                                    <MessageSquareCode className="w-5 translate-y-[2px] text-green-600 dark:text-green-500" />Ví dụ 1
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-7 pt-3 pb-8">
                                                <div className="flex flex-col gap-3">
                                                    <span className="text-sm font-semibold opacity-60">Input:</span>
                                                    <CodeArea>
                                                        {`6 9 10`}
                                                    </CodeArea>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <span className="text-sm font-semibold opacity-60">Output:</span>
                                                    <CodeArea>
                                                        {`2`}
                                                    </CodeArea>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <span className="text-sm font-semibold opacity-70">Ghi chú:</span>
                                                    <div className="text-justify dark:font-normal font-medium text-base">
                                                        <p>
                                                            Ta có <InlineMath math="fib(6) = 8" /> và <InlineMath math="fib(9) = 34" />. Ước số chung lớn nhất của chúng là <InlineMath math="2" />.
                                                        </p>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
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

                <div className="sticky top-6 w-[270px] bg-zinc-100/80 dark:bg-zinc-900 border rounded-lg flex flex-col items-center p-5 px-6">
                    <span className="font-semibold">Tiến độ khoá học</span>
                    <RingProgress radius={90} stroke={12} progress={30} label="" textSize={28} />
                    <div className="w-full font-medium flex flex-col gap-4 mt-5">
                        <div className="flex gap-3 justify-start items-center">
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-circle-check text-green-600"></i>
                                <span className="text-sm">Hoàn thành:</span>
                            </div>
                            <Badge variant="secondary" className="rounded">3/10</Badge>
                        </div>
                        <div className="flex gap-3 justify-start items-center">
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-circle-exclamation text-amber-500"></i>
                                <span className="text-sm">Chưa hoàn thành:</span>
                            </div>
                            <Badge variant="secondary" className="rounded">1/10</Badge>
                        </div>
                        <div className="flex gap-3 justify-start items-center">
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                <span className="text-sm">Gặp vấn đề:</span>
                            </div>
                            <Badge variant="secondary" className="rounded">2/10</Badge>
                        </div>
                        <div className="flex gap-3 justify-start items-center">
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-circle-minus text-zinc-400"></i>
                                <span className="text-sm">Chưa nộp bài:</span>
                            </div>
                            <Badge variant="secondary" className="rounded">4/10</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Problem;