import {Base, RawValue, QueryValues} from "./Base";
import {Expression} from "./Expression";
import {toSql} from "./common";
import {Identifier} from "./Identifier";


export abstract class DataSource extends Base {
    constructor() {
        super();
    }

    join(table: DataSource) {
        return new Join('INNER', this, table);
    }

    leftJoin(table: DataSource) {
        return new Join('LEFT', this, table)
    }

    rightJoin(table: DataSource) {
        return new Join('RIGHT', this, table);
    }

    outerJoin(table: DataSource) {
        return new Join('OUTER', this, table);
    }
}


export class Join extends DataSource {
    private _on: Expression;

    constructor(private joinType: 'INNER' | 'LEFT' | 'RIGHT' | 'OUTER', private tableFrom: DataSource, private tableTo: DataSource) {
        super();
    }

    on(expr: Expression) {
        this._on = expr;
        return this;
    }

    toSQL(values: QueryValues) {
        return `${toSql(this.tableFrom, values)} ${this.joinType} JOIN ${toSql(this.tableTo, values)}${this._on ? ` ON (${toSql(this._on, values)})` : ''}`;
    }
}

export class Table extends DataSource {
    protected _as?: Table = void 0;
    private _partition?: Identifier[] = void 0;

    constructor(private name: Identifier) {
        super();
    }

    as(name: Table) {
        const clone = new Table(this.name);
        clone._as = name;
        return clone;
    }

    partition(expr: Identifier | Identifier[]) {
        const clone = new Table(this.name);
        clone._partition = expr instanceof Array ? expr : [expr];
        return clone;
    }


    all() {
        return new Field(this, '*');
    }

    field(name: string) {
        return new Field(this, name);
    }

    toSQL(values: QueryValues): string {
        let sql = toSql(this.name, values);
        if (this._as) {
            sql += ' AS ' + toSql(this._as, values);
        }
        if (this._partition && this._partition.length) {
            sql += ' PARTITION ' + this._partition.map(part => toSql(part, values)).join(', ');
        }
        return sql;
    }
}


export class RawSQL extends Expression {
    constructor(private sql: string, private replacements?: RawValue[]) {
        super();
    }

    toSQL(values: QueryValues) {
        if (this.replacements) {
            values.push(...this.replacements);
        }
        return this.sql;
    }
}

export class Field extends Identifier {
    constructor(private table: Table, private fieldName: string) {
        super(fieldName);
    }

    toSQL(values: QueryValues) {
        return `${toSql(this.table, values)}.` + super.toSQL(values);
    }
}