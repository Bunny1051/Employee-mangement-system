import { readFile, writeFile } from "fs"

import { empSchema } from "../empModel/empModel"


// read the data records
export const readData = (): Promise<empSchema[]> => {
    const p = new Promise<empSchema[]>(
        (resolved, rejected) => {
            readFile(process.env.FILE_PATH, (err, data) => {
                if (err) {
                    rejected('not able to  get data')
                }

                if (data) {
                    const all = <empSchema[]>JSON.parse(data.toString())
                    // console.log(all)
                    resolved(all)
                }
            })
        }
    )
    return p
}


// save the data
export const saveData = (employee: empSchema[]): Promise<string> => {
    const p = new Promise<string>(
        (resolved, rejected) => {
            writeFile(
                process.env.FILE_PATH,
                JSON.stringify(employee),
                (err) => {
                    if (err) {
                        rejected('could not write..')

                    } else {
                        resolved('success')
                    }
                })
        }
    )
    return p
    
}
