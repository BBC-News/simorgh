# SitewideLinks [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=SitewideLinks)

## Description

The `SitewideLinks` component is designed to be used at the bottom of an article, however can be used anywhere on a page. These links are generally intended to be to more general and legal BBC pages, but do not have to be. It also includes information about copyright. 

## Arguments

| Argument      | Type                  | Example                                           |
|:--------------|:----------------------|:--------------------------------------------------|
| links         | Array of Link objects | `[{href:'https://www.bbc.com', text: 'The BBC'}]` |
| copyrightText | String                | `'Copyright BBC News'`                            |
| externalLink  | Link object           | `{href:'https://www.bbc.com', text: 'The BBC'}`   |

## When to use this component

It is currently used at the bottom of new BBC News and BBC News Persian article pages, however it has no markup requiring this to be its only application. It can be used anywhere on any page.

## Considerations
### Landmark Roles
The typical use-case of this component is at the bottom of BBC pages in a [`footer` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer). When this is done it is recommend that the component is wrapped in a [`contentinfo` landmark](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/contentinfo.html) which denotes content around copyright, privacy and related content.

*Example -*
```jsx
<footer role="contentinfo">
  <SitewideLinks />
</footer>
```
