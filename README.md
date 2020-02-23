# Notebook

This is a notebook built with GatsbyJS. The source code of this project lies in the `source` branch, while the built website lies in the `master` branch.

## Aim of the Project

I want to have a structured notebook, where I can nest pages easily. I also want to be able to see the structure easily, and have reasonable search function.

## Features

- **Index:** the index page of the website shows a structured list of pages in the site.
- **Search:** using `gatsby-plugin-solr`, the notebook offers a fast local search.

## How to use

Create the files in the `notebook` folder in the root directory of this project. In the frontmatter section, the following attributes are supported:
- `id` (required): the ID of the page. The page will be at `/entry/<id>`.
- `title` (required): the title of the page.
- `title_short` (optional): the short title of the page, used in the breadcrumb. If it is not supplied, `title` is used instead.
- `parent` (optional): the parent page of the page. If there is no parent, the page is considered a root page.
- `related` (optional): an array of ID of related pages. The related list will be shown in the sidebar.
