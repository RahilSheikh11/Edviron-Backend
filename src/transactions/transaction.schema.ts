import { Schema } from 'mongoose';

export const TransactionSchema = new Schema({
  collect_id: String,
  school_id: String,
  gateway: String,
  order_amount: Number,
  transaction_amount: Number,
  status: String,
  custom_order_id: String,
  bank_reference: String,
});
