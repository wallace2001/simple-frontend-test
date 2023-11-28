import { useDispatch, useSelector } from "react-redux";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";

import DataTable from "../components/table";
import { Button, Typography } from "@material-ui/core";
import { Loading } from "../components/loading";
import _ from "lodash";
import { ageCalculator } from "../utils/age-calculator";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <Loading />
  }

  const actions = [
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
      icon: <DeleteIcon color="error" />,
      action: () => {
        // TODO: Delete route
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
        actions.map(action => (
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
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
};

export default HomePage;
