import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { processVirtualFitting } from "../../../api/virtualFitting";

export function useVirtualFittingResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userImageUrl = location.state?.userImage;
    const clothingImageUrl = location.state?.clothingImage;
    const category = location.state?.category;

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
                vton_img: typeof userImageUrl === "object" ? userImageUrl.url : userImageUrl,
                garm_img: typeof clothingImageUrl === "object" ? clothingImageUrl.url : clothingImageUrl,
                category,
                n_samples: 1,
                n_steps: 35,
                image_scale: 3,
                seed: -1,
            };

            console.log("🔹 보낼 데이터:", requestData);

            const response = await processVirtualFitting(requestData);
            console.log("🔹 서버 응답:", response);

            if (response?.url) {
                console.log("✅ 생성된 이미지 URL:", response.url);
                setGeneratedImage(response.url);
            } else {
                console.error("❌ FastAPI 응답에 'url' 필드가 없음:", response);
                throw new Error("이미지 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("🚨 가상 피팅 오류:", error);
            setError("가상 피팅 요청 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [userImageUrl, clothingImageUrl, category, navigate]);

    useEffect(() => {
        fetchVirtualFitting();
    }, [fetchVirtualFitting]);

    useEffect(() => {
        console.log("🔹 현재 generatedImage 상태:", generatedImage);
    }, [generatedImage]);  // ✅ 상태 변경될 때마다 확인

    return {
        generatedImage,
        isLoading,
        error,
        navigate,
        retryVirtualFitting: fetchVirtualFitting,
    };
}
