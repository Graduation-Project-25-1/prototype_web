import styles from "./CategorySelection.module.css";
import { useState } from "react";
import { Client } from '@gradio/client';

export default function CategorySelection({ onCategorySelect }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleClick = (category) => {
        setSelectedCategory(category);
        onCategorySelect(category);
    };

    return (
        <div className={styles.container}>
            <p>피팅 카테고리 선택</p>
            <div className={styles.options}>
                <button
                    className={selectedCategory === "상의" ? styles.active : ""}
                    onClick={() => handleClick("상의")}
                >
                    상의
                </button>
                <button
                    className={selectedCategory === "하의" ? styles.active : ""}
                    onClick={() => handleClick("하의")}
                >
                    하의
                </button>
                <button
                    className={selectedCategory === "원피스" ? styles.active : ""}
                    onClick={() => handleClick("원피스")}
                >
                    원피스
                </button>
            </div>
        </div>
    );
}
