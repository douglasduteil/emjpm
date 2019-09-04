import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import { Box } from "rebass";

import { MandatairesActivityChart } from "./MandatairesActivityChart";
import { FiltersContext } from "../Filters/context";
import { MANDATAIRE_ACTIVITY } from "./queries";

const MandatairesActivity = props => {
  const {
    selectedRegionalValue,
    startDateValue,
    selectedDepartementValue,
    endDateValue
  } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(MANDATAIRE_ACTIVITY, {
    variables: {
      start: startDateValue,
      end: endDateValue,
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return (
      <Card p="4">
        <Heading2>Répartition de l’activité par type de mandataires</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="4">
        <Heading2>Répartition de l’activité par type de mandataires</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  return (
    <Card p="4" {...props}>
      <Heading2>Répartition de l’activité par type de mandataires</Heading2>
      <MandatairesActivityChart data={data} />
    </Card>
  );
};

export { MandatairesActivity };