import React from 'react';
import { ThemeProvider } from 'styled-components'

export default class WrapStyledComponentsThemePicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = { theme: '' }
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    this.props.channel.emit('storybook-styled-components:init', this.props.themes)
    this.props.channel.on('storybook-styled-components:update', this.updateState)
  }

  componentWillUnmount(){
    this.props.channel.removeListener('storybook-styled-components:init', this.props.themes)
    this.props.channel.removeListener('storybook-styled-components:update', theme => this.setState({ theme }))

  }

  componentWithReceiveProps(props) {
    this.setState(props)
  }

  updateState(theme) {
    this.setState({theme})
  }

  render() {
    const {themes, context, storyFn} = this.props;
    const {theme} = this.state || Object.keys(this.themes)[0];
    const storyElement = storyFn(context);

    return themes[theme]
    ? <ThemeProvider theme={themes[theme]}>{storyElement}</ThemeProvider>
    : storyElement
  }
}
