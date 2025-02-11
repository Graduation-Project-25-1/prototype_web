import axios from "axios";
import { VirtualFittingResponse } from "./entity";

class VirtualFittingAPI {
  constructor() {
    this.client = axios.create({
      baseURL: "http://127.0.0.1:8000", // ✅ API 기본 URL 변경
      headers: { "Content-Type": "application/json" }, // ✅ JSON 전송 방식 유지
    });
  }

  async processFitting(data) { // ✅ JSON 데이터 전송
    try {
      const response = await this.client.post("/process_dc", data); // ✅ API 엔드포인트 수정
      return new VirtualFittingResponse(response.data); 
    } catch (error) {
      console.error("API 요청 오류:", error);
      throw error;
    }
  }
}

// ✅ API 인스턴스 생성
const virtualFittingAPI = new VirtualFittingAPI();

export default virtualFittingAPI;
