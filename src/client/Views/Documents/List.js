import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithQuery } from '@proista/client/lib/Tools/QueryHelper'
import { compose } from '@proista/client-tools/lib/index'
import { DataTable } from '../../Controls/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
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
    const { GetDocuments, EventId } = this.props
    GetDocuments().then(({ data }) => {
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
    const { classes, QueryData: { GetDocumentsLoading = false } } = this.props
    const { Items = [] } = this.state

    return <React.Fragment>
      <div className={classes.root}>
        <DataTable
          isLoading={GetDocumentsLoading}
          columns={[
            { title: 'Event Type', field: 'EventName' },
            { title: 'Name', field: 'Name' },
            { title: 'Is Complete', field: 'IsComplete', render: rowData => <span>{rowData.IsComplete === true ? 'Yes' : 'No'}</span> }
          ]}
          data={Items}
          title='Find Documents'
        />
      </div>
    </React.Fragment>
  }
}

export const List = compose(
  WithRedux([], []),
  WithQuery({
    stateKey: 'ListDocuments',
    actions: [
      {
        url: '/Services/Documents/List',
        prop: 'GetDocuments'
      }
    ]
  }),
  withStyles(styles)
)(ListPlain)

export default List
