import { put } from 'redux-saga/effects';
import { actions } from '../reducers/notification.actions';

function* showNotificationSaga(action) {
  const { message, severity } = action.payload;

  yield put(actions.showNotification(message, severity));

  yield new Promise((resolve) => setTimeout(resolve, 3000));

  yield put(actions.hideNotification());
}

export const sagas = [
    actions.showNotification,
    showNotificationSaga(),
];