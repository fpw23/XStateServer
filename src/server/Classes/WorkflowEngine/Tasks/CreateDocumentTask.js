import { GetDocuments } from '../../../Services/Documents/Classes/DocumentDB'
import { GetTasks } from '../../../Services/Tasks/Classes/TaskDB'
import { IdHelper } from '@proista/server-core/lib/IdHelper'
import { ShouldProcessTask, SaveProcessTaskHistory } from './Shared'

export const CreateDocumentTask = (context, event, { action: { props } }) => {
  if (ShouldProcessTask(context, props) !== true) {
    // already been processed, just skip
    return
  }

  const docs = GetDocuments()
  const tasks = GetTasks()
  const { DocumentName } = props

  const newDoc = {
    Id: IdHelper.uuId(),
    EventId: context.eventId,
    EventName: context.eventName,
    Name: DocumentName,
    IsComplete: false
  }

  const newTask = {
    Id: IdHelper.uuId(),
    EventId: context.eventId,
    EventName: context.eventName,
    DocumentId: newDoc.Id,
    Name: `Fill Out Document ${DocumentName}`,
    IsComplete: false
  }

  docs.push(newDoc)
  tasks.push(newTask)

  SaveProcessTaskHistory(context, props)

  console.log(`Creating Document Task for ${context.eventName}`)
}
