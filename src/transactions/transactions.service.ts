import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('Transaction') private readonly transactionModel: Model<any>) {}

  async fetchAllTransactions() {
    return this.transactionModel.find();
  }

  async fetchTransactionsBySchool(school_id: string) {
    return this.transactionModel.find({ school_id });
  }

  async checkTransactionStatus(custom_order_id: string) {
    return this.transactionModel.findOne({ custom_order_id });
  }

  async updateTransactionStatus(collect_id: string, status: string) {
    return this.transactionModel.updateOne({ collect_id }, { status });
  }

  async webhookUpdate(payload: any) {
    const { order_id, status } = payload.order_info;
    return this.transactionModel.updateOne({ collect_id: order_id }, { status });
  }
}
