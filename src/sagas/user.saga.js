import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { request } from "../utils/api";
import { actions as actionsNotification } from "../reducers/notification.actions";
import { actions as actionsModal } from "../reducers/modal.actions";
import { parse } from "date-fns";
import _ from "lodash";

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: ({ id }) => {
    return request({
      url: `${process.env.REACT_APP_API_URL}/usuario/${id}`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ user: response.data });
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => {
    return request({
      url: `${process.env.REACT_APP_API_URL}/usuario/${id}`,
      method: "patch",
      body: {
        ...values,
        dataNascimento: parse(_.get(values, 'dataNascimento'), 'dd/MM/yyyy', new Date())
      },
    });
  },
  postSuccess: function* () {
    yield put(actionsNotification.showNotification('Usuário atualizado com sucesso.', 'success'))
    yield put(routeActions.redirectTo(routes.HOME));
  },
  postFailure: function* () {
    yield put(actionsNotification.showNotification('Falha ao atualizar usuário.','error'));
  }
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  api: ({ id }) => {
    return request({
      url: `${process.env.REACT_APP_API_URL}/usuario/${id}`,
      method: "delete",
    });
  },
  postSuccess: function* () {
    yield put(actionsNotification.showNotification('Usuário deletado com sucesso.', 'success'))
    yield put(actionsModal.hideModalConfirmDelete());
    yield put(routeActions.redirectTo(routes.HOME));
  },
  postFailure: function* () {
    yield put(actionsNotification.showNotification('Falha ao deletar usuário.','error'));
  }
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  deleteUser.watcher(),
];
