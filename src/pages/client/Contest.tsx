import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RingProgress from "@/components/ui/ringProcess";
import { ArrowRight, CalendarDays, ChevronRight, CornerDownRight, Eye, Filter, History, Lock, Search, UsersRound } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";


const data = [
    {
        title: "Olympic Tin học sinh viên Việt Nam TVU 2024",
        author: "baoanth",
        date: "2 ngày trước",
        participants: 58,
        status: "open",
        time: "01.07.2024 - 01.09.2024",
        duration: "3 giờ 30 phút",
        public: true,
    },
    // Tạo dữ liệu giả lập khác nhau
    {
        title: "[Mirror] Code Tour 2024 - Semi-final Round",
        author: "baoanth",
        date: "2 ngày trước",
        participants: 123,
        status: "open",
        time: "01.07.2024 - 01.09.2024",
        duration: "3 giờ 30 phút",
        public: false,
    },
    {
        title: "Educational Euler Tour and HLD Contest",
        author: "baoanth",
        date: "2 ngày trước",
        participants: 24,
        status: "closed",
        time: "01.07.2024 - 01.09.2024",
        duration: "3 giờ 30 phút",
        public: true,
    },
]

function Contest() {

    const navigate = useNavigate();

    const handleConfirmJoinContest = () => {
        // Xử lý logic khi người dùng xác nhận tham gia cuộc thi

        // Chuyển hướng đến trang cuộc thi
        navigate("/contest/1");
    }

    return (
        <div className="Contest p-6 px-7">
            <div className="flex flex-col gap-10">
                <div className="text-white border rounded-lg bg-secondary/30 flex items-center bg-gradient-to-r from-primary via-primary/50 dark:via-primary/30 via-40% to-transparent to-90%">
                    <div className="p-4 pt-3 flex justify-between items-center w-full">
                        <div>
                            <h2 className="text-lg font-bold">Olympic Tin học sinh viên Việt Nam 2024</h2>
                            <p className="text-sm dark:opacity-70">Cuộc thi lập trình dành cho học sinh, sinh viên lớn nhất Việt Nam được tổ chức hằng năm</p>
                        </div>
                        <Button>Tìm hiểu thêm<ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </div>
                </div>
                <div className="flex flex-col gap-5 relative">
                    <div className="flex items-end justify-between">
                        <div className="flex gap-2 items-center">
                            <h2 className="text-lg">Các cuộc thi trên hệ thống</h2>
                            <Badge className="px-1.5 min-w-[22px] flex justify-center" variant="secondary">18</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative max-w-[400px] flex-1">
                                <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Tìm kiếm cuộc thi"
                                    className="w-full rounded-md pl-9 flex-1 bg-transparent"
                                />
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[200px] bg-transparent">
                                    <div className="flex items-center">
                                        <Filter className="w-[14px] h-[14px] mr-2 mt-0.5" /><SelectValue />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả</SelectItem>
                                    <SelectItem value="public">Công khai</SelectItem>
                                    <SelectItem value="private">Không công khai</SelectItem>
                                    <SelectItem value="open">Đang diễn ra</SelectItem>
                                    <SelectItem value="closed">Đã kết thúc</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        {
                            data.map((item, index) => {
                                return (
                                    <div className="flex gap-6 rounded-lg items-center justify-between bg-secondary/30 p-5 px-7 pb-7 border">
                                        <div className="flex flex-col items-start gap-4 flex-1">
                                            <div className="flex flex-col gap-2 items-start justify-start">
                                                <h2 className="font-semibold text-lg">
                                                    <span className="mr-2">{item.title}</span>
                                                    {
                                                        item.public &&
                                                        <Badge variant="outline" className="text-[12px] p-0 px-2 pr-3 font-normal leading-6">
                                                            <Eye className="h-3 w-3 mr-2" />Công khai
                                                        </Badge>
                                                    }
                                                </h2>
                                                <div className="flex gap-2 items-center text-sm justify-start flex-wrap">
                                                    <span className="opacity-70 flex items-center gap-2">Được tạo bởi</span>
                                                    <HoverCard openDelay={300}>
                                                        <HoverCardTrigger>
                                                            <Badge className="gap-1.5 p-1 pr-2 hover:bg-secondary cursor-pointer" variant="outline">
                                                                <Avatar className="w-5 h-5">
                                                                    <AvatarImage className="rounded-full border" src="https://avatars.githubusercontent.com/u/17537969?s=80&v=4" />
                                                                </Avatar>
                                                                <span className="font-semibold text-[13px] -translate-y-[1px]">{item.author}</span>
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
                                                    <span className="opacity-70 flex items-center gap-2"><i className="fa-solid fa-circle text-[3px]"></i>2 ngày trước</span>
                                                    <Badge variant="secondary" className="text-[12px] p-1 px-3 font-normal">
                                                        <UsersRound className="h-3 w-3 mr-2" />{item.participants} người tham gia
                                                    </Badge>
                                                </div>
                                            </div>
                                            {
                                                item.status === "open" ?
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <Button className="px-5 pr-4 mt-2">Tham gia cuộc thi<ChevronRight className="w-4 h-4 ml-2" /></Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Xác nhận tham gia cuộc thi</DialogTitle>
                                                            </DialogHeader>
                                                            <DialogDescription className="-mt-0.5 leading-6">
                                                                Bạn có <Badge variant="secondary" className="text-[11px] p-0 px-1 pr-2 leading-5">
                                                                    <History className="h-3 w-3 mr-1.5" />{item.duration}
                                                                </Badge> để hoàn thành bài thi này. Sau khi hết thời gian, bạn sẽ không thể tiếp tục tham gia cuộc thi này.
                                                            </DialogDescription>
                                                            {
                                                                !item.public && <Input placeholder="Mã tham gia" className="placeholder:italic" />
                                                            }
                                                            <DialogFooter className="mt-4">
                                                                <DialogClose asChild>
                                                                    <Button variant="ghost">
                                                                        Đóng
                                                                    </Button>
                                                                </DialogClose>
                                                                <Button onClick={() => handleConfirmJoinContest()}>Xác nhận</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog> :
                                                    <Button className="px-5 pr-4 mt-2" variant="secondary">Bảng xếp hạng<ChevronRight className="w-4 h-4 ml-2" /></Button>
                                            }
                                        </div>
                                        <div className="flex flex-col gap-5">
                                            <div className="flex flex-col items-end pr-2 text-sm">
                                                {
                                                    item.status === "open" ?
                                                        <span className="italic text-green-600 dark:text-green-500 font-semibold dark:font-medium">Đang diễn ra</span> :
                                                        <span className="italic text-red-500 font-semibold dark:font-medium ">Đã kết thúc</span>
                                                }
                                                {
                                                    item.status === "open" ?
                                                        <p className=" font-semibold">01.07.2024 - 01.09.2024</p> :
                                                        <p className="font-semibold">01.07.2024 - 01.09.2024</p>
                                                }
                                            </div>
                                            <div className="flex flex-col gap-1 items-end pr-2">
                                                <span className="italic font-medium text-sm">Thời gian làm bài</span>
                                                <Badge variant="secondary" className="text-[11px] p-1 px-3">
                                                    <History className="h-3 w-3 mr-1.5" />3 giờ 30 phút
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Pagination className="mt-6">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default Contest;