import { useNavigate } from "react-router-dom";

export function useVirtualFitting() {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    const startVirtualFitting = async (userImage, clothingImage, category) => {
        if (!userImage || !clothingImage) {
            alert("사진을 모두 선택해주세요!");
            return;
        }
        if (!category) {
            alert("카테고리를 선택해주세요!");
            return;
        }

        // API 호출 없이 바로 결과 페이지로 이동
        navigate("/result", { state: { userImage, clothingImage, category } });
    };

    return { startVirtualFitting };
}
