import { render } from '@testing-library/react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import {
  VideoCanonicalWithPlaceholder,
  VideoCanonicalNoPlaceholder,
  VideoAmp,
  VideoCanonicalNoVersionId,
  VideoCanonicalToggledOff,
  VideoCanonicalWithCaption,
  VideoAmpWithCaption,
} from './fixtureData';
import logEmbedSourceStatus from './helpers/logEmbedSourceStatus';
import defaultToggles from '#lib/config/toggles';
import onClient from '#lib/utilities/onClient';

jest.mock('./helpers/logEmbedSourceStatus');
jest.mock('#lib/utilities/onClient');

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'Calls the canonical placeholder when platform is canonical and showPlaceholder is true',
    VideoCanonicalWithPlaceholder,
  );

  shouldMatchSnapshot(
    'Does not Call the canonical placeholder when platform is canonical but showPlaceholder is false',
    VideoCanonicalNoPlaceholder,
  );

  shouldMatchSnapshot('Renders the AMP player when platform is AMP', VideoAmp);

  describe('Fails and returns early when', () => {
    isNull('there is no versionId', VideoCanonicalNoVersionId);
    isNull('component is toggled off', VideoCanonicalToggledOff);
  });
});

it('should display the AMP media caption', () => {
  const { getByText } = render(VideoAmpWithCaption);

  const mediaCaptionAMP = getByText('Media Player With Caption');
  expect(mediaCaptionAMP).toBeInTheDocument();
});

it('should display the Canonical media caption', () => {
  const { getByText } = render(VideoCanonicalWithCaption);

  const mediaCaptionCanonical = getByText('Media Player With Caption');
  expect(mediaCaptionCanonical).toBeInTheDocument();
});

it('should render the iframe when showPlaceholder is set to false', () => {
  render(VideoCanonicalNoPlaceholder);

  expect(document.querySelector('iframe')).toBeInTheDocument();
});

it('should not render the iframe when showPlaceholder is set to true', () => {
  render(VideoCanonicalWithCaption);

  expect(document.querySelector('iframe')).not.toBeInTheDocument();
});

it('should contain the noscript tag for no-JS scenarios ', () => {
  render(VideoCanonicalWithCaption);

  expect(document.querySelector('noscript')).toBeInTheDocument();
});

const enableLogMediaPlayerStatus = flag => {
  defaultToggles[
    process.env.SIMORGH_APP_ENV || 'local'
  ].logMediaPlayerStatus.enabled = flag;
};

describe('log MediaPlayer status', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    logEmbedSourceStatus.mockImplementationOnce(() => jest.fn());
    onClient.mockReturnValue(false);
    enableLogMediaPlayerStatus(true);
  });

  it('should log embed source status code when player is loaded', () => {
    render(VideoCanonicalWithCaption);

    expect(logEmbedSourceStatus.mock.calls.length).toBeGreaterThan(0);
    logEmbedSourceStatus.mock.calls.forEach(call => {
      const { url, assetType, embedUrl } = call[0];
      expect(url).toBe('c123456789o');
      expect(embedUrl.includes('test.bbc.co.uk')).toBe(true);
      expect(assetType).toBe('articles');
    });
  });

  it('should not log when toggle is disabled', () => {
    enableLogMediaPlayerStatus(false);
    render(VideoCanonicalWithCaption);

    expect(logEmbedSourceStatus).not.toHaveBeenCalled();
  });

  it('should only log on server', () => {
    onClient.mockReturnValue(true);
    render(VideoCanonicalWithCaption);

    expect(logEmbedSourceStatus).not.toHaveBeenCalled();
  });
});
