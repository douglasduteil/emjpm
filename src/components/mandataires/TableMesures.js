import { show } from "redux-modal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import format from "date-fns/format";

import { Button } from "..";

// bouton connecté à redux-modal.show pour EditMesure
const CellEditMesureRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-edit-mesure"
    onClick={() => show("EditMesure", { formData: row.original })}
  >
    Modifier
  </Button>
));

// bouton connecté à redux-modal.show pour CloseMesure
const CellCloseMesureRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-close-mesure"
    error
    onClick={() => show("CloseMesure", { id: row.original.id })}
  >
    Mettre fin au mandat
  </Button>
));

// bouton connecté à redux-modal.show pour ReactivateMesure
const CellReactivateMesureRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-reactivate-mesure"
    onClick={() => show("ReactivateMesure", { id: row.original.id })}
  >
    Réactiver la mesure
  </Button>
));

const concat = (...strings) =>
  strings
    .map(s => ("" + s).trim())
    .filter(Boolean)
    .join(" ");

const COLUMNS = [
  {
    Header: "ID",
    id: "id",
    accessor: "id",
    width: 50,
    show: false,
    style: { textAlign: "center", verticalAlign: "middle" }
  },
  {
    Header: "Date de décision",
    id: "date_ouverture",
    width: 160,
    accessor: d => format(d.date_ouverture, "YYYY-MM-DD"),
    Cell: row => (
      <div>
        {format(row.row.date_ouverture, "D MMMM YYYY", { locale: require("date-fns/locale/fr") })}
      </div>
    ),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Résidence du majeur",
    id: "residence",
    accessor: d => concat(d.code_postal, d.ville.toUpperCase()),
    style: { alignSelf: "center" }
  },
  {
    Header: "Type de mesure",
    id: "type",
    width: 200,
    accessor: d => d.type,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Genre",
    id: "civilite",
    width: 70,
    accessor: d => d.civilite,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Naissance",
    id: "annee",
    width: 80,
    accessor: "annee",
    Cell: row => <div>{format(row.row.annee, "YYYY")}</div>,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Extinction",
    id: "extinction",
    width: 100,
    accessor: d => format(d.date_ouverture, "YYYY-MM-DD"),
    Cell: row => (
      <div>
        {format(row.row.date_ouverture, "DD/MM/YYYY", { locale: require("date-fns/locale/fr") })}
      </div>
    ),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Modifier",
    id: "modifier",
    Cell: row => <CellEditMesureRedux row={row} />,
    width: 150,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Fin de mandat",
    id: "fin-mandat",
    Cell: row => <CellCloseMesureRedux row={row} />,
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Réactiver",
    id: "reactiver",
    Cell: row => <CellReactivateMesureRedux row={row} />,
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  }
];

class TableMesures extends React.Component {
  state = {
    data: [],
    loading: false
  };
  fetchData = (state, instance) => {
    if (!this.state.loading) {
      this.setState({ loading: true }, () =>
        this.props
          .fetch()
          .then(data => {
            this.setState({
              data,
              loading: false
            });
          })
          .catch(console.log)
      );
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // hack to force reload when some redux state change
    if (prevProps.lastUpdate !== this.props.lastUpdate) {
      this.fetchData();
    }
  }
  render() {
    const { data, loading } = this.state;
    const { hideColumns } = this.props;
    return (
      <ReactTable
        style={{ backgroundColor: "white", minHeight: 500 }}
        columns={COLUMNS.filter(col => hideColumns.indexOf(col.id) === -1)}
        noDataText="Aucune mesure ici..."
        showPagination={false}
        manual
        pageSize={-1}
        data={data}
        sortable={true}
        multiSort={false}
        defaultSorted={[
          {
            id: "date_ouverture",
            desc: true
          }
        ]}
        //defaultSortDesc={true}
        loading={loading}
        loadingText="Chargement des mesures..."
        onFetchData={this.fetchData}
        className="-striped -highlight"
      />
    );
  }
}

TableMesures.propTypes = {
  fetch: PropTypes.func.isRequired,
  hideColumns: PropTypes.array
};
TableMesures.defaultProps = {
  hideColumns: []
};

const mapStateToProps = state => ({
  // /!\ todo : hack
  // lastUpdate is updated when some mesure is modified so we can refresh the table
  lastUpdate: state.mesures.lastUpdate
});
export default connect(mapStateToProps)(TableMesures);
