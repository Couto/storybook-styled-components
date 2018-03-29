import React from 'react'
import addons from '@storybook/addons'
import WrapStyledComponentsThemePicker from './WrapStory'

const wrapperTheme = (themes) => {
  const channel = addons.getChannel();
  return (storyFn, context) => (
    <WrapStyledComponentsThemePicker
      themes={themes}
      channel={channel}
      storyFn={storyFn}
      context={context}
    />
  );
}

export function withThemes(themes, defaultTheme) {
  return (storyFn, context) => wrapperTheme(themes, defaultTheme)(storyFn, context)
}
