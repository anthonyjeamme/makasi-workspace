export type THeadSectionData = {
  image: string;
  text: string;
  description: string;
  buttons: THeadSectionDataButton[];
};

export type THeadSectionDataButton = {
  id: string;
  style: string;
  text: string;
};
