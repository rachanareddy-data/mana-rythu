import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

interface DropdownPortalProps {
  anchorRef: RefObject<HTMLElement | null>;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?: "left" | "right";
  gap?: number;
}

export function DropdownPortal({
  anchorRef,
  open,
  onClose,
  children,
  align = "right",
  gap = 8,
}: DropdownPortalProps) {
  const [pos, setPos] = useState<{ top: number; side: number } | null>(null);

  useEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + gap,
      side: align === "right" ? window.innerWidth - rect.right : rect.left,
    });
  }, [open, anchorRef, align, gap]);

  if (!open || !pos) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0"
        style={{ zIndex: 9998 }}
        onClick={onClose}
        aria-hidden
      />
      <div
        style={{
          position: "fixed",
          top: pos.top,
          ...(align === "right" ? { right: pos.side } : { left: pos.side }),
          zIndex: 9999,
        }}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
