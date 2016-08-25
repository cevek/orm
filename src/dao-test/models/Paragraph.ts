import {DAO, Relation, field, belongsTo, foreignKey} from "../../dao";
import {Chapter} from "./Chapter";
import {Field} from "../../sql/DataSource";

export class Paragraph extends DAO<{}> {
    @field name: Field;

    @foreignKey(()=>Chapter)
    chapterId: Field;

    @belongsTo(()=>Chapter)
    chapter: Relation;
}
