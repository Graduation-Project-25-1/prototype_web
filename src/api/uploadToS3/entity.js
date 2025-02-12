export class S3UploadRequest {
    constructor(file) {
      this.file = file;
    }
  
    toFormData() {
      const formData = new FormData();
      formData.append("file", this.file);
      return formData;
    }
  }
  
  export class S3UploadResponse {
    constructor(responseData) {
      this.url = responseData?.url || null; // ✅ S3에서 반환된 URL
    }
  }
  