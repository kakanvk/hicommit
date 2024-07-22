
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Eye, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function Problems() {

    const sampleData = [
        {
            title: 'Tìm số nguyên tố',
            tags: ['Cơ bản', 'Số nguyên tố', 'Mảng 1 chiều'],
            status: 'completed',
            completed_percentage: 90,
        },
        {
            title: 'Min max',
            tags: ['Cơ bản', 'Mảng 1 chiều'],
            status: 'error',
            completed_percentage: 30,
        },
    ]

    return (
        <div className="Problems p-6 px-8">
            <div>
                <h1 className="text-xl font-bold">Danh sách bài tập</h1>
                <div className="w-full relative flex items-start gap-8 mt-8">
                    <div className="flex-1 flex flex-col gap-14 h-[1000px]">
                        <div className="flex flex-col gap-3">
                            {
                                sampleData.map((data, index) => (
                                    <Link key={index} className="bg-secondary/20 border rounded-md py-3 px-5 pb-4 hover:bg-secondary/30 flex justify-between items-center" to="#">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="font-semibold dark:font-medium">
                                                {data.title}
                                                {data.status === "completed" && <i className="fa-solid fa-circle-check text-primary ml-2 text-sm"></i>}
                                                {data.status === "error" && <i className="fa-solid fa-circle-xmark text-red-500 ml-2 text-sm"></i>}

                                            </h2>
                                            <div className="flex gap-1">
                                                {data.tags.map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="text-[11px] p-0 px-2 dark:font-normal leading-5">{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-xs">Điểm</span>
                                            <Badge variant="secondary" className="text-[12px] p-0 px-3 font-bold leading-5">
                                                {data.completed_percentage}
                                            </Badge>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                        <Pagination>
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
                    </div>
                    <div className="w-[300px] sticky top-5">
                        <div className="border bg-secondary/30 dark:bg-secondary/60 rounded-md p-4 px-5 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-medium">Tìm theo từ khoá</h2>
                                <div className="relative max-w-[400px] flex-1">
                                    <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Tìm kiếm bài tập"
                                        className="w-full rounded-md pl-9 flex-1"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="font-medium">Tags</h2>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                                <Button variant="ghost">Đặt lại</Button>
                                <Button>Tìm kiếm</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problems;