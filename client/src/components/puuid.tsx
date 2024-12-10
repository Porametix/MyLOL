"use client";
import React, { useState } from "react";
import { usePuuidContext } from "../contexts/puuidcontext";


const Puuid: React.FC = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const { contextValue, setPuuidData } = usePuuidContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const puuidData = await fetchPuuid(gameName, tagLine);

      const summonerData = await fetchSummonerData(puuidData.puuid);
      console.log(puuidData);
      console.log(summonerData);

      setPuuidData({
        ...puuidData,
        ...summonerData,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPuuid = async (gameName: string, tagLine: string) => {
    const response = await fetch(
      `/api/riot/checkpuuid?gameName=${gameName}&tagLine=${tagLine}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch PUUID");
    }
    return await response.json();
  };

  const fetchSummonerData = async (puuid: string) => {
    const response = await fetch(`/api/riot/checksumonerid?puuid=${puuid}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Summoner data");
    }
    return await response.json();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="text"
            id="gameName"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="GameName"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
          <input
            type="text"
            id="tagLine"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="TagLine"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex justify-center">
        {contextValue ? (
          <div className="flex justify-center flex-col ">
            <h2>Summoner Information</h2>
            <p>Game Name: {contextValue.gameName}</p>
            <p>Tag Line: {contextValue.tagLine}</p>
            <p>PUUID: {contextValue.puuid}</p>
            <p>Summoner ID: {contextValue.id}</p>
            <p>Account ID: {contextValue.accountId}</p>
            <p>profileIcon : </p>
            <img
              src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${contextValue.profileIconId}.jpg`}
              alt="Summoner Profile"
              width={100}
              height={100}
            />
            <p>revisionDate: {contextValue.revisionDate}</p>
            <p>Summoner Level: {contextValue.summonerLevel}</p>
          </div>
        ) : (
          <p>loadinng ...</p>
        )}
      </div>
    </div>
  );
};

export default Puuid;
