import { useState } from "react";
import KeyMatrix from "./KeyMatrix";
import PlayfairEncryptor from "./PlayfairEncryptor";

function App() {
  const [keyMatrix, setKeyMatrix] = useState([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Шифр Плейфера</h1>
      <KeyMatrix onKeyMatrixChange={setKeyMatrix} />
      {keyMatrix.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">Матриця-ключ:</h2>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {keyMatrix.flat().map((char, index) => (
              <div
                key={index}
                className="p-2 border border-gray-300 rounded text-center"
              >
                {char.toUpperCase()}
              </div>
            ))}
          </div>
          <PlayfairEncryptor keyMatrix={keyMatrix} />
        </>
      )}
    </div>
  );
}

export default App;
