'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withThemes = withThemes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _styledComponents = require('styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StyledComponentsThemePicker extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = { theme: '' };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.props.channel.emit('storybook-styled-components:init', this.props.themes);
    this.props.channel.on('storybook-styled-components:update', this.updateState);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('storybook-styled-components:init', this.props.themes);
    this.props.channel.removeListener('storybook-styled-components:update', theme => this.setState({ theme }));
  }

  componentWithReceiveProps(props) {
    console.log('componentWithReceiveProps', props);
    this.setState(props);
  }
  updateState(theme) {
    console.log('updateState', theme);
    this.setState({ theme });
  }
  render() {
    const { themes, children } = this.props;
    const { theme } = this.state;

    return themes[theme] ? _react2.default.createElement(
      _styledComponents.ThemeProvider,
      { theme: themes[theme] },
      this.props.children
    ) : this.props.children;
  }
}

const wrapperTheme = themes => {
  const channel = _addons2.default.getChannel();
  return (storyFn, context) => _react2.default.createElement(
    StyledComponentsThemePicker,
    {
      themes: themes,
      channel: channel
    },
    storyFn(context)
  );
};

function withThemes(themes, defaultTheme) {
  return (storyFn, context) => wrapperTheme(themes, defaultTheme)(storyFn, context);
}