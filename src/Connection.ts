import {IMySql, IPool} from "mysql";
import {DBConfig} from "./DBConfig";
import {inject} from "dits";

const mysql:IMySql = require('mysql2');

export class Connection {
    pool:IPool;
    config = inject(DBConfig);

    constructor() {
        const config = this.config;
        this.pool = mysql.createPool(config);
    }
}

export interface ResultSetHeader {
    fieldCount:number,
    affectedRows:number
    insertId:number,
    serverStatus:number,
    warningStatus:number
}