"use client";
import { useState, useEffect } from "react";
import { fetchLocations, Location, Resident } from "@requests/requests";
import Link from "next/link";

const Home = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetching locations data
  useEffect(() => {
    fetchLocations().then((data) => {
      setLocations(data);
      setFilteredLocations(data);
    });
  }, []);

  console.log(locations);

  // Declare a new state variable for filtered residents
  const [filteredResidents, setFilteredResidents] = useState<Resident[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    console.log(searchTerm);

    // Filter locations
    const filteredLocations = locations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm)
    );

    // Filter residents
    const filteredResidents = locations.flatMap((location) =>
      location.residents.filter((resident) =>
        resident.name.toLowerCase().includes(searchTerm)
      )
    );

    setFilteredLocations(filteredLocations);
    setFilteredResidents(filteredResidents);
    console.log(filteredLocations);
    console.log(filteredResidents);
  };

  // Handling loading state if no locations data is available
  if (locations.length === 0 || !filteredLocations) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="search w-full flex justify-center items-center max-sm:w-full">
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
            <li key={location.id} className="flex flex-col p-4">
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
                      />
                      <div className="info p-2">
                        <p>Name: {resident.name}</p>
                        <p>Status: {resident.status}</p>
                        <p>Episode: {resident.episode}</p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <ul className="flex w-full flex-col gap-5">
          {filteredResidents.map((resident) => (
            <li key={resident.id} className="flex flex-col p-4">
              <Link
                href={`/resident-details/${resident.id}`}
                className="border-2 border-black flex flex-col items-center justify-center h-fit">
                <img
                  src={resident.image}
                  alt={resident.name}
                  className="h-fit w-fit max-sm:w-full"
                />
                <div className="info p-2">
                  <p>Name: {resident.name}</p>
                  <p>Status: {resident.status}</p>
                  <p>Episode: {resident.episode}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
