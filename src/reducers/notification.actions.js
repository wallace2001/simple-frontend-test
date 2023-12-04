export const actions = {
  showNotification: (message, severity) => ({
    type: 'SHOW_NOTIFICATION',
    payload: { message, severity },
  }),
  hideNotification: () => ({
    type: 'HIDE_NOTIFICATION'
  }),
};
