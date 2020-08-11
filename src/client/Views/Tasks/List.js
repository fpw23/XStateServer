import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithQuery } from '@proista/client/lib/Tools/QueryHelper'
import { compose } from '@proista/client-tools/lib/index'
import { DataTable } from '../../Controls/index'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import Pageview from '@material-ui/icons/Pageview'
import _ from 'lodash'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class ListPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Items: []
    }
  }

  componentDidMount () {
    const { GetTasks, EventId } = this.props
    GetTasks().then(({ data }) => {
      if (EventId) {
        this.setState({
          Items: _.filter(data || [], { EventId: EventId })
        })
      } else {
        this.setState({
          Items: data || []
        })
      }
    })
  }

  render () {
    const { classes, navigate, RouterAddPathName, QueryData: { GetTasksLoading = false } } = this.props
    const { Items = [] } = this.state

    return <React.Fragment>
      <div className={classes.root}>
        <DataTable
          isLoading={GetTasksLoading}
          columns={[
            { title: 'Event Type', field: 'EventName' },
            { title: 'Name', field: 'Name' },
            { title: 'Is Complete', field: 'IsComplete', render: rowData => <span>{rowData.IsComplete === true ? 'Yes' : 'No'}</span> }
          ]}
          data={Items}
          title='Find Tasks'
          actions={[
            {
              icon: Pageview,
              tooltip: 'View Details',
              onClick: (event, rowData) => { RouterAddPathName(rowData.Id, rowData.Name); navigate(`./${rowData.Id}/Details`) }
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </div>
    </React.Fragment>
  }
}

export const List = compose(
  WithRedux([], [RActions.AddPathName]),
  WithQuery({
    stateKey: 'ListTasks',
    actions: [
      {
        url: '/Services/Tasks/List',
        prop: 'GetTasks'
      }
    ]
  }),
  withStyles(styles)
)(ListPlain)

export default List
