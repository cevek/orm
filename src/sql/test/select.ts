import {Test} from "tape";
import {SQL} from "../index";
import tape = require("tape");
import {QueryValues} from "../Base";

const trackTable = SQL.table('Track')
const Track = {
    table: trackTable,
    stationId: trackTable.field('stationId'),
    error: trackTable.field('error'),
    breaks: trackTable.field('breaks'),
    info: trackTable.field('info'),
    duration: trackTable.field('duration'),
}
const createdAt = SQL.identifier('createdAt');
const durationSeconds = SQL.identifier('durationSeconds');


const GenreTable = SQL.table('Genre')
const Genre = {
    id: GenreTable.field('id'),
    table: GenreTable,
    name: GenreTable.field('name'),
}
const G = SQL.table('G')


const StationTable = SQL.table('Station')
const Station = {
    table: StationTable,
    id: StationTable.field('id'),
    name: StationTable.field('name'),
    genreId: StationTable.field('genreId')
}
const p1 = SQL.identifier('p1');


const table2 = SQL.table('b');

const foo = SQL.identifier('foo');
const y = SQL.table('y');
const T = SQL.table('T');


let values: QueryValues;
tape('query-generator', (t: Test)=> {
    t.test('select', t => {
        t.test('1', t => {
            values = [];
            const d = SQL
                .select()
                .attrs([
                    Track.table.all(),
                    Station.name,
                    GenreTable.all(),

                    createdAt,
                    Track.duration.as(durationSeconds),
                    SQL.fun.MAX(Track.error, Track.breaks)
                ])
                .directives(SQL.SelectDirectives.DISTINCT)
                .from([
                        Track.table.as(T)
                            .rightJoin(StationTable.partition(p1)).on(Station.id.equal(Track.stationId))
                            .join(GenreTable.as(G)).on(Genre.id.equal(Station.genreId)),
                        GenreTable
                    ]
                )
                .where([Track.duration.greatThan(120).or(Genre.id.equal(15)), Station.id.greatThan(2)])
                .groupBy([Track.duration.desc()], true)
                .having(Track.stationId.between(1, 10))
                .orderBy([Station.name])
                .limit(10, 5)
                .forUpdate(true)
                .toSQL(values);
            //todo: Procedure, into, union, toExpression
            console.log(d);


            t.equal(d, "SELECT DISTINCT `Track`.*, `Station`.`name`, `Genre`.*, `createdAt`, `Track`.`duration` AS `durationSeconds`, MAX(`Track`.`error`, `Track`.`breaks`) FROM `Track` AS `T` RIGHT JOIN `Station` PARTITION `p1` ON (`Station`.`id` = `Track`.`stationId`) INNER JOIN `Genre` AS `G` ON (`Genre`.`id` = `Station`.`genreId`), `Genre` WHERE (`Track`.`duration` > ? OR `Genre`.`id` = ?) AND `Station`.`id` > ? GROUP BY `Track`.`duration` DESC WITH ROLLUP HAVING `Track`.`stationId` BETWEEN ? AND ? ORDER BY `Station`.`name` LIMIT ?, ? FOR UPDATE");
            t.deepEqual(values, [120, 15, 2, 1, 10, 5, 10]);
            t.end();
        })

    })
});

