/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<MessageStatus, 'id'>, schemaOptions: { title: 'NewMessageStatus', exclude: [ 'id' ] })
 */
export interface NewMessageStatus {
  createdAt?: string;
  description?: string;
  status: number;
  updatedAt?: string;
}
