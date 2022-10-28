import admin from 'firebase-admin';

import { TConnector, TPageData } from '@workspace/core/entities';

export const FirebaseServerConnector = (serviceAccount: any): TConnector => {
  return {
    init: () => {
      //
    },
    createPage: async () => {
      return null;
    },
    deletePage: async () => {
      return null;
    },
    getAllPages: async () => {
      return null;
    },
    getPage: async (slug: string) => {
      const app = getApp(serviceAccount);

      const page = await app
        .firestore()
        .collection('pages')
        .doc(formatSlug(slug))
        .get()
        .then((snapshot) => snapshot.data());

      return page as TPageData;
    },
    updatePage: async () => {
      return null;
    },
  };
};

const getApp = (serviceAccount) => {
  try {
    return admin.app('backend');
  } catch {
    return admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
      },
      'backend'
    );
  }
};

const formatSlug = (slug: string) =>
  slug === '/'
    ? 'index'
    : slug
        .split('/')
        .filter((_) => _ !== '')
        .join('-');
