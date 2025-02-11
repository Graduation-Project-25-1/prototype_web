import { useVirtualFittingResult } from "./hooks/useVirtualFittingResult";
import LoadingSpinner from "./components/LoadingSpinner";
import styles from "./VirtualFittingResult.module.css";

export default function VirtualFittingResult() {
    const { generatedImage, isLoading, navigate, retryVirtualFitting } = useVirtualFittingResult();

    return (
        <div className={styles.container}>
            <h2>가상 피팅 결과</h2>

            {isLoading ? (
                <LoadingSpinner />
            ) : generatedImage ? (
                <img src={generatedImage} alt="가상 피팅 결과" className={styles.resultImage} />
            ) : (
                <p className={styles.errorMessage}>❌ 결과 이미지를 불러올 수 없습니다.</p>
            )}

            <div className={styles.buttonContainer}>
                <button className={styles.retryButton} onClick={retryVirtualFitting}>
                    다시 시도하기
                </button>
                <button className={styles.prevButton} onClick={() => navigate(-1)}>
                    이전 화면으로 돌아가기
                </button>
            </div>
        </div>
    );
}
