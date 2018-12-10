import styled from 'styled-components';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { GEL_SPACING, GEL_SPACING_HLF } from '../../../lib/constants/styles';
import { T_MINION } from '../../../lib/constants/typography';

const Copyright = styled.p.attrs({
  role: 'text',
})`
  ${T_MINION};
  background-color: rgba(34, 34, 34, 0.75);
  text-transform: uppercase;
  color: ${C_WHITE};
  padding: ${GEL_SPACING_HLF} ${GEL_SPACING};
  font-family: ${FF_NEWS_SANS_REG};
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
`;

export default Copyright;
