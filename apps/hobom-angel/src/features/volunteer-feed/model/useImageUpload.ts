import { useState } from "react";
import { uploadImage } from "@/shared/api";
import { useToast } from "@/shared/model";
import type { UploadPurpose, UploadedImage } from "@/shared/api";

/** Attach images through the presign flow, keeping each public URL for preview.
 *  The caller passes the upload purpose (object-key prefix). */
export const useImageUpload = (purpose: UploadPurpose) => {
  const { openErrorToast } = useToast();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);

  const add = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploaded = await Promise.all(
        Array.from(files).map((file) => uploadImage(file, purpose)),
      );

      setImages((prev) => [...prev, ...uploaded]);
    } catch (error) {
      openErrorToast({
        message: error instanceof Error ? error.message : "이미지 업로드에 실패했어요.",
      });
    } finally {
      setUploading(false);
    }
  };

  const remove = (objectKey: string) =>
    setImages((prev) => prev.filter((image) => image.objectKey !== objectKey));

  return { images, uploading, add, remove };
};
