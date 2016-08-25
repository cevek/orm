import {DAO, Relation, hasMany, field, belongsTo, hasOne, foreignKey} from "../../dao";
import {Paragraph} from "./Paragraph";
import {Author} from "./Author";
import {Doc} from "./Doc";
import {ChapterInfo} from "./ChapterInfo";
import {Field} from "../../sql/DataSource";
import {ChapterStatistic} from "./ChapterStatistic";

export class Chapter extends DAO<{}> {
    @field name: Field;

    @foreignKey(()=>Author)
    authorId: Field;

    @foreignKey(()=>Doc)
    docId: Field;

    @hasMany(()=>Paragraph)
    paragraphs: Relation;

    @belongsTo(()=>Author)
    author: Relation;

    @belongsTo(()=>Doc)
    doc: Relation;

    @hasOne(()=>ChapterStatistic, ()=>ChapterInfo)
    statistic: Relation;
}
