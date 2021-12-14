import { Router } from "express";
import { addEmployeeDetails, softdeleteEmpoyee, getAllEmployee, getEmpById, 
hardDeleteEmployee, updateEmp,  searchDepartment, getEmpByName} from "../empController/empcontroller";
import { validationprocess } from "../empManager/validator";
const routerMiddleware = Router()


routerMiddleware.post('/employee',validationprocess,addEmployeeDetails)

routerMiddleware.get('/getEmp', getAllEmployee)

routerMiddleware.get('/getEmp/:id', getEmpById)

routerMiddleware.patch('/updateEmp',validationprocess,updateEmp)

routerMiddleware.delete('/hardDelete/:id', hardDeleteEmployee)

routerMiddleware.delete('/softDelete/:id', softdeleteEmpoyee)

routerMiddleware.post('/searchDep', searchDepartment)

routerMiddleware.get('/getbyname/:EmployeeName', getEmpByName)





export default routerMiddleware

