import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import loggerMock from '#testHelpers/loggerMock';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import SocialEmbedContainer from '.';
import withContexts from './common/testHelper';
import { twitterBlock } from './common/fixtures';

/* eslint-disable react/prop-types */
jest.mock('react-lazyload', () => {
  return function MockedLazyload({ children }) {
    return <>{children}</>;
  };
});

describe('SocialEmbedContainer', () => {
  afterEach(() => {
    loggerMock.info.mockClear();
  });

  describe('Canonical', () => {
    it('should render and unmount correctly', () => {
      const { container, unmount } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: true,
        })({
          blocks: [twitterBlock],
          source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
        }),
      );
      expect(container.firstChild).toMatchSnapshot();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeTruthy();
      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        provider: 'twitter',
        href: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
      });
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeFalsy();
    });

    it('should not render when disabled', () => {
      const { container } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: false,
        })({
          blocks: [twitterBlock],
          source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
        }),
      );
      expect(container.firstChild).toBeNull();
      expect(loggerMock.info).not.toHaveBeenCalled();
    });
  });

  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(SocialEmbedContainer, {
        isAmp: true,
        isEnabled: true,
      })({
        blocks: [twitterBlock],
        source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
      }),
    );
  });
});
