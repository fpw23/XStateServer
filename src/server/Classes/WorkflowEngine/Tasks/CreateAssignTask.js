import { GetTasks } from '../../../Services/Tasks/Classes/TaskDB'
import { IdHelper } from '@proista/server-core/lib/IdHelper'
import { ShouldProcessTask, SaveProcessTaskHistory } from './Shared'

export const CreateAssignTask = (context, event, { action: { props } }) => {
  if (ShouldProcessTask(context, props) !== true) {
    // already been processed, just skip
    return
  }

  const tasks = GetTasks()

  const newTask = {
    Id: IdHelper.uuId(),
    EventId: context.eventId,
    EventName: context.eventName,
    Name: `Accept Or Reject this Event ${context.eventName}`,
    IsComplete: false
  }
  tasks.push(newTask)

  SaveProcessTaskHistory(context, props)

  console.log(`Creating Assign Task for ${context.eventName}`)
}
