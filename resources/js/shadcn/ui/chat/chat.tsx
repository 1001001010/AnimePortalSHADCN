"use client";

import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/shadcn/ui/chat/chat-bubble";
import { ChatInput } from "@/shadcn/ui/chat/chat-input";
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/shadcn/ui/chat/expandable-chat";
import { ChatMessageList } from "@/shadcn/ui/chat/chat-message-list";
import { Button } from "@/shadcn/ui/button";
import { Send } from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/shadcn/ui/resizable";
// import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
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

    return (
        <ExpandableChat size="md" position="bottom-right">
            <ExpandableChatHeader className="bg-muted/60 flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Чаты</h1>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={25} minSize={10} maxSize={50}>
                        One
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
                                <ChatBubbleMessage>Привет!</ChatBubbleMessage>
                            </ChatBubble>
                            {/* Messages */}
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
