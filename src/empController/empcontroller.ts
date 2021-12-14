import { empSchema } from "../empModel/empModel";
import * as express from "express";
import { createResponse } from "../utility/createResponse"
import { addEmployee, hardDeleteEmp, fetchEmpById, fetchEmployeeInfo, softDeleteEmp, updateEmployee, searchDepById, fetchEmpByName} from "../empManager/empManager";
import { validationResult } from "express-validator";
import { departmentType } from "../empModel/deptModel"


// add  details of the employees

export const addEmployeeDetails = (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const empData = <empSchema[]>req.body
    for (let i = 0; i < empData.length; i++) {
        const exestingDept = empData[i].Departments.filter((c) => {
            return departmentType.some((d) => 
                d.DepartmentId === c
            
            )
        })
        if (exestingDept.length !== empData[i].Departments.length) {
            return res.status(400).send("Department id is invalid")
        }
        else if (exestingDept[i] == exestingDept[i+1]) {
            return res.status(400).send("similar id can't be add")
        }
        else if (exestingDept.length! >= 3) {
            return res.status(400).send("Department cant be in two or more employee")
        }
       
    }
    addEmployee(empData)
        .then(
            (successMessage: any) => {
                res.status(200).json(createResponse(201, successMessage))
            },
            (reason: any) => {
                res.status(500).json(createResponse(500, null, reason))
            }
        )
}


// get all details
export const getAllEmployee = (req: any, res: any) => {
    // console.log('request received')
    fetchEmployeeInfo()
        .then(
            (successData: any) => {
                res.status(200).json(createResponse(200, successData))
            },
            (failureReason: any) => {
                res.status(500).json(createResponse(500, null, failureReason))
            }
        )
}

//get details by id 


export const getEmpById = (req: any, res: any) => {
    const id = parseInt(req.params.id)
    fetchEmpById(id)
        .then(
            (data: any) => {
                res.status(200).json(createResponse(200, data))
            },
            (err: string | undefined) => {
                res.status(500).json(createResponse(500, null, err))
            }
        )
}

//update opeartion

export const updateEmp = (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = <empSchema[]>req.body
    updateEmployee(data)
        .then(
            (data: any) => {
                // console.log(data)
                res.status(200).json(createResponse(200, data))
            },
            (err: any) => {
                res.status(500).json(createResponse(500, null, err))
            }
        )
}
// hard delete opeartion
export const hardDeleteEmployee = (req: any, res: any) => {
    const id = parseInt(req.params.id)
    hardDeleteEmp(id)
        .then(
            (data: any) => {
                // console.log(data)
                res.status(200).json(createResponse(200, data))
            },
            (err: any) => {
                res.status(500).json(createResponse(500, null, err))
            }
        )
}

// soft delete opeartion

export const softdeleteEmpoyee = (req: any, res: any) => {
    const id = parseInt(req.params.id)
    const data: any = { IsActive: false }
    softDeleteEmp(data, id)
        .then(
            (data: any) => {
                // console.log(data)
                res.status(200).json(createResponse(200, data))
                
            },
            (err: any) => {
                res.status(500).json(createResponse(500, null, err))
            }
        )
}

// serach by name and department
export const searchDepartment = (req: any, res: any) => {
    const prop = req.body;
    // console.log(prop);
    searchDepById(prop).then(
        (data) => {
            // console.log(data);
            res.status(200).json(createResponse(200, data));
        },
        (err) => {
            res.status(500).json(createResponse(500, null, err));
        }
    );
};



// search by name

export const getEmpByName = (req: any, res: any) => {
    let EmployeeName = req.params.EmployeeName;
    // console.log(DepartmentName)
    fetchEmpByName(EmployeeName)
        .then(
            (data: any) => {
                // console.log(data)
                res.status(200).json(createResponse(200, data))
            },
            (err: any) => {
                res.status(500).json(createResponse(500, null, err))
            }
        )
}