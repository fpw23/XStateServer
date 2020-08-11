import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetDocuments } from './Classes/DocumentDB'
import { Joi, ValidationNew } from '@proista/server-core/lib/Validation'

// ------ input model --------
const CreateRequestInfo = Joi.object({
  Id: Joi.number().required(),
  Name: Joi.string().required()
})
CreateRequestInfo.new = ValidationNew(CreateRequestInfo)

// ---------- controller ------------------
const controller = {
  path: '/Create',
  controller: GenericControllerMethod({
    name: 'Create a new document',
    inputModel: CreateRequestInfo,
    processor: async function (requestInfo, ret, config) {
      const docs = GetDocuments()
      docs.push(requestInfo)
      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
