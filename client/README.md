# Client - Ng-20: Zoneless

[NgCfg] = tag for updated config files from default installation - used for searching

## tsconfig.json - enabled absolute paths
"baseUrl": "src",
"paths": { "*": ["*"] }

## styles.scss - <CSSReset>
### Added tailwind & custom variables & colors
- __styles.variables.scss__ - (tailwind | custom) & (--variables | .classes)
- __styles.colors.scss__ - all tailwind colors & 2 custom colors: rust | steel

## app.scss - <Layout>
- flex-body => set on __app.html__ :host (top level parent with multiple children)
- min-height: 100dvh; => encapsulated content matches device view height (-browser UI)
- main { flex: 1; } => pushes footer to the bottom.
- main { margin-top } set dynamically by the __UIService__

## app.meta.ts - centralised source for app metadata
- added a config object for setting app metadata visible in <header> | <footer>

## added reusable, responsive header, sidebar, footer & logo
### header
- responsive <h1>app-name & logo</h1>, searchbar, nav-links, icon buttons
- SCSS controls wrapper layout, you can replace content with own code. Tweak CSS as needed
- sticky nav-bar - hides on scroll down, shows on scroll up.
- Header is observed for size changes, so the <main> margin is dynamically updated
- Icon buttons open sidebars (left & right)
- <h1> reserved for logo & text child with varying responsiveness for devices
  (logo or text only shown at various breakpoints)
### sidebar
- has left and right sidebars, both pre-programmed for immediate use
- set [onRight]="true" for right hand side
- sidebars always remain in DOM
- close button (header) alway on top, projected content automatically scrolls on overflow
- controlled by __UIService__; only 1 sidebar can be visible at a time:
  - pass the same [id] to (openSidebar) event and to <app-sidebar /> for synchronicity
  - inject service to your component and close any/all sidebars at any event
### footer
- output data is set in __app.meta.ts__ (title, stack, rights, link)
### logo
- responsive logo to used in <header> | <footer>
- [responsive]="true"; optional (hides text on certain breakpoints)
- set title in __app.meta.ts__ to change text
- uses custom <svg> library - can be replaced by any type of logo as needed

## custom icon library - public/icons.svg
- custom svg library; use with custom svg component in __shared/ui/svg__
- add your own svgs by following the format
  - <symbol id="icon-name" viewBox="viewbox">
  - id = chosen name prepended with "icon-", then add name to __shared/ui/svg/icon.types.ts__
  - can add any svg, use AI to quickly transform it to match provided syntax in icons.svg
- images here were provided by https://www.svgrepo.com/
- included: angular, hamburger, hamburger-2, cart, layers, search

## searchbar - shared/form/searchbar
- searchbar html & css skeleton only. Add own logic.
