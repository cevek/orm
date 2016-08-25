import {DAO, Relation, field, belongsTo, hasOne, foreignKey} from "../../dao";
import {Chapter} from "./Chapter";
import {ChapterStatistic} from "./ChapterStatistic";
import {Field} from "../../sql/DataSource";

export class ChapterInfo extends DAO<{}> {
    @field name: Field;

    @foreignKey(()=>Chapter)
    chapterId: Field;

    @belongsTo(()=>Chapter)
    chapter: Relation;

    @hasOne(()=>ChapterStatistic)
    statistic: Relation;
}
