'use strict';
import {Transaction} from "./Transaction";
import {Connection} from "./Connection";
import {inject, bindInjection} from 'dits';
// import {Logger} from "./Logger";

export class DB {
    // protected logger = new Logger(this.constructor.name);
    protected connection = inject(Connection);

    async query<T>(query:string, values?:any, trx?:Transaction):Promise<T> {

        var connection = trx ? trx.connection : await this.getConnection();
        // this.logger.log('query', connection.threadId, query, values);
        var res = await (new Promise<T>((resolve, reject)=> {
            if (query) {
                var q = connection.query(query, values, (err:Error, rows:T) => {
                    if (err) {
                        //Got a packet bigger than 'max_allowed_packet' bytes
                        if ((<any>err).errno == 1153) {
                            //todo: after this error all next queries is this connection freeze
                        }
                        err.message = err.message + '\n' + q.sql;
                        return reject(err);
                    }
                    resolve(rows);
                });
                // console.log(q.sql);

            } else {
                resolve();
            }
        }));
        if (!trx) {
            connection.release();
        }
        return res;
    }

    async queryOne<T>(query:string, values?:any, trx?:Transaction) {
        return (await this.query<T[]>(query, values, trx))[0];
    }

    async queryAll<T>(query:string, values?:any, trx?:Transaction) {
        return (await this.query<T[]>(query, values, trx)) || [];
    }

    async transaction<T>(fn:(transaction:Transaction)=>Promise<T>): Promise<T> {
        var transaction = await this.beginTransaction();
        let result: T;
        try {
            result = await fn(transaction);
            await transaction.commit();
        }
        catch (e) {
            await transaction.rollback();
            throw e;
        }
        transaction.connection.release();
        return result;
    }

    async beginTransaction():Promise<Transaction> {
        const trx = new Transaction(this);
        return await trx.begin();
    }

    async getConnection():Promise<any> {
        return await (new Promise((resolve, reject)=> {
            this.connection.pool.getConnection((err:Error, connection:any) => {
                if (err) {
                    return reject(err);
                }
                connection.config.namedPlaceholders = true;
                resolve(connection);
            });
        }));
    }
}




