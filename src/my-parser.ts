import * as csv from 'csv-parse/browser/esm';

const csvString =
    `firstname,lastname,street,city,state,zip
John,Doe,120 jefferson st.,Riverside, NJ, 08075
Jack,McGinnis,220 hobo Av.,Phila, PA,09119
"John ""Da Man""",Repici,120 Jefferson St.,Riverside, NJ,08075
Stephen,Tyler,"7452 Terrace ""At the Plaza"" road",SomeTown,SD, 91234
,Blankman,,SomeTown, SD, 00298
"Joan ""the bone"", Anne",Jet,"9th, at Terrace plc",Desert City,CO,00123
`

export function parseCSV(): void {
    readCSV(csvString).then(records => console.log(records))
}

function readCSV(csvString: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const records: any[] = []
        const parser = csv.parse(csvString, {delimiter: ',', columns: true});
        parser.on('readable', () => {
            let record
            while ((record = parser.read()) !== null) {
                records.push(record)
            }
        })

        parser.on('error', (err: Error) => {
            console.error(err.message)
            reject(err)
        });

        parser.on('end', () => {
            resolve(records)
        })
    })
}