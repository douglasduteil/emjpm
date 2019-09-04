import gql from "graphql-tag";

export const GET_SERVICES_ANTENNE = gql`
  query service_antenne($serviceId: Int!) {
    service_antenne(where: { headquarters: { _eq: true }, id: { _eq: $serviceId } }) {
      address_city
      address_street
      address_zip_code
      bak_mandataire_id
      contact_email
      service_id
      name
      mesures_max
      mesures_in_progress
      mesures_awaiting
      id
      headquarters
      date_mesure_update
      created_at
      contact_phone
      contact_lastname
      contact_firstname
    }
  }
`;