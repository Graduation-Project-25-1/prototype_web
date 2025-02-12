import axios from "axios";
import { S3UploadResponse } from "./entity"; // ✅ 추가

class S3UploadAPI {
  constructor() {
    this.client = axios.create({
      baseURL: "http://127.0.0.1:8000", // ✅ FastAPI 서버 URL
      headers: { "Content-Type": "multipart/form-data" }, // ✅ 파일 업로드 설정
    });
  }

  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.client.post("/upload", formData); // ✅ S3 업로드 엔드포인트

      return new S3UploadResponse(response.data);
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      throw error;
    }
  }
}

// ✅ API 인스턴스 생성
const s3UploadAPI = new S3UploadAPI();

export default s3UploadAPI;
