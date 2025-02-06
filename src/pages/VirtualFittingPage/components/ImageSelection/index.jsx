import styles from "./ImageSelection.module.css";
import { useRef, useState } from "react";

export default function ImageSelection({ onSelect }) {
    const [selectedUserImage, setSelectedUserImage] = useState(null);
    const [selectedClothingImage, setSelectedClothingImage] = useState(null);
    const userFileInputRef = useRef(null);
    const clothingFileInputRef = useRef(null);

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            if (type === "user") {
                setSelectedUserImage(fileURL);
                onSelect(file, "user");
            } else {
                setSelectedClothingImage(fileURL);
                onSelect(file, "clothing");
            }
        }
    };

    return (
        <div className={styles.container}>
            {/* "내 사진 선택" 버튼 */}
            <button className={styles.box} onClick={() => userFileInputRef.current.click()}>
                {selectedUserImage ? <img src={selectedUserImage} alt="내 사진" className={styles.preview} /> : "내 사진 선택"}
            </button>

            {/* "의류 사진 선택" 버튼 */}
            <button className={styles.box} onClick={() => clothingFileInputRef.current.click()}>
                {selectedClothingImage ? <img src={selectedClothingImage} alt="의류 사진" className={styles.preview} /> : "의류 사진 선택"}
            </button>

            {/* 숨겨진 파일 입력 필드 - 내 사진 */}
            <input
                type="file"
                ref={userFileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={(event) => handleFileChange(event, "user")}
            />

            {/* 숨겨진 파일 입력 필드 - 의류 사진 */}
            <input
                type="file"
                ref={clothingFileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={(event) => handleFileChange(event, "clothing")}
            />
        </div>
    );
}
