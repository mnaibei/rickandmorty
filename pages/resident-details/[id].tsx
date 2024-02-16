"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@components/Nav";
import "@styles/globals.css";

const ResidentDetailsPage = () => {
  const router = useRouter();
  const [resident, setResident] = useState<any>(null);

  useEffect(() => {
    const { id } = router.query;
    console.log("id", id);
    if (id) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((response) => {
          setResident(response.data);
        })
        .catch((error) => {
          console.error("Error fetching resident details:", error);
        });
    }
  }, [router.query]);

  if (!resident) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="border-2 border-red-500 h-14 pl-3 pr-3">
        <Nav />
      </div>
      <div className="main">
        <div className="gradient" />
        <div className="mt-5 border-3 border-red-500">
          <h2>Resident Details</h2>
          <img src={resident.image} alt={resident.name} />
          <p>Name: {resident.name}</p>
          <p>Status: {resident.status}</p>
          {/* Add any other details you want to display */}
        </div>
      </div>
    </>
  );
};

export default ResidentDetailsPage;
