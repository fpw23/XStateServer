export const workflow = {
  id: 'SOC',
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
            TaskId: 'e771bc4a-28b0-4029-8b10-c7e8906aa4fe'
          }
        }
      ],
      on: {
        ACCEPT: {
          target: 'accepted',
          actions: [{
            type: 'CreateDocumentTask',
            props: {
              TaskId: '2957f402-1109-47a8-819a-fb8fdb9540d4',
              DocumentName: 'SOC Assessment'
            }
          }, {
            type: 'ResolveTask',
            props: {
              TaskId: '0dddfbd0-80ac-4960-bd8f-587671f0f29d'
            }
          }]
        },
        REJECT: {
          target: 'rejected',
          actions: [{
            type: 'ResolveTask',
            props: {
              TaskId: 'b0a21e0d-5579-42c8-8cab-5efa8eca7380'
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
          target: 'inrejection',
          actions: [{
            type: 'CreateDocumentTask',
            props: {
              TaskId: 'bd359c8f-01ff-44ac-95b2-ca73d4070fc9',
              DocumentName: 'SOC Reject Reason'
            }
          }, {
            type: 'ResolveTask',
            props: {
              TaskId: 'efda172b-235a-4884-a797-1d638f65b2e9'
            }
          }]
        },
        COMPLETE: {
          target: 'complete',
          actions: [{
            type: 'ResolveDocumentTask',
            props: {
              TaskId: '935e441e-ad51-45f1-80f7-75f48b66a832'
            }
          }]
        }
      }
    },
    inrejection: {
      on: {
        COMPLETE_REJECTION: {
          target: 'rejected',
          actions: [{
            type: 'ResolveDocumentTask',
            props: {
              TaskId: 'b6d59824-0f27-4b84-aad6-5000196366e7'
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
