import axios from "axios";
import { VirtualFittingResponse } from "./entity";

class VirtualFittingAPI {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" }, // ✅ JSON으로 변경
    });
  }

  async processFitting(data) { // ✅ JSON 데이터 처리
    try {
      const response = await this.client.post("/run/process_dc", data); // ✅ JSON 데이터 전송
      return new VirtualFittingResponse(response.data); 
    } catch (error) {
      console.error("API 요청 오류:", error);
      throw error;
    }
  }
}

// ✅ API 인스턴스 생성
const virtualFittingAPI = new VirtualFittingAPI("http://localhost:7860");

export default virtualFittingAPI;
