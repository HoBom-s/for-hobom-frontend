import { useState } from "react";
import { UploadPurpose, uploadImage } from "@/shared/api";
import { useToast } from "@/shared/model";
import type { UploadedImage } from "@/shared/api";

/** Presigned photo uploads for the register form — collects object keys to send
 *  with the new animal. */
export const useAnimalPhotos = () => {
  const { openErrorToast } = useToast();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);

  const add = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploaded = await Promise.all(
        Array.from(files).map((file) => uploadImage(file, UploadPurpose.ANIMAL)),
      );

      setImages((prev) => [...prev, ...uploaded]);
    } catch {
      openErrorToast({ message: "사진 업로드에 실패했어요." });
    } finally {
      setUploading(false);
    }
  };

  const remove = (objectKey: string) =>
    setImages((prev) => prev.filter((image) => image.objectKey !== objectKey));

  return {
    images,
    uploading,
    add,
    remove,
    reset: () => setImages([]),
    keys: images.map((image) => image.objectKey),
  };
};
