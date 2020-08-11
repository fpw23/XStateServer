import { Machine, interpret, State } from 'xstate'
import _ from 'lodash'
import SOCWorkflow from './Workflows/SOCWorkflow'
import EOCWorkflow from './Workflows/EOCWorkflow'
import * as WFTasks from './Tasks/index'

const workflows = []
workflows.push(SOCWorkflow)
workflows.push(EOCWorkflow)

const workflowOptions = {
  actions: {
    ...WFTasks
  }
}

export const InitilizeItem = (item = {}) => {
  const workflow = _.find(workflows, { id: item.Type })
  const sm = Machine(workflow, workflowOptions).withContext({
    eventId: item.Id,
    eventType: workflow.id,
    eventName: item.Name
  })
  const engine = interpret(sm)
  engine.start()
  engine.stop()
  item.WorkflowState = JSON.stringify(engine.state)
  item.Status = engine.state.value
  item.Complete = engine.state.done === true
}

export const ProcessItemEvent = (item = {}, newEvent = {}) => {
  const workflow = _.find(workflows, { id: item.Type })
  const sm = Machine(workflow, workflowOptions)

  let existingWorkflowState

  if (item.WorkflowState) {
    try {
      const stateDefinition = JSON.parse(item.WorkflowState)
      const previousState = State.create(stateDefinition)
      existingWorkflowState = sm.resolveState(previousState)
    } catch (err) {
      console.log(`Failed to restore state for ${item.Id}`)
      throw err
    }
  }

  const engine = interpret(sm)

  if (existingWorkflowState) {
    engine.start(existingWorkflowState)
  } else {
    engine.start()
  }

  engine.send(newEvent)

  engine.stop()

  item.WorkflowState = JSON.stringify(engine.state)
  item.Status = engine.state.value
  item.Complete = engine.state.done === true
}

export const GetItemNextActions = (item = {}) => {
  let previousState

  if (item.WorkflowState) {
    try {
      const stateDefinition = JSON.parse(item.WorkflowState)
      previousState = State.create(stateDefinition)
    } catch (err) {
      console.log(`Failed to restore state for ${item.Id}`)
      throw err
    }
  }

  if (previousState) {
    const workflow = _.find(workflows, { id: item.Type })
    const sm = Machine(workflow, workflowOptions)
    const smState = sm.resolveState(previousState)

    return smState.nextEvents || []
  } else {
    return []
  }
}
