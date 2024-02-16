"use client";
import { useState, useEffect } from "react";
import { fetchLocations, Location } from "@requests/requests";
import Link from "next/link";

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
      <div className="search w-full  flex justify-center items-center max-sm:w-full">
        <input
          type="text"
          className="w-1/2 p-2 max-sm:w-full"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="w-full mt-5">
        <ul className="flex w-full flex-col gap-5">
          {filteredLocations.map((location) => (
            <li key={location.id} className=" flex flex-col p-4">
              <h2 className="font-extrabold">{location.name}</h2>
              <p>Type: {location.type}</p>
              <p>Residents: {location.residents.length}</p>
              <ul className="grid grid-cols-4 gap-4 max-sm:grid-cols-1 mt-2">
                {location.residents.map((resident) => (
                  <Link
                    href={`/resident-details/${resident.id}`}
                    className="border-2 border-black flex flex-col items-center justify-center h-fit">
                    <li key={resident.id}>
                      <img
                        src={resident.image}
                        alt={resident.name}
                        className="h-fit w-fit max-sm:w-full"
                      />{" "}
                      <div className="info p-2">
                        <p>Name: {resident.name}</p>
                        <p>Status: {resident.status}</p>
                        <p>Episode: {resident.episode}</p>{" "}
                      </div>
                    </li>
                  </Link>
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
