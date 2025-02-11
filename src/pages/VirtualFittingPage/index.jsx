import { useVirtualFitting } from "../../hooks/useVirtualFitting";
import { useImageSelection } from "../../hooks/useImageSelection";
import styles from "./VirtualFittingPage.module.css";
import ImageSelection from "./components/ImageSelection";
import CategorySelection from "./components/CategorySelection";
import FitButton from "./components/FitButton";

export default function VirtualFittingPage() {
    const {
        selectedUserImage,
        selectedClothingImage,
        selectedCategory,
        handleImageSelect,
        handleCategorySelect,
    } = useImageSelection();

    const { startVirtualFitting } = useVirtualFitting();

    return (
        <div className={styles.container}>
            <h2>가상 피팅 시스템</h2>

            {/* 이미지 미리보기 */}
            <div className={styles.previewContainer}>
                {selectedUserImage && <img src={URL.createObjectURL(selectedUserImage)} alt="내 사진" className={styles.preview} />}
                {selectedClothingImage && <img src={URL.createObjectURL(selectedClothingImage)} alt="의류 사진" className={styles.preview} />}
            </div>

            <ImageSelection onSelect={handleImageSelect} />
            <CategorySelection onCategorySelect={handleCategorySelect} />

            {/* 버튼 클릭 시 결과 페이지로 이동 */}
            <FitButton onClick={() => startVirtualFitting(selectedUserImage, selectedClothingImage, selectedCategory)} />
        </div>
    );
}
