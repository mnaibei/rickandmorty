"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@components/Nav";
import "@styles/globals.css";

const ResidentDetailsPage = () => {
  const router = useRouter();
  const [resident, setResident] = useState<any>(null);
  const [notes, setNotes] = useState<string>("");
  const [allNotes, setAllNotes] = useState<string[]>([]);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((response) => {
          setResident(response.data);
          const storedNotes = localStorage.getItem(`resident_notes_${id}`);
          if (storedNotes) {
            setAllNotes(JSON.parse(storedNotes));
            setNotes("");
          }
        })
        .catch((error) => {
          console.error("Error fetching resident details:", error);
        });
    }
  }, [router.query]);

  console.log(resident);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { id } = router.query;
    if (id) {
      const updatedNotes = [...allNotes, notes];
      localStorage.setItem(
        `resident_notes_${id}`,
        JSON.stringify(updatedNotes)
      );
      setAllNotes(updatedNotes);
      setNotes("");
    }
  };

  if (!resident) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col h-full ">
      <div className=" h-20 w-3/4 pl-3 pr-3 self-center mb-5 max-sm:w-full">
        <Nav />
      </div>
      <div className="  grid grid-cols-2 w-3/4 h-full self-center gap-4 max-sm:grid-cols-1 max-sm:w-fit">
        <div className="mt-5 border-3 flex flex-col items-center">
          <h2 className="mb-2 font-extrabold">Resident Details</h2>
          <img
            src={resident.image}
            alt={resident.name}
            className="border-2 border-green-500"
          />
          <div className="info mt-2 grid grid-cols-2 gap-x-4 p-2 max-sm:gap-x-2">
            <p>Name: {resident.name}</p>
            <p>Status: {resident.status}</p>
            <p>Species: {resident.species}</p>
            <p>Gender: {resident.gender}</p>
            <p>Location: {resident.location.name}</p>
            <p>Origin: {resident.origin.name}</p>
          </div>
        </div>
        <div className="note-section flex flex-col gap-4 p-2 justify-center">
          <div>
            <h3>Previous Notes:</h3>
            <div className=" flex flex-col items-left mt-3">
              <ul>
                {allNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="notes">Add Note:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={handleNotesChange}
              placeholder="Add a note..."
              className="w-full border-2 border-gray-400 rounded p-2 mt-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mt-2 mb-10">
              Save Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetailsPage;
