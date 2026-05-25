import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CropImageUploadProps {
  value?: string | null;
  onChange: (objectPath: string | null) => void;
  className?: string;
}

type UploadState = "idle" | "uploading" | "success" | "error";

export function CropImageUpload({ value, onChange, className }: CropImageUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getImageSrc = (path: string | null | undefined): string | null => {
    if (!path) return null;
    if (path.startsWith("/objects/")) return `/api/storage${path}`;
    return path;
  };

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select an image file (JPG, PNG, WebP)");
      setUploadState("error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Image must be smaller than 10 MB");
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setErrorMessage("");

    try {
      const urlRes = await fetch("/api/storage/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
      });

      if (!urlRes.ok) throw new Error("Failed to get upload URL");
      const { uploadURL, objectPath } = await urlRes.json();

      const putRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!putRes.ok) throw new Error("Upload failed");

      onChange(objectPath);
      setUploadState("success");
    } catch (err) {
      setErrorMessage("Upload failed. Please try again.");
      setUploadState("error");
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setUploadState("idle");
    setErrorMessage("");
  };

  const imageSrc = getImageSrc(value);

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={handleFileChange}
        data-testid="input-crop-image"
      />

      <AnimatePresence mode="wait">
        {imageSrc ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative group rounded-2xl overflow-hidden border border-border/50 shadow-md"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={imageSrc}
              alt="Crop preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors border border-white/30"
                data-testid="button-change-image"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="bg-red-500/80 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-600/80 transition-colors"
                data-testid="button-remove-image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {uploadState === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1.5 shadow-lg"
              >
                <CheckCircle className="h-4 w-4" />
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="dropzone"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => uploadState !== "uploading" && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            disabled={uploadState === "uploading"}
            data-testid="button-upload-image"
            className={cn(
              "w-full rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 py-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20",
              dragOver
                ? "border-primary bg-primary/5 scale-[1.02]"
                : uploadState === "error"
                ? "border-destructive/50 bg-destructive/5"
                : "border-border hover:border-primary/50 hover:bg-primary/5 bg-muted/30"
            )}
          >
            {uploadState === "uploading" ? (
              <>
                <div className="p-4 rounded-2xl bg-primary/10">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Uploading...</p>
                  <p className="text-sm text-muted-foreground mt-1">Please wait</p>
                </div>
              </>
            ) : uploadState === "error" ? (
              <>
                <div className="p-4 rounded-2xl bg-destructive/10">
                  <ImageIcon className="h-8 w-8 text-destructive" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-destructive">{errorMessage}</p>
                  <p className="text-sm text-muted-foreground mt-1">Click to try again</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">
                    {dragOver ? "Drop it here" : "Upload a photo"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Drag & drop or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    JPG, PNG, WebP up to 10 MB
                  </p>
                </div>
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
