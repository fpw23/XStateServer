import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithQuery } from '@proista/client/lib/Tools/QueryHelper'
import { compose } from '@proista/client-tools/lib/index'
import { FormBox, TextBox, ComboBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes, Button } from '@proista/client-ui-material/lib/Controls/Core/index'
import { checkForSubmissionErrors } from '@proista/client-ui-material/lib/Tools/checkForSubmissionErrors'
import Paper from '@material-ui/core/Paper'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { ah as FActions, sh as FStates } from '@proista/client/lib/Data/Form/Types'
import { showSnackbar } from 'common-classes/SnackbarUtilsConfigurator'
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

const formName = 'AddNewEvent'

const options = []
options.push({ Text: 'Start Of Care', Value: 'SOC' })
options.push({ Text: 'End Of Care', Value: 'EOC' })

export class AddNewPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialValues: {}
    }
  }

  onSubmit = (values) => {
    const { AddNewEvent, enqueueSnackbar, navigate } = this.props
    return AddNewEvent(values).then(() => {
      showSnackbar.success('Event Added!')
      navigate('../Find')
    }).catch(checkForSubmissionErrors(enqueueSnackbar))
  }

  render () {
    const { classes, FormSubmit, QueryData: { AddNewEventLoading = false } } = this.props
    const { initialValues } = this.state

    return <Paper className={classes.root}>
      <FormBox loading={AddNewEventLoading} initialValues={initialValues} onSubmit={this.onSubmit} form={formName}>
        <Row>
          <TextBox name='Name' label='Name' layout={LayoutSizes.Half} />
        </Row>
        <Row>
          <ComboBox name='Type' options={options} label='Type' layout={LayoutSizes.Three} />
        </Row>
      </FormBox>
      <div className={classes.actions}>
        <Button loading={AddNewEventLoading} variant="contained" color="primary" onClick={() => { FormSubmit(formName) }}>Submit</Button>
      </div>
    </Paper>
  }
}

export const AddNew = compose(
  WithRedux(
    [FStates.Data(formName)],
    [FActions.Submit, FActions.ResetValues]
  ),
  WithQuery({
    stateKey: 'AddNewEvent',
    actions: [
      {
        url: '/Services/Events/Create',
        prop: 'AddNewEvent'
      }
    ]
  }),
  withStyles(styles),
  withSnackbar
)(AddNewPlain)

export default AddNew
