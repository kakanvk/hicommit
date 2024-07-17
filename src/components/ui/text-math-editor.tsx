import React, { useState, useRef, useEffect } from "react";
import { Badge } from "./badge";
import { Clipboard, Code, Copy, Image, Pi, Plus, Scissors, SquarePi } from "lucide-react";
import { useTheme } from "../theme-provider";

import "//unpkg.com/mathlive";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "./button";
import { InlineMath } from "react-katex";
import { renderToString } from "react-dom/server";

const TextAndMathEditor = () => {

    const { theme } = useTheme();

    const mf = useRef<MathMLElement | null>(null);

    const autoToggleKeyBoard = () => {
        (window as any).mathVirtualKeyboard.show();
    }

    const [value, setValue] = useState("");

    const [content, setContent] = useState("<p className='inline'></p>");
    const editorRef = useRef(null);

    const handleContentChange = (event: any) => {
        setContent(event.target.innerHTML);
    };

    const handleInsertMath = (math: any) => {

        // Xử lý math: nếu có dấu \ thì thay thế bằng \\ để tránh lỗi
        
        console.log("Inserting math: ", math);

        const mathJSX = (
            <>
                <div contentEditable="false" className="w-fit math-badge inline" data-math="123">
                    <Badge className="rounded-sm px-0.5 py-0 bg-transparent cursor-pointer m-0" variant="secondary">
                        <InlineMath math={`${math}`} />
                    </Badge>
                </div>
                <p className="inline" autoFocus></p>
            </>
        );

        const mathHTMLString = renderToString(mathJSX);

        if (editorRef.current) {
            const editor = editorRef.current;
            const selection = window.getSelection();
            const range = (selection as any).getRangeAt(0);
            range.deleteContents();
            const div = document.createElement('div');
            div.innerHTML = mathHTMLString;
            const frag = document.createDocumentFragment();
            let node;
            let lastNode;
            while ((node = div.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Move the cursor to the end of the inserted content
            if (lastNode && selection) {
                range.setStartAfter(lastNode);
                range.collapse(true);
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }

            setContent((editor as any).innerHTML);
            setValue("");
        }
    };

    return (
        <div className="flex flex-col gap-2 items-start">
            <AlertDialog>
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <div
                            ref={editorRef}
                            contentEditable
                            dangerouslySetInnerHTML={{ __html: content }}
                            onChange={handleContentChange}
                            className="w-full min-h-[78px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:italic"
                        />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem><Scissors className="w-4 h-4 mr-3" />Cắt</ContextMenuItem>
                        <ContextMenuItem><Copy className="w-4 h-4 mr-3" />Sao chép</ContextMenuItem>
                        <ContextMenuItem onClick={() => handleInsertMath("188^223")}><Clipboard className="w-4 h-4 mr-3" />Dán</ContextMenuItem>
                        <ContextMenuSeparator />
                        <AlertDialogTrigger>
                            <ContextMenuItem><Image className="w-4 h-4 mr-3" />Chèn hình ảnh</ContextMenuItem>
                            <ContextMenuItem><Code className="w-4 h-4 mr-3" />Chèn khối code</ContextMenuItem>
                            <ContextMenuItem className="pr-4"><Pi className="w-4 h-4 mr-3" />Chèn biểu thức toán học</ContextMenuItem>
                        </AlertDialogTrigger>
                    </ContextMenuContent>
                </ContextMenu>
                <AlertDialogContent className="top-[30%]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Chèn biểu thức toán học</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div>
                        <math-field
                            ref={mf}
                            onInput={(evt: any) => setValue(evt.target.value)}
                            style={{ width: "100%", paddingLeft: "10px", border: theme == "dark" ? "1px solid #bebebe55" : "1px solid #bebebe", borderRadius: "5px", backgroundColor: "transparent", color: theme === "dark" ? "#fff" : "#000" }}
                            onFocus={() => autoToggleKeyBoard()}
                        >
                            {value}
                        </math-field>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                            <Button variant="ghost">
                                Huỷ
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleInsertMath(value)}>Chèn</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default TextAndMathEditor;
