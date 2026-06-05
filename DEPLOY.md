<!---
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->
# Apache Commons CLI - Deployment Guide

## Prerequisites

- Java JDK 8 or later (`maven.compiler.source` is set to 1.8 in `pom.xml`)
- Apache Maven 3.x
- For site deployment: SVN client (for Apache infrastructure)

## Build the Library

```bash
mvn clean verify
```

This runs the default goal which includes compilation, tests, checkstyle, SpotBugs, PMD, and japicmp checks.

To skip tests:

```bash
mvn clean verify -DskipTests
```

## Build the Project Site

```bash
mvn clean site
```

The generated site is located at `target/site/`.

To include JaCoCo code coverage (without failing on coverage thresholds):

```bash
mvn clean site -Dcommons.jacoco.haltOnFailure=false -Pjacoco
```

## SVG Class Diagrams Deployment

The project site includes interactive SVG class diagrams for the CLI2 API.
These diagrams are located at `src/site/resources/images/svg/` and consist of:

| File | Purpose |
|------|---------|
| `diagrams.js` | Core rendering engine: `Type`, `Interface`, `Class`, `PackageSymbol` constructors |
| `diagrams-cli2.js` | CLI2 class diagram data definitions (interfaces, classes, builders, validators) |
| `diagrams.css` | Styling for SVG diagram elements (colors, strokes, markers) |
| `util.svg` | Shared SVG marker definitions (`HollowArrow`, `FilledArrow`) |
| `options.svg` | Options hierarchy diagram |
| `commandlines.svg` | CommandLine hierarchy diagram |

### How the Diagrams Work

1. SVG files (`options.svg`, `commandlines.svg`) load `diagrams.js` and `diagrams-cli2.js` via `<script xlink:href="..."/>` references
2. `diagrams-cli2.js` creates global `Interface` and `Class` instances using constructors from `diagrams.js`
3. Each SVG `<g>` element uses `onload` handlers to invoke `.insert(evt)` on the diagram objects
4. CSS styling from `diagrams.css` is applied via `<?xml-stylesheet?>` processing instruction
5. Arrow markers for inheritance/implements relationships reference `util.svg#HollowArrow`

### Server Configuration Requirements

The SVG diagrams require proper server configuration to function correctly:

**MIME Types** (configured in `.htaccess`):

```
AddType image/svg+xml .svg
AddType text/css .css
AddType application/javascript .js
```

**Character Encoding** (configured in `.htaccess`):

```
AddCharset utf-8 .txt .html .css .js
```

**Caching** (configured in `.htaccess`):

```
ExpiresByType image/svg+xml "access plus 1 week"
ExpiresByType text/css "access plus 1 week"
ExpiresByType application/javascript "access plus 1 week"
```

**Cross-Origin Requirements**:

- The CSS `marker-end: url(util.svg#HollowArrow)` is a cross-file SVG fragment reference
- All SVG, CSS, and JS files **must be served from the same origin** for markers to render
- If deploying behind a CDN or reverse proxy, ensure `util.svg` is accessible at the same base URL as the diagram SVG files
- Do not set `Content-Security-Policy` headers that block `script-src` for inline SVG event handlers

### Print Support

`diagrams.css` includes `@media print` rules that:
- Use lighter fill colors suitable for printing
- Reduce stroke width for better print output
- Disable SVG markers (arrows) which may not render correctly in print

## Deploy the Site to Apache Infrastructure

### Initial Setup

The `setup-checkout` Maven profile automatically checks out the site content on first build:

```bash
mvn pre-site -Psetup-checkout
```

This creates a `site-content/` directory with an SVN checkout of the production site.

### Deploy Site

```bash
mvn site-deploy
```

This publishes the site to the Apache SVN repository configured in `distributionManagement`.

### Release Candidate Site

For release candidate staging:

```bash
mvn site-deploy -Prc
```

## Build Distribution Artifacts

```bash
mvn clean package
```

This produces:
- `target/commons-cli-1.11.1-SNAPSHOT.jar` - Library JAR
- `target/commons-cli-1.11.1-SNAPSHOT-bin.tar.gz` / `.zip` - Binary distribution
- `target/commons-cli-1.11.1-SNAPSHOT-src.tar.gz` / `.zip` - Source distribution

Assembly descriptors are defined in `src/assembly/bin.xml` and `src/assembly/src.xml`.

## Deployment Checklist

- [ ] Verify all tests pass: `mvn clean verify`
- [ ] Verify site builds correctly: `mvn clean site`
- [ ] Check SVG diagrams render in browser (open `target/site/images/svg/options.svg`)
- [ ] Verify `util.svg` is accessible alongside diagram SVG files
- [ ] Confirm `.htaccess` is deployed with the site resources
- [ ] For Apache deployment: verify SVN credentials and site-deploy works
