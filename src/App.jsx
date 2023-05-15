import Memory from "./Memory";
import Game from "./Game";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Memory />} />
        <Route path="/Game" element={<Game flipped={true} />} />
      </Routes>
    </>
  );
}

export default App;
