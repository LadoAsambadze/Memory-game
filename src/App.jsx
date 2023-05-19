import Memory from "./pages/Memory";
import Game from "./pages/Game";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Memory />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
