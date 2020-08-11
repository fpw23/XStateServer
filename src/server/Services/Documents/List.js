import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetDocuments } from './Classes/DocumentDB'

// ---------- controller ------------------
const controller = {
  path: '/List',
  controller: GenericControllerMethod({
    name: 'List Documents',
    processor: async function (requestInfo, ret, config) {
      const docs = GetDocuments()
      ret.ReturnValue = docs
      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
