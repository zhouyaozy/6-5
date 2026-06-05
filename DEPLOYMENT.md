# Deployment Instructions

This document provides instructions for deploying the Apache Commons CLI project.

## Building the Site

To build the project site locally, use the Maven Site plugin:

```bash
mvn clean site
```

## Deploying the Site

The project uses the `maven-scm-publish-plugin` to publish the site to the Apache Subversion repository.

To deploy the site, ensure you have the necessary credentials in your `settings.xml` and run:

```bash
mvn clean site-deploy
```

## Releasing the Artifacts

To release artifacts, follow the standard Apache Commons release process using the Maven Release plugin.
