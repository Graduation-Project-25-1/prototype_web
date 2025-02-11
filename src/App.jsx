import { BrowserRouter, Routes, Route } from "react-router-dom";
import VirtualFittingPage from "./pages/VirtualFittingPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VirtualFittingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
