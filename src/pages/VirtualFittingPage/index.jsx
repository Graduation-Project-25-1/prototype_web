import styles from "./VirtualFittingPage.module.css";
import ImageSelection from "./components/ImageSelection";
import CategorySelection from "./components/CategorySelection";
import FitButton from "./components/FitButton";
import { useState } from "react";

export default function VirtualFittingPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleImageSelect = (imageType) => {
        setSelectedImage(imageType);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleFitStart = () => {
        if (!selectedImage) {
          alert("사진을 선택해주세요!");
          return;
        }
        if (!selectedCategory) {
            alert("카테고리를 선택해주세요!");
            return;
          }
        console.log(`가상 피팅 시작: ${selectedImage}, ${selectedCategory}`);
    };

    return (
        <div className = {styles.container}>
            <ImageSelection onSelect={handleImageSelect} />
            <CategorySelection onCategorySelect={handleCategorySelect} />
            <FitButton onClick={handleFitStart} />
        </div>
    );
}