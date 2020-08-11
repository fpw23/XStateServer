import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetTasks } from './Classes/TaskDB'
import { GetEvents } from '../../Services/Events/Classes/EventDB'
import { ProcessItemEvent } from '../../Classes/WorkflowEngine/WorkflowEngine'
import _ from 'lodash'
import { Joi, ValidationNew } from '@proista/server-core/lib/Validation'

// ---------- input model ------------------
const ResolveRequestInfo = Joi.object({
  Id: Joi.string().uuid(),
  EventName: Joi.string().required()
})
ResolveRequestInfo.new = ValidationNew(ResolveRequestInfo)

// ---------- controller ------------------
const controller = {
  path: '/Resolve',
  controller: GenericControllerMethod({
    name: 'Resolve',
    inputModel: ResolveRequestInfo,
    processor: async function (requestInfo, ret, config) {
      const tasks = GetTasks()

      const foundItem = _.find(tasks, { Id: requestInfo.Id })

      if (!foundItem) {
        ret.AddMessageError('Invalid Task Id!')
        ret.Status = FunctionResultStatus.Failure
        return
      }

      const events = GetEvents()

      const foundEvent = _.find(events, { Id: foundItem.EventId })

      if (!foundEvent) {
        ret.AddMessageError(`Invalid Event Id for Task Id ${foundItem.EventId}!`)
        ret.Status = FunctionResultStatus.Failure
        return
      }

      ProcessItemEvent(foundEvent, { type: requestInfo.EventName, TaskId: requestInfo.Id })

      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
