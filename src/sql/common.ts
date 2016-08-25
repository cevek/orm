import {Base, RawValue, QueryValues} from "./Base";

export function toSql(a: Base | RawValue, values: QueryValues) {
    if (a instanceof Base) {
        return a.toSQL(values);
    }
    values.push(a);
    return '?';
}

export function toArray<T extends Base | RawValue>(item: T | T[], values: QueryValues, separator: string, transform?: (val: T) => Base | RawValue): string {
    let sql = '';
    if (item instanceof Array) {
        for (let i = 0; i < item.length; i++) {
            if (i > 0) {
                sql += separator;
            }
            sql += toSql(transform ? transform(item[i]) : item[i], values)
        }
        return sql;
    }
    return toSql(transform ? transform(item) : item, values);
}
