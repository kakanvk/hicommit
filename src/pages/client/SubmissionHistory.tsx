
import { Link, useParams } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, CircleDot, Code, RefreshCcw } from "lucide-react";
import { GitGraph, GitGraphBody, GitGraphFree, GitGraphHead, GitGraphNode } from "@/components/ui/git-graph";
import { Badge } from "@/components/ui/badge";

function SubmissionHistory() {

    const { problem_id } = useParams();

    return (
        <div className="SubmissionHistory p-6 px-8 pb-[90px] flex flex-col gap-8">
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
                            <Link to={`/course/${problem_id}`}>Kỹ thuật lập trình</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/problem/${problem_id}`}>Bài tập 1</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Lịch sử chấm bài
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <GitGraph>
                <GitGraphHead>
                    <p className="text-xl font-bold">
                        Lịch sử chấm bài:
                        <Link className="ml-1 hover:text-green-600 dark:hover:text-green-500 duration-300 w-fit" to={`/problem/${problem_id}`}>
                            In mảng 2 chiều dạng bảng
                            <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[20px]"></i>
                        </Link>
                    </p>
                </GitGraphHead>
                <GitGraphBody className="pl-4">
                    <GitGraphFree className="h-2"/>
                    <GitGraphNode>
                        <Link className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200/50 hover:dark:bg-zinc-800/70 p-3 px-5 rounded-lg duration-100" to="/submission/123">
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="font-semibold text-base">
                                    Commit lần 3
                                    <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[16px]"></i>
                                </p>
                                <div className="text-[14px] flex items-baseline gap-1.5 flex-wrap">
                                    <span className="opacity-70">Commit bởi</span>
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger>
                                            <strong className="font-semibold hover:underline cursor-pointer">kakanvk</strong>
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

                                    <span className="text-green-600 dark:text-green-500 text-[13px] font-medium ml-0.5">
                                        <i className="fa-solid fa-circle text-[3px] -translate-y-[3.5px] mr-2"></i>
                                        10 giây trước
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-1">
                                <span className="text-xs opacity-60">Thời gian</span>
                                <strong>40s</strong>
                            </div>
                        </Link>
                    </GitGraphNode>
                    <GitGraphNode>
                        <Link className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200/50 hover:dark:bg-zinc-800/70 p-3 px-5 rounded-lg duration-100" to="/submission/123">
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="font-semibold text-base">
                                    My Commit lần 3
                                    <i className="fa-solid fa-circle-exclamation text-amber-500 ml-2 text-[16px]"></i>
                                </p>
                                <div className="text-[14px] flex items-baseline gap-1.5 flex-wrap">
                                    <span className="opacity-70">Commit bởi</span>
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger>
                                            <strong className="font-semibold hover:underline cursor-pointer">kakanvk</strong>
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

                                    <span className="text-green-600 dark:text-green-500 text-[13px] font-medium ml-0.5">
                                        <i className="fa-solid fa-circle text-[3px] -translate-y-[3.5px] mr-2"></i>
                                        5 phút trước
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-1">
                                <span className="text-xs opacity-60">Thời gian</span>
                                <strong>35s</strong>
                            </div>
                        </Link>
                    </GitGraphNode>
                    <GitGraphNode>
                        <Link className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200/50 hover:dark:bg-zinc-800/70 p-3 px-5 rounded-lg duration-100" to="/submission/123">
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="font-semibold text-base">
                                    My Commit lần 2
                                    <i className="fa-solid fa-circle-exclamation text-amber-500 ml-2 text-[16px]"></i>
                                </p>
                                <div className="text-[14px] flex items-baseline gap-1.5 flex-wrap">
                                    <span className="opacity-70">Commit bởi</span>
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger>
                                            <strong className="font-semibold hover:underline cursor-pointer">kakanvk</strong>
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

                                    <span className="text-green-600 dark:text-green-500 text-[13px] font-medium ml-0.5">
                                        <i className="fa-solid fa-circle text-[3px] -translate-y-[3.5px] mr-2"></i>
                                        50 phút trước
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-1">
                                <span className="text-xs opacity-60">Thời gian</span>
                                <strong>35s</strong>
                            </div>
                        </Link>
                    </GitGraphNode>
                    <GitGraphNode end>
                        <Link className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200/50 hover:dark:bg-zinc-800/70 p-3 px-5 rounded-lg duration-100" to="/submission/123">
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="font-semibold text-base">
                                    Test
                                    <i className="fa-solid fa-circle-xmark text-red-500 ml-2 text-[16px]"></i>
                                </p>
                                <div className="text-[14px] flex items-baseline gap-1.5 flex-wrap">
                                    <span className="opacity-70">Commit bởi</span>
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger>
                                            <strong className="font-semibold hover:underline cursor-pointer">kakanvk</strong>
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

                                    <span className="text-green-600 dark:text-green-500 text-[13px] font-medium ml-0.5">
                                        <i className="fa-solid fa-circle text-[3px] -translate-y-[3.5px] mr-2"></i>
                                        12 giờ trước
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-1">
                                <span className="text-xs opacity-60">Thời gian</span>
                                <strong>18s</strong>
                            </div>
                        </Link>
                    </GitGraphNode>
                </GitGraphBody>
            </GitGraph>

            <div>
                <p className="text-sm pl-2">
                    <i className="fa-solid fa-circle-info mr-2 opacity-50"></i>
                    <span className="opacity-70">Được thực hiện bởi</span>
                    <Badge variant="secondary" className="rounded px-1.5 -translate-y-[2px] ml-2">
                        <i className="fa-regular fa-circle-play mr-1"></i>GitHub Actions
                    </Badge>
                </p>
            </div>
        </div >
    );
};

export default SubmissionHistory;