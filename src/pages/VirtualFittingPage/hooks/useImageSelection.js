import { useState } from "react";

export function useImageSelection() {
    const [selectedUserImage, setSelectedUserImage] = useState(null);
    const [selectedClothingImage, setSelectedClothingImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleImageSelect = (file, type) => {
        if (!file) return;
        if (type === "user") {
            setSelectedUserImage(file);
        } else {
            setSelectedClothingImage(file);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return {
        selectedUserImage,
        selectedClothingImage,
        selectedCategory,
        handleImageSelect,
        handleCategorySelect,
    };
}
