'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withThemes = withThemes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _WrapStory = require('./WrapStory');

var _WrapStory2 = _interopRequireDefault(_WrapStory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wrapperTheme = themes => {
  const channel = _addons2.default.getChannel();
  return (storyFn, context) => _react2.default.createElement(_WrapStory2.default, {
    themes: themes,
    channel: channel,
    storyFn: storyFn,
    context: context
  });
};

function withThemes(themes, defaultTheme) {
  return (storyFn, context) => wrapperTheme(themes, defaultTheme)(storyFn, context);
}