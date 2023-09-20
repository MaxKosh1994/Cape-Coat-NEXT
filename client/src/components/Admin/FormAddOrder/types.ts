export interface IProduct {
  height?: string;
  length?: string;
  sleeve?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  saddle?: string;
  loops?: string;
  buttons?: string;
  lining?: string;
  selectedMaterial?: string;
}

export interface IParamsFormData {
  [key: number]: IProduct;
}

export interface IMaterial {
  name: string;
}

export interface IMaterials {
  [itemId: number]: IMaterial[];
}
