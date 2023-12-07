import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import { actions as actionsNotification } from "../reducers/notification.actions";
import { Button, CssBaseline, Grid, Paper, Typography } from "@material-ui/core";
import { ControlledTextField, PhoneTextField, ZipCodeTextField } from "../components/inputs";
import { Loading } from "../components/loading";
import _ from "lodash";
import { useState } from "react";
import DateTextField, { formatDate } from "../components/inputs/dateTextField";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);

  const [cep, setCep] = useState('');

  const rules = {
    nome: {required: "Campo obrigatório!"},
    cidade: {required: "Campo obrigatório!"},
    uf: {required: "Campo obrigatório!"},
    telefone: {required: "Campo obrigatório!"},
    dataNascimento: {required: "Campo obrigatório!"},
  };
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };

  const { handleSubmit, setValue, ...propsForm } = useForm();

  const formProps = {
    ...propsForm,
    setValue,
    rules,
    initialValues,
  };

  const onSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  const handleCepChange = (event) => {
    setCep(event.replace(/\D/g, ''));
  };

  const resetFields = () => {
    Object.keys(data).forEach((key) => {
      if (key === "dataNascimento") {
        setValue(key, formatDate(data[key]));
        return;
      }
      setValue(key, data[key]);
    });
  };

  const handleBlurCep = async () => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setValue("cidade", data.localidade);
          setValue("uf", data.uf);
        } else {
          dispatch(actionsNotification.showNotification('Cep inválido', 'error'))
        }
      } catch (error) {
        dispatch(actionsNotification.showNotification('Erro interno', 'error'))
      }
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Editando usuário de id #{_.get(data, 'id')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <ControlledTextField style={{ width: '100%' }} label="Nome" name={"nome"} formProps={formProps} />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField 
                onChange={handleCepChange}
                onBlur={handleBlurCep} 
                customInput={ZipCodeTextField} 
                style={{ width: '100%' }} 
                label="CEP" 
                name={"cep"} 
                formProps={formProps}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField 
                style={{ width: '100%' }} 
                disabled label="Cidade" 
                name={"cidade"} 
                formProps={formProps} 
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField 
                style={{ width: '100%' }} 
                disabled 
                label="UF" 
                name={"uf"} 
                formProps={formProps} 
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                style={{ width: '100%' }} 
                customInput={PhoneTextField} 
                label="Número de Telefone" 
                name={"telefone"} 
                formProps={formProps} 
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                style={{ width: '100%' }} 
                customInput={DateTextField} 
                label="Data de Nascimento" 
                name={"dataNascimento"} 
                formProps={formProps} 
                format={formatDate}
              />
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                type="button"
                variant="contained"
                onClick={() => resetFields()}
              // disabled={submitting || pristine}
              >
                Resetar
              </Button>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              // disabled={submitting}
              >
                Gravar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default UserPage;
