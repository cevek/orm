import {DAO, Relation, field, belongsTo, foreignKey} from "../../dao";
import {ChapterInfo} from "./ChapterInfo";
import {Field} from "../../sql/DataSource";

export class ChapterStatistic extends DAO<{}> {
    @field name: Field;

    @foreignKey(()=>ChapterInfo)
    chapterInfoId: Field;

    @belongsTo(()=>ChapterInfo)
    chapterInfo: Relation;
}
