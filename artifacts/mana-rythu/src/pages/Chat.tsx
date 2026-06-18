import { useState, useRef, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import {
  useGetConversations, getGetConversationsQueryKey,
  useGetMessages, getGetMessagesQueryKey,
  useSendMessage,
  useDeleteMessage,
  useUpdateMessage,
} from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Send, MessageCircle, ArrowLeft, Sprout, Phone, MoreVertical, Pencil, Trash2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

function ConversationItem({
  conv, userId, active, onClick,
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
        "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-muted/60 border-b border-border/40 relative",
        active && "bg-primary/5"
      )}
    >
      {active && <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-primary rounded-full" />}
      <div className="relative shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarFallback className={cn(
            "font-bold text-sm",
            active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
          )}>
            {initial}
          </AvatarFallback>
        </Avatar>
        {conv.unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-card text-[8px] font-bold text-white flex items-center justify-center">
            {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <p className={cn("font-semibold text-sm truncate", active ? "text-primary" : "text-foreground")}>{otherName}</p>
          <span className="text-[10px] text-muted-foreground shrink-0">
            {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
          </span>
        </div>
        {conv.cropName && (
          <p className="text-[10px] text-primary/70 font-medium flex items-center gap-1 mb-0.5">
            <Sprout className="w-2.5 h-2.5 shrink-0" /> {conv.cropName}
          </p>
        )}
        {conv.lastMessage && (
          <p className={cn("text-xs truncate", conv.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground")}>
            {conv.lastMessage}
          </p>
        )}
      </div>
    </button>
  );
}

function ChatWindow({ conversationId, userId, otherName }: { conversationId: number; userId: number; otherName: string }) {
  const qc = useQueryClient();
  const { toast } = useToast();

  const [text, setText] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const msgParams = { conversationId, markReadFor: userId };

  const { data: messages, isLoading } = useGetMessages(msgParams, {
    query: {
      queryKey: getGetMessagesQueryKey(msgParams),
      refetchInterval: 5000,
    },
  });

  const sendMutation = useSendMessage();
  const deleteMutation = useDeleteMessage();
  const updateMutation = useUpdateMessage();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (editingId !== null) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [editingId]);

  const closeMenu = useCallback(() => setOpenMenuId(null), []);

  useEffect(() => {
    if (openMenuId === null) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenuId, closeMenu]);

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

    const key = getGetMessagesQueryKey(msgParams);
    qc.setQueryData(key, (old: any[]) => old?.filter(m => m.id !== idToDelete) ?? []);

    deleteMutation.mutate(
      { id: idToDelete, data: { senderId: userId } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: key });
          qc.invalidateQueries({ queryKey: getGetConversationsQueryKey({ userId }) });
        },
        onError: () => {
          qc.invalidateQueries({ queryKey: key });
          toast({ title: "Failed to delete message", variant: "destructive" });
        },
      }
    );
  };

  const startEdit = (msg: { id: number; message: string }) => {
    setOpenMenuId(null);
    setEditingId(msg.id);
    setEditText(msg.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const commitEdit = (id: number) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setEditingId(null);

    const key = getGetMessagesQueryKey(msgParams);
    qc.setQueryData(key, (old: any[]) =>
      old?.map(m => m.id === id ? { ...m, message: trimmed, edited: true } : m) ?? []
    );

    updateMutation.mutate(
      { id, data: { senderId: userId, message: trimmed } },
      {
        onSuccess: (updated) => {
          qc.setQueryData(key, (old: any[]) =>
            old?.map(m => m.id === id ? updated : m) ?? []
          );
          qc.invalidateQueries({ queryKey: getGetConversationsQueryKey({ userId }) });
        },
        onError: () => {
          qc.invalidateQueries({ queryKey: key });
          toast({ title: "Failed to edit message", variant: "destructive" });
        },
      }
    );
  };

  const groupedMessages = messages?.reduce<{ date: string; msgs: typeof messages }[]>((acc, msg) => {
    const date = new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long" });
    const last = acc[acc.length - 1];
    if (last?.date === date) { last.msgs.push(msg); } else { acc.push({ date, msgs: [msg] }); }
    return acc;
  }, []) ?? [];

  return (
    <>
      <AlertDialog open={pendingDeleteId !== null} onOpenChange={open => { if (!open) setPendingDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
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
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)", backgroundSize: "24px 24px" }}
        >
          {isLoading ? (
            <div className="space-y-4 pt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={cn("flex", i % 2 === 0 ? "justify-start" : "justify-end")}>
                  <Skeleton className={cn("h-10 rounded-2xl", i % 2 === 0 ? "w-44" : "w-36")} />
                </div>
              ))}
            </div>
          ) : messages && messages.length > 0 ? (
            <AnimatePresence initial={false}>
              {groupedMessages.map(({ date, msgs }) => (
                <div key={date}>
                  <div className="flex items-center justify-center my-3">
                    <span className="text-[10px] font-medium text-muted-foreground bg-card/90 px-3 py-1 rounded-full border border-border/60 shadow-sm">
                      {date}
                    </span>
                  </div>
                  {msgs.map((msg) => {
                    const isMine = msg.senderId === userId;
                    const isEditing = editingId === msg.id;
                    const menuOpen = openMenuId === msg.id;

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className={cn("group flex items-end gap-1.5 mb-1.5 relative", isMine ? "justify-end" : "justify-start")}
                      >
                        {/* 3-dots menu button — own messages only, shown on hover */}
                        {isMine && !isEditing && (
                          <div className="relative shrink-0 mb-1 self-end" ref={menuOpen ? menuRef : undefined}>
                            <button
                              onClick={() => setOpenMenuId(menuOpen ? null : msg.id)}
                              className={cn(
                                "p-1.5 rounded-lg transition-all",
                                menuOpen
                                  ? "text-foreground bg-muted"
                                  : "text-muted-foreground/40 opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-muted"
                              )}
                              title="Message options"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>

                            {/* Dropdown */}
                            <AnimatePresence>
                              {menuOpen && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute bottom-full right-0 mb-1 z-50 min-w-[130px] bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                                >
                                  <button
                                    onMouseDown={(e) => { e.preventDefault(); startEdit(msg); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-muted transition-colors text-foreground"
                                  >
                                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                                    Edit
                                  </button>
                                  <div className="h-px bg-border mx-2" />
                                  <button
                                    onMouseDown={(e) => { e.preventDefault(); setOpenMenuId(null); setPendingDeleteId(msg.id); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-destructive/10 transition-colors text-destructive"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Delete
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Message bubble */}
                        <div
                          className={cn(
                            "max-w-[72%] sm:max-w-[60%] shadow-sm",
                            isEditing
                              ? "w-full max-w-[72%] sm:max-w-[60%]"
                              : cn(
                                "px-4 py-2.5",
                                isMine
                                  ? "bg-primary text-primary-foreground rounded-[18px] rounded-br-[4px]"
                                  : "bg-card border border-border text-foreground rounded-[18px] rounded-bl-[4px]"
                              )
                          )}
                        >
                          {isEditing ? (
                            <div className="flex items-center gap-2 bg-card border-2 border-primary/60 rounded-[18px] px-3 py-2 shadow-md">
                              <input
                                ref={editInputRef}
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); commitEdit(msg.id); }
                                  if (e.key === "Escape") cancelEdit();
                                }}
                                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground"
                                maxLength={2000}
                              />
                              <button
                                onClick={() => commitEdit(msg.id)}
                                disabled={!editText.trim()}
                                className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors disabled:opacity-40"
                                title="Save"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="p-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                              <div className={cn("flex items-center justify-end gap-1 mt-1", isMine ? "text-primary-foreground/60" : "text-muted-foreground/70")}>
                                {msg.edited && (
                                  <span className="text-[9px] italic">edited</span>
                                )}
                                <span className="text-[10px] leading-none">
                                  {new Date(msg.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-1">No messages yet</p>
              <p className="text-sm text-muted-foreground">Start the conversation with {otherName}</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="border-t border-border bg-card/95 backdrop-blur px-3 py-3">
          <div className="flex items-end gap-2">
            <div className="flex-1 flex items-center bg-muted rounded-[24px] px-4 min-h-[44px] py-2 border border-border/60 focus-within:border-primary/40 focus-within:bg-background transition-all">
              <input
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground resize-none leading-relaxed"
              />
            </div>
            <motion.button
              onClick={handleSend}
              disabled={!text.trim() || sendMutation.isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm",
                text.trim() && !sendMutation.isPending
                  ? "gradient-primary shadow-green"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {sendMutation.isPending
                ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                : <Send className={cn("w-4 h-4", text.trim() ? "text-white" : "")} />
              }
            </motion.button>
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

  useEffect(() => {
    if (urlConvId && !activeConvId) setActiveConvId(urlConvId);
  }, [urlConvId]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeConv = conversations?.find(c => c.id === activeConvId);
  const otherName = activeConv && user
    ? (activeConv.buyerId === user.id ? (activeConv.farmerName ?? "Farmer") : (activeConv.buyerName ?? "Buyer"))
    : "";

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-bold text-foreground mb-1">Sign in to access chat</h3>
        <p className="text-sm text-muted-foreground">Chat directly with farmers and buyers</p>
      </div>
    );
  }

  const totalUnread = conversations?.reduce((s, c) => s + (c.unreadCount ?? 0), 0) ?? 0;

  return (
    <div className="flex h-full bg-background overflow-x-hidden">
      {/* Conversation sidebar */}
      <div
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all shrink-0",
          activeConvId ? "hidden md:flex md:w-72 lg:w-80" : "flex w-full md:w-72 lg:w-80"
        )}
      >
        <div className="px-5 py-4 border-b border-border shrink-0 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="font-bold text-foreground">Messages</h2>
              {totalUnread > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-0 h-4 flex items-center">
                  {totalUnread}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {conversations?.length ?? 0} conversation{conversations?.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
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
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-3">
                <MessageCircle className="w-7 h-7 text-muted-foreground opacity-40" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">No conversations yet</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click "Chat with Farmer" on any listing to start a conversation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat window area */}
      {activeConvId ? (
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/95 backdrop-blur shrink-0 shadow-sm">
            <button
              onClick={() => setActiveConvId(null)}
              className="md:hidden p-1.5 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <Avatar className="w-9 h-9 shrink-0">
              <AvatarFallback className="gradient-primary text-white font-bold text-sm">
                {otherName.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-foreground leading-none">{otherName}</p>
              {activeConv?.cropName && (
                <p className="text-xs text-primary/80 flex items-center gap-1 mt-0.5">
                  <Sprout className="w-3 h-3" /> {activeConv.cropName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
          <ChatWindow conversationId={activeConvId} userId={user.id} otherName={otherName} />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <p className="font-bold text-foreground mb-1">Select a conversation</p>
            <p className="text-sm text-muted-foreground">Choose from your conversations on the left</p>
          </div>
        </div>
      )}
    </div>
  );
}
