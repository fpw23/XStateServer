import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetTasks } from './Classes/TaskDB'

// ---------- controller ------------------
const controller = {
  path: '/List',
  controller: GenericControllerMethod({
    name: 'List Tasks',
    processor: async function (requestInfo, ret, config) {
      ret.ReturnValue = GetTasks()
      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
