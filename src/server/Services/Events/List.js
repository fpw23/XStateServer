import { GenericControllerMethod } from '@proista/server/lib/Controller'
import { FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import { GetEvents } from './Classes/EventDB'
import _ from 'lodash'
import { Joi, ValidationNew } from '@proista/server-core/lib/Validation'

// -------- input model ----------
const ListRequestInfo = Joi.object({
  Filters: Joi.array().items(Joi.object({
    Field: Joi.string().required(),
    Operator: Joi.string().required(),
    Value: Joi.any()
  })),
  Skip: Joi.number(),
  Limit: Joi.number()
})
ListRequestInfo.new = ValidationNew(ListRequestInfo, { Skip: 0, Limit: 10 })

// ---------- controller ------------------
const controller = {
  path: '/List',
  controller: GenericControllerMethod({
    name: 'List Events',
    inputModel: ListRequestInfo,
    processor: async function (requestInfo, ret, config) {
      const events = GetEvents()

      let results = [...events]
      if (_.isArray(requestInfo.Filters) === true && requestInfo.Filters.length > 0) {
        results = _.filter(results, (r) => {
          let ret = false
          for (const filter of requestInfo.Filters) {
            const testVal = r[filter.Field]
            if (_.isArray(filter.Value)) {
              ret = _.includes(filter.Value, testVal)
            } else if (_.isString(filter.Value)) {
              ret = _.toLower(testVal) === _.toLower(filter.Value)
            }
            if (ret === true) {
              break
            }
          }
          return ret
        })
      }

      ret.ExtraData.Length = results.length
      ret.ReturnValue = _(results).drop(requestInfo.Skip * requestInfo.Limit).take(requestInfo.Limit).value()
      ret.Status = FunctionResultStatus.Success
    }
  })
}

export default controller
