import { AutosizeTextarea } from "@/components/ui/auto-resize-text-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsLeft, ChevronsRight, Pencil, Plus, Trash, Trash2, X } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import TextAndMathEditor from "@/components/ui/text-math-editor";

function CreateProblem() {

    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>('');

    const handleAddTag = () => {
        if (tags.includes(tag)) {
            setTag('');
            return;
        }

        if (tags.length < 5 && tag.trim() !== '') {
            setTags([...tags, tag]);
            setTag('');
        }
    }

    return (
        <div className="CreateProblem p-6 px-8 flex flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/course-manager">Quản lý khoá học</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/course-manager/1">Kỹ thuật lập trình</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Thêm bài tập mới
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-14">
                <div className="flex flex-col gap-5">
                    <h3 className="text-xl font-bold w-fit after:content-['*'] after:ml-1 after:text-green-500">Thông tin cơ bản</h3>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2 flex-col">
                            <h4 className="font-medium after:content-['*'] after:ml-1 after:text-green-500">Tên bài tập</h4>
                            <Input placeholder="Nhập tên bài tập" className="placeholder:italic " />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h4 className="font-medium after:content-['*'] after:ml-1 after:text-green-500">Tag</h4>
                            <div className="flex gap-3">
                                <Input placeholder={tags.length >= 5 ? "Đã đạt giới hạn" : "Nhập tag mới, tối đa 5 tags"} disabled={tags.length >= 5} className="placeholder:italic w-[350px]" value={tag} onChange={e => setTag(e.target.value)} />
                                <Button size='icon' onClick={() => handleAddTag()} disabled={tags.length >= 5}><Plus className="w-5 h-5" /></Button>
                            </div>
                            {
                                tags.length > 0 &&
                                <div className="flex gap-2 mt-1">
                                    {
                                        tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-[11px] p-1 px-1.5 pl-2.5">
                                                {tag}
                                                <X className="w-4 h-4 ml-3 hover:bg-zinc-700 rounded-full p-[1px] duration-100 cursor-pointer" onClick={() => setTags(tags.filter(t => t !== tag))} />
                                            </Badge>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h4 className="font-medium after:content-['*'] after:ml-1 after:text-green-500">Ngôn ngữ lập trình</h4>
                            <Select defaultValue="c">
                                <SelectTrigger className="w-[350px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="c">C</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="text-xl font-bold w-fit after:content-['*'] after:ml-1 after:text-green-500">Thông tin chi tiết bài tập</h3>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2 flex-col">
                            <h4 className="font-medium after:content-['*'] after:ml-1 after:text-green-500">Mô tả đề bài</h4>
                            <TextAndMathEditor />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2 flex-col">
                            <h4 className="font-medium after:content-['*'] after:ml-1 after:text-green-500">Input</h4>
                            <TextAndMathEditor />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2 flex-col">
                            <h4 className="font-medium after:content-['*'] after:ml-1 after:text-green-500">Output</h4>
                            <AutosizeTextarea placeholder="Nhập mô tả cho dữ liệu đầu ra (Output)" className="placeholder:italic " />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2 flex-col">
                            <h4 className="font-medium">Giới hạn</h4>
                            <AutosizeTextarea placeholder="Nhập giới hạn của bài tập (nếu có)" className="placeholder:italic " />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Các ví dụ</h3>
                        <Badge className="px-1.5">2</Badge>
                    </div>
                    <div className="flex flex-col gap-4">
                        <TestCase />
                    </div>
                    <Button className="w-fit px-3.5 pr-4 mt-1 text-base font-medium hover:bg-primary/10 text-primary dark:text-green-500 hover:text-primary" variant="ghost">
                        <Plus className="w-[17px] mr-1.5 h-[17px]" />Thêm ví dụ
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Các Test-case</h3>
                        <Badge className="px-1.5">3</Badge>
                    </div>
                    <div className="flex flex-col gap-4">
                        <TestCase />
                        <TestCase />
                    </div>
                    <Button className="w-fit px-3.5 pr-4 mt-1 text-base font-medium hover:bg-primary/10 text-primary dark:text-green-500 hover:text-primary" variant="ghost">
                        <Plus className="w-[17px] mr-1.5 h-[17px]" />Thêm Test-case
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateProblem;

const TestCase = () => {
    return (
        <div className="flex flex-col gap-1 group/test-case">
            <div className="flex justify-start gap-2 items-center">
                <span className="text-sm font-medium">
                    <i className="fa-solid fa-seedling text-sm opacity-40 mr-2"></i>Test-case<Badge className="ml-2 pl-1.5 cursor-pointer" variant="secondary"><Plus className="w-3 h-3 mr-1" />Thêm ghi chú</Badge>
                </span>
                <div className="flex gap-1 invisible group-hover/test-case:visible">
                    <Button size="icon" className="rounded-full w-8 h-8" variant="ghost"><Pencil className="w-3.5 h-3.5" /></Button>
                    <Button size="icon" className="rounded-full w-8 h-8 hover:bg-red-600/30 dark:hover:bg-red-500/30" variant="ghost"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
            </div>
            <div className="w-full flex gap-3 rounded-xl duration-200 cursor-pointer">
                <div className="flex-1 relative">
                    <span className="text-[10px] font-normal absolute top-1 right-1 border px-1 pr-1.5 rounded opacity-60 bg-secondary"><ChevronsRight className="inline w-3 h-3 mr-0.5" />Input</span>
                    <AutosizeTextarea className="font-mono disabled:cursor-pointer bg-secondary/30" defaultValue="1 2 3" />
                </div>
                <div className="flex-1 relative">
                    <span className="text-[10px] font-normal absolute top-1 right-1 border px-1 pr-1.5 rounded opacity-60 bg-secondary"><ChevronsLeft className="inline w-3 h-3 mr-0.5" />Output</span>
                    <AutosizeTextarea className="font-mono disabled:cursor-pointer bg-secondary/30" defaultValue="6" />
                </div>
            </div>
        </div>
    )
}