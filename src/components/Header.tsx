import { ModeToggle } from "@/components/mode-toggle";
import { Search, Bell, Settings, UserRound, LogOut } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { handleLogout } from "@/service/firebase";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useLogin } from "@/service/LoginContext";
import { DialogClose } from "@radix-ui/react-dialog";

function Header() {

    const loginContext = useLogin();

    return (
        <div className="flex gap-[10%] items-center justify-between p-3 px-6 border-b dark:bg-zinc-950">
            <div className="flex text-2xl font-black gap-[2px]">
                <span className="text-green-600 dark:text-green-500">
                    Hi
                </span>
                <span className="">
                    Commit
                </span>
            </div>
            <div className="relative ml-auto flex-1">
                <Search className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Tìm kiếm khoá học, bài tập..."
                    className="w-full rounded-md pl-9 flex-1"
                />
            </div>
            <div className="flex gap-3">
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Bell className="h-[1.2rem] w-[1.2rem]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Thông báo
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[180px]">
                        <DropdownMenuLabel>
                            <div>
                                Thông báo
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >Tin nhắn 1</DropdownMenuItem>
                        <DropdownMenuItem >Tin nhắn 2</DropdownMenuItem>
                        <DropdownMenuItem >Tin nhắn 3</DropdownMenuItem>
                        <DropdownMenuItem >Tin nhắn 4</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full">
                            <Avatar>
                                <AvatarImage className="w-10 aspect-square rounded-full border" src={loginContext?.user.avatar_url} alt="@shadcn" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[180px]">
                            <DropdownMenuLabel>
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage className="w-10 aspect-square rounded-full border" src={loginContext?.user.avatar_url} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <div className="font-bold">{loginContext?.user.name ? loginContext?.user.name : loginContext?.user.login}</div>
                                        <div className="text-sm opacity-50 font-medium">{loginContext?.user.email}</div>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem ><UserRound className="mr-2 w-4 aspect-square" />Tài khoản của tôi</DropdownMenuItem>
                            <DropdownMenuItem ><Bell className="mr-2 w-4 aspect-square" />Thông báo</DropdownMenuItem>
                            <DropdownMenuItem ><Settings className="mr-2 w-4 aspect-square" />Cài đặt</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                                <DropdownMenuItem >
                                    <LogOut className="mr-2 w-4 aspect-square" />Đăng xuất
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="mb-1">Đăng xuất khỏi tài khoản này?</DialogTitle>
                            <DialogDescription>
                                Bạn sẽ không thể truy cập vào HiCommit, đến khi đăng nhập trở lại.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" size="sm">Đóng</Button>
                            </DialogClose>
                            <Button variant="destructive" size="sm" onClick={() => handleLogout()}>Đăng xuất</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Header;