import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithQuery } from '@proista/client/lib/Tools/QueryHelper'
import { compose } from '@proista/client-tools/lib/index'
import { FormBox, TextBox, ComboBox, CheckBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { displayRuleMessages } from '@proista/client-ui-material/lib/Tools/displayRuleMessages'
import Paper from '@material-ui/core/Paper'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { ah as FActions, sh as FStates } from '@proista/client/lib/Data/Form/Types'
import { withSnackbar } from 'notistack'

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
  }
})

const formName = 'EventDetails'

const options = []
options.push({ Text: 'Start Of Care', Value: 'SOC' })
options.push({ Text: 'End Of Care', Value: 'EOC' })

export class DetailsPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialValues: {},
      nextActions: []
    }
  }

  componentDidMount () {
    const { EventId, GetDetails, enqueueSnackbar, FormInitValues } = this.props
    GetDetails({ Id: EventId }).then(({ data }) => {
      FormInitValues(formName, data)
      this.setState({
        nextActions: data.NextActions || []
      })
    }).catch(displayRuleMessages(enqueueSnackbar))
  }

  render () {
    const { classes, QueryData: { GetDetailsLoading = false } } = this.props

    const loading = GetDetailsLoading

    return <Paper className={classes.root}>
      <FormBox readonly={true} loading={loading} onSubmit={() => {}} form={formName}>
        <Row>
          <ComboBox name='Type' options={options} label='Type' layout={LayoutSizes.Half} />
          <TextBox name='Status' label='Status' layout={LayoutSizes.Half} />
        </Row>
        <Row>
          <TextBox name='Name' label='Name' layout={LayoutSizes.Full} />
        </Row>
        <Row>
          <CheckBox name="Complete" label="Is Complete?" layout={LayoutSizes.Full} />
        </Row>
      </FormBox>
    </Paper>
  }
}

export const Details = compose(
  WithRedux(
    [FStates.Data(formName)],
    [FActions.Submit, FActions.ResetValues, FActions.InitValues]
  ),
  WithQuery({
    stateKey: 'EventDetails',
    actions: [
      {
        url: '/Services/Events/GetDetails',
        prop: 'GetDetails'
      }
    ]
  }),
  withStyles(styles),
  withSnackbar
)(DetailsPlain)

export default Details
