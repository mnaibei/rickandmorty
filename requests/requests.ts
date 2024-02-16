import axios from "axios";

export interface Location {
  id: number;
  name: string;
  type: string;
  residents: Resident[];
}

export interface Resident {
  id: number;
  name: string;
  status: string;
  image: string;
  episode: string;
}

export const fetchLocations = async (): Promise<Location[]> => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/location"
    );
    const locationsData = response.data.results;
    const locationsWithResidents = await Promise.all(
      locationsData.map(async (location: any) => {
        const residents = await Promise.all(
          location.residents.map(async (residentUrl: string) => {
            const residentResponse = await axios.get(residentUrl);
            const episodeUrl = residentResponse.data.episode[0];
            const episodeResponse = await axios.get(episodeUrl);
            const episodeName = episodeResponse.data.name;
            return {
              id: residentResponse.data.id,
              name: residentResponse.data.name,
              status: residentResponse.data.status,
              image: residentResponse.data.image,
              episode: episodeName,
            };
          })
        );

        return {
          id: location.id,
          name: location.name,
          type: location.type,
          residents: residents,
        };
      })
    );

    return locationsWithResidents;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};
