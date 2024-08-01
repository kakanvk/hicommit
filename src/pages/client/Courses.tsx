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

function Courses() {

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
            name: "Phân tích và thiết kế hệ thống công nghệ thông tin",
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
                                        <Badge className="px-1.5 min-w-[22px] flex justify-center ml-2">{courses.length}</Badge>
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
                            <div className="w-full grid grid-cols-3 2xl:grid-cols-4 gap-5 2xl:gap-6">
                                {
                                    courses.map(course => (
                                        <div key={course.id} className="flex flex-col border rounded-md flex-1 bg-secondary/30 dark:bg-secondary/10">
                                            <div className="bg-secondary dark:bg-secondary/50 w-full aspect-[3/2] relative">
                                                <Button variant="secondary" size="icon" className="absolute right-3 top-3">
                                                    <Star className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="flex flex-col p-4 justify-between flex-1 gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex gap-2 text-sm">
                                                        <span className="opacity-60 dark:font-light text-[13px]">
                                                            Được tạo bởi
                                                        </span>
                                                        <HoverCard openDelay={300}>
                                                            <HoverCardTrigger className="flex gap-2 group/avatar cursor-pointer">
                                                                <Avatar className="w-5 h-5 rounded-full">
                                                                    <AvatarImage src="https://avatars.githubusercontent.com/u/93561031?v=4" />
                                                                </Avatar>
                                                                <span className="font-semibold text-green-600 dark:text-green-500 group-hover/avatar:underline">kakanvk</span>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent className="w-70" side="bottom" align="start">
                                                                <div className="flex gap-4">
                                                                    <Avatar>
                                                                        <AvatarImage className="w-14 rounded-full" src="https://avatars.githubusercontent.com/u/93561031?v=4" />
                                                                    </Avatar>
                                                                    <div className="space-y-1">
                                                                        <h4 className="text-sm font-semibold text-green-600 dark:text-green-500">@kakanvk</h4>
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
                                                    <h1 className="font-bold text-lg line-clamp-2"><Badge className="mr-2 rounded text-[9px] px-[5px] py-[1px] -translate-y-[2px] font-bold leading-4">{course.code}</Badge>{course.name}</h1>
                                                    <p className="text-sm opacity-50 dark:font-light line-clamp-2">{course.description}</p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        <Badge variant="secondary" className="text-[12px] p-1 px-3">
                                                            <GitMerge className="w-3 h-3 mr-1.5" />
                                                            {course.labs} bài tập
                                                        </Badge>
                                                        <Badge variant="secondary" className="text-[11.5px] p-1 px-3">
                                                            <UsersRound className="h-3 w-3 mr-2" />{course.students}
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
                                    ))
                                }
                            </div>
                            <Pagination className="mt-10">
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
                            My courses
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Courses;