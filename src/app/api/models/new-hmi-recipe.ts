/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<HmiRecipe, 'id'>, schemaOptions: { title: 'NewHmiRecipe', exclude: [ 'id' ] })
 */
export interface NewHmiRecipe {
  alea: string;
  btnTextEN?: string;
  btnTextFR?: string;
  btnTextHU?: string;
  codem: string;
  createdAt?: string;
  index: number;
  label: string;
  operation: string;
  updatedAt?: string;
}
