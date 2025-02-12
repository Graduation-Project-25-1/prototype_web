import { useState } from "react";
import { useVirtualFitting } from "./hooks/useVirtualFitting"; 
import { useImageSelection } from "./hooks/useImageSelection";
import styles from "./VirtualFittingPage.module.css";
import ImageSelection from "./components/ImageSelection";
import CategorySelection from "./components/CategorySelection";
import FitButton from "./components/FitButton";

export default function VirtualFittingPage() {
    const {
        selectedUserImage,
        selectedClothingImage,
        handleImageSelect,
    } = useImageSelection();

    const { startVirtualFitting } = useVirtualFitting();
    
    // ✅ VirtualFittingPage에서 selectedCategory 상태 관리
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        console.log("선택된 카테고리:", category);
        setSelectedCategory(category);
    };

    return (
        <div className={styles.container}>
            <h2>가상 피팅 시스템</h2>

            <ImageSelection onSelect={handleImageSelect} />
            <CategorySelection 
                selectedCategory={selectedCategory} // ✅ 상태 전달
                onCategorySelect={handleCategorySelect} 
            />

            {/* 버튼 클릭 시 결과 페이지로 이동 */}
            <FitButton onClick={() => startVirtualFitting(selectedUserImage, selectedClothingImage, selectedCategory)} />
        </div>
    );
}
