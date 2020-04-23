import { string, shape, arrayOf, number } from 'prop-types';

const socialEmbedBlockPropTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      indexOfType: number.isRequired,
      model: shape({
        id: string.isRequired,
        href: string.isRequired,
        // 'embed' is optional, however if it is included it
        // must contain 'oembed' and 'oembed.html' properties.
        embed: shape({
          oembed: shape({
            html: string.isRequired,
          }).isRequired,
        }),
      }).isRequired,
    }),
  ),
};

export default socialEmbedBlockPropTypes;
