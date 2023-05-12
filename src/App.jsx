import Memory from "./Memory";
import Game from "./Game";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [gridSize, setGridSize] = useState(true);
  console.log(gridSize);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Memory gridSize={gridSize} setGridSize={setGridSize} />}
        />
        <Route
          path="/Game"
          element={<Game gridSize={gridSize} setGridSize={setGridSize} />}
        />
      </Routes>
    </>
  );
}

export default App;
