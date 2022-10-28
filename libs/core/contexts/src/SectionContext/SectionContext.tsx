import { createContext, ReactNode, useContext } from 'react';
import { TSectionContext } from './SectionContext.types';

const sectionContext = createContext<TSectionContext>({
  getField: () => {
    //
  },
  updateField: () => {
    //
  },
});

export const useSectionContext = () => useContext(sectionContext);

export const SectionContextProvider: React.FC<{
  children: ReactNode;
  getData: () => any;
  handleUpdate?: (value: any) => void;
}> = ({ children, getData, handleUpdate }) => {
  const getField = (id: string) => {
    let element = getData();

    for (const itemId of id.split('.')) {
      if (Array.isArray(element)) {
        element = element.find(({ id }) => id === itemId);
      } else {
        element = element[itemId];
      }
    }

    return element;
  };

  const updateField = (id: string, value: any) => {
    const split = id.split('.');

    if (split.length === 1) {
      handleUpdate?.({ ...getData(), [id]: value });
    } else {
      const data = getData();
      let element = data;

      for (const itemId of split.slice(0, -1)) {
        if (Array.isArray(element)) {
          element = element.find(({ id }) => id === itemId);
        } else {
          element = element[itemId];
        }
      }

      const last = split.slice(-1)[0];

      console.log(last);

      if (Array.isArray(element)) {
        const index = element.findIndex(({ id }) => id === last);

        element[index] = value;
      } else {
        element[last] = value;
      }

      handleUpdate?.({ ...data });

      console.log('ICI', element);
    }
  };

  return (
    <sectionContext.Provider
      value={{
        getField,
        updateField,
      }}
    >
      {children}
    </sectionContext.Provider>
  );
};
