import {Base, Raw, QueryValues} from "../Base";
import {DataSource} from "../DataSource";
import {Expression} from "../Expression";
import {toSql, toArray} from "../common";
import {Identifier} from "../Identifier";
import {SelectQuery} from "./Select";

/**
 * Syntax:
 *     REPLACE [LOW_PRIORITY | DELAYED]
 *     [INTO] tbl_name
 *          [PARTITION (partition_name,...)]
 *     [(col_name,...)]
 *     {VALUES | VALUE} ({expr | DEFAULT},...),(...),...
 *
 * Or:
 *
 *     REPLACE [LOW_PRIORITY | DELAYED]
 *     [INTO] tbl_name
 *          [PARTITION (partition_name,...)]
 *     SET col_name={expr | DEFAULT}, ...
 *
 * Or:
 *     REPLACE [LOW_PRIORITY | DELAYED]
 *     [INTO] tbl_name
 *          [PARTITION (partition_name,...)]
 *     [(col_name,...)]
 *     SELECT ...
 */

export class ReplaceParams {
    lowPriority?: boolean = false;
    delayed?: boolean = false;
    into?: DataSource = void 0;
    object?: {} = void 0;
    cols?: Identifier | Identifier[] = void 0;
    values?: (Expression | Raw)[][] = void 0;
    set?: Expression | Expression[] = void 0;
    select?: SelectQuery = void 0;
}

export class Replace extends Base {
    private params = new ReplaceParams();

    constructor() {
        super();
    }

    fromParams(params: ReplaceParams) {
        return new Replace()
            .lowPriority(params.lowPriority)
            .delayed(params.delayed)
            .into(params.into)
            .object(params.object)
            .cols(params.cols)
            .values(params.values)
            .set(params.set)
            .select(params.select)
    }

    lowPriority(state: boolean | undefined) {
        this.params.lowPriority = state;
        return this;
    }

    delayed(state: boolean | undefined) {
        this.params.delayed = state;
        return this;
    }

    into(table: DataSource | undefined) {
        this.params.into = table;
        return this;
    }

    set(expr: Expression | Expression[] | undefined) {
        if (expr) {
            this.params.set = expr;
        }
        return this;
    }

    object(obj: {} | undefined) {
        if (obj) {
            const setArr: Expression[] = [];
            for (const key in obj) {
                const value = obj[key];
                if (value !== void 0) {
                    setArr.push(new Identifier(key).assign(value));
                }
            }
            this.set(setArr);
        }
        return this;
    }

    cols(cols: Identifier | Identifier[] | undefined) {
        if (cols) {
            this.params.cols = cols;
        }
        return this;
    }

    values(values: (Expression | Raw)[][] | undefined) {
        if (values) {
            this.params.values = values;
        }
        return this;
    }

    select(query: SelectQuery | undefined) {
        this.params.select = query;
        return this;
    }

    toSQL(values: QueryValues) {
        let sql = 'REPLACE';
        //todo: handle empty array
        if (this.params.lowPriority) {
            sql += ' LOW_PRIORITY'
        }
        if (this.params.delayed) {
            sql += ' DELAYED'
        }
        if (this.params.into) {
            sql += ' INTO ' + toSql(this.params.into, values);
        }
        if (this.params.cols) {
            sql += ` (${toArray(this.params.cols, values, ', ')})`;
        }
        if (this.params.set) {
            sql += ' SET ' + toArray(this.params.set, values, ', ');
        }
        if (this.params.values) {
            sql += ' VALUES ' + toSql(this.params.values as {} as Raw[], values);
        }
        if (this.params.select) {
            sql += ' ' + toSql(this.params.select, values);
        }
        return sql;
    }
}