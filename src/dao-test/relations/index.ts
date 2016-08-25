import {inspections} from "./expections";
import {DBConfig} from "../../DBConfig";
import {config} from "../test-config";
import {Doc} from "../models/Doc";
import {Chapter} from "../models/Chapter";
import {Author} from "../models/Author";
import {Paragraph} from "../models/Paragraph";
import {ChapterInfo} from "../models/ChapterInfo";
import {ChapterStatistic} from "../models/ChapterStatistic";
import {inject, bindInjection} from "dits";

require('source-map-support').install();

Error.stackTraceLimit = 30;
bindInjection(DBConfig, config.db);

const doc = inject(Doc);
const author = inject(Author);
const chapter = inject(Chapter);
const chapterInfo = inject(ChapterInfo);
const chapterStatistic = inject(ChapterStatistic);
const paragraph = inject(Paragraph);
const testGroups = [
    {
        model: doc,
        tests: [
            {
                relation: doc.authors,
                inspect: inspections.doc.authors
            },
            {
                relation: doc.chapters,
                inspect: inspections.doc.chapters
            },
            {
                relation: doc.paragraphs,
                inspect: inspections.doc.paragraphs
            }
        ],
    },
    {
        model: author,
        tests: [
            {
                relation: author.chapters,
                inspect: inspections.author.chapters
            },
            {
                relation: author.paragraphs,
                inspect: inspections.author.paragraphs
            }
        ],
    },
    {
        model: chapter,
        tests: [
            {
                relation: chapter.author,
                inspect: inspections.chapter.author
            },
            {
                relation: chapter.doc,
                inspect: inspections.chapter.doc
            },
            {
                relation: chapter.paragraphs,
                inspect: inspections.chapter.paragraphs
            },
            {
                relation: chapter.statistic,
                inspect: inspections.chapter.statistic
            },
        ],
    },
    {
        model: chapterInfo,
        tests: [
            {
                relation: chapterInfo.chapter,
                inspect: inspections.chapterInfo.chapter
            },
            {
                relation: chapterInfo.statistic,
                inspect: inspections.chapterInfo.statistic
            }
        ],
    },
    {
        model: chapterStatistic,
        tests: [
            {
                relation: chapterStatistic.chapterInfo,
                inspect: inspections.chapterStatistic.chapterInfo
            }
        ],
    },
    {
        model: paragraph,
        tests: [
            {
                relation: paragraph.chapter,
                inspect: inspections.paragraph.chapter
            }
        ],
    }
];

async function runTests() {
    for (let i = 0; i < testGroups.length; i++) {
        const testGroup = testGroups[i];
        const model = testGroup.model;
        for (let j = 0; j < testGroup.tests.length; j++) {
            const test = testGroup.tests[j];
            const result = await model.findAll({include: [{relation: test.relation}]});

            if (JSON.stringify(result) !== JSON.stringify(test.inspect)) {
                console.error(`Test: ${model.constructor.name}.${test.relation.property} is not passed`);
                // console.log(test.relation.property + ': ' + JSON.stringify(result, null, 2) + ', ');
            } else {
                console.log(`Test: ${model.constructor.name}.${test.relation.property} passed`);
            }
        }
    }
    return;
}
runTests().catch(err => console.error(err instanceof Error ? err.stack : err));
