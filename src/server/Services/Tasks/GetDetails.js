import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetTasks } from './Classes/TaskDB'
import { GetEvents } from '../Events/Classes/EventDB'
import { GetItemNextActions } from '../../Classes/WorkflowEngine/WorkflowEngine'
import _ from 'lodash'
import { Joi, ValidationNew } from '@proista/server-core/lib/Validation'

// -------- input model ----------
const GetDetailsRequestInfo = Joi.object({
  Id: Joi.string().uuid()
})
GetDetailsRequestInfo.new = ValidationNew(GetDetailsRequestInfo)

// -------- output model ---------
const GetDetailsInfo = Joi.object({
  Id: Joi.string().uuid(),
  Name: Joi.string().required(),
  EventName: Joi.string().required(),
  NextActions: Joi.array().items(Joi.string()),
  IsComplete: Joi.boolean(),
  Type: Joi.string().required()
})
GetDetailsInfo.new = ValidationNew(GetDetailsInfo, { NextActions: [], IsComplete: false })

// ---------- controller ------------------
const controller = {
  path: '/GetDetails',
  controller: GenericControllerMethod({
    name: 'Get Details',
    inputModel: GetDetailsRequestInfo,
    processor: async function (requestInfo, ret, config) {
      const tasks = GetTasks()

      const foundItem = _.find(tasks, requestInfo)

      if (!foundItem) {
        ret.AddMessageError('Invalid Task Id!')
        ret.Status = FunctionResultStatus.Failure
        return
      }

      // get the event for this task
      const events = GetEvents()

      const foundEvent = _.find(events, { Id: foundItem.EventId })

      if (!foundEvent) {
        ret.AddMessageError(`Invalid Event Id for Task Id ${foundItem.Id}!`)
        ret.Status = FunctionResultStatus.Failure
        return
      }

      // get the next actions allowed
      const nextActions = GetItemNextActions(foundEvent)

      // package up as the return
      ret.ReturnValue = GetDetailsInfo.new({
        ...foundItem,
        Type: foundEvent.Type,
        NextActions: nextActions
      })

      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
