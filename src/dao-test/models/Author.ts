import {DAO, field, Relation, hasMany} from "../../dao";
import {Chapter} from "./Chapter";
import {Field} from "../../sql/DataSource";
import {Paragraph} from "./Paragraph";

export class Author extends DAO<{}> {
    @field name: Field;

    @hasMany(()=>Chapter)
    chapters: Relation;

    @hasMany(()=>Paragraph, ()=>Chapter)
    paragraphs: Relation;
}
