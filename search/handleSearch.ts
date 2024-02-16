import { Location, Resident } from "@requests/requests";

export const handleSearch = (
  event: React.ChangeEvent<HTMLInputElement>,
  locations: Location[],
  setFilteredLocations: React.Dispatch<React.SetStateAction<Location[]>>,
  setFilteredResidents: React.Dispatch<React.SetStateAction<Resident[]>>,
  setFilteredEpisodes: React.Dispatch<React.SetStateAction<Resident[]>>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
) => {
  const searchTerm = event.target.value.toLowerCase();
  setSearchTerm(searchTerm);

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

  // Filter episodes
  const filteredEpisodes = locations.flatMap((location) =>
    location.residents.filter((resident) =>
      resident.episode.toLowerCase().includes(searchTerm)
    )
  );

  setFilteredLocations(filteredLocations);
  setFilteredResidents(filteredResidents);
  setFilteredEpisodes(filteredEpisodes);
};
