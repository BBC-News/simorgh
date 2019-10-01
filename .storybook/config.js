import 'storybook-chromatic';
import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import * as fontFaces from '@bbc/psammead-styles/fonts';
import timemachine from 'timemachine';
import GlobalStyles from '@bbc/psammead-styles/global-styles';

// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
timemachine.config({
  dateString: 'Friday, 9 August 2019 14:04:14',
  timestamp: 1565359454,
});

const req = require.context('../src/app', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  /* eslint-disable react/jsx-filename-extension */
    <GlobalStyles
      fonts={Object.values(fontFaces).map(fontFace => {
        return fontFace();
      })}
    />
    {story()}
  </>
  /* eslint-enable react/jsx-filename-extension */
));

const theme = create({
  base: 'light',
  brandTitle: 'BBC Simorgh',
  brandUrl: 'https://github.com/bbc/simorgh',
});

addParameters({
  options: {
    panelPosition: 'right',
    sidebarAnimcations: true,
    theme,
  },
});

configure(loadStories, module);
