import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAllTransactions() {
    return this.transactionsService.fetchAllTransactions();
  }

  @Get('school/:school_id')
  async getTransactionsBySchool(@Param('school_id') school_id: string) {
    return this.transactionsService.fetchTransactionsBySchool(school_id);
  }

  @Get('check-status/:custom_order_id')
  async checkStatus(@Param('custom_order_id') custom_order_id: string) {
    return this.transactionsService.checkTransactionStatus(custom_order_id);
  }

  @Post('webhook')
  async webhookUpdate(@Body() payload: any) {
    return this.transactionsService.webhookUpdate(payload);
  }

  @Post('manual-update')
  async manualUpdate(@Body() body: { collect_id: string; status: string }) {
    return this.transactionsService.updateTransactionStatus(body.collect_id, body.status);
  }
}
