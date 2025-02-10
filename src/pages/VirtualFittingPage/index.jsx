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
        selectedCategory,
        handleImageSelect,
        handleCategorySelect,
    } = useImageSelection();

    const { generatedImage, isLoading, startVirtualFitting, error } = useVirtualFitting();

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

            {/* 버튼 비활성화 추가 */}
            <FitButton onClick={() => startVirtualFitting(selectedUserImage, selectedClothingImage, selectedCategory)} disabled={isLoading} />

            {/* 로딩 표시 */}
            {isLoading && <p className={styles.loading}>가상 피팅 중...</p>}

            {/* 에러 메시지 출력 */}
            {error && <p className={styles.errorMessage}>❌ {error}</p>}

            {/* 결과 이미지 출력 */}
            {generatedImage && (
                <div>
                    <h3>가상 피팅 결과</h3>
                    <img src={generatedImage} alt="가상 피팅 결과" className={styles.resultImage} />
                </div>
            )}
        </div>
    );
}
