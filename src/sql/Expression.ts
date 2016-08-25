import {Base, RawValue, QueryValues} from "./Base";
import {toSql} from "./common";
import {Identifier} from "./Identifier";

type Raw = RawValue;
type RawOrExpression = RawValue | Expression;

export const ExpressionTypes = {
    ASSIGN(left: Raw, right: Raw) {return `${left} = ${right}`},

    AND(left: Raw, right: Raw) {return `${left} AND ${right}`},
    OR(left: Raw, right: Raw) {return `(${left} OR ${right})`},
    EQUAL(left: Raw, right: Raw) {return `${left} = ${right}`},
    NOT_EQUAL(left: Raw, right: Raw) {return `${left} != ${right}`},
    GT(left: Raw, right: Raw) {return `${left} > ${right}`},
    GTE(left: Raw, right: Raw) {return `${left} >= ${right}`},
    LT(left: Raw, right: Raw) {return `${left} < ${right}`},
    LTE(left: Raw, right: Raw) {return `${left} <= ${right}`},
    IN(left: Raw, right: Raw) {return `${left} IN (${right})`},
    NOT_IN(left: Raw, right: Raw) {return `${left} NOT IN (${right})`},
    BETWEEN(left: Raw, a: Raw, b: Raw) {return `${left} BETWEEN ${a} AND ${b}`},
    NOT_BETWEEN(left: Raw, a: Raw, b: Raw) {return `${left} NOT BETWEEN ${a} AND ${b}`},
    LIKE(left: Raw, right: Raw) {return `${left} LIKE ${right}`},
    NOT_LIKE(left: Raw, right: Raw) {return `${left} NOT LIKE ${right}`},
    IS(left: Raw, right: Raw) {return `${left} IS ${right}`},
    IS_NULL(left: Raw) {return `${left} IS NULL`},
    IS_NOT_NULL(left: Raw) {return `${left} IS NOT NULL`},
    NULL_SAFE(left: Raw, right: Raw) {return `${left} <{return  ${right}`},
    BINARY(left: Raw, right: Raw) {return `${left} BINARY ${right}`},
    XOR(left: Raw, right: Raw) {return `${left} XOR ${right}`},
    NOT(left: Raw, right: Raw) {return `${left} NOT ${right}`},
    IS_NOT(left: Raw, right: Raw) {return `${left} IS NOT ${right}`},

    PLUS(left: Raw, right: Raw) {return `${left} + ${right}`},
    MINUS(left: Raw, right: Raw) {return `${left} - ${right}`},
    DIVISION(left: Raw, right: Raw) {return `${left} / ${right}`},
    MULTIPLY(left: Raw, right: Raw) {return `${left} * ${right}`},
    DIV(left: Raw, right: Raw) {return `${left} DIV ${right}`},
    MOD(left: Raw, right: Raw) {return `${left} MOD ${right}`},
    MINUS_SIGN(left: Raw) {return `-${left}`},

    REGEXP(left: Raw, right: Raw) {return `${left} REGEXP ${right}`},
    NOT_REGEXP(left: Raw, right: Raw) {return `${left} NOT REGEXP ${right}`},

    B_AND(left: Raw, right: Raw) {return `${left} & ${right}`},
    B_INV(left: Raw, right: Raw) {return `${left} ~ ${right}`},
    B_OR(left: Raw, right: Raw) {return `${left} | ${right}`},
    B_XOR(left: Raw, right: Raw) {return `${left} ^ ${right}`},

    ASC(left: Raw) {return `${left} ASC`},
    DESC(left: Raw) {return `${left} DESC`},

    BRACKETS(left: Raw) {return `(${left})`},

    CASE(left: Raw, right: Raw) {return `${left} CASE ${right}`},
    CASE_EMPTY(left: Raw) {return `${left} CASE`},
    WHEN(left: Raw, right: Raw) {return `${left} WHEN ${right}`},
    THEN(left: Raw, right: Raw) {return `${left} THEN ${right}`},
    END(left: Raw) {return `${left} END`},


    AS(left: Raw, right: Raw) {return `${left} AS ${right}`},
    CHARACTER_SET(left: Raw, right: Raw) {return `${left} CHARACTER SET ${right}`},
    USING(left: Raw, right: Raw) {return `${left} USING ${right}`},

    INTERVAL_SECOND(left: Raw, right: Raw) {return `${left} INTERVAL ${right} SECOND`},
    INTERVAL_MINUTE(left: Raw, right: Raw) {return `${left} INTERVAL ${right} MINUTE`},
    INTERVAL_HOUR(left: Raw, right: Raw) {return `${left} INTERVAL ${right} HOUR`},
    INTERVAL_DAY(left: Raw, right: Raw) {return `${left} INTERVAL ${right} DAY`},
    INTERVAL_MONTH(left: Raw, right: Raw) {return `${left} INTERVAL ${right} MONTH`},
    INTERVAL_YEAR(left: Raw, right: Raw) {return `${left} INTERVAL ${right} YEAR`},
    INTERVAL_MINUTE_SECOND(left: Raw, right: Raw) {return `${left} INTERVAL ${right} MINUTE_SECOND`},
    INTERVAL_HOUR_MINUTE(left: Raw, right: Raw) {return `${left} INTERVAL ${right} HOUR_MINUTE`},
    INTERVAL_DAY_HOUR(left: Raw, right: Raw) {return `${left} INTERVAL ${right} DAY_HOUR`},
    INTERVAL_YEAR_MONTH(left: Raw, right: Raw) {return `${left} INTERVAL ${right} YEAR_MONTH`},
    INTERVAL_HOUR_SECOND(left: Raw, right: Raw) {return `${left} INTERVAL ${right} HOUR_SECOND`},
    INTERVAL_DAY_MINUTE(left: Raw, right: Raw) {return `${left} INTERVAL ${right} DAY_MINUTE`},
    INTERVAL_DAY_SECOND(left: Raw, right: Raw) {return `${left} INTERVAL ${right} DAY_SECOND`},
};


