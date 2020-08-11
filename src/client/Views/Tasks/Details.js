import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithQuery } from '@proista/client/lib/Tools/QueryHelper'
import { compose } from '@proista/client-tools/lib/index'
import { FormBox, TextBox, ComboBox, CheckBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes, Button } from '@proista/client-ui-material/lib/Controls/Core/index'
import { displayRuleMessages } from '@proista/client-ui-material/lib/Tools/displayRuleMessages'
import Paper from '@material-ui/core/Paper'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { ah as FActions, sh as FStates } from '@proista/client/lib/Data/Form/Types'
import { showSnackbar } from 'common-classes/SnackbarUtilsConfigurator'
import { withSnackbar } from 'notistack'
import _ from 'lodash'

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3)
  },
  actionButton: {
    marginLeft: theme.spacing(1)
  }
})

const formName = 'TaskDetails'

const options = []
options.push({ Text: 'Start Of Care', Value: 'SOC' })
options.push({ Text: 'End Of Care', Value: 'EOC' })

export class DetailsPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialValues: {},
      nextActions: [],
      IsComplete: false
    }
  }

  componentDidMount () {
    const { TaskId, GetDetails, enqueueSnackbar, FormInitValues } = this.props
    GetDetails({ Id: TaskId }).then(({ data }) => {
      FormInitValues(formName, data)
      this.setState({
        nextActions: data.NextActions || [],
        IsComplete: data.IsComplete
      })
    }).catch(displayRuleMessages(enqueueSnackbar))
  }

  resolveItem = (Id, eventName) => {
    const { Resolve, GetDetails, TaskId, FormInitValues, enqueueSnackbar } = this.props
    Resolve({ Id: Id, EventName: eventName }).then(() => {
      showSnackbar.success(`Task ${eventName}`)
      return GetDetails({ Id: TaskId })
    }).then(({ data }) => {
      FormInitValues(formName, data)
      this.setState({
        nextActions: data.NextActions || [],
        IsComplete: data.IsComplete
      })
    }).catch(displayRuleMessages(enqueueSnackbar))
  }

  renderActions = (TaskId, nextActions = [], loading = false) => {
    const { classes } = this.props
    return _.map(nextActions, (na) => {
      return <Button key={na} className={classes.actionButton} loading={loading} variant="contained" color="primary" onClick={this.resolveItem.bind(this, TaskId, na)}>{na}</Button>
    })
  }

  render () {
    const { classes, QueryData: { GetDetailsLoading = false, AcceptLoading = false }, TaskId, BackURL, navigate } = this.props
    const { nextActions = [], IsComplete = false } = this.state

    const loading = GetDetailsLoading || AcceptLoading

    return <Paper className={classes.root}>
      <FormBox readonly={true} loading={loading} onSubmit={() => {}} form={formName}>
        <Row>
          <TextBox name='EventName' label='Event' layout={LayoutSizes.Half} />
          <TextBox name='Name' label='Name' layout={LayoutSizes.Half} />
        </Row>
        <Row>
          <ComboBox name='Type' options={options} label='Type' layout={LayoutSizes.Three} />
        </Row>
        <Row>
          <CheckBox name="IsComplete" label="Is Complete?" layout={LayoutSizes.Full} />
        </Row>
      </FormBox>
      <div className={classes.actions}>
        {IsComplete === false
          ? this.renderActions(TaskId, nextActions, loading)
          : null
        }
        {_.isString(BackURL) === true
          ? <Button key={'GOBACK'} className={classes.actionButton} loading={loading} variant="contained" color="secondary" onClick={() => { navigate(BackURL) }}>Back</Button>
          : null
        }
      </div>
    </Paper>
  }
}

export const Details = compose(
  WithRedux(
    [FStates.Data(formName)],
    [FActions.Submit, FActions.ResetValues, FActions.InitValues]
  ),
  WithQuery({
    stateKey: 'TaskDetails',
    actions: [
      {
        url: '/Services/Tasks/GetDetails',
        prop: 'GetDetails'
      },
      {
        url: '/Services/Tasks/Resolve',
        prop: 'Resolve'
      }
    ]
  }),
  withStyles(styles),
  withSnackbar
)(DetailsPlain)

export default Details
