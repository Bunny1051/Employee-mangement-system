
import { readData, saveData } from "../employeeDao/employeeDao"
import { empSchema } from "../empModel/empModel"
var uuid = require('uuid')



//post the emp details

export const addEmployee = async (empData: empSchema[]): Promise<string> => {
    const all = await readData()

    const db = [];
    for (let i = 0; i < empData.length; i++) {
        if (all.find(e => e.EmployeeId === empData[i].EmployeeId)) {
            return 'id already there'
        }
        else if (all.find(e => e.EmployeeEmail === empData[i].EmployeeEmail)) {
            return 'mail already there'
        }
        else if (all.find(e => e.MobileNumber === empData[i].MobileNumber)) {
            return 'number already there'
        }
        const unique_id = {
            EmpId: uuid.v1(),
            RegisteredOn: new Date()
        }
        const contactData = Object.assign(empData[i], unique_id)
        db.push(contactData)
    }
    const arrMer = db.concat(all)
    return saveData(arrMer)
}


// get emp details in sorted way

export const fetchEmployeeInfo = async (): Promise<empSchema[]> => {
    // console.log('fetch called')
    const all = await readData()
    if (all.length === 0) {
        return Promise.reject('no records found')
    } else {

        return (all.sort((a, b) => {

            let x: any = new Date(a.RegisteredOn);
            let y: any = new Date(b.RegisteredOn);

            return y - x;

        }) && all.filter((all) => all.IsActive === true)
        )
    }
}


// get emp by id
export const fetchEmpById = async (id: number): Promise<empSchema> => {
    const all = await readData()
    const found = all.find(e => e.EmployeeId === id)
    if (!found) {
        return Promise.reject('record not found')
    }
    return found
}

//update emp

export const updateEmployee = async (data: empSchema[]) => {
    const all = await readData()

    for (let i = 0; i < all.length; i++) {
        for (let j = 0; j < data.length; j++) {
            const found = all.find(e => e.EmployeeId === data[i].EmployeeId)
            if (!found) {
                return Promise.reject('record not found')
            } else {

                //const index = all.findIndex(c => c.EmployeeId === found.EmployeeId)
                const updatedRecord = { ...found, ...data[j], LastModifiedOn: new Date() }
                all.splice(j, 1, updatedRecord)

            }
        }
        return saveData(all)
    }
}

//delete soft


export const softDeleteEmp = async (data: empSchema, id: number) => {
    const all = await readData()
    const found = all.find(c => c.EmployeeId === id)

    if (!found) {
        return Promise.reject('record not found')
    } else {

        const index = all.findIndex(c => c.EmployeeId === found.EmployeeId)
        const updatedRecord = { ...found, ...data }
        all.splice(index, 1, updatedRecord)
        return saveData(all)
    }
}

// hard delete

export const hardDeleteEmp = async (id: number) => {
    const all = await readData()
    const index = all.findIndex((c) => c.EmployeeId === id)
    if (index === -1) {
        return Promise.reject('record not found')
    } else {
        all.splice(index, 1)
        return saveData(all)
    }
}


// get emp by name

export const fetchEmpByName = async (EmployeeName: string): Promise<empSchema[]> => {
    const all = await readData()
    const filtered = all.filter(c => c.EmployeeName.toLowerCase().indexOf(EmployeeName.toLowerCase()) !== -1)
    if (!filtered || filtered.length === 0) {
        return Promise.reject('no record foud')
    }
    return filtered
}


// get the department by id

export const searchDepById = async (prop: number[]): Promise<empSchema[]> => {
    const all = await readData();
    let data: empSchema[] = [];
    for (let i = 0; i < all.length; i++) {
        var datafilter = all[i].Departments.filter((userDept) =>{
                return prop.some((dep)=>userDept=== dep)
        })
        if (datafilter.length > 0)
            data.push(all[i]);
    }
    return data;
}
