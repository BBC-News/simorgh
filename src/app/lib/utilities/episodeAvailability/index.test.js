import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import loggerMock from '#testHelpers/loggerMock';
import { EPISODE_EXPIRED, EPISODE_NOT_YET_AVAILABLE } from '#lib/logger.const';
import getEpisodeAvailability, { getUrl } from '.';
import onDemandRadioEpisodeJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import onDemandRadioBrandJson from '#data/indonesia/bbc_indonesian_radio/w13xtt0s';
import onDemandTvEpisodeJson from '#data/afrique/bbc_afrique_tv/tv/w3ct05mp';
import onDemandTvBrandJson from '#data/somali/bbc_somali_tv/tv_programmes/w13xttqt';

describe('Episode Availability', () => {
  describe('getUrl', () => {
    it('should return a valid url for radio episode page', () => {
      const url = getUrl(onDemandRadioEpisodeJson);
      expect(url).toEqual('pashto/bbc_pashto_radio/w3ct0lz1');
    });

    it('should return a valid url for radio brand page', () => {
      const url = getUrl(onDemandRadioBrandJson);
      expect(url).toEqual('indonesia/bbc_indonesian_radio/programmes/w13xtt0s');
    });

    it('should return a valid url for tv episode page', () => {
      const url = getUrl(onDemandTvEpisodeJson);
      expect(url).toEqual('afrique/bbc_afrique_tv/tv/w3ct05mp');
    });

    it('should return a valid url for tv brand page', () => {
      const url = getUrl(onDemandTvBrandJson);
      expect(url).toEqual('somali/bbc_somali_tv/tv_programmes/w13xttqt');
    });
  });

  describe('getEpisodeAvailability', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const now = Date.now();
    const oneMinute = 60 * 1000;
    const sixtyMinutes = 60 * oneMinute;

    const oneMinuteFromNow = now + oneMinute;
    const sixtyMinutesFromNow = now + sixtyMinutes;
    const oneMinuteAgo = now - oneMinute;

    const episodeData = onDemandRadioEpisodeJson;

    describe('episode is expired', () => {
      describe('because versions is empty', () => {
        const episodeWithoutVersions = assocPath(
          ['content', 'blocks', 0, 'versions'],
          [],
          episodeData,
        );

        it(`should return 'expired'`, () => {
          const episodeAvailability = getEpisodeAvailability(
            episodeWithoutVersions,
          );
          expect(episodeAvailability).toEqual('expired');
        });

        it(`should log expired message`, () => {
          getEpisodeAvailability(episodeWithoutVersions);
          expect(loggerMock.info).toHaveBeenCalledWith(EPISODE_EXPIRED, {
            url: 'pashto/bbc_pashto_radio/w3ct0lz1',
          });
        });
      });
    });

    describe('episode is available', () => {
      const episodeAvailableFromOneMinuteAgo = assocPath(
        ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
        oneMinuteAgo,
        episodeData,
      );

      describe('because availableFrom is in the past and availableUntil does not exist', () => {
        const episodeWithAvailableFromInPastNoAvailableUntil = dissocPath(
          ['content', 'blocks', '0', 'versions', '0', 'availableUntil'],
          episodeAvailableFromOneMinuteAgo,
        );

        it(`should return 'available'`, () => {
          const episodeAvailability = getEpisodeAvailability(
            episodeWithAvailableFromInPastNoAvailableUntil,
          );
          expect(episodeAvailability).toEqual('available');
        });

        it('should not log available message', () => {
          getEpisodeAvailability(
            episodeWithAvailableFromInPastNoAvailableUntil,
          );
          expect(loggerMock.info).not.toHaveBeenCalled();
        });
      });

      describe('because availableFrom is in the past and availableUntil is in the future', () => {
        const episodeWithAvailableFromInPastAvailableUntilInFuture = assocPath(
          ['content', 'blocks', '0', 'versions', '0', 'availableUntil'],
          sixtyMinutesFromNow,
          episodeAvailableFromOneMinuteAgo,
        );

        it(`should return 'available'`, () => {
          const episodeAvailability = getEpisodeAvailability(
            episodeWithAvailableFromInPastAvailableUntilInFuture,
          );
          expect(episodeAvailability).toEqual('available');
        });

        it('should not log available message', () => {
          getEpisodeAvailability(
            episodeWithAvailableFromInPastAvailableUntilInFuture,
          );
          expect(loggerMock.info).not.toHaveBeenCalled();
        });
      });
    });

    describe('episode is not yet available', () => {
      const episodeAvailableFromOneMinuteInFuture = assocPath(
        ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
        oneMinuteFromNow,
        episodeData,
      );

      describe('because availableFrom is in the future and availableUntil does not exist', () => {
        const episodeWithAvailableFromInFutureNoAvailableUntil = dissocPath(
          ['content', 'blocks', '0', 'versions', '0', 'availableUntil'],
          episodeAvailableFromOneMinuteInFuture,
        );

        it(`should return 'not-yet-available'`, () => {
          const episodeAvailability = getEpisodeAvailability(
            episodeWithAvailableFromInFutureNoAvailableUntil,
          );
          expect(episodeAvailability).toEqual('not-yet-available');
        });

        it('should log not yet available message', () => {
          getEpisodeAvailability(
            episodeWithAvailableFromInFutureNoAvailableUntil,
          );
          expect(loggerMock.info).toHaveBeenCalledWith(
            EPISODE_NOT_YET_AVAILABLE,
            {
              url: 'pashto/bbc_pashto_radio/w3ct0lz1',
            },
          );
        });
      });

      describe('because availableFrom and availableUntil are in the future', () => {
        const episodeWithAvailableFromAndAvailableUntilInFuture = assocPath(
          ['content', 'blocks', '0', 'versions', '0', 'availableUntil'],
          sixtyMinutesFromNow,
          episodeAvailableFromOneMinuteInFuture,
        );

        it(`should return 'not-yet-available'`, () => {
          const episodeAvailability = getEpisodeAvailability(
            episodeWithAvailableFromAndAvailableUntilInFuture,
          );
          expect(episodeAvailability).toEqual('not-yet-available');
        });

        it('should log not yet available message', () => {
          getEpisodeAvailability(
            episodeWithAvailableFromAndAvailableUntilInFuture,
          );
          expect(loggerMock.info).toHaveBeenCalledWith(
            EPISODE_NOT_YET_AVAILABLE,
            {
              url: 'pashto/bbc_pashto_radio/w3ct0lz1',
            },
          );
        });
      });
    });
  });
});
