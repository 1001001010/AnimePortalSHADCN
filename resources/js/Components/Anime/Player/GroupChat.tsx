"use client";

import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/shadcn/ui/chat/chat-bubble";
import { ChatInput } from "@/shadcn/ui/chat/chat-input";
import { ChatMessageList } from "@/shadcn/ui/chat/chat-message-list";
import { Button, buttonVariants } from "@/shadcn/ui/button";
import { CornerDownLeft, Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { PageProps } from "@/types";
import { ExpandableChatBody } from "@/shadcn/ui/chat/expandable-chat";
import { cn } from "@/shadcn";
import { Link } from "@inertiajs/react";

export default function GroupChat({ auth }: PageProps<{}>) {
    const [isGenerating, setIsGenerating] = useState(false);

    const messagesRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsGenerating(true);
    };

    // const links = [
    //     {
    //         title: "Inbox",
    //         label: "",
    //         variant: "default",
    //     },
    //     {
    //         title: "Drafts",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Sent",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Junk",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Trash",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",

    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",

    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",
    //         variant: "ghost",
    //     },
    //     {
    //         title: "Archive",
    //         label: "",

    //         variant: "ghost",
    //     },
    // ];

    return (
        <div className="flex-grow w-2/6">
            <main className="flex w-full max-w-3xl flex-col items-center max-h-screen h-full border pb-3 rounded">
                <ExpandableChatBody className="w-full">
                    <ChatMessageList
                        className="w-full overflow-auto"
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
                            <ChatBubbleMessage>Бабах</ChatBubbleMessage>
                        </ChatBubble>
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar src="" fallback="🤖" />
                            <ChatBubbleMessage variant={"received"}>
                                Привет!
                            </ChatBubbleMessage>
                        </ChatBubble>
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar src="" fallback="🤖" />
                            <ChatBubbleMessage variant={"received"}>
                                Привет!
                            </ChatBubbleMessage>
                        </ChatBubble>
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar src="" fallback="🤖" />
                            <ChatBubbleMessage variant={"received"}>
                                Привет!
                            </ChatBubbleMessage>
                        </ChatBubble>
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar src="" fallback="🤖" />
                            <ChatBubbleMessage variant={"received"}>
                                Привет!
                            </ChatBubbleMessage>
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
                        {/* Loading */}
                        {isGenerating && (
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar src="" fallback="🤖" />
                                <ChatBubbleMessage isLoading />
                            </ChatBubble>
                        )}
                    </ChatMessageList>
                </ExpandableChatBody>
                <div className="w-full px-4">
                    <form
                        ref={formRef}
                        onSubmit={onSubmit}
                        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                    >
                        <ChatInput
                            // value={input}
                            // onKeyDown={onKeyDown}
                            // onChange={handleInputChange}
                            placeholder="Ваше сообщение..."
                            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                        />
                        <div className="flex items-center flex-end p-3 pt-0">
                            {/* <Button variant="ghost" size="icon">
                                        <Paperclip className="size-4" />
                                        <span className="sr-only">
                                            Attach file
                                        </span>
                                    </Button> */}

                            <Button
                                // disabled={!input || isLoading}
                                type="submit"
                                size="sm"
                                className="ml-auto gap-1.5"
                            >
                                Отправить
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
