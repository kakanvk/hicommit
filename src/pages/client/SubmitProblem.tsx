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
    SelectTrigger,
    SelectValue
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
import createGitHubAPI from "@/service/githubService";
import { useLogin } from "@/service/LoginContext";
import Loader from "@/components/ui/loader";
import { getProblemByIDorSlug } from "@/service/API/Problem";
import toast from "react-hot-toast";

function SubmitProblem() {

    const { theme } = useTheme();

    const loginContext = useLogin();

    const githubAPI = createGitHubAPI(loginContext?.user.accessToken);

    const { problem_id } = useParams();

    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState("c");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [commitMessage, setCommitMessage] = useState("Submit code at " + new Date().toLocaleString() + " by HiCommit");

    const [problem, setProblem] = useState<any>();

    const handleGetProblem = async () => {
        try {
            const response = await getProblemByIDorSlug(problem_id as any);
            setProblem(response);
            setSelectedLanguage(response.language);
            handleChangeLanguage(response.language);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetProblem();
        handleCheckRepo();
    }, []);

    const targetRepo = "hicommit-problems";
    const templateLanguage = "template-" + problem?.language.toLowerCase();

    const handleCheckRepo = async () => {
        try {
            const response = await githubAPI.getRepoInfo(loginContext?.user.username, targetRepo);
        } catch (error) {
            await githubAPI.createRepoFromTemplate();
            console.log("Created repo from template");
        }
    }

    const handleCheckBranch = async () => {
        try {
            const response = await githubAPI.getRepoBranchInfo(loginContext?.user.username, targetRepo, problem_id);
            console.log(response);
        } catch (error) {
            await githubAPI.createBranchFromBranch(loginContext?.user.username, targetRepo, problem_id, templateLanguage);
            console.log("Created branch from template");
        }
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // Kiểm tra xem branch của bài tập đã được tạo chưa
            await handleCheckBranch();

            // Nếu là java thì tạo file Main.java, còn lại tạo file main.c hoặc main.cpp
            const file_name = selectedLanguage === "java" ? "Main.java" : "main." + selectedLanguage;

            const response = await toast.promise(
                githubAPI.commitFile(
                    loginContext?.user.login,
                    targetRepo,
                    problem_id,
                    file_name,
                    code,
                    commitMessage
                ),
                {
                    loading: 'Đang nộp bài...',
                    success: 'Nộp bài thành công',
                    error: 'Nộp bài không thành công, hãy thử lại'
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

            console.log(response);

            setTimeout(() => {
                navigate(`/problem/${problem_id}?tab=history`);
            }, 1000);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error during handleSubmit:", error);
            // Thêm thông báo lỗi cho người dùng nếu cần
        }
    };

    const handleChangeLanguage = (language: any) => {
        setSelectedLanguage(language);
        if (code === initialCodeForLanguage[selectedLanguage.toLowerCase() as keyof typeof initialCodeForLanguage] || code === "") {
            setCode(initialCodeForLanguage[language.toLowerCase() as keyof typeof initialCodeForLanguage]);
        }
    }

    const initialCodeForLanguage = {
        "c":
            `#include <stdio.h>

int main() {
    return 0;
}`,
        "cpp":
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

            {
                loading &&
                <Loader />
            }
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
                            <Link to={`/course/${problem?.parent.id}`}>{problem?.parent.name}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/problem/${problem?.slug || problem_id}`}>{problem?.name}</Link>
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
                            {problem?.name}
                            <i className="fa-solid fa-circle-check text-green-600 ml-2 text-[18px]"></i>
                        </Link>
                    </p>
                    <div className="flex items-center gap-2">
                        <Link className="flex items-center gap-2 text-sm font-medium opacity-60 hover:text-green-600 dark:hover:text-green-500 hover:opacity-100 duration-300 w-fit" to={`/course/${problem?.parent.slug || problem?.parent.id}`}>
                            <CornerDownRight className="w-3" />{problem?.parent.name}
                        </Link>
                        <Badge variant="outline" className="rounded-md px-2 text-green-600 dark:text-green-500 border-primary">{problem?.unit.name}</Badge>
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
                        height="400px"
                        autoFocus
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Link to={`/course/${problem?.slug || problem_id}`} className="text-sm flex items-center gap-2 opacity-50 hover:opacity-100 hover:text-green-600 dark:hover:text-green-500 duration-200">
                        <ChevronLeft className="w-4" />Quay lại
                    </Link>
                    <div className="flex items-center gap-4">
                        <Select value={selectedLanguage} onValueChange={handleChangeLanguage}>
                            <SelectTrigger className="w-[180px] bg-secondary pointer-events-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="c">C</SelectItem>
                                <SelectItem value="cpp">C++</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
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
                                <div>
                                    <p className="text-sm opacity-60 font-light">
                                        Hãy để lại một thông điệp cho lần nộp bài này:
                                    </p>
                                    <div className="flex items-center space-x-2 mt-3">
                                        <div className="grid flex-1 gap-2">
                                            <Input
                                                id="commit"
                                                defaultValue={commitMessage}
                                                onChange={(e) => setCommitMessage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter className="mt-4 justify-end gap-1">
                                    <div className="flex items-center gap-3">
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                                Đóng
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button onClick={() => handleSubmit()}>
                                                Commit
                                            </Button>
                                        </DialogClose>
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