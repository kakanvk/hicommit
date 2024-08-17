
import ReactDOMServer from 'react-dom/server';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Link } from "react-router-dom";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Ellipsis, ListFilter, MoreHorizontal, Pencil, Plus, Trash2, UserRoundPlus } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { getUsers, updateRole, updateStatus } from "@/service/API/User";
import toast from "react-hot-toast";
import { useLogin } from "@/service/LoginContext";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { getProblemsForAdmin } from "@/service/API/Problem";
import { formatTimeAgo } from "@/service/DateTimeService";


// Problem(id, name, slug, tags, language, description, input, output, limit, examples, testcases, created_by, type, level, score, parent)
export type Problem = {
    id: string
    name: string
    slug: string
    tags: string[]
    language: string
    description: string
    input: string
    output: string
    limit: number
    examples: string[]
    testcases: string[]
    created_by: string
    type: "COURSE" | "CONTEST" | "FREE"
    level: string
    score: number
    parent: Object
}

const labelArr = {
    name: "Tên bài tập",
    slug: "Mã bài tập",
    creator: "Người tạo",
    tags: "Dạng bài",
    language: "Ngôn ngữ",
    level: "Cấp độ",
    score: "Điểm",
    createdAt: "Ngày tạo",
    actions: "Hành động"
}

