import styles from "./CategorySelection.module.css";

export default function CategorySelection({ selectedCategory, onCategorySelect }) {
    const categoryMap = {
        "상의": "Upper-body",
        "하의": "Lower-body",
        "원피스": "Dress"
    };

    const handleClick = (category) => {
        const apiCategory = categoryMap[category]; // ✅ API에 맞는 카테고리 변환
        onCategorySelect(apiCategory); // ✅ 부모 컴포넌트로 상태 전달
    };

    return (
        <div className={styles.container}>
            <p>피팅 카테고리 선택</p>
            <div className={styles.options}>
                <button
                    className={selectedCategory === "Upper-body" ? styles.active : ""}
                    onClick={() => handleClick("상의")}
                >
                    상의
                </button>
                <button
                    className={selectedCategory === "Lower-body" ? styles.active : ""}
                    onClick={() => handleClick("하의")}
                >
                    하의
                </button>
                <button
                    className={selectedCategory === "Dress" ? styles.active : ""}
                    onClick={() => handleClick("원피스")}
                >
                    원피스
                </button>
            </div>
        </div>
    );
}
