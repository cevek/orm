import {toSql} from "./common";
import {Expression} from "./Expression";
import {Base, QueryValues} from "./Base";
import {Identifier} from "./Identifier";
export class Procedure extends Base {
    constructor(private name: Identifier, private args: Expression[]) {
        super();
    }

    toSQL(values: QueryValues) {
        return `${toSql(this.name, values)}(${this.args.map(arg => toSql(arg, values))})`;
    }
}