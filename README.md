# Employee-mangement-system

Employee Management Case Study
---------------------------------
---------------------------------

Operations:
--------------------

•	Add employee
•	Update employee
•	Get all employee/individual
•	Delete employee

Descriptions
----------------------
1.	Add Employee
•	Takes valid employee data and stores it in relevant data store.
•	Employee Id should be auto generated unique id(i.e. GUID).
•	Should support add more than one employee with proper validation.

2.	Update employee
•	Should be able to update employee related info.
•	Should support update of more than one employee.

3.	Get all employee/individual
•	Fetch all employees available in data store sort it by Registered On i.e latest record first
•	Individual employee related information
•	Should be able to search by Employee Name,Departments,Active/Inactive employees

4.	Delete an employee from data store
•	Delete the specific employee or list of an employee from data store based on type of delete.
•	Soft deleteIn this operation enable/disable from an employee from data store
•	Hard delete Employee information completely deleted from data store.


Sample employee model:-
-------------------------------------
EmployeeId,  EmployeeName,  EmployeeEmail, Mobile  Number, Departments:[{DepartmentId,  DepartmentName,IsActive}],IsActive,RegisteredOn,LastModifiedOn
Validations:
•	EmployeeEmail should be unique
•	EmailId validation
•	Validate mobile number
•	Unique mobile number
•	One employee can’t be part of more than 2 departments
•	Allowed departments: Finance, Sales, IT and Support
•	Swagger should be implemented for all specified api’s
•	In this entire development typescript should be used.
