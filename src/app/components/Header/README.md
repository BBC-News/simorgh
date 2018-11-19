# Header [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=Header)

### Description
This component functions as a wrapper for the [Brand](../Brand) component (which is also used in the [Footer](../Footer)). The wrapper is a HTML 'header' element with the 'role' of 'banner' for accessibility. This component is distinct from Brand as the 'header' HTML element is unique and cannot be reused elsewhere on the page.
	
### When to use this component
Header is designed to be used at the top of the document above all other content.

As this component uses the [Brand](../Brand), which consumes the service context via the [ServiceContextConsumer](../ServiceContext) component, the service context must be provided to the Header by the [ServiceContextProvider](../ServiceContext).

### Accessibility notes
Landmark:
Banner
