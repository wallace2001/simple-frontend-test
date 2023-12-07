import { useDispatch, useSelector } from "react-redux";
import { actions } from "../reducers/user.actions";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";

import DataTable from "../components/table";
import { Button, Container, Typography } from "@material-ui/core";
import { Loading } from "../components/loading";
import _ from "lodash";
import { ageCalculator } from "../utils/age-calculator";
import SearchBar from "../components/search";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <Loading />
  }

  const actionsTable = [
    {
      id: 'edit',
      icon: <EditIcon />,
      action: (id) => {
        dispatch(
          routeActions.redirectTo(routes.USER, { id }));
      }
    },
    {
      id: 'delete',
      icon: <DeleteIcon />,
      action: (id) => {
        dispatch(actions.deleteUser.request({ id }));
      }
    },
  ];

  const columns = [
    {
      id: 'name',
      label: 'Nome',
      field: 'nome'
    },
    {
      id: 'locate',
      label: 'Cidade/UF',
      field: 'cidade',
      render: (params) => (
        `${_.get(params, 'cidade')}/${_.get(params, 'uf')}`
      )
    },
    {
      id: 'age',
      label: 'Idade',
      field: 'dataNascimento',
      render: (param) => `${ageCalculator(param.dataNascimento)} anos`
    },
    {
      id: 'actions',
      label: 'Ações',
      field: 'actions',
      render: (param) => (
        actionsTable.map(action => (
          <Button onClick={() => action.action(param.id)} variant='text'>
            {action.icon}
          </Button>
        ))
      )
    },
  ];

  return (
    <>
      <Typography variant="h4">Usuários</Typography>
      <div maxWidth="sm" style={{ padding: '3rem 0' }}>
        <SearchBar />

      </div>
      <DataTable
        columns={columns}
        data={data.content}
      />
    </>
  );
};

export default HomePage;
