import {Test} from "tape";
import {SQL} from "../index";
import {QueryValues} from "../Base";
import tape = require("tape");
const trackTable = SQL.table('Track');
const Track = {
    table: trackTable,
    error: trackTable.field('error'),
    info: trackTable.field('info'),
    duration: trackTable.field('duration'),
}

let values:QueryValues;
tape('query-generator', (t:Test)=> {
    t.test('update', t => {
        t.test('set', t => {
            values = [];
            const sql = SQL.update().fromParams({
                lowPriority: true,
                table: Track.table,
                set: [Track.error.assign(1), Track.info.assign(Track.info.plus(3))],
                where: Track.duration.equal(4).and(Track.error.equal(5)),
                orderBy: Track.duration.desc(),
                limit: 10
            }).toSQL(values);

            t.equal(sql, "UPDATE LOW_PRIORITY `Track` SET `Track`.`error` = ?, `Track`.`info` = `Track`.`info` + ? WHERE `Track`.`duration` = ? AND `Track`.`error` = ? ORDER BY `Track`.`duration` DESC LIMIT ?");
            t.deepEqual(values, [1, 3, 4, 5, 10]);
            t.end();
        })

        t.test('value', t => {
            values = [];
            const sql = SQL.update().fromParams({
                //todo flags: 'IGNORE',
                ignore: true,
                table: Track.table,
                object: {error: 1, duration: void 0, info: Track.info.plus(3)},
            }).toSQL(values);

            t.equal(sql, "UPDATE IGNORE `Track` SET `error` = ?, `info` = `Track`.`info` + ?");
            t.deepEqual(values, [1, 3]);
            t.end();
        })
    })
});

