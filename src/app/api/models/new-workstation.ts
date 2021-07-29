/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Workstation, 'id'>, schemaOptions: { title: 'NewWorkstation', exclude: [ 'id' ] })
 */
export interface NewWorkstation {
  active?: boolean;
  aleaPrefix?: string;
  codem: string;
  createdAt?: string;
  description?: string;
  divaltoName?: string;
  ipAddress?: string;
  localization?: string;
  maxPalettePerHour?: number;
  recordingRate?: number;
  unit?: string;
  updatedAt?: string;
}
