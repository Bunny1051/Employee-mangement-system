import * as express from 'express'
import routerMiddleware from './empRoutes/empRoutes'
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
import * as dotenv from 'dotenv'

const app = express()

dotenv.config()
const port = process.env.PORT 

app.use(routerMiddleware)

const jsonParseMiddleware = express.json()
app.use(jsonParseMiddleware)




const options={
  definition:{
      openapi:'3.0.0',
  info:{
  title:'node js api project for employee managaement',
  version:'1.0.0'
  },
  servers:[
      {
         url: 'http://localhost:3000/'
      }
  ]
  },
  apis:['./src/index.ts'] 
  }
  
const swaggerSpec=swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**

 * @swagger
 *  components:
 *      data:
 *          employee:
 *              type: object
 *              properties:
 *                  Employeeid:
 *                      type: integer
 *                  EmployeeName:
 *                      type: string
 *                  EmployeeEmail:        
 *                      type: string
 *                  MobileNumber:
 *                      type: integer'
 *                  Departments:
 *                      type: array
 *                  LastModifiedOn:
 *                      type: string
 *                  RegisteredOn:
 *                      type: string                      
 *              
 *              
 */

/**

 * @swagger
 * /getEmp:  
 *  get:
 *     summary: this api is used to check get method
 *     description: this api is used to check if get method is working or not
 *     responses:
 *          200:
 *              description: To test Get method
 */
/**

 * @swagger

 * /getEmp/{id}:  
 *  get:
 *     summary: this api is used to check get method by id
 *     description: this api is used to check if get by id method is working or not
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID required
 *           schema:
 *             type: integer
 *     responses:
 *          200:
 *              description: To test Get method
 */
/**

 * @swagger
 * /employee:  
 *  post:
 *     summary: this api is used to check post method
 *     description: this api is used to check if patch method is working or not
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/data/employee'
 *     responses:
 *          200:
 *              description: To test post method
 */

 /**

 * @swagger
 * /updateEmp:  
 *  patch:
 *     summary: this api is used to check patch method
 *     description: this api is used to check if patch method is working or not
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/data/employee'
 *     responses:
 *          200:
 *              description: To test post method
 */

/**

 * @swagger

 * /hardDelete/{id}:  
 *  delete:
 *     summary:  this api is used to check delete method
 *     description: this api is used to check if post method is working or not
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true,
 *          description: Num Id Req
 *          schema:
 *             type: integer
 *     responses:
 *          200:
 *              description: To test delete method
 */

 /**

 * @swagger
 * /searchDep:  
 *  post:
 *     summary: this api is used to check post method
 *     description: this api is used to check if patch method is working or not
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/data/employee'
 *     responses:
 *          200:
 *              description: To test post method
 */



/**

 * @swagger

 * /softDelete/{id}:  
 *  delete:
 *     summary:  this api is used to check delete method
 *     description: this api is used to check if post method is working or not
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true,
 *          description: Num Id Req
 *          schema:
 *             type: integer
 *     responses:
 *          200:
 *              description: To test delete method
 */



function listen(port) {
  
  app.listen(port, () => {
      console.log(`app listening in http://localhost:${port}`)
  }).on('error', function (err) {
      if(err) {
          console.log(`Port ${port} is busy, trying with port`);
      } 
  });
}

listen(port);