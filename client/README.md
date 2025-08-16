# Client

[NgCfg] = tag for updated config files from default installation - used for searching

## tsconfig.json - enabled absolute paths
"baseUrl": "src",
"paths": { "*": ["*"] }

## styles.scss - <CSSReset>
### Added tailwind & custom variables & colors
> styles.variables.scss
> styles.colors.scss

## app.scss - <Layout>
> flex-body => set on app.html :host (top level parent with multiple children)
> min-height: 100dvh; => encapsulated content matches device view height (-browser UI)
> main { flex: 1; } => pushes footer to the bottom

## added reusable, responsive header & footer

## custom icon libary - public/icons.svg
> custom svg library; use with custom svg component in shared/svg
> add your own svgs by following the format
>> <symbol id="icon-name" viewBox="viewbox">
>> id = chosen name prepended with "icon-", then add name to shared/svg/icon.types.ts
>> can add any svg, use AI to quickly transform it to match provided syntax in icons.svg
> images here were provided by https://www.svgrepo.com/
> included: angular, hamburger, hamburger-2, cart, layers, search

## searchbar - shared/form/searchbar
> searchbar html & css skeleton only. Add own logic.
