import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { thai as brandSVG } from '@bbc/psammead-assets/svgs';
import { thai as thaiScript } from '@bbc/gel-foundations/scripts';
import 'moment/locale/en-gb';
// Timezone value provided at build time
const timezone = Moment_Timezone_Europe_London; //eslint-disable-line

const thai = {
  brandName: 'BBC News บีบีซีไทย',
  locale: 'th',
  service: 'thai',
  serviceName: 'Thai',
  themeColor: `${C_POSTBOX}`,
  brandSVG,
  script: thaiScript,
  moment: {
    timezone,
    locale: 'en-gb',
  },
};

export default thai;
