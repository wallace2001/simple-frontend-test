import { useDispatch, useSelector } from "react-redux";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";

import DataTable from "../components/table";
import { Typography } from "@material-ui/core";
import { Loading } from "../components/loading";

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
      icon: <DeleteIcon color="error" />,
      action: () => {
        // TODO: Delete route
      }
    },
  ];

  return (
    <>
      <Typography variant="h4">Usuários</Typography>
      <DataTable
        rows={data}
        actions={actionsTable}
      />
    </>
  );
};

export default HomePage;
