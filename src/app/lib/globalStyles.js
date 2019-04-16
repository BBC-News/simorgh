/* eslint-disable no-unused-expressions */
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import {
  F_REITH_SERIF_MEDIUM,
  F_REITH_SERIF_MEDIUM_ITALIC,
  F_REITH_SANS_REGULAR,
  F_REITH_SANS_ITALIC,
  F_REITH_SANS_BOLD,
  F_REITH_SANS_BOLD_ITALIC,
} from '@bbc/psammead-styles/fonts';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  /* Box Sizing https://bit.ly/1A91I0J */
  html {
    box-sizing: border-box;
    font-size: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  ${F_REITH_SERIF_MEDIUM}
  ${F_REITH_SERIF_MEDIUM_ITALIC}
  ${F_REITH_SANS_REGULAR}
  ${F_REITH_SANS_ITALIC}
  ${F_REITH_SANS_BOLD}
  ${F_REITH_SANS_BOLD_ITALIC}
`;

export default GlobalStyle;

/* Unused fonts
  - When adding fonts, be sure to add them to the externals array for Offline-Plugin here:
  https://github.com/bbc/simorgh/blob/latest/webpack.config.client.js

  @font-face {
    font-display: optional;
    font-family: ReithSansNewsLight;
    font-style: normal;
    font-weight: 300;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsLight;
    font-style: normal;
    font-weight: 300;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsRegular;
    font-style: normal;
    font-weight: 400;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsBold;
    font-style: normal;
    font-weight: 700;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff') format('woff');
  }
End of unused fonts */
