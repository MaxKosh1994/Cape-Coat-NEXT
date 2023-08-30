export type VerticalBlockType = Record<string, VerticalBlockObj>;

export type VerticalBlockObj = {
  blockName: string;
  imgUrl: string;
  url: string;
};

export type HorizontalBlockType = Record<string, HorizontalBlockObj>;

export type HorizontalBlockObj = {
  blockName: string;
  imgName: string;
};
