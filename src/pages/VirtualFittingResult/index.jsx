import { useVirtualFittingResult } from "./hooks/useVirtualFittingResult";
import LoadingSpinner from "./components/LoadingSpinner"; // ✅ 로딩 스피너 컴포넌트 추가
import styles from "./VirtualFittingResult.module.css";

export default function VirtualFittingResult() {
    const { generatedImage, isLoading, navigate } = useVirtualFittingResult();

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

            <button className={styles.backButton} onClick={() => navigate("/")}>
                다시 시도하기
            </button>
        </div>
    );
}
