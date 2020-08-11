import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { Joi, ValidationNew } from '@proista/server-core/lib/Validation'

const LoopBackRequestInfo = Joi.object({
  Text: Joi.string().required()
})

LoopBackRequestInfo.new = ValidationNew(LoopBackRequestInfo)

const controller = {
  path: '/LoopBack',
  controller: GenericControllerMethod({
    name: 'Demo Loop Back',
    inputModel: LoopBackRequestInfo,
    processor: async function (requestInfo, ret, config) {
      ret.ReturnValue = requestInfo.Text
      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
