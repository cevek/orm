import {Raw, QueryValues, Statement} from "../Base";
import {DataSource} from "../DataSource";
import {Expression} from "../Expression";
import {toSql, toArray} from "../common";
import {Identifier} from "../Identifier";
import {SelectQuery} from "./Select";

`
INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE]
    [INTO] tbl_name
         [PARTITION (partition_name,...)] 
    [(col_name,...)]
    {VALUES | VALUE} ({expr | DEFAULT},...),(...),...
    [ ON DUPLICATE KEY UPDATE
      col_name=expr
        [, col_name=expr] ... ]

Or:

INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE]
    [INTO] tbl_name
        [PARTITION (partition_name,...)]
    SET col_name={expr | DEFAULT}, ...
    [ ON DUPLICATE KEY UPDATE
      col_name=expr
        [, col_name=expr] ... ]

Or:

INSERT [LOW_PRIORITY | HIGH_PRIORITY] [IGNORE]
    [INTO] tbl_name
        [PARTITION (partition_name,...)] 
    [(col_name,...)]
    SELECT ...
    [ ON DUPLICATE KEY UPDATE
      col_name=expr
        [, col_name=expr] ... ]

`
export class InsertParams {
    lowPriority?: boolean = false;
    delayed?: boolean = false;
    highPriority?: boolean = false;
    ignore?: boolean = false;
    objects?: {}[] = void 0;
    into?: DataSource = void 0;
    cols?: Identifier | Identifier[] = void 0;
    values?: (Expression | Raw)[][] = void 0;
    set?: Expression | Expression[] = void 0;
    onDuplicateKeyUpdate?: Expression | Expression[] = void 0;
    select?: SelectQuery = void 0;
}

export class Insert extends Statement {
    params = new InsertParams();

    constructor() {
        super();
    }

    fromParams(params: InsertParams) {
        return new Insert()
            .lowPriority(params.lowPriority)
            .delayed(params.delayed)
            .highPriority(params.highPriority)
            .ignore(params.ignore)
            .into(params.into)
            .cols(params.cols)
            .values(params.values)
            .objects(params.objects)
            .set(params.set)
            .onDuplicateKeyUpdate(params.onDuplicateKeyUpdate)
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

    highPriority(state: boolean | undefined) {
        this.params.highPriority = state;
        return this;
    }

    ignore(state: boolean | undefined) {
        this.params.ignore = state;
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

    objects(objects: {}[] | undefined) {
        if (objects && objects.length > 0) {
            const keys = Object.keys(objects[0]);
            const keyLen = keys.length;
            const cols: Identifier[] = Array(keyLen);
            const vals: Expression[][] = [];
            for (let i = 0; i < keyLen; i++) {
                cols[i] = new Identifier(keys[i]);
            }
            this.cols(cols);
            for (let i = 0; i < objects.length; i++) {
                const item = objects[i];
                const row = Array(keyLen);
                for (let j = 0; j < keyLen; j++) {
                    row[j] = item[keys[j]];
                }
                vals.push(row);
            }
            this.values(vals);
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

    onDuplicateKeyUpdate(expr: Expression | Expression[] | undefined) {
        this.params.onDuplicateKeyUpdate = expr;
        return this;
    }

    select(query: SelectQuery | undefined) {
        this.params.select = query;
        return this;
    }

    toSQL(values: QueryValues) {
        let sql = 'INSERT';
        if (this.params.lowPriority) {
            sql += ' LOW_PRIORITY'
        }
        if (this.params.delayed) {
            sql += ' DELAYED'
        }
        if (this.params.highPriority) {
            sql += ' HIGH_PRIORITY'
        }
        if (this.params.ignore) {
            sql += ' IGNORE'
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
        if (this.params.onDuplicateKeyUpdate) {
            sql += ' ON DUPLICATE KEY UPDATE ' + toArray(this.params.onDuplicateKeyUpdate, values, ', ');
        }
        return sql;
    }

}