import { useNavigate, useParams } from "react-router-dom";

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
    SelectTrigger
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"

import { Link } from "react-router-dom";

import CodeMirror from '@uiw/react-codemirror';
import { githubLightInit, githubDarkInit } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';

import { useTheme } from "@/components/theme-provider";
import { ChevronLeft, CornerDownRight, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react";

function SubmitProblem() {

    const { theme } = useTheme();

    const { problem_id } = useParams();

    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState("C");
    const [code, setCode] = useState("");

    const defaultLanguage = [
        "C", "C++", "Java"
    ]

    const handleSubmit = () => {
        console.log("Submit work: ", code);
        navigate("/submission/8763121492");
    }

    const handleChangeLanguage = (language: any) => {
        setSelectedLanguage(language);
        setCode(initialCodeForLanguage[language.toLowerCase() as keyof typeof initialCodeForLanguage]);
    }

    const initialCodeForLanguage = {
        "c":
            `#include <stdio.h>

int main() {
    return 0;
}`,
        "c++":
            `#include <bits/stdc++.h>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    return 0;
}`,
        "java":
            `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {

    }
}`
    }

    useEffect(() => {
        setCode(initialCodeForLanguage[selectedLanguage.toLowerCase() as keyof typeof initialCodeForLanguage]);
    }, []);

    return (
        <div className="SubmitProblem p-6 px-8 pb-[90px] flex flex-col gap-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Khoá học của tôi</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/course/${problem_id}`}>Kỹ thuật lập trình</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/problem/${problem_id}`}>Bài tập {problem_id}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Nộp bài
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex justify-between">
                <div className="flex-1 flex flex-col gap-3">
                    <p className="text-xl font-bold">
                        Nộp bài:
                        <Link className="ml-1 hover:text-green-600 dark:hover:text-green-500 duration-300 w-fit" to={`/problem/${problem_id}`}>
                            In mảng 2 chiều dạng bảng
                            <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[20px]"></i>
                        </Link>
                    </p>
                    <div className="flex items-center gap-1.5">
                        <Link className="flex items-center gap-2 text-sm font-medium opacity-60 hover:text-green-600 dark:hover:text-green-500 hover:opacity-100 duration-300 w-fit" to={`/course/${problem_id}`}>
                            <CornerDownRight className="w-3" />Kỹ thuật lập trình
                        </Link>
                        <Badge variant="outline" className="rounded-md px-2 text-green-600 dark:text-green-500 border-primary">Lab 1: Nhập môn</Badge>
                    </div>
                </div>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="secondary" size="icon"><Upload className="w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Tải lên tệp mã nguồn</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="flex flex-col gap-5">
                <div className="border rounded-lg overflow-hidden">
                    <CodeMirror
                        value={code}
                        placeholder="Please enter your code here..."
                        theme={theme === "dark" ?
                            githubDarkInit({
                                settings: {
                                    background: 'rgb(15 15 15)',
                                }
                            }) :
                            githubLightInit({
                                settings: {
                                    gutterBackground: "rgb(235 235 235)",
                                    background: 'rgb(248 248 248)',
                                    lineHighlight: '#8a91991a',
                                }
                            })
                        }
                        onChange={(value) => setCode(value)}
                        extensions={[javascript({ jsx: true })]}
                        height="350px"
                        autoFocus
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Link to={`/course/${problem_id}`} className="text-sm flex items-center gap-2 opacity-50 hover:opacity-100 hover:text-green-600 dark:hover:text-green-500 duration-200">
                        <ChevronLeft className="w-4" />Quay lại
                    </Link>
                    <div className="flex items-center gap-4">
                        <Select value={selectedLanguage} onValueChange={handleChangeLanguage}>
                            <SelectTrigger className="w-[180px] bg-secondary">
                                {selectedLanguage}
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    defaultLanguage.map((item, index) => (
                                        <SelectItem key={index} value={item}>{item}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    Nộp bài<i className="fa-solid fa-paper-plane ml-2"></i>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle><i className="fa-solid fa-code-commit text-primary mr-2 translate-y-[-1px]"></i>Commit thay đổi</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    <p>
                                        Đoạn mã này sẽ được gửi lên GitHub, hãy tạo một thông điệp để gợi nhớ về sự thay đổi này:
                                    </p>
                                    <div className="flex items-center space-x-2 mt-3">
                                        <div className="grid flex-1 gap-2">
                                            <Input
                                                id="commit"
                                                defaultValue="Bài nộp 1"
                                            />
                                        </div>
                                    </div>
                                </DialogDescription>
                                <DialogFooter className="mt-4 justify-end gap-1">
                                    <div className="flex items-center gap-3">
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                                Đóng
                                            </Button>
                                        </DialogClose>
                                        <Button onClick={() => handleSubmit()}>
                                            Commit
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitProblem;