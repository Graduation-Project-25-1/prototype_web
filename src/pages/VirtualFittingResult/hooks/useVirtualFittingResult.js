import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { processVirtualFitting } from "api/virtualFitting";

export function useVirtualFittingResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userImageUrl = location.state?.userImage; // ✅ 업로드된 웹 이미지 URL
    const clothingImageUrl = location.state?.clothingImage;
    const category = location.state?.category;

    // ✅ API 요청을 직접 수행 (웹 이미지 URL 사용)
    const fetchVirtualFitting = useCallback(async () => {
        if (!userImageUrl || !clothingImageUrl || !category) {
            alert("잘못된 접근입니다.");
            navigate("/");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const requestData = {
                vton_img: userImageUrl,  // ✅ 업로드된 웹 URL을 그대로 사용
                garm_img: clothingImageUrl,  // ✅ 업로드된 웹 URL을 그대로 사용
                category,
                n_samples: 1,
                n_steps: 20,
                image_scale: 2,
                seed: -1,
            };

            const response = await processVirtualFitting(requestData); // ✅ JSON 데이터 전송

            if (response.image) {
                setGeneratedImage(response.image);
            } else {
                throw new Error("이미지 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("가상 피팅 오류:", error);
            setError("가상 피팅 요청 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [userImageUrl, clothingImageUrl, category, navigate]);

    useEffect(() => {
        fetchVirtualFitting();
    }, [fetchVirtualFitting]);

    return {
        generatedImage,
        isLoading,
        error,
        navigate,
        retryVirtualFitting: fetchVirtualFitting, // ✅ "다시 시도하기" 버튼에서 API 호출 가능
    };
}
