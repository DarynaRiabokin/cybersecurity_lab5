/* eslint-disable react/prop-types */
import { useState } from "react";

const alphabet = "абвгдежзийклмнопрстуфхцчшщюя";

const KeyMatrix = ({ onKeyMatrixChange }) => {
  const [key, setKey] = useState("");

  const generateMatrix = () => {
    let uniqueChars = Array.from(new Set(key + alphabet)).slice(0, 25);
    let matrix = [];
    for (let i = 0; i < 5; i++) {
      matrix.push(uniqueChars.slice(i * 5, i * 5 + 5));
    }
    onKeyMatrixChange(matrix);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Введіть ключове слово"
        value={key}
        onChange={(e) => setKey(e.target.value.toLowerCase())}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={generateMatrix}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Створити таблицю
      </button>
    </div>
  );
};

export default KeyMatrix;