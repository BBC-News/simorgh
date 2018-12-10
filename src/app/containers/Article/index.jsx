import React, { Fragment } from 'react';
import { bool, string, shape } from 'prop-types';
import styled from 'styled-components';
import { C_OAT_LHT } from '@bbc/psammead-styles/colours';
import MetadataContainer from '../Metadata';
import HeaderContainer from '../Header';
import FooterContainer from '../Footer';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import Timestamp from '../../components/Timestamp';
import {
  layoutGridWrapper,
  layoutGridItemConstrained,
} from '../../lib/layoutGrid';
import { PlatformContextProvider } from '../../contexts/PlatformContext';
import GlobalStyle from '../../lib/globalStyles';

const Wrapper = styled.div`
  ${layoutGridWrapper};
`;

const OatWrapper = styled(Wrapper)`
  background: ${C_OAT_LHT};
`;

const GridItemConstrained = styled.div`
  ${layoutGridItemConstrained};
`;

const componentsToRenderHeadline = {
  headline: headings,
};

const componentsToRenderMain = {
  subheadline: headings,
  text,
  image,
};

const splitBlocksByHeadline = ({ model }) => {
  const { blocks } = model;

  const headlineIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'headline') + 1;

  const headlineBlocks = blocks.slice(0, headlineIndexPlusOne);
  const mainBlocks = blocks.slice(headlineIndexPlusOne, blocks.length);

  return { headlineBlocks, mainBlocks };
};

/*
  [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
*/
const ArticleContainer = ({ loading, error, data }) => {
  if (loading) return 'Loading...'; /* [1] */
  if (error) return 'Something went wrong :(';
  if (data) {
    const { isAmp, data: articleData, service } = data;
    const { content, metadata, promo } = articleData;

    const { headlineBlocks, mainBlocks } = splitBlocksByHeadline(content);

    /*
     * headlineBlocks length check is temporary
     * Simorgh will respond with 400 to lack of headline block in issue
     * https://github.com/BBC-News/simorgh/issues/836
     */
    if (headlineBlocks.length > 0) {
      return (
        <Fragment>
          <GlobalStyle />
          <ServiceContextProvider service={service}>
            <PlatformContextProvider platform={isAmp ? 'amp' : 'canonical'}>
              <HeaderContainer />
              <MetadataContainer
                metadata={metadata}
                promo={promo}
                service={service}
              />
              <main role="main">
                <Wrapper>
                  <GridItemConstrained>
                    <Blocks
                      blocks={headlineBlocks}
                      componentsToRender={componentsToRenderHeadline}
                    />
                    <Timestamp timestamp={metadata.lastUpdated} />
                  </GridItemConstrained>
                </Wrapper>
                <OatWrapper>
                  <GridItemConstrained>
                    <Blocks
                      blocks={mainBlocks}
                      componentsToRender={componentsToRenderMain}
                    />
                  </GridItemConstrained>
                </OatWrapper>
              </main>
              <FooterContainer />
            </PlatformContextProvider>
          </ServiceContextProvider>
        </Fragment>
      );
    }
  }

  return null;
};

ArticleContainer.propTypes = {
  loading: bool,
  error: string,
  data: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  loading: false,
  error: null,
  data: null,
};

export default ArticleContainer;
