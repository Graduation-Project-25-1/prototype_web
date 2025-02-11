import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { processVirtualFitting } from "api/virtualFitting";
import { VirtualFittingRequest } from "api/virtualFitting/entity";

export function useVirtualFittingResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const userImage = location.state?.userImage;
    const clothingImage = location.state?.clothingImage;
    const category = location.state?.category;

    const fetchVirtualFitting = useCallback(async () => {
        if (!userImage || !clothingImage || !category) {
            alert("잘못된 접근입니다.");
            navigate("/");
            return;
        }

        setIsLoading(true);
        const requestData = new VirtualFittingRequest(userImage, clothingImage, category);

        try {
            const response = await processVirtualFitting(requestData.toFormData());
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
    }, [userImage, clothingImage, category, navigate]);

    useEffect(() => {
        fetchVirtualFitting(); // ✅ 최초 실행
    }, [fetchVirtualFitting]);

    return {
        generatedImage,
        isLoading,
        navigate,
        retryVirtualFitting: fetchVirtualFitting, // ✅ 다시 시도 버튼에서 API 호출 가능
    };
}
