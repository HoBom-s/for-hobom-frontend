import { httpClient } from "./http.api";

/** Where an upload belongs — selects the object-key prefix (storage/CDN rules). */
export const UploadPurpose = {
  ANIMAL: "ANIMAL",
  SHELTER: "SHELTER",
  USER: "USER",
} as const;

export type UploadPurpose = (typeof UploadPurpose)[keyof typeof UploadPurpose];

interface UploadUrl {
  objectKey: string;
  uploadUrl: string;
  publicUrl: string;
}

export interface UploadedImage {
  /** Immutable key to persist (e.g. in a post's image block). */
  objectKey: string;
  /** CDN URL for immediate preview. */
  publicUrl: string;
}

/** Upload an image via the presign flow: request a URL, PUT the file to it, and
 *  return the stored key plus its public URL. */
export const uploadImage = async (file: File, purpose: UploadPurpose): Promise<UploadedImage> => {
  const { objectKey, uploadUrl, publicUrl } = await httpClient.post<UploadUrl>(
    "/media/upload-url",
    {
      purpose,
      contentType: file.type,
    },
  );

  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  if (!response.ok) throw new Error("이미지 업로드에 실패했어요.");

  return { objectKey, publicUrl };
};
