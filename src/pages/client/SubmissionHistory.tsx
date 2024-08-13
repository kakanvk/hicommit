
import { Link, useParams } from "react-router-dom";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, CircleDot, Code, RefreshCcw } from "lucide-react";
import { GitGraph, GitGraphBody, GitGraphFree, GitGraphHead, GitGraphNode } from "@/components/ui/git-graph";
import { Badge } from "@/components/ui/badge";

import createGitHubAPI from "@/service/githubService";
import { useLogin } from "@/service/LoginContext";
import { useEffect, useState } from "react";

import { parseISO, formatDistanceToNow, differenceInSeconds, differenceInMinutes, differenceInHours } from 'date-fns';
import { se, vi } from 'date-fns/locale';
import Loader2 from "@/components/ui/loader2";
import { getMySubmissionsByProblemSlug } from "@/service/API/Submission";

const timeAgo = (isoDate: any) => {
    try {
        const date = parseISO(isoDate);
        return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
        console.error('Error parsing date:', error);
        return 'Invalid date';
    }
};

const calculateTimeDifference = (startDate: any, endDate: any) => {
    try {
        const start = parseISO(startDate);
        const end = parseISO(endDate);

        const seconds = differenceInSeconds(end, start);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        let result = '';
        if (hours > 0) {
            result += `${hours}h`;
        }
        if (remainingMinutes > 0) {
            result += `${remainingMinutes}p`;
        }
        if (remainingSeconds > 0 || result === '') {
            result += `${remainingSeconds}s`;
        }

        return result;
    } catch (error) {
        console.error('Error calculating time difference:', error);
        return 'Invalid date';
    }
};

function SubmissionHistory(props: any) {

    const { problem } = props;

    const { problem_id } = useParams();

    const { user } = useLogin(); // Lấy thông tin user từ context
    const githubAPI = createGitHubAPI(user.accessToken);

    const [actions, setActions] = useState<any[]>([]);
    const [mySubmissions, setMySubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getActions = async () => {
        const data = await githubAPI.getActionsByBranch('kakanvk', 'hicommit-submissions', 'test-cpp');
        console.log(data);
        setActions(data);
    }

    const handleGetMySubmissons = async () => {
        setLoading(true);
        const data = await getMySubmissionsByProblemSlug(problem?.slug);
        console.log(data);
        setTimeout(() => {
            setMySubmissions(data);
            setLoading(false);
        }, 500);
    }

    useEffect(() => {
        // getActions();
        handleGetMySubmissons();
    }, []);

    return (
        <div className="SubmissionHistory flex flex-col gap-8">
            {
                loading ?
                    <div className="w-full flex justify-center py-10">
                        <Loader2 />
                    </div> :
                    mySubmissions?.length > 0 ?
                        <GitGraph>
                            <GitGraphBody className="">
                                <GitGraphFree className="h-2" />
                                {
                                    mySubmissions?.map((submission, index) => {
                                        return (
                                            <GitGraphNode key={submission?.id} end={index === mySubmissions?.length - 1 ? true : false}>
                                                <Link className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200/50 hover:dark:bg-zinc-800/70 p-3 px-5 rounded-lg duration-100" to={`/submission/${submission.id}`}>
                                                    <div className="flex-1 flex flex-col gap-2">
                                                        <p className="font-semibold text-base">
                                                            {submission?.commit}
                                                            {submission?.status === "PENDING" &&
                                                                <span className="relative inline-flex h-3 w-3 ml-2.5">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                                                </span>
                                                            }
                                                            {submission?.status === "PASSED" && <i className="fa-solid fa-circle-check text-green-600 ml-2.5 text-[14px]"></i>}
                                                            {submission?.status === "FAILED" && <i className="fa-solid fa-circle-exclamation text-amber-500 ml-2.5 text-[14px]"></i>}
                                                            {submission?.status === "ERROR" && <i className="fa-solid fa-circle-xmark text-red-500 ml-2.5 text-[14px]"></i>}
                                                            {submission?.status === "COMPILE_ERROR" && <i className="fa-solid fa-triangle-exclamation text-zinc-400 ml-2.5 text-[14px]"></i>}
                                                        </p>
                                                        <div className="text-[14px] flex items-baseline gap-1.5 flex-wrap">
                                                            <span className="opacity-70">Commit bởi</span>
                                                            <strong className="font-semibold hover:underline cursor-pointer">{submission?.username}</strong>
                                                            <span className="opacity-50 text-[13px] font-medium dark:font-normal ml-0.5">
                                                                <i className="fa-solid fa-circle text-[3px] -translate-y-[3.5px] mr-2"></i>
                                                                {timeAgo(submission.createdAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start sm:items-end gap-1">
                                                        <span className="text-xs opacity-60">Thời gian</span>
                                                        <strong>
                                                            {
                                                                submission.status === "PENDING" ? (
                                                                    <span className="text-sm text-amber-500">Đang chấm</span>
                                                                ) : submission.duration + "s"

                                                            }
                                                        </strong>
                                                    </div>
                                                </Link>
                                            </GitGraphNode>
                                        )
                                    })
                                }
                            </GitGraphBody>
                        </GitGraph> :
                        <div className="w-full flex justify-center py-10 bg-secondary/30 dark:bg-secondary/10 border rounded-lg">
                            <p className="text-center">Chưa có lịch sử nộp bài</p>
                        </div>
            }
            <div>
                <p className="text-sm">
                    <i className="fa-solid fa-circle-info mr-2 opacity-50"></i>
                    <span className="opacity-70">Được thực hiện bởi</span>
                    <Badge variant="secondary" className="rounded px-1.5 -translate-y-[2px] ml-2">
                        <i className="fa-regular fa-circle-play mr-1"></i>GitHub Actions
                    </Badge>
                </p>
            </div>
        </div >
    );
};

export default SubmissionHistory;