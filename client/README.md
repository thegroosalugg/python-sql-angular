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
