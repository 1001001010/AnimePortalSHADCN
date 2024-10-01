"use client";

import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/shadcn/ui/chat/chat-bubble";
import { ChatInput } from "@/shadcn/ui/chat/chat-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/shadcn/ui/chat/expandable-chat";
import { ChatMessageList } from "@/shadcn/ui/chat/chat-message-list";
import { Button, buttonVariants } from "@/shadcn/ui/button";
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/shadcn/ui/resizable";
// import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { cn } from "@/shadcn";

import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import CodeDisplayBlock from "./code-display-block";

export default function ChatSupport() {
    const [isGenerating, setIsGenerating] = useState(false);
    // const {
    //     messages,
    //     setMessages,
    //     input,
    //     handleInputChange,
    //     handleSubmit,
    //     isLoading,
    // } = useChat({
    //     onResponse(response) {
    //         if (response) {
    //             setIsGenerating(false);
    //         }
    //     },
    //     onError(error) {
    //         if (error) {
    //             setIsGenerating(false);
    //         }
    //     },
    // });

    const messagesRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // useEffect(() => {
    //     if (messagesRef.current) {
    //         messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    //     }
    // }, [messages]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsGenerating(true);
        // handleSubmit(e);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // if (isGenerating || isLoading || !input) return;
            setIsGenerating(true);
            onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    const links = [
        {
            title: "Inbox",
            label: "",
            icon: Inbox,
            variant: "default",
        },
        {
            title: "Drafts",
            label: "",
            icon: File,
            variant: "ghost",
        },
        {
            title: "Sent",
            label: "",
            icon: Send,
            variant: "ghost",
        },
        {
            title: "Junk",
            label: "",
            icon: ArchiveX,
            variant: "ghost",
        },
        {
            title: "Trash",
            label: "",
            icon: Trash2,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
        {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
        },
    ];

    return (
        <ExpandableChat size="md" position="bottom-right">
            <ExpandableChatHeader className="bg-muted/60 flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Чаты</h1>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={25} minSize={25} maxSize={40}>
                        <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-full overflow-y-auto">
                            <nav className="grid gap-1 px-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-1">
                                {links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href="#"
                                        className={cn(
                                            buttonVariants({
                                                variant: "default",
                                                size: "sm",
                                            }),
                                            link.variant === "default" &&
                                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                            "justify-start h-10"
                                        )}
                                    >
                                        {/* <link.icon className="mr-2 h-4 w-4" /> */}
                                        {link.title}
                                        {link.label && (
                                            <span
                                                className={cn(
                                                    "ml-auto",
                                                    link.variant ===
                                                        "default" &&
                                                        "text-background dark:text-white"
                                                )}
                                            >
                                                {link.label}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel>
                        <ChatMessageList
                            className="bg-muted/25"
                            ref={messagesRef}
                        >
                            {/* Initial message */}
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar src="" fallback="🤖" />
                                <ChatBubbleMessage variant={"received"}>
                                    Привет!
                                </ChatBubbleMessage>
                            </ChatBubble>
                            {/* Messages */}
                            <ChatBubble variant="sent">
                                <ChatBubbleAvatar src="" fallback="👨🏽" />
                                <ChatBubbleMessage>Бабах</ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar src="" fallback="🤖" />
                                <ChatBubbleMessage variant={"received"}>
                                    Привет!
                                </ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="sent">
                                <ChatBubbleAvatar src="" fallback="👨🏽" />
                                <ChatBubbleMessage>Бабах</ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar src="" fallback="🤖" />
                                <ChatBubbleMessage variant={"received"}>
                                    Привет!
                                </ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="sent">
                                <ChatBubbleAvatar src="" fallback="👨🏽" />
                                <ChatBubbleMessage>Бабах</ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar src="" fallback="🤖" />
                                <ChatBubbleMessage variant={"received"}>
                                    Привет!
                                </ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="sent">
                                <ChatBubbleAvatar src="" fallback="👨🏽" />
                                <ChatBubbleMessage>Бабах</ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar src="" fallback="🤖" />
                                <ChatBubbleMessage variant={"received"}>
                                    Привет!
                                </ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="sent">
                                <ChatBubbleAvatar src="" fallback="👨🏽" />
                                <ChatBubbleMessage>Бабах1</ChatBubbleMessage>
                            </ChatBubble>
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar src="" fallback="🤖" />
                                <ChatBubbleMessage variant={"received"}>
                                    Привет1!
                                </ChatBubbleMessage>
                            </ChatBubble>
                            {/* {messages &&
                messages.map((message, index) => (
                    <ChatBubble
                        key={index}
                        variant={
                            message.role == "user" ? "sent" : "received"
                        }
                    >
                        <ChatBubbleAvatar
                            src=""
                            fallback={
                                message.role == "user" ? "👨🏽" : "🤖"
                            }
                        />
                        <ChatBubbleMessage
                            variant={
                                message.role == "user"
                                    ? "sent"
                                    : "received"
                            }
                        >
                            {message.content
                                .split("```")
                                .map((part: string, index: number) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <Markdown
                                                key={index}
                                                remarkPlugins={[
                                                    remarkGfm,
                                                ]}
                                            >
                                                {part}
                                            </Markdown>
                                        );
                                    } else {
                                        return (
                                            <pre
                                                className=" pt-2"
                                                key={index}
                                            >
                                                <CodeDisplayBlock
                                                    code={part}
                                                    lang=""
                                                />
                                            </pre>
                                        );
                                    }
                                })}
                        </ChatBubbleMessage>
                    </ChatBubble>
                ))} */}

                            {/* Loading */}
                            {isGenerating && (
                                <ChatBubble variant="received">
                                    <ChatBubbleAvatar src="" fallback="🤖" />
                                    <ChatBubbleMessage isLoading />
                                </ChatBubble>
                            )}
                        </ChatMessageList>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ExpandableChatBody>
            <ExpandableChatFooter className="bg-muted/25">
                <form
                    ref={formRef}
                    className="flex relative gap-2"
                    onSubmit={onSubmit}
                >
                    <ChatInput
                        // value={input}
                        // onChange={handleInputChange}
                        onKeyDown={onKeyDown}
                        className="min-h-12 bg-background shadow-none "
                    />
                    <Button
                        className="absolute top-1/2 right-2 transform  -translate-y-1/2"
                        type="submit"
                        size="icon"
                        // disabled={isLoading || isGenerating || !input}
                    >
                        <Send className="size-4" />
                    </Button>
                </form>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}
