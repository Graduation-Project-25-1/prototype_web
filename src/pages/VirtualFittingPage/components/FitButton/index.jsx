import styles from "./FitButton.module.css"

export default function FitButton({ onClick }) {
    return (
        <button className={styles.button} onClick={onClick}>
            가상 피팅 진행
        </button>
    );
}