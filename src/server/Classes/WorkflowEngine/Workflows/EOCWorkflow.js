export const workflow = {
  id: 'EOC',
  initial: 'pending',
  context: {
    eventId: null
  },
  states: {
    pending: {
      entry: [
        {
          type: 'CreateAssignTask',
          props: {
            TaskId: 'f1ec4565-c5fd-49f9-af36-17fe23f6c7ea'
          }
        }
      ],
      on: {
        ACCEPT: {
          target: 'accepted',
          actions: [{
            type: 'CreateDocumentTask',
            props: {
              TaskId: '51620cf5-a7fb-4453-b556-d16f4bb1f964',
              DocumentName: 'SOC Assessment'
            }
          }, {
            type: 'ResolveTask',
            props: {
              TaskId: 'af125188-ed33-477a-9069-80c70a6bbc34'
            }
          }]
        },
        REJECT: {
          target: 'rejected',
          actions: [{
            type: 'ResolveDocumentTask',
            props: {
              TaskId: '803f96d7-f21d-44e2-abc6-5ecdc4128137'
            }
          }]
        }
      }
    },
    accepted: {
      always: [{
        target: 'inprogress'
      }]
    },
    inprogress: {
      on: {
        REJECT: {
          target: 'rejected',
          actions: [{
            type: 'ResolveTask',
            props: {
              TaskId: 'dffe3576-dd11-455a-a1ef-6dbfb48b4fa5'
            }
          }]
        },
        COMPLETE: {
          target: 'complete',
          actions: [{
            type: 'ResolveDocumentTask',
            props: {
              TaskId: 'f4a20129-5935-4311-abdb-eeb08970c61a'
            }
          }]
        }
      }
    },
    rejected: {
      type: 'final'
    },
    complete: {
      type: 'final'
    }
  }
}

export default workflow
