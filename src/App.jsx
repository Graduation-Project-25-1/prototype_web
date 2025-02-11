import { BrowserRouter, Routes, Route } from "react-router-dom";
import VirtualFittingPage from "./pages/VirtualFittingPage";
import VirtualFittingResult from "./pages/VirtualFittingResult"; // 결과 페이지 추가

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VirtualFittingPage />} />
        <Route path="/result" element={<VirtualFittingResult />} /> {/* 결과 페이지 경로 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
