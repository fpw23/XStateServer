import { GetTasks } from '../../../Services/Tasks/Classes/TaskDB'
import _ from 'lodash'
import { ShouldProcessTask, SaveProcessTaskHistory } from './Shared'

export const ResolveTask = (context, event, { action: { props } }) => {
  if (ShouldProcessTask(context, props) !== true) {
    // already been processed, just skip
    return
  }

  const tasks = GetTasks()

  const foundTask = _.find(tasks, { Id: event.TaskId })

  if (!foundTask) {
    throw new Error('Invalid Task Id!')
  }

  foundTask.IsComplete = true

  SaveProcessTaskHistory(context, props)

  console.log(`Resolving Task for ${foundTask.Name}`)
}
