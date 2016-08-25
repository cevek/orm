export type Raw = string | number | boolean | Date | undefined | null;
export type RawValue = Raw | Raw[];
export type QueryValues = any[];

export class Base {
    private _base: Base;

    toSQL(values: QueryValues | null): string {
        return '';
    }
}

export class Statement extends Base {
    private _statement: Statement;

    constructor() {
        super();
    }
}



