import { all } from "redux-saga/effects";
import { sagas as homeSagas } from "./home.saga";
import { sagas as userSagas } from "./user.saga";
import { sagas as notificationSagas } from './notification.saga'; 

const sagas = function* () {
  yield all([...notificationSagas, ...homeSagas, ...userSagas]);
};

export default sagas;
