import { useState } from "react";
import { uploadToS3 } from "../../../api/uploadToS3"; // 경로 수정

export function useImageSelection() {
  const [selectedUserImage, setSelectedUserImage] = useState(null);
  const [selectedClothingImage, setSelectedClothingImage] = useState(null);

  const handleImageSelect = async (file, type) => {
    if (!file) return;

    try {
      const imageUrl = await uploadToS3(file); // S3에 업로드 후 URL 받기

      if (imageUrl) {
        if (type === "user") {
          setSelectedUserImage(imageUrl);
        } else {
          setSelectedClothingImage(imageUrl);
        }
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  return { selectedUserImage, selectedClothingImage, handleImageSelect };
}
