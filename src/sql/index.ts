import {SelectQuery, SelectDirective} from "./statements/Select";
import {Field, Table, RawSQL} from "./DataSource";
import {Identifier} from "./Identifier";
import {Functions} from "./Functions";
import {Update} from "./statements/Update";
import {Replace} from "./statements/Replace";
import {Delete} from "./statements/Delete";
import {Insert} from "./statements/Insert";
export const SQL = new class SQL {
    select() {
        return new SelectQuery();
    }

    insert() {
        return new Insert();
    }

    update() {
        return new Update();
    }

    replace() {
        return new Replace();
    }

    delete() {
        return new Delete();
    }

    all() {
        return new RawSQL('*');
    }

    table(name: string) {
        return new Table(new Identifier(name));
    }

    identifier(name: string) {
        return new Identifier(name);
    }

    attr(table: Table, name: string) {
        return new Field(table, name);
    }

    fun = Functions;

    default = new RawSQL('DEFAULT');
    SelectDirectives = SelectDirective;
}


/*

 sql
 .update(table)
 .set([id.assign(1), title.assign(id.plus(10))])
 .where(

 )
 .orderBy()
 .limit();


 sql
 .insertInto()
 .directive.NO_CACHE()
 .partitions(['sd'])
 .values()
 .onDuplicateKeyUpdate()

 sql
 .replace()
 */
