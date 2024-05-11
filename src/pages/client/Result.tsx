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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CornerDownRight } from "lucide-react";

function Result() {

    const { course_id, work_id, submit_id } = useParams();

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
                            <Link to={`/course/${course_id}`}>Kỹ thuật lập trình</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/course/${course_id}/${work_id}`}>Bài tập {work_id}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/course/${course_id}/${work_id}/submit`}>Nộp bài</Link>
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

            <div className="flex gap-8 items-start relative">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex gap-4 justify-between border-b-[1.5px] pb-5">
                        <div className="flex-1 flex flex-col gap-3">
                            <p className="text-xl font-bold">
                                Kết quả nộp bài:
                                <Link className="ml-1 hover:text-green-600 dark:hover:text-green-500 duration-300 w-fit" to={`/course/${course_id}/${work_id}`}>
                                    Bài tập {work_id}: In mảng 2 chiều dạng bảng [#{submit_id}]
                                    <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[20px]"></i>
                                    
                                </Link>
                            </p>
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
                </div>
            </div>
        </div>
    );
};

export default Result;