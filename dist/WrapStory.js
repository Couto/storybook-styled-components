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
    const { themes, children } = this.props;
    const { theme } = this.state;

    return themes[theme] ? _react2.default.createElement(
      _styledComponents.ThemeProvider,
      { theme: themes[theme] },
      this.props.children
    ) : this.props.children;
  }
}
exports.default = WrapStyledComponentsThemePicker;