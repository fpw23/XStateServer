import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithQuery } from '@proista/client/lib/Tools/QueryHelper'
import { compose } from '@proista/client-tools/lib/index'
import { DataTable } from '../../Controls/index'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import Pageview from '@material-ui/icons/Pageview'

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
    const { GetEvents } = this.props
    GetEvents().then(({ data }) => {
      this.setState({
        Items: data || []
      })
    })
  }

  render () {
    const { classes, navigate, RouterAddPathName, QueryData: { GetEventsLoading = false } } = this.props

    const { Items = [] } = this.state

    return <React.Fragment>
      <div className={classes.root}>
        <DataTable
          isLoading={GetEventsLoading}
          columns={[
            { title: 'Type', field: 'Type', lookup: { SOC: 'Start of Care', EOC: 'End of Care' } },
            { title: 'Name', field: 'Name' },
            { title: 'Status', field: 'Status' },
            { title: 'Is Complete', field: 'Complete', render: rowData => <span>{rowData.Complete === true ? 'Yes' : 'No'}</span> }
          ]}
          data={Items}
          title='Find Events'
          actions={[
            {
              icon: Pageview,
              tooltip: 'View Details',
              onClick: (event, rowData) => { RouterAddPathName(rowData.Id, rowData.Name); navigate(`../${rowData.Id}/Details`) }
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
    stateKey: 'ListEvents',
    actions: [
      {
        url: '/Services/Events/List',
        prop: 'GetEvents'
      }
    ]
  }),
  withStyles(styles)
)(ListPlain)

export default List
