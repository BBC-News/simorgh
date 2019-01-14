import React from 'react';
// Import a react-testing-library method
import { render } from 'react-testing-library';
import {
  shouldShallowMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';
import TextContainer from './index';

describe('TextContainer', () => {
  describe('with no data', () => {
    isNull('should return null', <TextContainer />);
  });

  describe('with data', () => {
    const fragmentBlock = (text, attributes = []) => ({
      type: 'fragment',
      model: {
        text,
        attributes,
      },
    });

    const paragraphBlock = blocks => ({
      type: 'paragraph',
      model: {
        blocks,
      },
    });

    const data = {
      blocks: [
        paragraphBlock([fragmentBlock('This is a 1st paragraph block.')]),
        paragraphBlock([fragmentBlock('This is a 2nd paragraph block.')]),
        paragraphBlock([fragmentBlock('This is a 3rd paragraph block.')]),
        paragraphBlock([fragmentBlock('This is a 4th paragraph block..')]),
        paragraphBlock([fragmentBlock('This is a 5th paragraph block.')]),
      ],
    };

    shouldShallowMatchSnapshot(
      'should render correctly',
      <TextContainer {...data} />,
    );

    describe('A react-testing-library snapthot test', () => {
      it('Should render a TextContainer', () => {
        const { baseElement } = render(<TextContainer {...data} />);
        expect(baseElement.firstChild).toMatchSnapshot();
      });
    });
  });
});
