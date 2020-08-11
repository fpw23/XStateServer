import _ from 'lodash'
export const ShouldProcessTask = (context, taskId) => {
  if (!taskId) {
    throw new Error('Invalid task id')
  }

  if (!context) {
    throw new Error('Invalid task id')
  }

  let id

  if (_.isString(taskId)) {
    id = taskId
  } else if (_.isObjectLike(taskId)) {
    id = taskId.TaskId
  }

  if (!id) {
    throw new Error('Invalid task id')
  }

  if (_.isArray(context.TaskHistory) === false) {
    context.TaskHistory = []
  }

  const foundTaskHistory = _.find(context.TaskHistory, { Id: id })

  if (!foundTaskHistory) {
    return true
  } else {
    return false
  }
}

export const SaveProcessTaskHistory = (context, taskId) => {
  if (!taskId) {
    throw new Error('Invalid task id')
  }

  if (!context) {
    throw new Error('Invalid task id')
  }

  let id

  if (_.isString(taskId)) {
    id = taskId
  } else if (_.isObjectLike(taskId)) {
    id = taskId.TaskId
  }

  if (!id) {
    throw new Error('Invalid task id')
  }

  if (_.isArray(context.TaskHistory) === false) {
    context.TaskHistory = []
  }

  context.TaskHistory.push({
    Id: id,
    Pd: new Date()
  })
}
