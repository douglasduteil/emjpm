import { Mesures, MesureStatus } from "../model/mesures.model";
import { NullableNumber } from "../utils/types.util";
import { AuthDataSource } from "./auth-datasource";

const convertDates = (mesure: SearchMesureResult) => {
  mesure.date_ouverture = mesure.date_ouverture
    ? new Date(mesure.date_ouverture)
    : null;
  mesure.extinction = mesure.extinction ? new Date(mesure.extinction) : null;
  return mesure;
};

export interface SearchMesureResultWrapper {
  mesures: SearchMesureResult[];
}

export interface SearchMesuresParam {
  closed?: {
    between?: {
      start: string;
      end: string;
    };
    gt_or_null?: string;
  };
  court?: NullableNumber;
  created?: {
    between?: {
      start: string;
      end: string;
    };
    lt?: string;
  };
  department?: NullableNumber;
  opening?: {
    between?: {
      start: string;
      end: string;
    };
    lt?: string;
  };
  region?: NullableNumber;
  status?: MesureStatus;
  type?: {
    _in: string[];
  };
}

export type SearchMesureResult = Pick<
  Mesures,
  "date_ouverture" | "cabinet" | "civilite" | "status" | "type" | "extinction"
>;

export class MesureAPI extends AuthDataSource {
  constructor() {
    super();
  }

  public searchMesures(params: SearchMesuresParam) {
    const where = this.buildFilters(params).join(", ");
    const query = `
    {
      mesures(where: { ${where} }) {
        date_ouverture
        cabinet
        civilite
        status
        type
        extinction
      }
    }
  `;

    return this.post("/", { query }).then(response => {
      return response.data.mesures.map(convertDates);
    });
  }

  public countMesures(params: SearchMesuresParam) {
    const where = this.buildFilters(params).join(", ");
    const query = `
    {
      mesures_aggregate(where: { ${where} }) {
        aggregate {
          count
        }
      }
    }
  `;

    return this.post("/", { query });
  }

  private buildFilters(params: SearchMesuresParam): string[] {
    const filters = [];
    if (params.type) {
      if (params.type._in) {
        filters.push(`type: { _in: ${JSON.stringify(params.type._in)} }`);
      }
    }
    if (params.created) {
      if (params.created.between) {
        const between = params.created.between;
        filters.push(
          `created_at: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (params.created.lt) {
        filters.push(`created_at: { _lt: "${params.created.lt}" }`);
      }
    }
    if (params.opening) {
      if (params.opening.between) {
        const between = params.opening.between;
        filters.push(
          `date_ouverture: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (params.opening.lt) {
        filters.push(`date_ouverture: { _lt: "${params.opening.lt}" }`);
      }
    }
    if (params.closed) {
      if (params.closed.between) {
        const between = params.closed.between;
        filters.push(
          `extinction: { _gt: "${between.start}", _lt: "${between.end}" }`
        );
      }
      if (params.closed.gt_or_null) {
        filters.push(
          `_or: [
                  {extinction: { _gt: "${params.closed.gt_or_null}"}},
                  {status: {_neq: "Eteindre mesure"}}
              ]`
        );
      }
    }
    if (params.region) {
      filters.push(
        `departement:
          {
            region: {
                id: {_eq: ${params.region}}
            }
          }`
      );
    }
    if (params.department) {
      filters.push(`department_id: {_eq: ${params.department}}`);
    }
    if (params.court) {
      filters.push(`ti_id: {_eq: ${params.court}}`);
    }
    if (params.status) {
      filters.push(`status: {_eq: "${params.status}"}`);
    }
    return filters;
  }
}
