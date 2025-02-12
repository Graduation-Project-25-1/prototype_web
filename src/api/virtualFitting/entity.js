export class VirtualFittingRequest {
    constructor(userImage, clothingImage, category) {
      this.vton_img = userImage;
      this.garm_img = clothingImage;
      this.category = category;
      this.n_samples = 1;
      this.n_steps = 20;
      this.image_scale = 2;
      this.seed = -1;
    }
  
    toFormData() {
      const formData = new FormData();
      formData.append("vton_img", this.vton_img);
      formData.append("garm_img", this.garm_img);
      formData.append("category", this.category);
      formData.append("n_samples", this.n_samples);
      formData.append("n_steps", this.n_steps);
      formData.append("image_scale", this.image_scale);
      formData.append("seed", this.seed);
      return formData;
    }
  }
  
  export class VirtualFittingResponse {
    constructor(responseData) {
        this.url = responseData?.url || null;  // ✅ FastAPI 응답 필드 `url` 사용
    }
}
  