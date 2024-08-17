import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlignLeft, BarChartBig, Braces, CalendarDays, EllipsisVertical, Filter, GitMerge, History, LayoutList, ListCollapse, Search, Star, UsersRound, X } from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getCourses, getJoinedCourses } from "@/service/API/Course";
import { Link } from "react-router-dom";
import { toggleFavouriteCourse } from "@/service/API/User";
import toast from "react-hot-toast";
import { useLogin } from "@/service/LoginContext";
import ReactHtmlParser from "react-html-parser";
import BlurFade from "@/components/magicui/blur-fade";

function transform(node: any) {
    if (node.name === 'figure' || node.name === 'table') {
        return null;
    }
}

function Courses() {

    const [courses, setCourses] = useState<any[]>([]);
    const [joinedCourses, setJoinedCourses] = useState<any[]>([]);

    const loginContext = useLogin();

    const handleGetCreatedCourse = async () => {
        try {
            const response = await getCourses();
            setCourses(response);
            console.log(response);
        } catch (error) {
            console.error('Error getting post:', error);
        }
    };

    const handleGetJoinedCourse = async () => {
        try {
            const response = await getJoinedCourses();
            setJoinedCourses(response);
            console.log(response);
        } catch (error) {
            console.error('Error getting post:', error);
        }
    }

    const handleAddFavouriteCourse = async (e: any, courseId: string) => {
        e.preventDefault();
        try {
            const response = await toast.promise(
                toggleFavouriteCourse(courseId),
                {
                    loading: 'Đang lưu...',
                    success: 'Cập nhật thành công',
                    error: 'Cập nhật thất bại'
                },
                {
                    style: {
                        borderRadius: '8px',
                        background: '#222',
                        color: '#fff',
                        paddingLeft: '15px',
                        fontFamily: 'Plus Jakarta Sans',
                    }
                });
            loginContext.setUser({
                ...loginContext.user,
                favourite_course: response.favourite_course
            });
        } catch (error) {
            console.error('Error adding favourite course:', error);
        }
    }

    useEffect(() => {
        handleGetCreatedCourse();
        handleGetJoinedCourse();
    }, []);

    return (
        <div className="Courses p-6 px-8 w-full pt-0">
            <div className="w-full">
                <Tabs defaultValue="all-courses" className="w-full">
                    <div className="relative w-full flex flex-col gap-5">
                        <div className="-mx-8 px-0 sticky top-0 z-10 bg-background dark:bg-zinc-950">
                            <TabsList className="bg-transparent justify-between rounded-none py-0 px-0 pr-2 border-b-[2px] border-secondary/40 w-full h-fit">
                                <div className="flex items-center">
                                    <TabsTrigger
                                        value="all-courses"
                                        className="translate-y-0.5 p-3 px-5 data-[state=active]:bg-transparent data-[state=active]:bg-gradient-to-t data-[state=active]:from-green-500/30 data-[state=active]:to-primary/0 data-[state=active]:to-120% border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                                    >
                                        <span className="text-base">
                                            Tất cả khoá học
                                        </span>
                                        <Badge className="px-1.5 min-w-[22px] flex justify-center ml-2">{courses.length}</Badge>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="my-courses"
                                        className="translate-y-0.5 p-3 px-5 data-[state=active]:bg-transparent data-[state=active]:bg-gradient-to-t data-[state=active]:from-green-500/30 data-[state=active]:to-primary/0 data-[state=active]:to-120% border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none bg-transparent duration-500"
                                    >
                                        <span className="text-base">
                                            Đã tham gia
                                        </span>
                                        <Badge className="px-1.5 min-w-[22px] flex justify-center ml-2">{joinedCourses.length}</Badge>
                                    </TabsTrigger>
                                    <div className="flex gap-2 ml-3">
                                        <Badge variant="secondary" className="text-[11px] p-1 px-1.5 pl-2.5 bg-secondary/80">
                                            DA20TTB
                                            <X className="w-4 h-4 ml-3 hover:bg-zinc-700 rounded-full p-[1px] duration-100 cursor-pointer" />
                                        </Badge>
                                        <Badge variant="secondary" className="text-[11px] p-1 px-1.5 pl-2.5 bg-secondary/80">
                                            C++
                                            <X className="w-4 h-4 ml-3 hover:bg-zinc-700 rounded-full p-[1px] duration-100 cursor-pointer" />
                                        </Badge>
                                    </div>
                                    <TooltipProvider delayDuration={200}>
                                        <Tooltip>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="w-8 h-8 ml-3">
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
                                <div className="flex-1 flex justify-end gap-2">
                                    <div className="relative max-w-[400px] flex-1">
                                        <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Tìm kiếm khoá học"
                                            className="w-full rounded-md pl-9 flex-1 bg-transparent"
                                        />
                                    </div>
                                    <Button variant="outline" size="icon">
                                        <EllipsisVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TabsList>
                        </div>
                        <TabsContent value="all-courses">
                            <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-5 2xl:gap-6">
                                {
                                    courses.map((course, index) => (
                                        <BlurFade key={course?.id} delay={0.15 * index} yOffset={0}>
                                            <div className="flex flex-col border rounded-md flex-1 bg-secondary/30 dark:bg-secondary/10 overflow-hidden">
                                                <Link className="bg-secondary dark:bg-secondary/50 w-full aspect-[3/2] relative" to={`/course/${course.slug || course.id}`}>
                                                    <img src={course?.thumbnail} />
                                                    <Button variant={`${loginContext.user.favourite_course.includes(course.id) ? 'default' : 'secondary'}`} size="icon" className="absolute right-3 top-3 active:scale-90" onClick={(e) => handleAddFavouriteCourse(e, course.id)}>
                                                        <Star className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <div className="flex flex-col p-4 justify-between flex-1 gap-2">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex gap-2 text-sm">
                                                            <span className="opacity-60 dark:font-light text-[13px]">
                                                                Được tạo bởi
                                                            </span>
                                                            <HoverCard openDelay={300}>
                                                                <HoverCardTrigger className="flex gap-2 group/avatar cursor-pointer">
                                                                    <Avatar className="w-5 h-5 rounded-full">
                                                                        <AvatarImage src={course?.author.avatar_url} />
                                                                    </Avatar>
                                                                    <span className="font-semibold text-green-600 dark:text-green-500 group-hover/avatar:underline">
                                                                        {course?.author.username}
                                                                        {(course?.author.role === "ADMIN" || course?.author.role === "TEACHER") && <i className="fa-solid fa-circle-check text-[10px] text-primary ml-1 -translate-y-[1px]"></i>}
                                                                    </span>
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className="w-70" side="bottom" align="start">
                                                                    <div className="flex gap-4">
                                                                        <Avatar>
                                                                            <AvatarImage className="w-14 rounded-full" src={course?.author.avatar_url} />
                                                                        </Avatar>
                                                                        <div className="space-y-1">
                                                                            <h4 className="text-sm font-semibold text-green-600 dark:text-green-500">
                                                                                @{course?.author.username}
                                                                                {(course?.author.role === "ADMIN" || course?.author.role === "TEACHER") && <i className="fa-solid fa-circle-check text-[10px] text-primary ml-1 -translate-y-[1px]"></i>}
                                                                            </h4>
                                                                            <p className="text-sm">
                                                                                Khoa Kỹ thuật & Công nghệ
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
                                                        </div>
                                                        <Link className="font-bold text-lg line-clamp-2" to={`/course/${course.slug || course.id}`}>
                                                            {
                                                                course.class_name &&
                                                                <Badge className="mr-2 rounded text-[9px] px-[5px] py-[1px] -translate-y-[2px] font-bold leading-4">
                                                                    {course?.class_name}
                                                                </Badge>
                                                            }
                                                            {course?.name}
                                                        </Link>
                                                        <p className="text-sm opacity-50 dark:font-light line-clamp-2">
                                                            {ReactHtmlParser(course?.description, { transform })}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            <Badge variant="secondary" className="text-[12px] p-1 px-3">
                                                                <GitMerge className="w-3 h-3 mr-1.5" />
                                                                {course?.problem_count} bài tập
                                                            </Badge>
                                                            <Badge variant="secondary" className="text-[11.5px] p-1 px-3">
                                                                <UsersRound className="h-3 w-3 mr-2" />{course?.members?.length || 123}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 flex gap-2">
                                                        <Button className="flex-1">
                                                            Tham gia
                                                        </Button>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <Button size="icon" variant="secondary">
                                                                    <EllipsisVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent side="top" align="end" className="w-[160px] dark:bg-zinc-900">
                                                                <DropdownMenuLabel>Tuỳ chọn</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <Braces className="mr-2 w-4 h-4" />Xem chi tiết
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Star className="mr-2 w-4 h-4" />Đánh dấu
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>

                                                    </div>
                                                </div>
                                            </div>
                                        </BlurFade>
                                    ))
                                }
                            </div>
                            <Pagination className="mt-20">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </TabsContent>
                        <TabsContent value="my-courses">
                            {
                                joinedCourses.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-[500px]">
                                        <LayoutList className="w-20 h-20 opacity-30" />
                                        <h3 className="text-lg font-semibold mt-4">
                                            Bạn chưa tham gia khoá học nào
                                        </h3>
                                        <p className="text-sm opacity-60 mt-2">
                                            Hãy tham gia khoá học để bắt đầu học tập
                                        </p>
                                    </div>
                                ) : <>
                                    <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-5 2xl:gap-6">
                                        {
                                            joinedCourses.map((course, index) => (
                                                <BlurFade key={course?.id} delay={0.15 * index} yOffset={0}>
                                                    <div key={course?.id} className="flex flex-col border rounded-md flex-1 bg-secondary/30 dark:bg-secondary/10 overflow-hidden">
                                                        <Link className="bg-secondary dark:bg-secondary/50 w-full aspect-[3/2] relative" to={`/course/${course.slug || course.id}`}>
                                                            <img src={course?.thumbnail} />
                                                            <Button variant={`${loginContext.user.favourite_course.includes(course.id) ? 'default' : 'secondary'}`} size="icon" className="absolute right-3 top-3 active:scale-90" onClick={(e) => handleAddFavouriteCourse(e, course.id)}>
                                                                <Star className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <div className="flex flex-col p-4 justify-between flex-1 gap-2">
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex gap-2 text-sm">
                                                                    <span className="opacity-60 dark:font-light text-[13px]">
                                                                        Được tạo bởi
                                                                    </span>
                                                                    <HoverCard openDelay={300}>
                                                                        <HoverCardTrigger className="flex gap-2 group/avatar cursor-pointer">
                                                                            <Avatar className="w-5 h-5 rounded-full">
                                                                                <AvatarImage src={course?.author.avatar_url} />
                                                                            </Avatar>
                                                                            <span className="font-semibold text-green-600 dark:text-green-500 group-hover/avatar:underline">
                                                                                {course?.author.username}
                                                                                {(course?.author.role === "ADMIN" || course?.author.role === "TEACHER") && <i className="fa-solid fa-circle-check text-[10px] text-primary ml-1 -translate-y-[1px]"></i>}
                                                                            </span>
                                                                        </HoverCardTrigger>
                                                                        <HoverCardContent className="w-70" side="bottom" align="start">
                                                                            <div className="flex gap-4">
                                                                                <Avatar>
                                                                                    <AvatarImage className="w-14 rounded-full" src={course?.author.avatar_url} />
                                                                                </Avatar>
                                                                                <div className="space-y-1">
                                                                                    <h4 className="text-sm font-semibold text-green-600 dark:text-green-500">
                                                                                        @{course?.author.username}
                                                                                        {(course?.author.role === "ADMIN" || course?.author.role === "TEACHER") && <i className="fa-solid fa-circle-check text-[10px] text-primary ml-1 -translate-y-[1px]"></i>}
                                                                                    </h4>
                                                                                    <p className="text-sm">
                                                                                        Khoa Kỹ thuật & Công nghệ
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
                                                                </div>
                                                                <Link className="font-bold text-lg line-clamp-2" to={`/course/${course.slug || course.id}`}>
                                                                    {
                                                                        course.class_name &&
                                                                        <Badge className="mr-2 rounded text-[9px] px-[5px] py-[1px] -translate-y-[2px] font-bold leading-4">
                                                                            {course?.class_name}
                                                                        </Badge>
                                                                    }
                                                                    {course?.name}
                                                                </Link>
                                                                <p className="text-sm opacity-50 dark:font-light line-clamp-2">{ReactHtmlParser(course?.description, { transform })}</p>
                                                                <div className="flex flex-wrap gap-2 mt-3">
                                                                    <Badge variant="secondary" className="text-[12px] p-1 px-3">
                                                                        <GitMerge className="w-3 h-3 mr-1.5" />
                                                                        {course?.problem_count} bài tập
                                                                    </Badge>
                                                                    <Badge variant="secondary" className="text-[11.5px] p-1 px-3">
                                                                        <UsersRound className="h-3 w-3 mr-2" />{course?.students || 123}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                            <div className="mt-5 flex gap-2">
                                                                <Button className="flex-1" variant='secondary'>
                                                                    Tiếp tục khoá học
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </BlurFade>
                                            ))
                                        }
                                    </div>
                                    <Pagination className="mt-20">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious href="#" />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">1</PaginationLink>
                                                <PaginationLink href="#">2</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext href="#" />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </>
                            }
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Courses;