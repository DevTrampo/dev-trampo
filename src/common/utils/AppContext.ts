import { PoolClient } from 'pg';
import database from '@config/database';

export default class AppContext {
  private client: PoolClient = null;
  public shared: any = null;
  private isInTransaction: boolean = false;

  public async createConnection() {
    if (!this.client) {
      this.client = await database.connect();
    }
  }

  public getClient(): PoolClient {
    return this.client;
  }

  public async beginTransaction(): Promise<void> {
    await this.createConnection();
    this.isInTransaction = true;
    await this.client.query('BEGIN');
  }

  public async commit(): Promise<void> {
    if (this.isInTransaction) {
      await this.client.query('COMMIT');
      this.isInTransaction = false;
    }
  }

  public async rollback(): Promise<void> {
    if (this.isInTransaction) {
      await this.client.query('ROLLBACK');
      this.isInTransaction = false;
    }
  }

  public async release(): Promise<void> {
    await this.client.release();
  }
}
