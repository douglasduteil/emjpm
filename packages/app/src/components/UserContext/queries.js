import gql from "graphql-tag";

export const CURRENT_USER = gql`
  {
    currentUser @client {
      role
      serviceId
      id
    }
  }
`;

export const GET_SERVICE_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
      service_members {
        id
        service_id
        user_id
        is_admin
        user {
          email
          prenom
          nom
          id
        }
        service {
          id
          mesures_in_progress
          mesures_awaiting
          dispo_max
          etablissement
          longitude
          latitude
          service_antennes {
            name
            mesures_max
            mesures_in_progress
            mesures_awaiting
            id
            contact_phone
            contact_lastname
            contact_firstname
            contact_email
            address_zip_code
            address_street
            address_city
            address
            longitude
            latitude
          }
        }
      }
    }
  }
`;

export const DIRECTION_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
    }
  }
`;

export const MAGISTRAT_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      cabinet
      id
      last_login
      nom
      prenom
      type
      username
      magistrat {
        ti_id
        ti {
          id
          siret
          ville
          telephone
          etablissement
          email
          code_postal
          address
          latitude
          longitude
        }
      }
    }
  }
`;

export const ADMIN_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      id
      last_login
      nom
      prenom
      type
      username
    }
  }
`;

export const MANDATAIRE_USERS = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      created_at
      id
      last_login
      nom
      prenom
      type
      username
      cabinet
      user_tis {
        ti {
          etablissement
        }
      }
      mandataire {
        id
        dispo_max
        mesures_en_cours
        mesures_en_attente
        longitude
        latitude
        telephone
        telephone_portable
        secretariat
        nb_secretariat
        siret
        adresse
        competences
      }
    }
  }
`;
