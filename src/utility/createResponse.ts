import { ResponseGenerator } from "../empModel/responceGenerate"

export const createResponse = (code: number, data?: any, err?: string): ResponseGenerator => {
    return {
        code: code,
        data: data,
        errormessage: err
    }
}