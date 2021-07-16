import React, { useContext } from 'react';
import path from 'ramda/src/path';
import Lazyload from 'react-lazyload';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import { GridItemMedium } from '#app/components/Grid';
import useToggle from '#hooks/useToggle';
import { cpsSocialEmbedBlockPropTypes } from '#models/propTypes/socialEmbed';
import createTranslations from '../common/translations';
import { LAZYLOAD_OFFSET, Wrapper } from '../common/styles';

const logger = nodeLogger(__filename);

const CpsSocialEmbedContainer = ({ blocks }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsSocialEmbed');

  if (!blocks || !enabled) return null;

  const { type: provider, indexOfType, model } = blocks[0];
  const index = indexOfType + 1;

  const id = path(['id'], model);
  const href = path(['href'], model);
  if (!href) return null;

  const oEmbed = path(['embed', 'oembed'], model);

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption: captionTranslations,
  } = createTranslations({ translations, index });

  const fallback = {
    ...fallbackTranslations,
    linkHref: href,
  };

  const skipLink = {
    ...skipLinkTranslations,
    endTextId: `end-of-%provider%-content-${index}`,
  };

  const caption = provider === 'youtube' ? captionTranslations : null;

  logger.info(SOCIAL_EMBED_RENDERED, {
    provider,
    href,
  });

  return (
    <GridItemMedium>
      <Wrapper
        provider={provider}
        data-e2e={`${provider}-embed-${href}`}
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

CpsSocialEmbedContainer.propTypes = cpsSocialEmbedBlockPropTypes;

export default CpsSocialEmbedContainer;
