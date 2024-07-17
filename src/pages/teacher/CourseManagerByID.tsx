import { Link, useParams } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Badge } from "@/components/ui/badge"
import RingProgress from "@/components/ui/ringProcess";
import { CornerDownRight, CalendarDays, UsersRound, GitMerge, TrendingUp, Copy, ChevronRight, MessageCircle, Share2, GripVertical, AreaChartIcon, PieChart, Info, KeyRound, EllipsisVertical, Settings, ScanEye, Gem, Users, Key, Plus } from 'lucide-react';
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 700 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

function CourseManagerByID() {

    const { course_id } = useParams();

    const [isPublicCourse, setIsPublicCourse] = useState(true);
    const [enrolKey, setEnrolKey] = useState("DA20TTB");

    const handleChangePublicCourse = () => {
        setIsPublicCourse(!isPublicCourse);
    }

    const handleOnDrag = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className="Course p-6 px-8 flex flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/course-manager">Quản lý khoá học</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        Kỹ thuật lập trình
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-8 items-start relative">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold">Kỹ thuật lập trình<Badge variant="default" className="rounded ml-2 -translate-y-1.5">DA20TTB</Badge></h1>
                                <div className="flex gap-2 items-center text-sm">
                                    <span className="opacity-70 flex items-center gap-2"><CornerDownRight className="w-3" />Được tạo bởi</span>
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger>
                                            <Badge className="gap-1.5 p-1 pr-2 hover:bg-secondary cursor-pointer" variant="outline">
                                                <Avatar>
                                                    <AvatarImage className="w-5 aspect-square rounded-full border" src="https://avatars.githubusercontent.com/u/17537969?s=80&v=4" />
                                                </Avatar>
                                                <span className="font-semibold text-[13px] -translate-y-[1px]">baoanth</span>
                                            </Badge>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-70" side="bottom" align="start">
                                            <div className="flex gap-4">
                                                <Avatar>
                                                    <AvatarImage className="w-14 rounded-full" src="https://avatars.githubusercontent.com/u/17537969?s=80&v=4" />
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold text-green-600 dark:text-green-500">@baoanth</h4>
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
                                    <span className="opacity-70 flex items-center gap-2"><i className="fa-solid fa-circle text-[3px]"></i>5 tháng trước</span>
                                    <Dialog>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <DialogTrigger>
                                                        <Badge className="text-green-600 dark:text-green-500 flex gap-1.5 border-primary px-2 py-0 rounded-md hover:bg-secondary cursor-pointer ml-2" variant="outline">
                                                            <UsersRound className="w-3.5" />
                                                            <span>34</span>
                                                        </Badge>
                                                    </DialogTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom">
                                                    Đã tham gia
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <DialogContent>
                                            <DialogHeader className="mb-3">
                                                <DialogTitle className="mb-2 flex items-center">
                                                    Danh sách tham gia
                                                    <Badge className="w-fit text-green-600 dark:text-green-500 flex gap-1.5 border-primary px-1.5 py-0 rounded-sm ml-2 translate-y-[1px]" variant="outline">
                                                        <span>34</span>
                                                    </Badge>
                                                </DialogTitle>
                                                <DialogDescription>
                                                    <Command className="bg-transparent">
                                                        <CommandInput placeholder="Tìm kiếm..." />
                                                        <CommandList className="mt-2">
                                                            <CommandEmpty>Không có kết quả phù hợp.</CommandEmpty>
                                                            <CommandItem className="gap-2.5 p-2.5 px-3 mb-1">
                                                                <Avatar>
                                                                    <AvatarImage className="w-6 rounded-full" src="https://avatars.githubusercontent.com/u/17537969?s=80&v=4" />
                                                                </Avatar>
                                                                baoanth
                                                            </CommandItem>
                                                            <CommandItem className="gap-2.5 p-2.5 px-3 mb-1">
                                                                <Avatar>
                                                                    <AvatarImage className="w-6 rounded-full" src="https://avatars.githubusercontent.com/u/93561031?v=4" />
                                                                </Avatar>
                                                                kakanvk
                                                            </CommandItem>
                                                            <CommandItem className="gap-2.5 p-2.5 px-3 mb-1">
                                                                <Avatar>
                                                                    <AvatarImage className="w-6 rounded-full" src="https://avatars.githubusercontent.com/u/112191296?v=4" />
                                                                </Avatar>
                                                                vhiep
                                                            </CommandItem>
                                                            <CommandItem className="gap-2.5 p-2.5 px-3 mb-1">
                                                                <Avatar>
                                                                    <AvatarImage className="w-6 rounded-full" src="https://avatars.githubusercontent.com/u/93963527?v=4" />
                                                                </Avatar>
                                                                nguyenducmanh
                                                            </CommandItem>
                                                            <CommandItem className="gap-2.5 p-2.5 px-3 mb-1">
                                                                <Avatar>
                                                                    <AvatarImage className="w-6 rounded-full" src="https://avatars.githubusercontent.com/u/94955437?v=4" />
                                                                </Avatar>
                                                                lntaivn
                                                            </CommandItem>
                                                            <CommandItem className="gap-2.5 p-2.5 px-3 mb-1">
                                                                <Avatar>
                                                                    <AvatarImage className="w-6 rounded-full" src="https://avatars.githubusercontent.com/u/116266818?v=4" />
                                                                </Avatar>
                                                                thaihunghung
                                                            </CommandItem>
                                                            <CommandItem className="gap-2.5 p-2.5 px-3 mb-1">
                                                                <Avatar>
                                                                    <AvatarImage className="w-6 rounded-full" src="https://avatars.githubusercontent.com/u/92458482?v=4" />
                                                                </Avatar>
                                                                nnsang1309
                                                            </CommandItem>
                                                        </CommandList>
                                                    </Command>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="secondary" size="sm">Đóng</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button size="icon" variant="outline"><Settings className="w-[1.2rem] h-[1.2rem]" /></Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom">
                                                    Các cài đặt
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[50%] ">
                                        <DialogHeader>
                                            <DialogTitle>Cài đặt</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-1">
                                            <Tabs defaultValue="general" className="w-full flex gap-8" orientation="vertical">
                                                <TabsList className="flex flex-col h-fit bg-tranparent gap-2 p-0">
                                                    <TabsTrigger value="general" className="pr-6 data-[state=active]:bg-secondary w-full justify-start">
                                                        <Settings className="w-4 h-4 mr-2" />Chung
                                                    </TabsTrigger>
                                                    <TabsTrigger value="access" className="pr-6 data-[state=active]:bg-secondary w-full justify-start">
                                                        <ScanEye className="w-4 h-4 mr-2" />Quyền truy cập
                                                    </TabsTrigger>
                                                    <TabsTrigger value="advance" className="pr-6 data-[state=active]:bg-secondary w-full justify-start">
                                                        <Gem className="w-4 h-4 mr-2" />Nâng cao
                                                    </TabsTrigger>
                                                    <TabsTrigger value="member" className="pr-6 data-[state=active]:bg-secondary w-full justify-start">
                                                        <Users className="w-4 h-4 mr-2" />Thành viên
                                                    </TabsTrigger>
                                                </TabsList>
                                                <div className="py-1 flex-1">
                                                    <TabsContent value="general" className="mt-0  min-h-[400px]">Make changes to your account here.</TabsContent>
                                                    <TabsContent value="access" className="mt-0 min-h-[400px]">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex justify-between gap-5 items-center">
                                                                <Label className="flex-1 flex flex-col gap-1 cursor-pointer" htmlFor="public-course-switch">
                                                                    <h3>Hạn chế truy cập</h3>
                                                                    <p className="text-sm opacity-50 font-medium">Yêu cầu người dùng nhập mật khẩu khi đăng ký tham gia khoá học này.</p>
                                                                </Label>
                                                                <Switch defaultChecked={isPublicCourse} onCheckedChange={handleChangePublicCourse} id="public-course-switch" />
                                                            </div>
                                                            {
                                                                isPublicCourse &&
                                                                <>
                                                                    <div className="relative">
                                                                        <KeyRound className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground ml-1" />
                                                                        <Input
                                                                            type="search"
                                                                            placeholder="Đặt mật khẩu tham gia"
                                                                            className="w-full pl-11"
                                                                            value={enrolKey}
                                                                            onChange={e => setEnrolKey(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    {
                                                                        enrolKey.length > 0 &&
                                                                        <Button className="w-fit px-4" size="sm">Cập nhật</Button>
                                                                    }
                                                                </>
                                                            }
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="advance" className="mt-0 min-h-[400px]">
                                                        Advance Setting here
                                                    </TabsContent>
                                                    <TabsContent value="member" className="mt-0 min-h-[400px]">
                                                        Member Setting here
                                                    </TabsContent>
                                                </div>
                                            </Tabs>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <Separator />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-green-600 dark:text-green-500">Mô tả khoá học:</span>
                        <p className="opacity-90 text-justify">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <h2 className="font-semibold text-lg">
                                <GitMerge className="inline-block w-5 mr-2 text-green-600 dark:text-green-500 -translate-y-[1px]" />Lab 1: Nhập môn
                            </h2>
                            <div className="flex flex-col gap-1">
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link to="problem/create">
                                    <Button className="w-fit px-3.5 pr-4 text-base font-medium hover:bg-primary/10 text-primary hover:text-primary" variant="ghost" size="lg"><Plus className="w-5 mr-1.5 h-5" />Thêm bài tập</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-semibold text-lg">
                                <GitMerge className="inline-block w-5 mr-2 text-green-600 dark:text-green-500 -translate-y-[1px]" />Lab 2: Nhập môn
                            </span>
                            <div className="flex flex-col gap-1">
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                    <h3 className="flex items-start gap-3 flex-1">
                                        <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" onClick={e => handleOnDrag(e)} />
                                        <span className="flex-1">Bài tập 5: Ước số</span>
                                    </h3>
                                    <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                </Link>
                                <Link to="problem/create">
                                    <Button className="w-fit px-3.5 pr-4 text-base font-medium hover:bg-primary/10 text-primary hover:text-primary" variant="ghost" size="lg"><Plus className="w-5 mr-1.5 h-5" />Thêm bài tập</Button>
                                </Link>
                            </div>
                        </div>
                        <Link to="lab/create">
                            <Button className="w-fit px-3.5 pr-4 text-base font-medium hover:bg-primary/10 text-primary hover:text-primary" variant="ghost" size="lg"><Plus className="w-5 mr-1.5 h-5" />Thêm bài Lab mới</Button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/4 min-w-[300px] max-w-[600px] sticky top-6 bg-zinc-100/80 dark:bg-zinc-900 border rounded-lg flex flex-col items-center p-3.5 px-1 2xl:p-5  2xl:px-3">
                    <h3>Thống kê khoá học</h3>
                    <ChartContainer config={chartConfig} className="w-full">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                            />
                        </AreaChart>
                    </ChartContainer>
                    <span className="mt-2.5 text-xs 2xl:text-sm dark:font-light opacity-60"><Info className="w-3 h-3 mr-2 2xl:w-3.5 2xl:h-3.5 inline -translate-y-[1px]" />Mức độ hoàn thành bài tập theo thời gian</span>
                </div>
            </div>
        </div>
    );
};

export default CourseManagerByID;