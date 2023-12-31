export type VerticalBlockType = Record<string, VerticalBlockObj>;

export type VerticalBlockObj = {
  blockName: string;
  imgName: string;
  url: string;
};

export type HorizontalBlockType = Record<string, HorizontalBlockObj>;

export type HorizontalBlockObj = {
  blockName: string;
  imgName: string;
};

export interface HorizontalBlockProps {
  blockName: string;
  imgName: string;
}

export interface VerticalBlockProps {
  blockName: string;
  imgName: string;
  url: string;
}
