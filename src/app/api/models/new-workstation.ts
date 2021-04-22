/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Workstation, 'id'>, schemaOptions: { title: 'NewWorkstation', exclude: [ 'id' ] })
 */
export interface NewWorkstation {
  aleaPrefix?: string;
  createdAt?: string;
  description?: string;
  divaltoCode: string;
  divaltoName?: string;
  ipAddress: string;
  localization?: string;
  updatedAt?: string;
}
