import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetEvents } from './Classes/EventDB'
import { InitilizeItem } from '../../Classes/WorkflowEngine/WorkflowEngine'
import _ from 'lodash'
import { Joi, ValidationNew } from '@proista/server-core/lib/Validation'
import { IdHelper } from '@proista/server-core/lib/IdHelper'

// ---------- input model ------------------
const CreateRequestInfo = Joi.object({
  Id: Joi.string().uuid(),
  Name: Joi.string().required(),
  Type: Joi.string().required()
})
CreateRequestInfo.new = ValidationNew(CreateRequestInfo, {}, (v) => { v.Id = IdHelper.uuId(); v.WorkflowState = null })

// ---------- controller ------------------
const controller = {
  path: '/Create',
  controller: GenericControllerMethod({
    name: 'Create',
    inputModel: CreateRequestInfo,
    processor: async function (requestInfo, ret, config) {
      const newEvent = _.merge({}, requestInfo)

      InitilizeItem(newEvent)

      const db = GetEvents()
      db.push(newEvent)

      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
