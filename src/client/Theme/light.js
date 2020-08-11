
import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  primary: { main: '#1122EE' },
  secondary: { main: '#4E678F' }
}
const themeName = 'XState Server'

export default createMuiTheme({
  palette,
  themeName,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'rgb(250, 250, 250)'
        }
      }
    }
  }
})
