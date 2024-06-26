import { useState } from 'react';
import { Link } from "react-router-dom";

import { Medal, Home, MessageCircle, Package, Album, PieChart, Github, Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex flex-col gap-3">
                        {/* {
                            expanded &&
                            <span className="text-[12px] font-bold opacity-50">KHÁM PHÁ</span>
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
                                                    <DropdownMenuTrigger className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/course') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}>
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
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/favourite') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="favourite">
                                            <Star className={`${expanded && 'mr-3'} w-4 aspect-square`} />
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
                                                {expanded && "Được đánh dấu"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Danh sách yêu thích</p>
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/message') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="message">
                                            <MessageCircle className={`${expanded && 'mr-3'} w-4 aspect-square`} />
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
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link className={`flex rounded p-2 px-4 ${location.pathname.startsWith('/mygithub') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`} to="mygithub">
                                            <Github className={`${expanded && 'mr-3'} w-4 aspect-square`} />
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
                                                {expanded && "GitHub của tôi"}
                                            </motion.span>
                                        </Link>
                                    </TooltipTrigger>
                                    {
                                        !expanded &&
                                        <TooltipContent side="right">
                                            <p>Github của tôi</p>
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