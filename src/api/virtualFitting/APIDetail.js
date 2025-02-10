import axios from "axios";
import { VirtualFittingResponse } from "./entity";

class VirtualFittingAPI {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async processFitting(formData) {
    try {
      const response = await this.client.post("/process_dc", formData);
      return new VirtualFittingResponse(response.data); // ✅ 응답을 VirtualFittingResponse로 변환
    } catch (error) {
      console.error("API 요청 오류:", error);
      throw error;
    }
  }
}

// ✅ API 인스턴스 생성
const virtualFittingAPI = new VirtualFittingAPI("http://localhost:7860");

export default virtualFittingAPI;
