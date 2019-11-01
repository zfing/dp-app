import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { ListItem } from './'

declare var module

storiesOf('ListItem', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ListItem text="ListItem" />
      </UseCase>
    </Story>
  ))
