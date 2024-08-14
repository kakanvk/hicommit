import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, MoveRight, Plus, RotateCcw, Search, UsersRound, X } from "lucide-react";
import { Link } from "react-router-dom";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { getCreatedCourses } from "@/service/API/Course";
import { formatTimeAgo } from "@/service/DateTimeService";

function CourseManager() {

    const [createdCourses, setCreatedCourses] = useState<any[]>([]);

    const handleGetCreatedCourse = async () => {
        try {
            const response = await getCreatedCourses();
            setCreatedCourses(response);
            console.log(response);
        } catch (error) {
            console.error('Error getting post:', error);
        }
    };

    useEffect(() => {
        handleGetCreatedCourse();
    }, []);

    return (
        <div className="CourseManager p-7">
            <div className="flex flex-col gap-5 items-start">
                <Link to="create">
                    <Button className="w-fit pr-4" size="sm"><Plus className="w-4 mr-1.5 aspect-square" />Tạo khoá học mới</Button>
                </Link>
                <div className="flex flex-col gap-5 w-full relative">
                    <div className="-mx-7 px-7 sticky top-0 z-10 bg-white/60 dark:bg-zinc-950/50 backdrop-blur-xl">
                        <div className="py-2.5 flex items-center justify-between gap-4 border-b">
                            <div className="flex gap-2 items-center">
                                <h2 className="font-semibold text-lg">Tất cả khoá học</h2>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="text-[11px] p-1 px-1.5 pl-2.5">
                                        DA20TTB
                                        <X className="w-4 h-4 ml-3 hover:bg-zinc-700 rounded-full p-[1px] duration-100 cursor-pointer" />
                                    </Badge>
                                    <Badge variant="secondary" className="text-[11px] p-1 px-1.5 pl-2.5">
                                        C++
                                        <X className="w-4 h-4 ml-3 hover:bg-zinc-700 rounded-full p-[1px] duration-100 cursor-pointer" />
                                    </Badge>
                                </div>
                                <Badge className="px-1.5 min-w-[22px] flex justify-center">{createdCourses.length}</Badge>
                                <TooltipProvider delayDuration={200}>
                                    <Tooltip>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                                        <Filter className="w-4 aspect-square" />
                                                    </Button>
                                                </TooltipTrigger>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[350px] flex flex-col gap-6">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Tuỳ chỉnh lọc
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription className="flex flex-col gap-4">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span>Ngôn ngữ lập trình</span>
                                                        <Select defaultValue="all">
                                                            <SelectTrigger className="bg-secondary" >
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="all">Tất cả</SelectItem>
                                                                <SelectItem value="DA20TTB">C</SelectItem>
                                                                <SelectItem value="DA21TTB">C++</SelectItem>
                                                                <SelectItem value="DA21TTB">Java</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="flex flex-col gap-1.5">
                                                        <span>Lớp học</span>
                                                        <Select defaultValue="all">
                                                            <SelectTrigger className="bg-secondary">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="all">Tất cả</SelectItem>
                                                                <SelectItem value="DA20TTB">DA20TTB</SelectItem>
                                                                <SelectItem value="DA21TTB">DA21TTB</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="flex flex-col gap-1.5">
                                                        <span>Trạng thái khoá học</span>
                                                        <Select defaultValue="all">
                                                            <SelectTrigger className="bg-secondary">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="all">Tất cả</SelectItem>
                                                                <SelectItem value="DA20TTB">Chưa kết thúc</SelectItem>
                                                                <SelectItem value="DA21TTB">Đã kết thúc</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </DialogDescription>
                                                <DialogFooter className="mt-3">
                                                    <div className="flex gap-2.5">
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="secondary">
                                                                Đóng
                                                            </Button>
                                                        </DialogClose>
                                                        <Button>Lọc</Button>
                                                    </div>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <TooltipContent>
                                            Lọc
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="relative max-w-[400px] flex-1">
                                <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Tìm kiếm khoá học"
                                    className="w-full rounded-md pl-9 flex-1 bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {
                        createdCourses.length > 0 ?
                            <div className="grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 gap-4 w-full">
                                {
                                    createdCourses.map(course => (
                                        <Link key={course?.id} className="flex rounded-lg gap-4 dark:bg-zinc-900 bg-zinc-100 p-4 px-5 border" to={`${course?.id}`}>
                                            <div className="h-[120px] aspect-[3/2] border rounded-md bg-secondary/50 overflow-hidden">
                                                <img src={course?.thumbnail} />
                                            </div>
                                            <div className="flex flex-col gap-2 flex-1 h-full justify-between pb-1">
                                                <div className="flex flex-col gap-2 flex-1">
                                                    <h2 className="font-semibold line-clamp-2">
                                                        {
                                                            course.class_name &&
                                                            <Badge variant="default" className="rounded text-[9px] px-[5px] py-[1px] mr-2 -translate-y-[2px] font-bold">{course?.class_name}</Badge>
                                                        }
                                                        {course?.name}
                                                    </h2>
                                                    <p className="opacity-70 dark:opacity-50 text-sm dark:font-light text-xs line-clamp-2">{course?.description}</p>
                                                </div>
                                                <div className="w-full flex items-end justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <Badge variant="secondary" className="text-[11px] p-1 px-3">
                                                            {course?.problem_count} bài tập
                                                        </Badge>
                                                        <Badge variant="secondary" className="text-[11px] p-1 px-3">
                                                            <UsersRound className="h-3 w-3 mr-2" />{course?.members?.length || 123}
                                                        </Badge>
                                                        {
                                                            course?.completed &&
                                                            <Badge variant="secondary" className="text-[11px] p-1 px-3 bg-red-500/20 dark:bg-red-500/45 text-red-600 dark:text-white hover:bg-red-500/20">
                                                                Đã kết thúc
                                                            </Badge>
                                                        }
                                                    </div>
                                                    <span className="text-[11px] opacity-60 font-light">Được tạo {formatTimeAgo(course?.createdAt, "vi")}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            :
                            <div className="flex flex-col items-center justify-center w-full mt-4">
                                <span className="">
                                    Bạn chưa tạo khoá học nào. <Link to="create" className="text-green-500 font-bold">
                                        Tạo ngay<MoveRight className="w-5 h-5 inline ml-2" />
                                    </Link>
                                </span>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseManager;