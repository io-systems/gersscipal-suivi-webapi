/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<ShiftSchedule, 'id'>, schemaOptions: { title: 'NewShiftSchedule', exclude: [ 'id' ] })
 */
export interface NewShiftSchedule {
  createdAt?: string;
  day?: string;
  end?: string;
  shift: string;
  start?: string;
  updatedAt?: string;
  weekDay?: number;
}
