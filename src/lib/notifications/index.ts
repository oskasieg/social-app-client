import { store } from 'react-notifications-component';
import i18n from '../../locales/i18n';

export const showNotification = (
  type: 'success' | 'danger' | 'info' | 'default' | 'warning' | undefined,
  title: string,
  message: string
) => {
  store.addNotification({
    container: 'bottom-center',
    type: type,
    title: i18n.t(title),
    message: i18n.t(message),
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: true,
      pauseOnHover: true,
    },
  });
};
