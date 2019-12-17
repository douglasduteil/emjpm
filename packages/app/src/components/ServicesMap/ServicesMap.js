import { useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext } from "react";

import { MapContainer, MapLayer } from "../Map";
import { MapContext } from "./context";
import { MESURES_SERVICE } from "./queries";

const ServicesMap = () => {
  const { currentGestionnaire } = useContext(MapContext);
  const { latitude, longitude } = currentGestionnaire;
  const { data, loading, error } = useQuery(MESURES_SERVICE);
  const selectMesure = event => {
    const {
      feature: {
        properties: { currentId }
      }
    } = event;
    Router.push(`/services/mesures/${currentId}`);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { mesures: mesuresMarkers } = data;
  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapLayer markers={mesuresMarkers} onClick={event => selectMesure(event)} type="mesure" />
    </MapContainer>
  );
};

export { ServicesMap };