import { initializeApp } from 'firebase/app';

import admin from 'firebase-admin';

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore/lite';

import { TConnector, TPageData } from '@workspace/core/entities';

export const FirebaseConnector = (firebaseConfig: any): TConnector => {
  const init = () => {
    initializeApp(firebaseConfig);
  };

  const getAllPages = async () => {
    const db = getFirestore();
    const pageCollection = collection(db, 'pages');

    const query = await getDocs(pageCollection);

    return (await Promise.all(
      query.docs.map((doc) => doc.data())
    )) as TPageData[];
  };

  const getPage = async (slug: string) => {
    const db = getFirestore();
    const pageCollection = collection(db, 'pages');
    const docRef = doc(pageCollection, formatSlug(slug));
    const page = await getDoc(docRef).then((snapshot) => snapshot.data());

    return page as TPageData;
  };

  const deletePage = async (slug: string) => {
    const db = getFirestore();
    const pageCollection = collection(db, 'pages');
    const docRef = doc(pageCollection, formatSlug(slug));

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePage = async (slug: string, page: TPageData) => {
    const db = getFirestore();
    const pageCollection = collection(db, 'pages');
    const docRef = doc(pageCollection, formatSlug(slug));

    try {
      await setDoc(docRef, page);
      return page;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const createPage = async (slug: string, page: TPageData) => {
    const db = getFirestore();
    const pageCollection = collection(db, 'pages');
    const docRef = doc(pageCollection, formatSlug(slug));

    try {
      await setDoc(docRef, page);
      return page;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    init,
    getAllPages,
    getPage,
    deletePage,
    updatePage,
    createPage,
  };
};

const formatSlug = (slug: string) =>
  slug === '/'
    ? 'index'
    : slug
        .split('/')
        .filter((_) => _ !== '')
        .join('-');
