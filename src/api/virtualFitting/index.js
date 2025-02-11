import virtualFittingAPI from "./APIDetail";
import { VirtualFittingRequest, VirtualFittingResponse } from "./entity"; // ✅ 추가

export const processVirtualFitting = (formData) => virtualFittingAPI.processFitting(formData);

export { VirtualFittingRequest, VirtualFittingResponse }; // ✅ 추가
