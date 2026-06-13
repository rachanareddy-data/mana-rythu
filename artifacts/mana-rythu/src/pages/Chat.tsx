import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import {
  useGetConversations, getGetConversationsQueryKey,
  useGetMessages, getGetMessagesQueryKey,
  useSendMessage,
  useDeleteMessage,
} from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageCircle, ArrowLeft, Sprout, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

function ConversationItem({
  conv,
  userId,
  active,
  onClick,
}: {
  conv: any;
  userId: number;
  active: boolean;
  onClick: () => void;
}) {
  const otherName = conv.buyerId === userId ? (conv.farmerName ?? "Farmer") : (conv.buyerName ?? "Buyer");
  const initial = otherName.slice(0, 1).toUpperCase();

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/60 border-b border-border/60",
        active && "bg-primary/5 border-l-2 border-l-primary"
      )}
    >
      <Avatar className="w-10 h-10 shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{initial}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <p className="font-semibold text-sm text-foreground truncate">{otherName}</p>
          <span className="text-[10px] text-muted-foreground shrink-0">
            {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
          </span>
        </div>
        {conv.cropName && (
          <div className="flex items-center gap-1 mt-0.5">
            <Sprout className="w-3 h-3 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground truncate">{conv.cropName}</p>
          </div>
        )}
        {conv.lastMessage && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
        )}
      </div>
      {conv.unreadCount > 0 && (
        <Badge className="bg-primary text-primary-foreground text-[10px] h-5 min-w-5 px-1.5 shrink-0">
          {conv.unreadCount}
        </Badge>
      )}
    </button>
  );
}

function ChatWindow({ conversationId, userId, otherName }: { conversationId: number; userId: number; otherName: string }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgParams = { conversationId, markReadFor: userId };

  const { data: messages, isLoading } = useGetMessages(msgParams, {
    query: {
      queryKey: getGetMessagesQueryKey(msgParams),
      refetchInterval: 5000,
    },
  });

  const sendMutation = useSendMessage();
  const deleteMutation = useDeleteMessage();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText("");
    sendMutation.mutate(
      { data: { conversationId, senderId: userId, message: trimmed } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getGetMessagesQueryKey(msgParams) });
          qc.invalidateQueries({ queryKey: getGetConversationsQueryKey({ userId }) });
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!pendingDeleteId) return;
    const idToDelete = pendingDeleteId;
    setPendingDeleteId(null);

    // Optimistic: remove from cache immediately
    const key = getGetMessagesQueryKey(msgParams);
    qc.setQueryData(key, (old: any[]) => old?.filter(m => m.id !== idToDelete) ?? []);

    deleteMutation.mutate(
      { id: idToDelete },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: key });
          qc.invalidateQueries({ queryKey: getGetConversationsQueryKey({ userId }) });
        },
        onError: () => {
          // Roll back optimistic update on failure
          qc.invalidateQueries({ queryKey: key });
          toast({ title: "Failed to delete message", variant: "destructive" });
        },
      }
    );
  };

  return (
    <>
      {/* Confirm delete dialog */}
      <AlertDialog open={pendingDeleteId !== null} onOpenChange={open => { if (!open) setPendingDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete message?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className={cn("h-10 w-48 rounded-2xl", i % 2 === 0 ? "ml-auto" : "")} />
              ))}
            </div>
          ) : messages && messages.length > 0 ? (
            messages.map((msg, idx) => {
              const isMine = msg.senderId === userId;
              // Debug: log first message structure once
              if (idx === 0) {
                console.log("[Chat] message object:", { id: msg.id, senderId: msg.senderId, message: msg.message, createdAt: msg.createdAt });
              }
              return (
                <div key={msg.id} className={cn("flex items-end gap-1.5", isMine ? "justify-end" : "justify-start")}>
                  {/* Delete button — left of bubble, always visible for own messages */}
                  {isMine && (
                    <button
                      onClick={() => {
                        console.log("[Chat] delete clicked for message id:", msg.id);
                        setPendingDeleteId(msg.id);
                      }}
                      className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 active:bg-destructive/20 transition-colors shrink-0 mb-0.5"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                      isMine
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border border-border text-foreground rounded-bl-sm"
                    )}
                  >
                    <p className="leading-relaxed">{msg.message}</p>
                    <p className={cn("text-[10px] mt-1 text-right", isMine ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <MessageCircle className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">No messages yet</p>
              <p className="text-xs text-muted-foreground mt-1">Start the conversation with {otherName}</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 bg-card">
          <div className="flex gap-2">
            <Input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type a message..."
              className="flex-1 h-10 rounded-xl"
            />
            <Button
              onClick={handleSend}
              disabled={!text.trim() || sendMutation.isPending}
              size="icon"
              className="h-10 w-10 rounded-xl shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Chat() {
  const { user } = useAuth();
  const params = useParams<{ id?: string }>();
  const urlConvId = params.id ? parseInt(params.id) : null;
  const [activeConvId, setActiveConvId] = useState<number | null>(urlConvId);

  const convParams = { userId: user?.id ?? 0 };
  const { data: conversations, isLoading } = useGetConversations(convParams, {
    query: {
      enabled: !!user,
      queryKey: getGetConversationsQueryKey(convParams),
      refetchInterval: 15_000,
    },
  });

  // When conversations load, if we have a URL conv ID but it's not in the list yet, set it
  useEffect(() => {
    if (urlConvId && !activeConvId) setActiveConvId(urlConvId);
  }, [urlConvId]);

  const activeConv = conversations?.find(c => c.id === activeConvId);
  const otherName = activeConv && user
    ? (activeConv.buyerId === user.id ? (activeConv.farmerName ?? "Farmer") : (activeConv.buyerName ?? "Buyer"))
    : "";

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <MessageCircle className="w-12 h-12 text-muted-foreground mb-3" />
        <h3 className="font-semibold text-foreground mb-1">Sign in to access chat</h3>
      </div>
    );
  }

  const totalUnread = conversations?.reduce((s, c) => s + (c.unreadCount ?? 0), 0) ?? 0;

  return (
    <div className="flex h-full">
      {/* Sidebar — conversation list */}
      <div
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all",
          activeConvId ? "hidden md:flex md:w-72 lg:w-80" : "flex w-full md:w-72 lg:w-80"
        )}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Messages</h2>
            {totalUnread > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] h-5 px-1.5">{totalUnread}</Badge>
            )}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
              ))}
            </div>
          ) : conversations && conversations.length > 0 ? (
            conversations.map(conv => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                userId={user.id}
                active={conv.id === activeConvId}
                onClick={() => setActiveConvId(conv.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <MessageCircle className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground font-medium">No conversations yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click "Chat Farmer" on any listing to start a conversation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat window */}
      {activeConvId ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card shrink-0">
            <button
              onClick={() => setActiveConvId(null)}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Avatar className="w-9 h-9 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                {otherName.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-foreground">{otherName}</p>
              {activeConv?.cropName && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sprout className="w-3 h-3" /> {activeConv.cropName}
                </p>
              )}
            </div>
          </div>
          <ChatWindow conversationId={activeConvId} userId={user.id} otherName={otherName} />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Select a conversation</p>
          </div>
        </div>
      )}
    </div>
  );
}
