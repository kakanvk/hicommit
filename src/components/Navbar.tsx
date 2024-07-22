import { useState } from 'react';
import { Link } from "react-router-dom";

import { Medal, Home, MessageCircle, Package, Album, PieChart, Github, Star, ChevronLeft, ChevronRight, Atom, Milestone, Flame, Podcast, MessageCircleCode, Pyramid } from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from './ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Badge } from "@/components/ui/badge"

import { motion } from "framer-motion";
import { useClientUI } from '@/service/ClientUIContext';
import { Separator } from './ui/separator';

function Navbar() {

    const { expanded, setExpanded } = useClientUI();

    const toggleNav = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="Navbar">
            <motion.div
                className={`bg-white dark:bg-zinc-950 h-full border-r relative`}
                initial={{ width: "280px" }}
                animate={{ width: expanded ? "280px" : "fit-content" }}
                transition={{ duration: 0.2 }}
            >
                <div className={`flex flex-col ${expanded ? 'gap-10' : 'gap-3'} p-4`}>
                    <div className="flex flex-col gap-3">
                        {/* {
                            expanded &&
                            <div className='flex gap-3 items-center'>
                                <span className="text-[12px] font-medium opacity-50">Khám phá</span>
                                <Separator className='flex-1' />
                            </div>
                        } */}
                        <div className="flex flex-col gap-3 font-medium">
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname === "/" ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="">
                                            <Home className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: !expanded ? 0 : 1,
                                                }}
                                                transition={{
                                                    duration: !expanded ? 0 : 0.4,
                                                    delay: !expanded ? 0 : 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {expanded && "Trang chủ"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Trang chủ</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                            {
                                expanded ?
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1" className="border-0">
                                            <AccordionTrigger className="flex rounded p-2 pl-4 border-0 hover:no-underline">
                                                <div className="flex">
                                                    <Package className={`${expanded && 'mr-3'} w-4 aspect-square`} />{expanded && <span>Khoá học của tôi</span>}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-2 px-4 py-2 text-base">
                                                <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/course/1') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="/course/1">
                                                    <Album className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                                    {expanded && <span className="flex-1 truncate">Kỹ thuật lập trình</span>}
                                                </Link>
                                                <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/course/2') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="/course/2">
                                                    <Album className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                                    {expanded && <span className="flex-1 truncate">Lập trình hướng đối tượng</span>}
                                                </Link>
                                                <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/course/3') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="/course/3">
                                                    <Album className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                                    {expanded && <span className="flex-1 truncate">Công nghệ phần mềm</span>}
                                                </Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion> :
                                    <DropdownMenu>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <DropdownMenuTrigger className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/course/') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}>
                                                        <Package className='w-4 aspect-square' />
                                                    </DropdownMenuTrigger>
                                                </TooltipTrigger>
                                                {
                                                    !expanded &&
                                                    <TooltipContent side="right">
                                                        <p>Khoá học của tôi</p>
                                                    </TooltipContent>
                                                }
                                            </Tooltip>
                                        </TooltipProvider>
                                        <DropdownMenuContent side="bottom" align="start">
                                            <DropdownMenuLabel className='flex gap-2'>
                                                Khoá học của tôi
                                                <Badge className='rounded' variant="secondary">3</Badge>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className='flex flex-col gap-1'>
                                                <DropdownMenuItem asChild>
                                                    <Link className={`flex rounded p-2 px-3 ${location.pathname.startsWith('/course/1') ? 'bg-zinc-200 dark:bg-zinc-800' : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`} to="/course/1">
                                                        <Album className='mr-3 w-4 aspect-square' />
                                                        <span className="flex-1 truncate">Kỹ thuật lập trình</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link className={`flex rounded p-2 px-3 ${location.pathname.startsWith('/course/2') ? 'bg-zinc-200 dark:bg-zinc-800' : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`} to="/course/2">
                                                        <Album className='mr-3 w-4 aspect-square' />
                                                        <span className="flex-1 truncate">Lập trình hướng đối tượng</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link className={`flex rounded p-2 px-3 ${location.pathname.startsWith('/course/3') ? 'bg-zinc-200 dark:bg-zinc-800' : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`} to="/course/3">
                                                        <Album className='mr-3 w-4 aspect-square' />
                                                        <span className="flex-1 truncate">Công nghệ phần mềm</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                            }
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/problems') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="problems">
                                            <Pyramid className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: !expanded ? 0 : 1,
                                                }}
                                                transition={{
                                                    duration: !expanded ? 0 : 0.4,
                                                    delay: !expanded ? 0 : 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {expanded && "Các bài tập"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Các bài tập</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/contest') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="contest">
                                            <Medal className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: !expanded ? 0 : 1,
                                                }}
                                                transition={{
                                                    duration: !expanded ? 0 : 0.4,
                                                    delay: !expanded ? 0 : 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {expanded && "Các cuộc thi"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Các cuộc thi</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/message') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="message">
                                            <MessageCircleCode className={`${expanded && 'mr-3'} w-[17px]`} />
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: !expanded ? 0 : 1,
                                                }}
                                                transition={{
                                                    duration: !expanded ? 0 : 0.4,
                                                    delay: !expanded ? 0 : 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {expanded && "Cuộc trò chuyện"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Cuộc trò chuyện</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/forum') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="forum">
                                            <Podcast className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: !expanded ? 0 : 1,
                                                }}
                                                transition={{
                                                    duration: !expanded ? 0 : 0.4,
                                                    delay: !expanded ? 0 : 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {expanded && "Diễn đàn"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Diễn đàn</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className='flex gap-3 items-center'>
                            {
                                expanded &&
                                <span className="text-[12px] font-medium opacity-50">Dành cho giáo viên</span>
                            }
                            <Separator className='flex-1' />
                        </div>
                        <div className="flex flex-col gap-3 font-medium">
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/course-manager') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="/course-manager">
                                            <Atom className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: !expanded ? 0 : 1,
                                                }}
                                                transition={{
                                                    duration: !expanded ? 0 : 0.4,
                                                    delay: !expanded ? 0 : 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {expanded && "Quản lý khoá học"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Quản lý khoá học</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/analysis') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="analysis">
                                            <PieChart className={`${expanded && 'mr-3'} w-4 aspect-square`} />
                                            <motion.span
                                                initial={{ opacity: 1 }}
                                                animate={{
                                                    opacity: !expanded ? 0 : 1,
                                                }}
                                                transition={{
                                                    duration: !expanded ? 0 : 0.4,
                                                    delay: !expanded ? 0 : 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {expanded && "Thống kê"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Thống kê</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" onClick={toggleNav} className='absolute bottom-3 right-4'>
                                    {
                                        expanded ?
                                            <ChevronLeft className='w-4' />
                                            : <ChevronRight className='w-4' />
                                    }
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" align='center'>
                                {
                                    expanded ?
                                        <p>Thu gọn</p>
                                        : <p>Mở rộng</p>
                                }
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </motion.div >
        </div >
    );
};

export default Navbar;