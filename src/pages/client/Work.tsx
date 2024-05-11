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

import { CornerDownRight, MessageSquareCode, ChevronRight, Info, ChevronLeft } from 'lucide-react';
import RingProgress from "@/components/ui/ringProcess";
import { Button } from "@/components/ui/button";
import CodeArea from "@/components/ui/code-area";
import { ScrollArea } from "@/components/ui/scroll-area"
import { DialogClose } from "@radix-ui/react-dialog";

function Work() {

    const { course_id, work_id } = useParams();

    return (
        <div className="Work p-6 px-8 pb-[90px] flex flex-col gap-8">
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
                            <Link to={`/course/${course_id}`}>Kỹ thuật lập trình</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Bài tập {work_id}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-8 items-start relative">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex gap-4 justify-between border-b-[1.5px] pb-5">
                        <div className="flex-1 flex flex-col gap-3">
                            <h1 className="text-2xl font-bold">
                                Bài tập {work_id}: In mảng 2 chiều dạng bảng
                                <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[20px]"></i>
                            </h1>
                            <div className="flex items-center gap-1.5">
                                <Link className="flex items-center gap-2 text-sm font-medium opacity-60 hover:text-green-600 dark:hover:text-green-500 hover:opacity-100 duration-300 w-fit" to={`/course/${course_id}`}>
                                    <CornerDownRight className="w-3" />Kỹ thuật lập trình
                                </Link>
                                <Badge variant="outline" className="rounded-md px-2 text-green-600 dark:text-green-500 border-primary">Lab 1: Nhập môn</Badge>
                            </div>
                        </div>
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

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-green-600 dark:text-green-500">Mô tả đề bài:</span>
                        <p className=" text-justify dark:font-normal font-medium">
                            Viết chương trình nhập mảng 2 chiều A các số nguyên có m dòng và n cột từ bàn phím và in ra mảng 2 chiều này ở dạng bảng.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-green-600 dark:text-green-500">Input:</span>
                        <p className=" text-justify dark:font-normal font-medium">
                            Dòng đầu tiên là 2 số nguyên dương m và n <br />
                            Dòng thứ 2 là m*n số nguyên tương ứng là các phần tử của mảng A
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-green-600 dark:text-green-500">Output:</span>
                        <p className=" text-justify dark:font-normal font-medium">
                            In ra mảng 2 chiều A dưới dạng bảng (có m dòng, n cột, các phần tử trên một hàng cách nhau một dấu cách)
                        </p>
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
                                            {`3 3\n1 2 3 4 5 6 7 8 9`}
                                        </CodeArea>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-sm font-semibold opacity-60">Output:</span>
                                        <CodeArea>
                                            {`1 2 3\n4 5 6\n7 8 9`}
                                        </CodeArea>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-sm font-semibold opacity-60">Giải thích:</span>
                                        <p className="text-justify text-base">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-0">
                                <AccordionTrigger className="hover:no-underline">
                                    <span className="flex items-center gap-2 text-lg font-semibold">
                                        <MessageSquareCode className="w-5 translate-y-[2px] text-green-600 dark:text-green-500" />
                                        Ví dụ 2
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-7 pt-3 pb-8">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-sm font-semibold opacity-60">Input:</span>
                                        <CodeArea>
                                            {`3 3\n1 2 3 4 5 6 7 8 9`}
                                        </CodeArea>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-sm font-semibold opacity-60">Output:</span>
                                        <CodeArea>
                                            {`1 2 3\n4 5 6\n7 8 9`}
                                        </CodeArea>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-sm font-semibold opacity-60">Giải thích:</span>
                                        <p className="text-justify text-base">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                        </p>
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
                                                        Dựa vào yêu cầu đề bài, hãy viết mã nguồn vào file <Badge variant="secondary" className="rounded px-1.5">index.cpp</Badge> để xử lý tất cả các trường hợp cần thiết.
                                                    </p>
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
                                <span className="text-sm">Lỗi:</span>
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
        </div>
    );
};

export default Work;