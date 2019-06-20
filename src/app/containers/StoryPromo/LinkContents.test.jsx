import React from 'react';
import { render } from '@testing-library/react';

import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import LinkContents from './LinkContents';

const item = {
  cpsType: 'STY',
  headlines: {
    headline: 'A headline',
  },
};

const mediaItem = {
  cpsType: 'MAP',
  headlines: {
    headline: 'A headline for a media item',
  },
  media: {
    format: 'audio',
    versions: [
      {
        duration: 666,
      },
    ],
  },
};

const mockServiceConfig = {
  translations: {
    media: {
      audio: 'AUDIO',
      video: 'VIDEO',
    },
  },
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});
const { useContext } = jest.requireMock('react');

describe('Story Promo Link Contents', () => {
  beforeEach(() => {
    useContext.mockReturnValue(mockServiceConfig);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  it("should render a story's headline as bare text", () => {
    const { container } = render(<LinkContents item={item} />);

    expect(container.innerHTML).toEqual(item.headlines.headline);
  });

  shouldShallowMatchSnapshot(
    'should render with visually hidden text for media promos',
    <LinkContents item={mediaItem} />,
  );
});
