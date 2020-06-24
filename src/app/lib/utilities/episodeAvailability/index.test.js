import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';
import loggerMock from '#testHelpers/loggerMock';
import { EPISODE_EXPIRED, EPISODE_NOT_YET_AVAILABLE } from '#lib/logger.const';
import getEpisodeAvailability, { getUrl } from '.';
import onDemandRadioEpisodeJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import onDemandRadioBrandJson from '#data/indonesia/bbc_indonesian_radio/w13xtt0s';
import onDemandTvEpisodeJson from '#data/afrique/bbc_afrique_tv/w13xttmz.json';
import onDemandTvBrandJson from '#data/somali/bbc_somali_tv/tv_programmes/w13xttqt.json';

describe('Logging episodeAvailability', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a valid url for radio episode page', () => {
    const url = getUrl(onDemandRadioEpisodeJson);
    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandRadioEpisodeJson,
    ).toLowerCase();
    const masterBrand = path(
      ['metadata', 'createdBy'],
      onDemandRadioEpisodeJson,
    );
    const pid = path(['promo', 'locators', 'pid'], onDemandRadioEpisodeJson);
    expect(url).toEqual(`${service}/${masterBrand}/${pid}`);
  });

  it('should return a valid url for radio brand page', () => {
    const url = getUrl(onDemandRadioBrandJson);
    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandRadioBrandJson,
    ).toLowerCase();
    const masterBrand = path(['metadata', 'createdBy'], onDemandRadioBrandJson);
    const pid = path(['promo', 'locators', 'brandPid'], onDemandRadioBrandJson);
    expect(url).toEqual(`${service}/${masterBrand}/programmes/${pid}`);
  });

  it('should return a valid url for tv episode page', () => {
    const url = getUrl(onDemandTvEpisodeJson);
    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandTvEpisodeJson,
    ).toLowerCase();
    const masterBrand = path(['metadata', 'createdBy'], onDemandTvEpisodeJson);
    const pid = path(['promo', 'locators', 'pid'], onDemandTvEpisodeJson);
    expect(url).toEqual(`${service}/${masterBrand}/${pid}`);
  });

  it('should return a valid url for tv brand page', () => {
    const url = getUrl(onDemandTvBrandJson);
    const service = path(
      ['relatedContent', 'site', 'name'],
      onDemandTvBrandJson,
    ).toLowerCase();
    const masterBrand = path(['metadata', 'createdBy'], onDemandTvBrandJson);
    const pid = path(['promo', 'locators', 'brandPid'], onDemandTvBrandJson);
    expect(url).toEqual(`${service}/${masterBrand}/tv_programmes/${pid}`);
  });

  it('logs the correct message when the on demand radio episode is expired', async () => {
    const dataWithoutVersions = assocPath(
      ['content', 'blocks', 0, 'versions'],
      [],
      onDemandRadioEpisodeJson,
    );
    const episodeAvailability = getEpisodeAvailability(dataWithoutVersions);
    expect(episodeAvailability).toEqual('expired');
    expect(loggerMock.info).toHaveBeenCalledWith(EPISODE_EXPIRED, {
      url: 'pashto/bbc_pashto_radio/w3ct0lz1',
    });
  });

  it('logs the correct message when the on demand tv episode is not yet available', async () => {
    const oneMinuteFromNow = Date.now() + 60 * 1000;
    const responseWithEpisodeAvailableInOneMinute = assocPath(
      ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
      oneMinuteFromNow,
      onDemandTvEpisodeJson,
    );
    const episodeAvailability = getEpisodeAvailability(
      responseWithEpisodeAvailableInOneMinute,
    );
    expect(episodeAvailability).toEqual('not-yet-available');
    expect(loggerMock.info).toHaveBeenCalledWith(EPISODE_NOT_YET_AVAILABLE, {
      url: 'afrique/bbc_afrique_tv/w172xc9mmckr8m6',
    });
  });

  it('does not log anything when a radio episode is available', async () => {
    const oneMinuteAgo = Date.now() - 60 * 1000;
    const responseWithEpisodeAvailableOneMinuteAgo = assocPath(
      ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
      oneMinuteAgo,
      onDemandRadioEpisodeJson,
    );
    const episodeAvailability = getEpisodeAvailability(
      responseWithEpisodeAvailableOneMinuteAgo,
    );
    expect(episodeAvailability).toEqual('available');
    expect(loggerMock.info).not.toHaveBeenCalled();
  });
});
