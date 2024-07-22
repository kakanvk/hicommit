
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
import { Eye, Search, Shuffle, Tag } from "lucide-react";
import { Link } from "react-router-dom";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";


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
        {
            title: 'Tìm số lớn thứ 2',
            tags: ['Cơ bản', 'Mảng 1 chiều'],
            status: 'completed',
            completed_percentage: 100,
        },
        {
            title: 'Số nguyên tố đầu tiên',
            tags: ['Cơ bản', 'Số nguyên tố', 'Mảng 1 chiều'],
            status: 'completed',
            completed_percentage: 100,
        },
        {
            title: 'Số nguyên tố cuối cùng',
            tags: ['Cơ bản', 'Số nguyên tố', 'Mảng 1 chiều'],
            status: 'null',
            completed_percentage: 100,
        },
        {
            title: 'Số nguyên tố lớn nhất',
            tags: ['Cơ bản', 'Số nguyên tố', 'Mảng 1 chiều'],
            status: 'null',
            completed_percentage: 100,
        },
        {
            title: 'Số nguyên tố nhỏ nhất',
            tags: ['Cơ bản', 'Số nguyên tố', 'Mảng 1 chiều'],
            status: 'null',
            completed_percentage: 100,
        }
    ]

    const tags = [
        "Cơ bản",
        "Số nguyên tố",
        "Mảng 1 chiều",
        "Mảng 2 chiều",
        "Mảng động",
        "Chuỗi",
        "Xâu ký tự",
        "Cấu trúc",
        "Con trỏ",
        "Đệ quy",
        "Sắp xếp",
        "Tìm kiếm",
        "Stack",
        "Queue",
        "Priority Queue",
        "Binary Tree",
        "Graph",
        "DFS",
        "BFS",
        "Dijkstra",
        "Floyd",
        "Bellman Ford",
        "Topological Sort",
        "Kruskal",
        "Prim",
        "Segment Tree",
        "Fenwick Tree",
        "Binary Indexed Tree",
        "Disjoint Set",
        "Bit Manipulation",
    ]

    const [filteredTags, setFilteredTags] = useState(tags)
    const [searchTagValue, setSearchTagValue] = useState("");

    useEffect(() => {
        setFilteredTags(tags.filter(tag => tag.toLowerCase().includes(searchTagValue.toLowerCase())))
    }, [searchTagValue])

    return (
        <div className="Problems p-6 px-8">
            <div>
                <div className="w-full relative flex items-start gap-6">
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-8">
                            <h1 className="text-lg font-bold">
                                Danh sách bài tập
                                <Badge variant="secondary" className="px-2 min-w-[22px] flex justify-center inline ml-2">{sampleData.length}</Badge>
                            </h1>
                            <div className="flex gap-3 justify-end items-center flex-1">
                                <div className="relative max-w-[300px] flex-1">
                                    <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Tìm kiếm bài tập"
                                        className="w-full rounded-md pl-9 flex-1 bg-transparent"
                                    />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả</SelectItem>
                                        <SelectItem value="completed">Đã hoàn thành</SelectItem>
                                        <SelectItem value="uncomplete">Chưa hoàn thành</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                                        <TableHead className="w-[30px]">#</TableHead>
                                        <TableHead className="w-[35%]">Tên bài tập</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead>Tỉ lệ</TableHead>
                                        <TableHead className="text-right">Điểm</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        sampleData.map((data, index) => (
                                            <TableRow key={index} className="hover:bg-secondary/10">
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Link to={`/problem/${index + 1}`} className="w-fit flex items-center gap-2 hover:text-green-600 dark:hover:text-green-500">
                                                        <h3 className="font-medium dark:font-normal">
                                                            <span className="mr-2">{data.title}</span>
                                                            {data.status === "completed" && <i className="fa-solid fa-circle-check text-primary text-sm"></i>}
                                                            {data.status === "error" && <i className="fa-solid fa-circle-xmark text-red-500 text-sm"></i>}
                                                        </h3>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1 gap-y-1.5 flex-wrap">
                                                        {data.tags.map((tag, index) => (
                                                            <Badge key={index} variant="outline" className="text-[11px] p-0 px-2 font-normal dark:font-light leading-5">{tag}</Badge>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-[60px] 2xl:w-[100px] h-1.5 bg-secondary/90 rounded-md">
                                                            <div className="h-1.5 bg-primary rounded-md" style={{ width: `${data.completed_percentage}%` }}></div>
                                                        </div>
                                                        <span className="text-[12px] font-semibold">{data.completed_percentage}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant="secondary" className="bg-secondary/60 text-[12px] p-0 px-2 font-bold leading-5">
                                                        {data.completed_percentage}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination className="mt-5">
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
                    <div className="w-[280px] 2xl:w-[320px] sticky top-6">
                        <div className="border bg-secondary/10 rounded-md p-4 px-5 flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <h2 className="font-bold text-lg">
                                    <span>Các dạng bài tập</span>
                                    <Badge variant="secondary" className="px-2 min-w-[22px] flex justify-center inline ml-2">{tags.length}</Badge>
                                </h2>
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Tìm kiếm"
                                        value={searchTagValue}
                                        onChange={(e) => setSearchTagValue(e.target.value)}
                                        className="w-full rounded-md pl-9 flex-1 bg-transparent"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        filteredTags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="bg-secondary/50 dark:bg-secondary/60 text-[12px] p-0.5 px-3 font-normal leading-5 cursor-pointer">{tag}</Badge>
                                        ))
                                    }
                                    {
                                        filteredTags.length === 0 && <span className="text-sm text-muted-foreground">Không có kết quả phù hợp</span>
                                    }
                                </div>
                                <Button size="sm" className="mt-1"><Shuffle className="w-4 h-4 mr-3" />Lấy ngẫu nhiên</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problems;