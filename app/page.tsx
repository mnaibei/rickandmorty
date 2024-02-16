"use client";
import { useState, useEffect } from "react";
import { fetchLocations, Location } from "@requests/requests";

const Home = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocations(data);
      setFilteredLocations(data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const searchTerms = searchTerm
      .split(" ")
      .filter((term) => term.trim() !== "");

    const filtered = locations.filter((location) => {
      return searchTerms.every(
        (term) =>
          location.name.toLowerCase().includes(term) ||
          location.residents.some((resident) =>
            resident.name.toLowerCase().includes(term)
          ) ||
          location.residents.some((resident) =>
            resident.episode.toLowerCase().includes(term)
          )
      );
    });

    setFilteredLocations(filtered);
  };

  return (
    <>
      <div className="search w-full  flex justify-center items-center">
        <input
          type="text"
          className="w-1/2 p-2 "
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="w-full mt-5 border-3 border-red-500">
        <ul className="flex border-2 border-red-500 w-full flex-col gap-4">
          {filteredLocations.map((location) => (
            <li
              key={location.id}
              className="border-2 border-green-500 flex flex-col">
              <h2>{location.name}</h2>
              <p>Type: {location.type}</p>
              <p>Residents: {location.residents.length}</p>
              <ul className="border-2 border-red-600 grid grid-cols-4 gap-4">
                {location.residents.map((resident) => (
                  <li key={resident.id}>
                    <img src={resident.image} alt={resident.name} />{" "}
                    <p>Name: {resident.name}</p>
                    <p>Status: {resident.status}</p>
                    <p>Episode: {resident.episode}</p>{" "}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
