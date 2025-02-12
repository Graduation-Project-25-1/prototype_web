import s3UploadAPI from "./APIDetail";
import { S3UploadRequest, S3UploadResponse } from "./entity"; // ✅ 추가

export const uploadToS3 = (file) => s3UploadAPI.uploadFile(file); // ✅ 파일 업로드 함수

export { S3UploadRequest, S3UploadResponse }; // ✅ 요청 및 응답 클래스 내보내기
