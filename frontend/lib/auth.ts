import { authenticate } from '@stacks/connect';
import { AppConfig, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export async function authenticateUser() {
  return new Promise((resolve, reject) => {
    authenticate({
      appDetails: {
        name: 'S-pay',
        icon: '/logo.png',
      },
      onFinish: (payload) => {
        resolve(payload);
      },
      onCancel: () => {
        reject(new Error('Authentication cancelled'));
      },
      userSession,
    });
  });
}

export function getUserSession() {
  return userSession;
}

export function isUserSignedIn() {
  return userSession.isUserSignedIn();
}

export function getUserData() {
  return userSession.loadUserData();
}

export function signOut() {
  userSession.signUserOut();
}
