import React, { useEffect, useState } from "react";

const Game = () => {
  const [score, setScore] = useState();
  const [randomNumber, setRandomNumber] = useState(null);
  const handleStartGame = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(randomNumber);
    setRandomNumber(randomNumber);
  };
  useEffect(() => {
    handleStartGame();
  },[]);

  const handlecheckGuess = () => {
    if (randomNumber > score && score != undefined) alert("Too Low");
    else if (randomNumber < score) alert("Too High");
    else alert("Matched!");
  };
  return (
    <div>
      <button
        type="submit"
        onClick={handleStartGame}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Start
      </button>
      <label
        htmlFor="enter_number"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Enter Number
      </label>
      <input
        type="text"
        id="enter_number"
        name="enter_number"
        value={score}
        onChange={(e) => {
          setScore(e.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John"
        required
      />
      <button
        onClick={handlecheckGuess}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default Game;