function ProblemManager() {

    const loginContext = useLogin();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        id: false,
    });
    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<Problem[]>([]);

    const getData = async () => {
        const problems = await getProblemsForAdmin();
        console.log(problems);
        setData(problems);
    }

    const handleUpdateRole = async (userId: string, role: string) => {
        await toast.promise(
            updateRole(userId, role),
            {
                loading: 'Đang cập nhật...',
                success: 'Cập nhật thành công',
                error: 'Cập nhật không thành công, hãy thử lại'
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
        getData();
    }

    const handleCopyText = (text: string) => {
        const textToCopy = ReactDOMServer.renderToStaticMarkup(<>{text}</>);

        // Tạo một phần tử div ẩn để chứa nội dung cần copy
        const hiddenDiv = document.createElement('div');
        hiddenDiv.innerHTML = textToCopy;

        hiddenDiv.style.position = 'absolute';
        hiddenDiv.style.left = '-9999px';
        hiddenDiv.style.whiteSpace = 'pre-wrap';

        document.body.appendChild(hiddenDiv);

        // Lựa chọn nội dung trong div ẩn
        const range = document.createRange();
        range.selectNode(hiddenDiv);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);

        // Copy nội dung đã chọn vào clipboard
        try {
            document.execCommand('copy');
            toast.success('Đã copy vào bộ nhớ tạm', {
                style: {
                    borderRadius: '8px',
                    background: '#222',
                    color: '#fff',
                    paddingLeft: '15px',
                    fontFamily: 'Plus Jakarta Sans',
                }
            });

        } catch (err) {
            console.error('Copy failed: ', err);
        }

        // Xóa phần tử div ẩn
        document.body.removeChild(hiddenDiv);
    };

    useEffect(() => {
        getData();
    }, []);

    const columns: ColumnDef<Problem>[] = [
        {
            accessorKey: "id",
            enableHiding: false,
        },
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <div className="flex items-center gap-1">
                        <span className='text-nowrap'>Tên bài tập</span>
                    </div>
                )
            },
            cell: ({ row }) => (
                <p className="line-clamp-1 font-medium">{row.getValue("name")}</p>
            ),
        },
        {
            accessorKey: "slug",
            header: ({ column }) => {
                return (
                    <div className="flex items-center gap-1">
                        <span className='text-nowrap'>Mã bài tập</span>
                    </div>
                )
            },
            cell: ({ row }) => (
                <Badge variant="secondary" className="rounded-md bg-secondary/50 dark:bg-secondary/60 text-[12px] p-0.5 px-2 font-normal leading-5 cursor-pointer text-nowrap" onClick={() => handleCopyText(row.getValue("slug"))}>
                    {row.getValue("slug")}
                </Badge>
            ),
        },
        {
            accessorKey: "creator",
            header: () => {
                return (<div className="text-nowrap">Người tạo</div>)
            },
            cell: ({ row }) => (
                <div className="flex justify-start mr-2">
                    <div className="flex items-center gap-2">
                        <img src={(row.getValue("creator") as any).avatar_url} className="w-6 h-6 rounded-full" />
                        <span className="text-nowrap">
                            {(row.getValue("creator") as any).username}
                            {((row.getValue("creator") as any).role === "ADMIN" || (row.getValue("creator") as any).role === "TEACHER") && <i className="fa-solid fa-circle-check text-primary text-[10px] ml-1 -translate-y-[1px]"></i>}
                        </span>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "tags",
            header: () => { return (<div>Dạng bài</div>) },
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-2 max-w-[250px]">
                    {(row.getValue("tags") as any)?.map((tag: any) => (
                        <Badge key={tag} variant="outline" className="text-[12px] p-0.5 px-3 font-normal leading-5 cursor-pointer text-nowrap">{tag}</Badge>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: "language",
            header: ({ column }) => {
                return (
                    <div className="flex items-center gap-1 text-nowrap">
                        <span>Ngôn ngữ</span>
                    </div>
                )
            },
            cell: ({ row }) => (
                <Badge variant="secondary" className="rounded-md bg-secondary/50 dark:bg-secondary/60 text-[12px] p-0.5 px-2 font-normal leading-5 cursor-pointer text-nowrap">
                    {row.getValue("language") === "c" && "C"}
                    {row.getValue("language") === "cpp" && "C++"}
                    {row.getValue("language") === "java" && "Java"}
                </Badge>
            ),
        },
        {
            accessorKey: "level",
            header: ({ column }) => {
                return (
                    <div className="flex items-center gap-1">
                        <span>Cấp độ</span>
                    </div>
                )
            },
            cell: ({ row }) => {
                return (
                    <div className="font-medium">
                        <Select value={row.getValue("level")}>
                            <SelectTrigger className="w-[130px] bg-transparent p-2 h-8 text-xs items-center">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="EASY">Dễ</SelectItem>
                                <SelectItem value="MEDIUM">Trung bình</SelectItem>
                                <SelectItem value="HARD">Khó</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )
            },
        },
        {
            accessorKey: "score",
            header: ({ column }) => {
                return (
                    <div className="flex items-center gap-1">
                        <span>Điểm</span>
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            size="icon"
                            className="h-7 w-7"
                        >
                            <ArrowUpDown className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => (
                <Badge variant="secondary" className="rounded-md bg-secondary/50 dark:bg-secondary/60 text-[12px] p-0.5 px-2 font-normal leading-5 cursor-pointer text-nowrap">
                    {row.getValue("score")}
                </Badge>
            ),
        },
        {
            accessorKey: "createdAt",
            header: () => {
                return (<div className="text-nowrap text-left">Ngày tạo</div>)
            },
            cell: ({ row }) => (
                <div className="flex justify-center flex-col gap-0.5">
                    <span className="text-xs opacity-60">Được tạo</span>
                    <span className="text-nowrap">{formatTimeAgo(row.getValue("createdAt"), "vi")}</span>
                </div>
            )
        },
        {
            id: "actions",
            enableHiding: false,
            header: () => <div className="text-center flex justify-center"><ListFilter className="size-[14px]" /></div>,
            cell: ({ row }) => {
                return (
                    <div className="m-auto">
                        <div className='flex items-center justify-center gap-2'>
                            <Dialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="outline" size="icon" className="w-8 h-8">
                                            <Ellipsis className="w-[14px]" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="top" align="end">
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Pencil className="size-[13px] mr-3" />Chỉnh sửa
                                        </DropdownMenuItem>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem className="focus:bg-destructive focus:text-white cursor-pointer">
                                                <Trash2 className="size-[14px] mr-3" />Xoá
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Xác nhận xoá bài tập này</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                        Sau khi xoá, bài tập này sẽ không thể khôi phục.
                                    </DialogDescription>
                                    <AlertDialogFooter className="mt-2">
                                        <DialogClose>
                                            <Button variant="ghost">
                                                Đóng
                                            </Button>
                                        </DialogClose>
                                        <DialogClose>
                                            <Button className="w-fit px-4" variant="destructive">
                                                Xoá
                                            </Button>
                                        </DialogClose>
                                    </AlertDialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="ProblemManager p-5 pl-2 flex flex-col gap-1">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/admin">Quản trị</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        Quản lý bài tập
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <div className="flex flex-col gap-5">
                    <div className="w-full">
                        <div className="flex items-center py-4 gap-3 justify-end">
                            <p className="flex-1 text-lg pt-2">
                                <span className="font-semibold">Danh sách bài tập</span>
                                <Badge variant="secondary" className="px-1.5 rounded-sm ml-2 inline">
                                    {data.length}
                                </Badge>
                            </p>
                            <Link to="create">
                                <Button size="icon"><Plus className="w-[18px] h-[18px]" /></Button>
                            </Link>
                            <Input
                                placeholder="Tìm kiếm bài tập ..."
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("name")?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm bg-transparent"
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="justify-between w-[180px] pr-3 bg-transparent">
                                        Tuỳ chọn hiển thị <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[180px]">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="w-full"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) =>
                                                        column.toggleVisibility(!!value)
                                                    }
                                                >
                                                    {
                                                        labelArr[column.id as keyof typeof labelArr] ?? column.id
                                                    }
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader className="bg-secondary/70 dark:bg-secondary">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id} className="hover:bg-secondary/70 dark:hover:bg-secondary">
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                                className="data-[state=selected]:bg-secondary/40 dark:data-[state=selected]:bg-secondary/60 hover:bg-secondary/20"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                Không có kết quả phù hợp.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {
                                    table.getFilteredSelectedRowModel().rows.length > 0 &&
                                    <span>Đã chọn <strong>{table.getFilteredSelectedRowModel().rows.length}</strong> dòng (Tổng số: {table.getFilteredRowModel().rows.length} dòng)</span>
                                }
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Trang trước
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Trang sau
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProblemManager;