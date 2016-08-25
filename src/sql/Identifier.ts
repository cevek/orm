import {Expression} from "./Expression";
import {QueryValues} from "./Base";
export class Identifier extends Expression {
    constructor(protected name: string) {
        super();
    }

    toSQL(values: QueryValues): string {
        return (this.name == '*' ? '*' : `\`${this.name.replace(/`/g, '``')}\``);
    }
}

