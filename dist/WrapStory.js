'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WrapStyledComponentsThemePicker extends _react2.default.Component {

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
    this.setState(props);
  }

  updateState(theme) {
    this.setState({ theme });
  }

  render() {
    const { themes, context, storyFn } = this.props;
    const { theme } = this.state;
    const storyElement = storyFn(context);
    const currentTheme = themes[theme || Object.keys(themes)[0]];

    return currentTheme ? _react2.default.createElement(
      _styledComponents.ThemeProvider,
      { theme: currentTheme },
      storyElement
    ) : storyElement;
  }
}
exports.default = WrapStyledComponentsThemePicker;