export class Expression extends Base {
    constructor() {
        super();
    }

    assign(expr: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.ASSIGN, this, expr);
    }

    or(expr: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.OR, this, expr);
    }

    and(expr: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.AND, this, expr);
    }

    equal(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.EQUAL, this, value);
    }

    notEqual(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.NOT_EQUAL, this, value);

    }

    is(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.IS, this, value);
    }

    isNot(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.IS_NOT, this, value);
    }

    not(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.NOT, this, value);
    }

    xor(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.XOR, this, value);
    }

    isNull() {
        return new LeftExpression(ExpressionTypes.IS_NULL, this);
    }

    isNotNull() {
        return new LeftExpression(ExpressionTypes.IS_NOT_NULL, this);
    }

    greatThan(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.GT, this, value);
    }

    greatOrEqualThan(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.GTE, this, value);
    }

    lessThan(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.LT, this, value);
    }

    lessOrEqualThan(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.LTE, this, value);
    }

    in(values: Expression | RawValue[]) {
        return new LeftRightExpression(ExpressionTypes.IN, this, values as Expression);
    }

    between(value1: RawOrExpression, value2: RawOrExpression) {
        return new LeftABExpression(ExpressionTypes.BETWEEN, this, value1, value2);
    }

    notBetween(value1: RawOrExpression, value2: RawOrExpression) {
        return new LeftABExpression(ExpressionTypes.NOT_BETWEEN, this, value1, value2);
    }

    like(value1: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.LIKE, this, value1);
    }

    notLike(value1: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.NOT_LIKE, this, value1);
    }

    plus(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.PLUS, this, value);
    }

    minus(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.MINUS, this, value);
    }

    minusSign(value: RawOrExpression) {
        return new LeftExpression(ExpressionTypes.MINUS_SIGN, this);
    }

    multiply(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.MULTIPLY, this, value);
    }

    division(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.DIVISION, this, value);
    }

    div(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.DIV, this, value);
    }

    mod(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.MOD, this, value);
    }

    binary(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.BINARY, this, value);
    }

    isNullSafe(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.NULL_SAFE, this, value);
    }

    regexp(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.REGEXP, this, value);
    }

    notRegexp(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.NOT_REGEXP, this, value);
    }

    bitAnd(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.B_AND, this, value);
    }

    bitInv(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.B_INV, this, value);
    }

    bitOr(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.B_OR, this, value);
    }

    bitXor(value: RawOrExpression) {
        return new LeftRightExpression(ExpressionTypes.B_XOR, this, value);
    }

    asc() {
        return new LeftExpression(ExpressionTypes.ASC, this);
    }

    desc() {
        return new LeftExpression(ExpressionTypes.DESC, this);
    }


    case(expr?: Expression): Expression {
        if (expr) {
            return new LeftRightExpression(ExpressionTypes.CASE, this, expr);
        }
        return new LeftExpression(ExpressionTypes.CASE_EMPTY, this);
    }

    when(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.WHEN, this, expr);
    }

    then(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.THEN, this, expr);
    }

    end() {
        return new LeftExpression(ExpressionTypes.END, this);
    }

    as(identifier: Identifier): Expression {
        return new LeftRightExpression(ExpressionTypes.AS, this, identifier);
    }

    characterSet(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.CHARACTER_SET, this, expr);
    }

    using(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.USING, this, expr);
    }

    intervalSecond(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_SECOND, this, expr);
    }

    intervalMinute(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_MINUTE, this, expr);
    }

    intervalHour(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_HOUR, this, expr);
    }

    intervalDay(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_DAY, this, expr);
    }

    intervalMonth(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_MONTH, this, expr);
    }

    intervalYear(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_YEAR, this, expr);
    }

    intervalMinuteSecond(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_MINUTE_SECOND, this, expr);
    }

    intervalHourMinute(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_HOUR_MINUTE, this, expr);
    }

    intervalDayHour(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_DAY_HOUR, this, expr);
    }

    intervalYearMonth(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_YEAR_MONTH, this, expr);
    }

    intervalHourSecond(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_HOUR_SECOND, this, expr);
    }

    intervalDayMinute(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_DAY_MINUTE, this, expr);
    }

    intervalDaySecond(expr: Expression) {
        return new LeftRightExpression(ExpressionTypes.INTERVAL_DAY_SECOND, this, expr);
    }

    brackets() {
        return new LeftExpression(ExpressionTypes.BRACKETS, this);
    }
}

export class LeftExpression extends Expression {
    constructor(protected type: (arg1: Raw)=>string, private left: RawOrExpression) {
        super();
    }

    toSQL(values: QueryValues) {
        return this.type(toSql(this.left, values));
    }
}

export class LeftRightExpression extends Expression {
    constructor(protected type: (arg1: Raw, arg2: Raw)=>string, private left: RawOrExpression, private right: RawOrExpression) {
        super();
    }

    toSQL(values: QueryValues) {
        if (this.type == ExpressionTypes.IN && (!(this.right instanceof Array) || this.right.length == 0)) {
            this.right = void 0;
        }
        return this.type(toSql(this.left, values), toSql(this.right, values));
    }
}

export class LeftABExpression extends Expression {
    constructor(protected type: (arg1: Raw, arg2: Raw, arg3: Raw)=>string, private left: RawOrExpression, private a: RawOrExpression, private b: RawOrExpression) {
        super();
    }

    toSQL(values: QueryValues) {
        return this.type(toSql(this.left, values), toSql(this.a, values), toSql(this.b, values));
    }
}