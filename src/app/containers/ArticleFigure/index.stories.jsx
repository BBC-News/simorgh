import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import {
  FigureImage,
  FigureAmpImage,
  FigureImageWithCaption,
  FigureAmpImageWithCaption,
  FigureImageWithCopyright,
  FigureAmpImageWithCopyright,
  FigureImageWithCopyrightAndCaption,
  FigureAmpImageWithCopyrightAndCaption,
  FigureImageWithCaptionContainingLink,
  FigureAmpImageWithCaptionContainingLink,
  FigureImageWithCaptionContainingMultipleParagraphsAndLink,
  FigureAmpImageWithCaptionContainingMultipleParagraphsAndLink,
  FigureLazyLoadImage,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

export default {
  title: 'Containers/Article/Article Figure',
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const WithACaption = ({ service }) => FigureImageWithCaption(service);
export const WithoutACaption = () => FigureImage;
export const WithNonBBCCopyright = () => FigureImageWithCopyright;
export const WithACaptionAndNonBBCCopyright = () =>
  FigureImageWithCopyrightAndCaption;
export const WithACaptionContainingAnInlineLink = () =>
  FigureImageWithCaptionContainingLink;
export const WithACaptionWithMultipleParagraphsWithALink = () =>
  FigureImageWithCaptionContainingMultipleParagraphsAndLink;
export const WithALazyloadedImage = () => FigureLazyLoadImage;

// AMP
export const WithACaptionAmp = ({ service }) =>
  FigureAmpImageWithCaption(service);
WithACaptionAmp.decorators = [AmpDecorator];

export const WithoutACaptionAmp = () => FigureAmpImage;
WithACaptionAmp.decorators = [AmpDecorator];

export const WithNonBBCCopyrightAmp = () => FigureAmpImageWithCopyright;
WithNonBBCCopyrightAmp.decorators = [AmpDecorator];

export const WithACaptionAndNonBBCCopyrightAmp = () =>
  FigureAmpImageWithCopyrightAndCaption;
WithACaptionAndNonBBCCopyrightAmp.decorators = [AmpDecorator];

export const WithACaptionContainingAnInlineLinkAmp = () =>
  FigureAmpImageWithCaptionContainingLink;
WithACaptionContainingAnInlineLinkAmp.decorators = [AmpDecorator];

export const WithACaptionWithMultipleParagraphsWithALinkAmp = () =>
  FigureAmpImageWithCaptionContainingMultipleParagraphsAndLink;
WithACaptionWithMultipleParagraphsWithALinkAmp.decorators = [AmpDecorator];
