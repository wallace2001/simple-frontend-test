import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";

import { Edit, DeleteOutline } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import { Button, Typography } from "@material-ui/core";
import { ControlledTextField } from "../components/inputs";
import { Loading } from "../components/loading";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };
  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Typography variant="h4">Usuário #{id}</Typography>

      <form onSubmit={formProps.handleSubmit(handleSubmit)}>
        <ControlledTextField label="Nome" name={"nome"} formProps={formProps} />
        <ControlledTextField label="CEP" name={"cep"} formProps={formProps} />
        <ControlledTextField
          label="Cidade"
          name={"cidade"}
          formProps={formProps}
        />
        <ControlledTextField label="UF" name={"uf"} formProps={formProps} />
        <Button type={"submit"}>GRAVAR</Button>
      </form>
    </>
  );
};

export default UserPage;
