/* eslint-disable react/prop-types */
import { useState } from "react";

const PlayfairEncryptor = ({ keyMatrix }) => {
  const [plainText, setPlainText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");

  const findPosition = (letter) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (keyMatrix[row][col] === letter) {
          return { row, col };
        }
      }
    }
    return null;
  };

  const encryptBigram = (a, b) => {
    const posA = findPosition(a);
    const posB = findPosition(b);

    if (!posA || !posB) return a + b;

    // Правило 1: якщо в одному рядку
    if (posA.row === posB.row) {
      return (
        keyMatrix[posA.row][(posA.col + 1) % 5] +
        keyMatrix[posB.row][(posB.col + 1) % 5]
      );
    }
    // Правило 2: якщо в одному стовпці
    else if (posA.col === posB.col) {
      return (
        keyMatrix[(posA.row + 1) % 5][posA.col] +
        keyMatrix[(posB.row + 1) % 5][posB.col]
      );
    }
    // Правило 3: якщо формують прямокутник
    else {
      return keyMatrix[posA.row][posB.col] + keyMatrix[posB.row][posA.col];
    }
  };

  const encryptText = () => {
    let bigrams = [];
    for (let i = 0; i < plainText.length; i += 2) {
      const first = plainText[i];
      const second = plainText[i + 1] || "х"; // Заповнюємо "х" якщо немає другої літери
      bigrams.push(first === second ? first + "х" : first + second);
    }
    const encrypted = bigrams
      .map((bigram) => encryptBigram(bigram[0], bigram[1]))
      .join("");
    setEncryptedText(encrypted);
  };

  return (
    <div className="p-4">
      <textarea
        placeholder="Введіть текст для шифрування"
        value={plainText}
        onChange={(e) => setPlainText(e.target.value.toLowerCase())}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={encryptText}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Зашифрувати
      </button>
      {encryptedText && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-50">
          <strong>Криптограма:</strong> {encryptedText}
        </div>
      )}
    </div>
  );
};

export default PlayfairEncryptor;
