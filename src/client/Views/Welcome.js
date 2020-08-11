import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import { Row, LayoutSizes, Col } from '@proista/client-ui-material/lib/Controls/Core/index'
import Paper from '@material-ui/core/Paper'

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%'
  }
})

export class WelcomePlain extends React.Component {
  render () {
    const { classes } = this.props
    return <Row>
      <Col layout={LayoutSizes.Full}><Paper className={classes.root}>
        <h1>Welcome</h1> </Paper>
      </Col>
    </Row>
  }
}

export const Welcome = compose(
  withStyles(styles)
)(WelcomePlain)

export default Welcome
