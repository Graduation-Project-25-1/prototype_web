import { useState } from "react";
import { processVirtualFitting, VirtualFittingRequest } from "@/api/virtualFitting";


export function useVirtualFitting() {
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const startVirtualFitting = async (userImage, clothingImage, category) => {
        if (!userImage || !clothingImage) {
            alert("사진을 모두 선택해주세요!");
            return;
        }
        if (!category) {
            alert("카테고리를 선택해주세요!");
            return;
        }

        const requestData = new VirtualFittingRequest(userImage, clothingImage, category);

        try {
            setIsLoading(true);
            const response = await processVirtualFitting(requestData.toFormData());
            console.log("API 응답:", response);

            if (response.image) {
                setGeneratedImage(response.image);
            } else {
                alert("이미지 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("가상 피팅 오류:", error);
            alert("가상 피팅 요청 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return { generatedImage, isLoading, startVirtualFitting };
}
