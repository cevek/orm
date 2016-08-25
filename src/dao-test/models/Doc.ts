import {DAO, Relation, hasMany, field} from "../../dao";
import {Chapter} from "./Chapter";
import {Field} from "../../sql/DataSource";
import {Paragraph} from "./Paragraph";
import {Author} from "./Author";

export class Doc extends DAO<{}> {
    @field name: Field;

    @hasMany(()=>Chapter)
    chapters: Relation;

    @hasMany(()=>Paragraph, ()=>Chapter)
    paragraphs: Relation;

    @hasMany(()=>Author, ()=>Chapter)
    authors: Relation;
}
