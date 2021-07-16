import React, { useContext } from 'react';
import path from 'ramda/src/path';
import Lazyload from 'react-lazyload';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';

import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import { GridItemMedium } from '#app/components/Grid';
import { socialEmbedBlockPropTypes } from '#models/propTypes/socialEmbed';
import nodeLogger from '#lib/logger.node';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import createTranslations from './common/translations';
import { LAZYLOAD_OFFSET, Wrapper } from './common/styles';
import { getProviderFromSource, getIdFromSource } from './sourceHelpers';

const logger = nodeLogger(__filename);

const SocialEmbedContainer = ({ blocks, source }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('socialEmbed');

  if (!blocks || !source || !enabled) return null;

  const provider = getProviderFromSource(source);
  const id = getIdFromSource(source);

  const { model } = blocks[0];
  const oEmbed = path(['blocks', 0, 'model', 'oembed'], model);
  const oEmbedPosition = path(['indexOfType'], oEmbed) + 1;

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption: captionTranslations,
  } = createTranslations({ translations, index: oEmbedPosition });

  const fallback = {
    ...fallbackTranslations,
    linkHref: source,
  };

  const skipLink = {
    ...skipLinkTranslations,
    endTextId: `end-of-%provider%-content-${oEmbedPosition}`,
  };

  const caption = provider === 'youtube' ? captionTranslations : null;

  logger.info(SOCIAL_EMBED_RENDERED, {
    provider,
    href: source,
  });

  return (
    <GridItemMedium>
      <Wrapper
        provider={provider}
        data-e2e={`${provider}-embed-${source}`}
        oEmbed={oEmbed}
      >
        {isAmp ? (
          <AmpSocialEmbed
            provider={provider}
            service={service}
            id={id}
            fallback={fallback}
            skipLink={skipLink}
            caption={caption}
          />
        ) : (
          <Lazyload offset={LAZYLOAD_OFFSET} once height={oEmbed?.height}>
            <CanonicalSocialEmbed
              provider={provider}
              service={service}
              oEmbed={oEmbed}
              fallback={fallback}
              skipLink={skipLink}
              caption={caption}
            />
          </Lazyload>
        )}
      </Wrapper>
    </GridItemMedium>
  );
};

SocialEmbedContainer.propTypes = socialEmbedBlockPropTypes;

export default SocialEmbedContainer;
