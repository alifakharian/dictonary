import "./App.css";
import { React, useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoIosCloseCircle } from "react-icons/io";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [data, setData] = useState("");

  function getMeaning() {
    try {
      Axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
      ).then((response) => {
        setData(response.data[0]);
      });
    } catch (erroe) {
      console.log(erroe.message);
    }
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  function getclear() {
    setSearchWord("");
  }

  return (
    <div className="main flex flex-col  justify-center items-center">
      <h className="title flex-col flex-wrap text-[60px] font-extrabold text-teal-300 tracking-[0.25rem]">
        Dictionary
      </h>
      <div className="flex flex-wrap gap-x-2">
        <input
          type="text"
          value={searchWord}
          className="w-[25vw] text-center font-bold h-[50px] rounded-xl  outline-none p-3 text-white text-sm bg-[#5085ccec]  shadow-inner"
          placeholder="Search..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          className="bg-[#354155] h-[45px] px-4 size-[50px] text-center  cursor-pointer mt-1 text-white rounded-lg"
          onClick={() => {
            getMeaning();
          }}
        >
          <FaSearch size="20px" className="" />
        </button>

        <button
          className="bg-[#354155] h-[45px] font-bold size-[50px] text-center  cursor-pointer mt-1 text-white rounded-lg"
          onClick={() => {
            getclear();
          }}
        >
          <IoIosCloseCircle className="size-[25px] ml-3" />
        </button>
      </div>
      {data && (
        <div className="information  flex flex-col flex-wrap mx-3 p-5 rounded-2xl mt-5 ">
          <h2 className="text-white font-extrabold">
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <HiSpeakerWave className="ml-1 mt-4 size-[26px]" />
            </button>
          </h2>

          <h4 className="text-teal-300 font-bold mt-3">Parts of speech:</h4>

          <p className="text-white font-bold">
            {data.meanings[0].partOfSpeech}
          </p>
          <h4 className="text-teal-300  mt-3 font-bold">Phonetic:</h4>

          <p className="text-white font-bold">{data.phonetic}</p>

          <h4 className="text-teal-300  mt-3 font-bold">Definition:</h4>

          <p className="text-white font-bold">
            {data.meanings[0].definitions[0].definition}
          </p>

          <h4 className="text-teal-300  font-bold mt-3">Example:</h4>

          <p className="text-white font-bold">
            {data.meanings[0].definitions[0].example}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
