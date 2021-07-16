import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import loggerMock from '#testHelpers/loggerMock';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import CpsSocialEmbedContainer from '.';
import withContexts from '../common/testHelper';
import { cpsTwitterBlock, cpsTwitterBlockNoEmbed } from '../common/fixtures';

/* eslint-disable react/prop-types */
jest.mock('react-lazyload', () => {
  return function MockedLazyload({ children }) {
    return <>{children}</>;
  };
});

describe('CpsSocialEmbedContainer', () => {
  afterEach(() => {
    loggerMock.info.mockClear();
  });

  describe('Canonical', () => {
    it('should render and unmount correctly', () => {
      const { container, unmount } = render(
        withContexts(CpsSocialEmbedContainer, {
          isAmp: false,
          isEnabled: true,
        })({
          blocks: [cpsTwitterBlock],
          source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
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
        href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
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
        withContexts(CpsSocialEmbedContainer, {
          isAmp: false,
          isEnabled: false,
        })({
          blocks: [cpsTwitterBlock],
          source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
        }),
      );
      expect(container.firstChild).toBeNull();
      expect(loggerMock.info).not.toHaveBeenCalled();
    });

    shouldMatchSnapshot(
      'should render correctly without an embed block',
      withContexts(CpsSocialEmbedContainer, {
        isAmp: false,
        isEnabled: true,
      })({
        blocks: [cpsTwitterBlockNoEmbed],
        source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
      }),
    );
  });

  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(CpsSocialEmbedContainer, {
        isAmp: true,
        isEnabled: true,
      })({
        blocks: [cpsTwitterBlock],
        source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
      }),
    );
  });
});
