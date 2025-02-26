import React, { ChangeEvent, useState } from "react";
import { FileImage, UploadCloud, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  maxSizeMB?: number;
  acceptedFileTypes?: string[];
  buttonText?: string;
}

export default function ImageUpload({
  onUpload,
  maxSizeMB = 10,
  acceptedFileTypes = ["image/jpeg", "image/png"],
  buttonText = "Upload Image",
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        setError(`File size should be less than ${maxSizeMB}MB`);
        return;
      }
      if (!acceptedFileTypes.includes(selectedFile.type)) {
        setError(`Accepted file types are: ${acceptedFileTypes.join(", ")}`);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        setProgress(0);
        await onUpload(file);
        setProgress(100);
      } catch (err) {
        setError("Upload failed. Please try again.");
        setProgress(0);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!file ? (
        <label className="flex flex-col items-center justify-center w-full py-6 border border-input rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/20">
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to select an image</span>
            </p>
            <p className="text-xs text-muted-foreground">
              (Image should be under {maxSizeMB}MB)
            </p>
          </div>
          <Input
            onChange={handleFileChange}
            accept={acceptedFileTypes.join(",")}
            type="file"
            className="hidden"
          />
        </label>
      ) : (
        <div className="mt-4">
          <div className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2">
            <div className="flex items-center flex-1 p-2">
              <div className="text-purple-600">
                <FileImage size={40} />
              </div>
              <div className="w-full ml-2 space-y-1">
                <div className="text-sm flex justify-between">
                  <p className="text-muted-foreground">
                    {file.name.slice(0, 25)}
                  </p>
                  <span className="text-xs">{progress}%</span>
                </div>
                <Progress value={progress} className="bg-purple-600" />
              </div>
            </div>
            <button
              onClick={removeFile}
              className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
            >
              <X size={20} />
            </button>
          </div>
          <Button onClick={handleUpload} className="mt-4 w-full">
            {buttonText}
          </Button>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
