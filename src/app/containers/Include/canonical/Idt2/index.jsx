/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import styled from 'styled-components';

import { Img } from '@bbc/psammead-image';
import { GEL_SPACING_QUIN } from '@bbc/gel-foundations/spacings';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const Include = styled.div`
  max-width: 100%;
  overflow: scroll hidden;
  margin-bottom: ${GEL_SPACING_QUIN};
`;

const DISALLOWED_SCRIPTS = /js\/verticalChart|horizontalChart|lineChart|pieChart|simpleMap|table\./;

const Idt2Canonical = ({ html, imageBlock }) => {
  if (!html || !imageBlock) return null;
  const { src, alt, srcset } = imageBlock;
  const isDisallowed = DISALLOWED_SCRIPTS.test(html);

  return (
    <IncludeGrid>
      {isDisallowed ? (
        <Img src={src} alt={alt} srcset={srcset} />
      ) : (
        <Include
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </IncludeGrid>
  );
};

Idt2Canonical.propTypes = {
  html: string,
  imageBlock: shape({
    src: string.isRequired,
    alt: string.isRequired,
    srcset: string,
  }),
};

Idt2Canonical.defaultProps = {
  html: null,
  imageBlock: null,
};

export default Idt2Canonical;
