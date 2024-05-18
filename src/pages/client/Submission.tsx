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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Code, CornerDownRight, ArrowLeft, RefreshCcw, TriangleAlert, SquareCode } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import RingProgress from "@/components/ui/ringProcess";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import CodeMirror from '@uiw/react-codemirror';
import { githubLightInit, githubDarkInit } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';

import { useTheme } from "@/components/theme-provider";
import { useState } from "react";

function Result() {

    const { theme } = useTheme();

    const { submission_id } = useParams();

    const [code, setCode] = useState(
        `#include <bits/stdc++.h>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    return 0;
}`);

    return (
        <div className="Result p-6 px-8 pb-[90px] flex flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Khoá học của tôi</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/course/${submission_id}`}>Olympic Sinh Viên 2023 Khối Chuyên tin</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/problem/${submission_id}`}>Ước số</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Kết quả chấm bài
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col gap-2 mt-2 items-start">
                <div className="w-full flex gap-8 items-start">
                    <div className="flex-1 flex flex-col gap-8">
                        <div className="flex justify-between gap-4">
                            <div className="flex-1 flex flex-col items-start gap-2 justify-start">
                                <div className="flex-1 flex flex-col gap-3">
                                    <p className="text-xl font-bold">
                                        Kết quả chấm bài:
                                        <Link className="ml-1 hover:text-green-600 dark:hover:text-green-500 duration-300 w-fit" to={`/problem/${submission_id}`}>
                                            Ước số
                                            <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[20px]"></i>
                                        </Link>
                                    </p>
                                </div>
                                <p className="font-medium text-base">
                                    <i className="fa-solid fa-code-commit text-primary mr-2"></i>
                                    Submit code at 21:48:25 16/5/2024
                                </p>
                                <div className="text-[14px] flex items-center gap-2 flex-wrap">
                                    <span className="opacity-70">Commit bởi</span>
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger>
                                            <Badge className="gap-1.5 p-1 pr-2 hover:bg-secondary cursor-pointer" variant="outline">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarImage className="w-full h-full" src='https://avatars.githubusercontent.com/u/93561031?v=4' />
                                                </Avatar>
                                                <span className="font-semibold text-[13px] -translate-y-[1px]">kakanvk</span>
                                            </Badge>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-70" side="bottom" align="start">
                                            <div className="flex gap-4">
                                                <Avatar>
                                                    <AvatarImage className="w-14 rounded-full" src="https://avatars.githubusercontent.com/u/93561031?v=4" />
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold text-green-600 dark:text-green-500">@kakanvk</h4>
                                                    <p className="text-sm">
                                                        Trường Đại học Trà Vinh
                                                    </p>
                                                    <div className="flex items-center pt-2">
                                                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                        <span className="text-xs text-muted-foreground">
                                                            Tham gia từ tháng 10, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>

                                    <span className="text-green-600 dark:text-green-500 text-[13px] font-medium">
                                        <i className="fa-solid fa-circle text-[3px] -translate-y-[3.5px] mr-2"></i>
                                        2 phút trước
                                    </span>

                                    <Dialog>
                                        <DialogTrigger>
                                            <Badge className="w-fit text-green-600 dark:text-green-500 flex gap-1.5 border-primary px-2 py-0 font-medium rounded-md hover:bg-secondary cursor-pointer ml-2" variant="outline">
                                                <Code className="w-3.5" />
                                                <span>Xem mã nguồn</span>
                                            </Badge>
                                        </DialogTrigger>
                                        <DialogContent className="min-w-[650px]">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-2">
                                                    <SquareCode className="w-5 text-primary" />Mã nguồn
                                                    <Badge variant="secondary" className="px-1.5 rounded-sm">C++</Badge>
                                                </DialogTitle>
                                            </DialogHeader>
                                            <p className="text-sm mt-2">
                                                Commit
                                                <Badge className="px-1.5 rounded-sm mx-1 font-medium" variant="secondary">
                                                    <span className="truncate max-w-[400px]">Submit code at 21:48:25 16/5/2024</span>
                                                </Badge>
                                            </p>
                                            <div className="w-full border rounded-lg overflow-hidden">
                                                <CodeMirror
                                                    value={code}
                                                    placeholder="Please enter your code here..."
                                                    readOnly={true}
                                                    theme={theme === "dark" ?
                                                        githubDarkInit({
                                                            settings: {
                                                                background: 'rgb(15 15 15)',
                                                            }
                                                        }) :
                                                        githubLightInit({
                                                            settings: {
                                                                gutterBackground: "rgb(235 235 235)",
                                                                background: 'rgb(248 248 248)',
                                                                lineHighlight: '#8a91991a',
                                                            }
                                                        })
                                                    }
                                                    onChange={(value) => setCode(value)}
                                                    extensions={[javascript({ jsx: true })]}
                                                    height="350px"
                                                    autoFocus
                                                />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <Button variant="secondary">Đóng</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost"><RefreshCcw className="w-5" /></Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        Làm mới
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex flex-col border rounded-lg overflow-hidden">
                            <div className="bg-zinc-100 dark:bg-zinc-900 p-3 px-5 flex items-center justify-between gap-4 border-b">
                                <p className="font-bold">
                                    Kiểm tra đơn vị
                                    <span className="opacity-50 font-medium ml-2 text-sm">(Unit Test)</span>
                                    <Badge className="rounded px-1.5 ml-2 -translate-y-[1px]" variant="secondary">
                                        <span>C++</span>
                                    </Badge>
                                </p>
                                <Clock className="w-4 flex-none" />
                            </div>
                            <div className="flex flex-col gap-5 p-5">
                                <div className="flex items-center justify-between">
                                    <p className="flex items-baseline gap-3">
                                        <i className="fa-solid fa-circle-check text-primary"></i>
                                        <span className="text-sm font-medium opacity-60">Test case 1</span>
                                    </p>
                                    <span className="text-sm font-medium opacity-70">2s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="flex items-baseline gap-3">
                                        <i className="fa-solid fa-circle-check text-primary"></i>
                                        <span className="text-sm font-medium opacity-60">Test case 2</span>
                                    </p>
                                    <span className="text-sm font-medium opacity-70">5s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="flex items-baseline gap-3">
                                        <i className="fa-solid fa-circle-check text-primary"></i>
                                        <span className="text-sm font-medium opacity-60">Test case 3</span>
                                    </p>
                                    <span className="text-sm font-medium opacity-70">10s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="flex items-baseline gap-3">
                                        <i className="fa-solid fa-circle-check text-primary"></i>
                                        <span className="text-sm font-medium opacity-60">Test case 4</span>
                                    </p>
                                    <span className="text-sm font-medium opacity-70">10s</span>
                                </div>
                                {/* <div className="flex items-center justify-between">
                                    <p className="flex items-baseline gap-3">
                                        <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                        <span className="text-sm font-medium opacity-60">Test case 4</span>
                                        <Dialog>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <DialogTrigger className="hover:bg-secondary w-6 rounded">
                                                            <i className="fa-solid fa-seedling text-sm opacity-60"></i>
                                                        </DialogTrigger>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="bottom">
                                                        Gợi ý
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        <i className="fa-solid fa-seedling text-primary mr-2 translate-y-[-1px]"></i>Gợi ý hoàn thành<Badge variant="secondary" className="rounded px-1.5 py-1 ml-2 -translate-y-[1px] text-[13px]">Test case 4</Badge>
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    Bạn cần xử lý các trường hợp đặc biệt như số 0.
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose>
                                                        <Button variant="secondary">Đóng</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </p>
                                    <span className="text-sm font-medium opacity-70">0s</span>
                                </div> */}
                            </div>
                            <div className="flex justify-between items-center p-3.5 px-5 border-t-[1px]">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-xs opacity-50 font-medium">Kết quả</span>
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-circle-check text-green-600"></i>
                                <span className="font-semibold">Kết quả chính xác</span>
                                        {/* <i className="fa-solid fa-circle-exclamation text-amber-500"></i>
                                        <span className="font-semibold">Chưa hoàn thành</span> */}
                                        {/* <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                <span className="font-semibold">Gặp vấn đề</span> */}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5 items-end ">
                                    <span className="text-xs opacity-50 font-medium">Thời gian</span>
                                    <span className="text-sm font-bold opacity-70">17s</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border rounded-lg overflow-hidden">
                            <div className="bg-zinc-100 dark:bg-zinc-900 p-3 px-5 flex items-center justify-between gap-4 border-b">
                                <p className="font-bold">
                                    Đánh giá chất lượng mã nguồn
                                    <span className="opacity-50 font-medium ml-2 text-sm">(Code Quality)</span>
                                    <Badge className="rounded px-1.5 ml-2 -translate-y-[1px]" variant="secondary">
                                        <span>C++</span>
                                    </Badge>
                                </p>
                                <Clock className="w-4 flex-none" />
                            </div>
                            <div className="flex flex-col gap-5 p-5">
                                <div className="flex items-center justify-between">
                                    <p className="flex items-baseline gap-3">
                                        <i className="fa-solid fa-circle-check text-primary"></i>
                                        <span className="text-sm font-medium opacity-60">Không có vấn đề trong mã nguồn</span>
                                    </p>
                                    <span className="text-sm font-medium opacity-70">2s</span>
                                </div>
                            </div>

                        </div>
                        <div className="mt-10">
                            <p className="text-sm">
                                <i className="fa-solid fa-circle-info mr-2 opacity-50"></i>
                                <span className="opacity-70">Được thực hiện bởi</span>
                                <Badge variant="secondary" className="rounded px-1.5 -translate-y-[2px] ml-2">
                                    <i className="fa-regular fa-circle-play mr-1"></i>GitHub Actions
                                </Badge>
                            </p>
                        </div>
                    </div>
                    <div className="sticky top-6 w-[270px] bg-zinc-100/80 dark:bg-zinc-900 border rounded-lg flex flex-col items-center p-5">
                        <span className="font-semibold">Kết quả chấm bài</span>
                        <RingProgress radius={90} stroke={12} progress={100} label="" textSize={28} />
                        <div className="w-full flex flex-col mt-3">
                            <div className="flex gap-2 justify-start items-center">
                                <span className="text-sm">Tổng thời gian chấm:</span>
                                <Badge variant="secondary" className="rounded px-1 text-xs">19s</Badge>
                            </div>
                            <Accordion type="multiple" className="flex flex-col gap-1 mb-6">
                                <AccordionItem value="item-1" className="border-0">
                                    <AccordionTrigger className="text-sm font-semibold border-b-[1px] border-zinc-600 pb-1 hover:no-underline">
                                        <span>Unit Test<i className="fa-solid fa-circle text-[5px] ml-2 text-green-600 dark:text-green-500 -translate-y-1"></i></span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col gap-3 pt-4">
                                            <div className="flex gap-3 justify-start items-center">
                                                <div className="flex items-center gap-2.5">
                                                    <i className="fa-solid fa-circle-check text-green-600"></i>
                                                    <span className="text-sm opacity-70">Số Test case đúng:</span>
                                                </div>
                                                <Badge variant="secondary" className="rounded px-2">4/4</Badge>
                                            </div>
                                            <div className="flex gap-3 justify-start items-center">
                                                <div className="flex items-center gap-2.5">
                                                    <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                                    <span className="text-sm opacity-70">Số Test case sai:</span>
                                                </div>
                                                <Badge variant="secondary" className="rounded px-2">0/4</Badge>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border-0">
                                    <AccordionTrigger className="text-sm font-semibold border-b-[1px] border-zinc-600 pb-1 hover:no-underline">
                                        <span>Chất lượng mã nguồn<i className="fa-solid fa-circle text-[5px] ml-2 text-green-600 dark:text-green-500 -translate-y-1"></i></span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col gap-3 pt-4">
                                            <div className="flex gap-3 justify-start items-center">
                                                <div className="flex items-center gap-2.5">
                                                    <i className="fa-solid fa-circle-check text-green-600"></i>
                                                    <span className="text-sm opacity-70">Không có vấn đề nào</span>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            {/* <Button size="sm" className="border gap-2 bg-amber-500 dark:bg-amber-600 hover:bg-amber-500">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <span className="font-semibold">Chưa hoàn thành</span>
                            </Button> */}
                            <Button size="sm" className="border gap-2">
                            <i className="fa-solid fa-circle-check"></i>
                            <span className="font-semibold">Đã hoàn thành</span>
                        </Button>
                            {/* <Button size="sm" className="border gap-2 bg-red-500 hover:bg-red-500">
                            <i className="fa-solid fa-circle-xmark"></i>
                            <span className="font-semibold">Gặp vấn đề</span>
                        </Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;