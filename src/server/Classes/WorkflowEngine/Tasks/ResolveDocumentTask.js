import { GetDocuments } from '../../../Services/Documents/Classes/DocumentDB'
import { GetTasks } from '../../../Services/Tasks/Classes/TaskDB'
import _ from 'lodash'
import { ShouldProcessTask, SaveProcessTaskHistory } from './Shared'

export const ResolveDocumentTask = (context, event, { action: { props } }) => {
  if (ShouldProcessTask(context, props) !== true) {
    // already been processed, just skip
    return
  }

  const tasks = GetTasks()

  const foundTask = _.find(tasks, { Id: event.TaskId })

  if (!foundTask) {
    throw new Error('Invalid Task Id!')
  }

  const docs = GetDocuments()

  const foundDoc = _.find(docs, { Id: foundTask.DocumentId })

  if (!foundDoc) {
    throw new Error(`Invalid Document Id for Task Id ${event.TaskId}!`)
  }

  foundTask.IsComplete = true
  foundDoc.IsComplete = true

  SaveProcessTaskHistory(context, props)

  console.log(`Resolving Document Task for ${foundDoc.Name}`)
}
