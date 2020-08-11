import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Row, Col, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { compose } from '@proista/client-tools/lib/index'
import { Details } from './Details'
import { List as DocumentList } from 'common-views/Documents/List'
import { List as TaskList } from 'common-views/Tasks/List'

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%'
  }
})

export class RootPlain extends React.Component {
  render () {
    const { navigate, rootClasses, EventId } = this.props

    const rootProps = {
      rootClasses,
      navigate
    }

    return <React.Fragment>
      <Row>
        <Col layout={LayoutSizes.Full}>
          <Details {...rootProps} EventId={EventId} />
        </Col>
      </Row>
      <Row>
        <Col layout={LayoutSizes.Half}>
          <DocumentList {...rootProps} EventId={EventId} />
        </Col>
        <Col layout={LayoutSizes.Half}>
          <TaskList {...rootProps} EventId={EventId} />
        </Col>
      </Row>
    </React.Fragment>
  }
}

export const Root = compose(
  withStyles(styles)
)(RootPlain)

export default Root
