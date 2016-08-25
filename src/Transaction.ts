import {IConnection} from "mysql";
import {DB} from "./db";
export class Transaction {
    public connection:IConnection;

    constructor(public db:DB) {}

    async begin() {
        this.connection = await this.db.getConnection();
        await this.db.query<void>('START TRANSACTION', null, this);
        return this;
    }

    async commit() {
        await this.db.query<void>('COMMIT', null, this);
        return this;
    }

    async rollback() {
        await this.db.query<void>('ROLLBACK', null, this);
        return this;
    }
}