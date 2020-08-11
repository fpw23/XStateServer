import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetEvents } from './Classes/EventDB'
import _ from 'lodash'
import { Joi, ValidationNew } from '@proista/server-core/lib/Validation'

// -------- output model ---------
const GetDetailsInfo = Joi.object({
  Id: Joi.string().uuid(),
  Status: Joi.string().required(),
  Name: Joi.string().required(),
  Type: Joi.string().required(),
  Complete: Joi.boolean()
})
GetDetailsInfo.new = ValidationNew(GetDetailsInfo, { Status: 'Unknown', Complete: false })

// -------- input model ----------
const GetDetailsRequestInfo = Joi.object({
  Id: Joi.string().uuid()
})
GetDetailsRequestInfo.new = ValidationNew(GetDetailsRequestInfo)

// ---------- controller ------------------
const controller = {
  path: '/GetDetails',
  controller: GenericControllerMethod({
    name: 'Get Details',
    inputModel: GetDetailsRequestInfo,
    processor: async function (requestInfo, ret, config) {
      const db = GetEvents()

      const foundItem = _.find(db, requestInfo)

      if (!foundItem) {
        ret.AddMessageError('Invalid Event Id!')
        ret.Status = FunctionResultStatus.Failure
        return
      }

      const retVal = GetDetailsInfo.new(foundItem)

      ret.ReturnValue = retVal
      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
