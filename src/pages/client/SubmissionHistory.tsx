
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
import { vi } from 'date-fns/locale';
import Loader2 from "@/components/ui/loader2";

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

function SubmissionHistory() {

    const { problem_id } = useParams();

    const { user } = useLogin(); // Lấy thông tin user từ context
    const githubAPI = createGitHubAPI(user.accessToken);

    const [actions, setActions] = useState<any[]>([]);

    const getActions = async () => {
        const data = await githubAPI.getActionsByBranch('kakanvk', 'hicommit-submissions', 'test-cpp');
        console.log(data);
        setActions(data);
    }

    useEffect(() => {
        getActions();
    }, []);

    return (
        <div className="SubmissionHistory flex flex-col gap-8">
            {
                !actions.length ?
                    <div className="w-full flex justify-center py-10">
                        <Loader2 />
                    </div>
                    :
                    <GitGraph>
                        <GitGraphBody className="">
                            <GitGraphFree className="h-2" />
                            {
                                actions?.map((action, index) => {
                                    return (
                                        <GitGraphNode key={index} end={index === actions?.length - 1 ? true : false}>
                                            <Link className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border bg-zinc-100/80 dark:bg-zinc-900 hover:bg-zinc-200/50 hover:dark:bg-zinc-800/70 p-3 px-5 rounded-lg duration-100" to={`/submission/${action.id}`}>
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <p className="font-semibold text-base">
                                                        {action?.display_title}
                                                        {
                                                            !action?.conclusion ? (
                                                                <i className="fa-solid fa-hourglass-half text-amber-500 ml-2.5 text-[14px]"></i>
                                                            ) : action?.conclusion === "success" ? (
                                                                <i className="fa-solid fa-circle-check text-green-600 ml-2.5 text-[14px]"></i>
                                                            ) : (
                                                                <i className="fa-solid fa-circle-xmark text-red-500 ml-2.5 text-[14px]"></i>
                                                            )
                                                            // <i className="fa-solid fa-circle-exclamation text-amber-500 ml-2.5 text-[14px]"></i>
                                                        }
                                                    </p>
                                                    <div className="text-[14px] flex items-baseline gap-1.5 flex-wrap">
                                                        <span className="opacity-70">Commit bởi</span>
                                                        <HoverCard openDelay={300}>
                                                            <HoverCardTrigger>
                                                                <strong className="font-semibold hover:underline cursor-pointer">{action.actor?.login}</strong>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent className="w-70" side="bottom" align="start">
                                                                <div className="flex gap-4">
                                                                    <Avatar>
                                                                        <AvatarImage className="w-14 rounded-full" src={action.actor.avatar_url} />
                                                                    </Avatar>
                                                                    <div className="space-y-1">
                                                                        <h4 className="text-sm font-semibold text-green-600 dark:text-green-500">@{action.head_commit.author.username}</h4>
                                                                        <p className="text-sm">
                                                                            {action.head_commit.author.email}
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

                                                        <span className="opacity-50 text-[13px] font-medium dark:font-normal ml-0.5">
                                                            <i className="fa-solid fa-circle text-[3px] -translate-y-[3.5px] mr-2"></i>
                                                            {timeAgo(action.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start sm:items-end gap-1">
                                                    <span className="text-xs opacity-60">Thời gian</span>
                                                    <strong>
                                                        {
                                                            !action.conclusion ? (
                                                                <span className="text-sm text-amber-500">Đang chấm</span>
                                                            ) : calculateTimeDifference(action.created_at, action.updated_at)

                                                        }
                                                    </strong>
                                                </div>
                                            </Link>
                                        </GitGraphNode>
                                    )
                                })
                            }
                        </GitGraphBody>
                    </GitGraph>
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