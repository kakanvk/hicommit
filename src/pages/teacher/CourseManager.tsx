import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Plus, RotateCcw, Search, UsersRound, X } from "lucide-react";
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
import { lastDayOfDecade } from "date-fns";
import { date } from "zod";
import { create } from "domain";

function CourseManager() {

    // Fake data
    const courses = [
        {
            id: 1,
            name: "Kỹ thuật lập trình",
            code: "DA21TTB",
            description: "Sau khi học khoá học này, sẽ có được các kỹ năng cần thiết để lập trình.",
            labs: 4,
            students: 34,
            createdAt: "20 ngày trước",
            completed: false,
        },
        {
            id: 2,
            name: "Lập trình hướng đối tượng",
            code: "DA22TTB",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            labs: 4,
            students: 34,
            createdAt: "25 ngày trước",
            completed: false,
        },
        {
            id: 3,
            name: "Công nghệ phần mềm",
            code: "DA23TTB",
            description: "Sau khi học khoá học này, sẽ có được các kỹ năng cần thiết để lập trình.",
            labs: 4,
            students: 34,
            createdAt: "30 ngày trước",
            completed: true,
        },
        {
            id: 4,
            name: "Hệ điều hành",
            code: "DA24TTB",
            description: "Sau khi học khoá học này, sẽ có được các kỹ năng cần thiết để lập trình.",
            labs: 4,
            students: 34,
            createdAt: "35 ngày trước",
            completed: false,
        },
        {
            id: 5,
            name: "Cấu trúc dữ liệu và giải thuật",
            code: "DA25TTB",
            description: "Sau khi học khoá học này, sẽ có được các kỹ năng cần thiết để lập trình.",
            labs: 4,
            students: 34,
            createdAt: "40 ngày trước",
            completed: true
        },
        {
            id: 6,
            name: "Lập trình web",
            code: "DA26TTB",
            description: "Sau khi học khoá học này, sẽ có được các kỹ năng cần thiết để lập trình.",
            labs: 4,
            students: 34,
            createdAt: "20 ngày trước",
            completed: false,
        },
        {
            id: 7,
            name: "Lập trình di động",
            code: "DA27TTB",
            description: "Sau khi học khoá học này, sẽ có được các kỹ năng cần thiết để lập trình.",
            labs: 4,
            students: 34,
            createdAt: "20 ngày trước",
            completed: true
        },
        {
            id: 8,
            name: "Lập trình game",
            code: "DA28TTB",
            description: "Sau khi học khoá học này, sẽ có được các kỹ năng cần thiết để lập trình.",
            labs: 4,
            students: 34,
            createdAt: "20 ngày trước",
            completed: true
        },
    ];

    return (
        <div className="CourseManager p-7">
            <div className="flex flex-col gap-5 items-start">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-fit pr-4" size="sm"><Plus className="w-4 mr-1.5 aspect-square" />Tạo khoá học mới</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div className="flex flex-col gap-5 w-full relative">
                    <div className="-mx-7 px-7 sticky top-0 z-10 bg-white/60 dark:bg-zinc-950/50 backdrop-blur-xl">
                        <div className="py-2.5 flex items-center justify-between gap-4 border-b">
                            <div className="flex gap-2 items-center">
                                <h2>Tất cả khoá học</h2>
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
                                <Badge className="px-1.5 min-w-[22px] flex justify-center">{courses.length}</Badge>
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
                        {
                            courses.map(course => (
                                <Link key={course.id} className="flex flex-col gap-5 rounded-lg dark:bg-zinc-900 bg-zinc-100 p-4 px-5 border" to={`${course.id}`}>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="font-semibold">{course.name}<Badge variant="default" className="rounded text-[9px] px-[5px] py-[1px] ml-2 -translate-y-[2px] font-bold">{course.code}</Badge></h2>
                                        <p className="opacity-70 dark:opacity-50 text-sm dark:font-light text-xs truncate">{course.description}</p>
                                        <div className="flex items-center justify-between mt-5">
                                            <div className="flex gap-2 items-center">
                                                <Badge variant="secondary" className="text-[11px] p-1 px-3">
                                                    {course.labs} LAB
                                                </Badge>
                                                <Badge variant="secondary" className="text-[11px] p-1 px-3">
                                                    <UsersRound className="h-3 w-3 mr-2" />{course.students}
                                                </Badge>
                                                {
                                                    course.completed &&
                                                    <Badge variant="secondary" className="text-[11px] p-1 px-3 bg-red-500/20 dark:bg-red-500/45 text-red-600 dark:text-white hover:bg-red-500/20">
                                                        Đã kết thúc
                                                    </Badge>
                                                }
                                            </div>
                                            <span className="text-[11px] opacity-60 font-light">Được tạo {course.createdAt}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseManager;