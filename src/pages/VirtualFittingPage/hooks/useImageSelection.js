import { useState } from "react";

export function useImageSelection() {
    // ✅ 세션 스토리지에서 기존 데이터 불러오기
    const [selectedUserImage, setSelectedUserImage] = useState(() => {
        const storedUserImage = sessionStorage.getItem("selectedUserImage");
        return storedUserImage ? JSON.parse(storedUserImage) : null;
    });

    const [selectedClothingImage, setSelectedClothingImage] = useState(() => {
        const storedClothingImage = sessionStorage.getItem("selectedClothingImage");
        return storedClothingImage ? JSON.parse(storedClothingImage) : null;
    });

    const [selectedCategory, setSelectedCategory] = useState(() => {
        return sessionStorage.getItem("selectedCategory") || null;
    });

    // ✅ 이미지 선택 시 sessionStorage에도 저장
    const handleImageSelect = (file, type) => {
        if (!file) return;
        if (type === "user") {
            setSelectedUserImage(file);
            sessionStorage.setItem("selectedUserImage", JSON.stringify(file));
        } else {
            setSelectedClothingImage(file);
            sessionStorage.setItem("selectedClothingImage", JSON.stringify(file));
        }
    };

    // ✅ 카테고리 선택 시 sessionStorage에도 저장
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        sessionStorage.setItem("selectedCategory", category);
    };

    // ✅ 상태를 초기화하는 함수 추가 (새로운 시도를 원할 경우 호출)
    const resetSelection = () => {
        setSelectedUserImage(null);
        setSelectedClothingImage(null);
        setSelectedCategory(null);
        sessionStorage.removeItem("selectedUserImage");
        sessionStorage.removeItem("selectedClothingImage");
        sessionStorage.removeItem("selectedCategory");
    };

    return {
        selectedUserImage,
        selectedClothingImage,
        selectedCategory,
        handleImageSelect,
        handleCategorySelect,
        resetSelection, // ✅ 상태 초기화 함수
    };
}
