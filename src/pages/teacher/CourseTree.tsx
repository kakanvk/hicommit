import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ChevronRight, GitMerge, GripVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { NodeRendererProps, Tree, useSimpleTree } from 'react-arborist';
import { Link } from 'react-router-dom';

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
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';

const CourseTree = (props: any) => {

    const { dataFromAPI, setDataFromAPI } = props;

    const treeRef = useRef(null);

    // Re-initialize data and controller when dataFromAPI changes
    const [data, controller] = useSimpleTree(dataFromAPI);

    const getQuanlityNode = (data: any) => {
        let count = 0;
        data.map((item: any) => {
            count++;
            if (item.children) {
                count += item.children.length;
            }
        });
        return count;
    }

    const handleExportData = () => {
        console.log(dataFromAPI);
    };

    function Node({ node, dragHandle }: NodeRendererProps<any>) {
        const [newLabName, setNewLabName] = useState(node.data.name);

        const handleMoveUp = (id: string) => {
            const index = dataFromAPI.findIndex((item: any) => item.id === id);
            if (index > 0) {
                const temp = dataFromAPI[index];
                dataFromAPI[index] = dataFromAPI[index - 1];
                dataFromAPI[index - 1] = temp;
                setDataFromAPI([...dataFromAPI]);
            }
        };

        const handleMoveDown = (id: string) => {
            const index = dataFromAPI.findIndex((item: any) => item.id === id);
            if (index < dataFromAPI.length - 1) {
                const temp = dataFromAPI[index];
                dataFromAPI[index] = dataFromAPI[index + 1];
                dataFromAPI[index + 1] = temp;
                setDataFromAPI([...dataFromAPI]);
            }
        };

        // Hàm để ngăn chặn sự kiện phím tắt khi chỉnh sửa tên
        const handleKeyDown = (event: React.KeyboardEvent) => {
            event.stopPropagation();
        };

        return (
            node.isLeaf ?
                <div ref={dragHandle as any} className="h-[50px] w-full flex items-center">
                    <Link className="w-full hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2.5 pl-4 pr-3 pb-3 rounded-lg flex items-center justify-between group/work" to="/problem/1">
                        <h3 className="flex items-start gap-3 flex-1">
                            <GripVertical className="w-5 h-5 cursor-move opacity-70 translate-y-[2.5px]" />
                            <span className="flex-1 line-clamp-1">{node.data.name}</span>
                        </h3>
                        <ChevronRight className="w-4 invisible group-hover/work:visible" />
                    </Link>
                </div>
                :
                <div className="w-full mt-2 flex items-center justify-between group/unit cursor-pointer pb-1 gap-4">
                    <h2 className="font-semibold text-lg line-clamp-1">
                        <GitMerge className="inline-block w-5 mr-2 text-green-600 dark:text-green-500 -translate-y-[1px]" />{node.data.name}
                    </h2>
                    <Separator className='flex-1 h-[1px] bg-secondary opacity-0 group-hover/unit:opacity-100' />
                    <div className="opacity-0 group-hover/unit:opacity-100 border rounded-xl h-fit flex gap-1 p-1">
                        <Link to="/" className='flex'>
                            <Button className="h-6 w-6" size="icon">
                                <Plus className="w-[17px]" />
                            </Button>
                        </Link>
                        <Button size="icon" variant="ghost" className="w-6 h-6" onClick={() => handleMoveUp(node.data.id)}>
                            <ArrowUp className="w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-6 h-6" onClick={() => handleMoveDown(node.data.id)}>
                            <ArrowDown className="w-4" />
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="w-6 h-6">
                                    <Pencil className="w-[13px]" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Chỉnh sửa bài Lab</DialogTitle>
                                </DialogHeader>
                                <Input
                                    className="w-full mt-2 placeholder:italic"
                                    placeholder="Nhập tên mới cho bài Lab"
                                    value={newLabName}
                                    onChange={e => {
                                        setNewLabName(e.target.value);
                                    }}
                                    onKeyDown={handleKeyDown}
                                />
                                <DialogFooter className="mt-2">
                                    <DialogClose>
                                        <Button variant="ghost">
                                            Đóng
                                        </Button>
                                    </DialogClose>
                                    <DialogClose>
                                        <Button className="w-fit px-4">Cập nhật</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button size="icon" variant="ghost" className="w-6 h-6 hover:bg-red-500/20 dark:hover:bg-red-500/40">
                            <Trash2 className="w-[14px]" />
                        </Button>
                    </div>
                </div>
        );
    }

    return (
        <div className='tree-parent'>
            <Tree
                data={data}
                ref={treeRef}
                {...controller}
                indent={5}
                rowHeight={50}
                overscanCount={1}
                disableEdit={true}
                className="w-full"
                openByDefault={true}
                width={"100%"}
                height={getQuanlityNode(data) * 50 + 5}
            >
                {Node as any}
            </Tree>
            {/* <Button onClick={() => handleExportData()}>Export Data</Button> */}
        </div>
    );
};

export default CourseTree;
