import { Link, useParams } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Badge } from "@/components/ui/badge"
import RingProgress from "@/components/ui/ringProcess";
import { CornerDownRight, CalendarDays, UsersRound, GitMerge, Copy, ChevronRight, MessageCircle, Share2, History } from 'lucide-react';
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator"

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
import { useEffect, useState } from "react";
import { getCourseById, joinToCourse } from "@/service/API/Course";
import { formatTimeAgo } from "@/service/DateTimeService";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/service/LoginContext";
import { toggleFavouriteCourse } from "@/service/API/User";
import toast from "react-hot-toast";

function Course() {

    const { course_id } = useParams();
    const [courseData, setCourseData] = useState<any>({});
    const [inputKey, setInputKey] = useState<string>("");

    const loginContext = useLogin();

    const handleGetCourseData = async () => {
        try {
            const response = await getCourseById(course_id as string);
            setCourseData(response);
            console.log(response);
        } catch (error) {
            console.error('Error getting post:', error);
        }
    };

    const handleJoinCourse = async () => {
        try {
            const response = await toast.promise(
                joinToCourse(courseData.id as string, inputKey as string),
                {
                    loading: 'Đang kiểm tra...',
                    success: 'Tham gia khoá học thành công!',
                    error: 'Mã tham gia không chính xác!'
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
            // Đợi 1s và reload trang
            setTimeout(() => {
                window.location.reload();
            }, 500);
            
        } catch (error) {
            console.error('Error joining course:', error);
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
        handleGetCourseData();
    }, []);

    return (
        <div className="Course p-6 px-8 flex flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/courses">Các khoá học</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="">
                            {courseData?.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-8 items-start relative mb-4">
                <div className="flex-1 flex flex-col gap-8 mb-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold">
                                    <span className="mr-2">{courseData?.name}</span>
                                    {
                                        courseData.class_name &&
                                        <Badge variant="default" className="rounded px-1.5 -translate-y-1">{courseData?.class_name}</Badge>
                                    }
                                </h1>
                                <div className="flex gap-2 items-center text-sm">
                                    <span className="opacity-70 flex items-center gap-2"><CornerDownRight className="w-3" />Được tạo bởi</span>
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger>
                                            <Badge className="gap-1.5 p-1 pr-2 hover:bg-secondary cursor-pointer" variant="outline">
                                                <Avatar>
                                                    <AvatarImage className="w-5 aspect-square rounded-full border" src={courseData?.author?.avatar_url} />
                                                </Avatar>
                                                <span className="font-semibold text-[13px] -translate-y-[1px]">{courseData?.author?.username}</span>
                                            </Badge>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-70" side="bottom" align="start">
                                            <div className="flex gap-4">
                                                <Avatar>
                                                    <AvatarImage className="w-14 rounded-full" src={courseData?.author?.avatar_url} />
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold text-green-600 dark:text-green-500">
                                                        @{courseData?.author?.username}
                                                        {(courseData?.author?.role === "ADMIN" || courseData?.author?.role === "TEACHER") && <i className="fa-solid fa-circle-check text-[10px] text-primary ml-1 -translate-y-[1px]"></i>}
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
                                    <span className="opacity-70 flex items-center gap-2">
                                        <i className="fa-solid fa-circle text-[3px]"></i>
                                        {formatTimeAgo(courseData?.createdAt, "vi")}
                                    </span>
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
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon" variant="outline"><MessageCircle className="w-4" /></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            Mở đoạn chat
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon" variant="outline"><Share2 className="w-4" /></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            Chia sẻ khoá học
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant={`${loginContext.user.favourite_course.includes(courseData?.id) ? 'default' : 'outline'}`} size="icon" onClick={(e) => handleAddFavouriteCourse(e, courseData?.id)}>
                                                <i className="fa-regular fa-star"></i>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            Đánh dấu khoá học này
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <Separator />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-green-600 dark:text-green-500">Mô tả khoá học:</span>
                        <p className="opacity-90 text-justify">{courseData?.description}</p>
                    </div>

                    <div className="">
                        <Accordion type="multiple">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="hover:no-underline">
                                    <span className="flex items-center font-semibold text-lg">
                                        <GitMerge className="w-5 mr-2 text-green-600 dark:text-green-500" />Lab 1: Nhập môn
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-base flex flex-col gap-1.5">
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-check text-green-600"></i>
                                            <span>Bài tập 1: Ước số</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="/problem/2">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-check text-green-600"></i>
                                            <span>Bài tập 2: Cộng 2 số nguyên</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="/problem/3">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                            <span>Bài tập 3: Vòng lặp For</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="hover:no-underline">
                                    <span className="flex items-center font-semibold text-lg">
                                        <GitMerge className="w-5 mr-2 text-green-600 dark:text-green-500" />Lab 2: Giới thiệu ngôn ngữ C++
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-base flex flex-col gap-1.5">
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-exclamation text-amber-500"></i>
                                            <span>Bài tập 4: Hello World</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-check text-green-600"></i>
                                            <span>Bài tập 5: Cộng 2 số nguyên</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                            <span>Bài tập 6: Vòng lặp For</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="hover:no-underline">
                                    <span className="flex items-center font-semibold text-lg">
                                        <GitMerge className="w-5 mr-2 text-green-600 dark:text-green-500" />Lab 3: Các thuật toán cơ bản
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-base flex flex-col gap-1.5">
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-minus text-zinc-400"></i>
                                            <span>Bài tập 7: Hello World</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-minus text-zinc-400"></i>
                                            <span>Bài tập 8: Cộng 2 số nguyên</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-minus text-zinc-400"></i>
                                            <span>Bài tập 9: Vòng lặp For</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                    <Link className="hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 pl-3.5 rounded-lg flex items-center justify-between group/work" to="">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-circle-minus text-zinc-400"></i>
                                            <span>Bài tập 10: Vòng lặp While</span>
                                        </div>
                                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                {
                    courseData.joined ?
                        <div className="sticky top-6 w-[270px] bg-zinc-100/80 dark:bg-zinc-900 border rounded-lg flex flex-col items-center p-5 px-6">
                            <span className="font-semibold">Tiến độ khoá học</span>
                            <RingProgress radius={90} stroke={12} progress={30} textSize={28} />
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
                        </div> :
                        <div className="sticky top-6 w-[320px] flex flex-col items-center gap-2">
                            <div className="bg-secondary dark:bg-secondary/30 w-full aspect-[3/2] relative rounded-lg overflow-hidden border">
                                <img src={courseData?.thumbnail} />
                            </div>
                            <h1 className="font-semibold w-full">
                                <Badge variant="secondary" className="rounded px-1.5 -translate-y-[1px] mr-2">{courseData?.class_name}</Badge>
                                {courseData?.name}
                            </h1>
                            <p className="text-[13px] w-full mt-3">
                                <i className="fa-solid fa-circle-info mr-2 opacity-40 text-xs"></i>
                                <span className="opacity-60">Bạn chưa tham gia khoá học này</span>
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        {courseData?.join_key && <i className="fa-solid fa-lock mr-2 text-xs"></i>}
                                        Tham gia ngay
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Xác nhận tham gia khoá học</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="-mt-0.5 leading-6">
                                        Bạn có chắc chắn rằng bạn muốn tham gia khoá học này. {courseData?.join_key && 'Vui lòng nhập mã tham gia để tiếp tục.'}
                                    </DialogDescription>
                                    {
                                        courseData.join_key &&
                                        <Input
                                            placeholder="Mã tham gia"
                                            className="placeholder:italic"
                                            value={inputKey}
                                            onChange={(e) => setInputKey(e.target.value)}
                                        />
                                    }
                                    <DialogFooter className="mt-4">
                                        <DialogClose asChild>
                                            <Button variant="ghost">
                                                Đóng
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button onClick={() => handleJoinCourse()}>Xác nhận</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                }
            </div>
        </div>
    );
};

export default Course;