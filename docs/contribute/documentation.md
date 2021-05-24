# Updating the Developer Guide

<!--- cSpell:ignore linkchecker linkcheckerrc mkdocs mkdoc -->

The developer guide is created using [MkDocs](http://mkdocs.org){: target="_blank" .external } with the [Materials theme](https://squidfunk.github.io/mkdocs-material/){: target="_blank" .external } theme.

MkDocs takes Markdown documents and turns them into a static website, that can be accessed from a filesystem or served from a web server.

A [link checker tool](https://linkchecker.github.io/linkchecker/index.html) is also used to validate all links in the MkDocs generated website.

## Document layout

The documentation is organized into distinct sections to provide easy navigation and allow self-service viewers to get started, then dive into deeper content with a clear path.

The sections are as follows:

1. **Overview** - This is high level information about the Cloud-Native Toolkit.  What it is and why does it exist.
2. **Install** - This is a section designed to help the first time user get up and running with minimal knowledge.  More advanced install options are provided in a later section
3. **Learning** - This section is designed to teach the fundamentals of Cloud-Native development with the toolkit.  Using a default installation of the Toolkit to work through Continuous Integration and Continuous Delivery.  This section is more about Cloud-Native development and how the Toolkit provides functionality to support Cloud-Native development rather than a deep dive on specific tools that are part of the toolkit.
4. **Adopting** - This section is designed to move from the initial learning phase to adopting the Toolkit as part of development activities.  It covers more advanced installation options, customization options, best practices and how the Toolkit can be applied to certain use cases
5. **Reference** - The reference section is the technical documentation for the resources delivered by the Toolkit.
6. **Resources** - The resources section provides links to content outside the toolkit that someone learning the toolkit may find useful
7. **Contributing** - This section provides how someone can become a contributor to the Cloud-Native Toolkit project, which includes the core Toolkit, adding additional starter kits or pipeline tasks, updating or adding to the documentation.  

## Creating content

MkDocs supports standard Markdown syntax and a set Markdown extensions provided by plugins.  The exact Markdown syntax supported is based on the [python implementation](https://python-markdown.github.io).

MkDocs is configured using the **mkdocs.yml** file in the root of the git repository.  For the prototype, the existing Gatsby content is still within the repository, with the prototype content located in the **mkdocs** directory.

The **mkdoc.yml** file defines the top level navigation for the site.  The level of indentation is configurable (this requires the theme to support this feature) with Markdown headings, levels 2 (`##`) and 3 (`###`) being used for the page navigation on the right of the page.

### Standard Markdown features

The following markdown syntax is used within the documentation

!!!Todo
    Complete the table below

| Syntax | Result
|--------|-----------
|`# Title` | a level 1 heading containing.  You can create up to 6 levels of headings by adding additional `#` characters, so `###` is a level 3 heading
|`**text**` | will display the word ```text``` in **bold**
|`*text*` | will display the word ```text``` in *italic*

HTML can be embedded in Markdown, but in the documentation it is preferred to stick with pure Markdown with the installed extensions.

### Links within MkDocs generated content

MkDocs will warn of any internal broken links, so it is important that links within the documentation are recognized as internal links.  

- a link starting with a protocol name, such as http or https, is an external link
- a link starting with `/` is an external link.  This is because MkDocs generated content can be embedded into another web application, so links can point outside of the MkDocs generated site but hosted on the same website
- a link starting with a file name (including the .md extension) or relative directory (../directory/filename.md) is an internal link and will be verified by MkDocs

!!!Information
    Internal links should be to the Markdown file (with .md extension).  When the site is generated the filename will be automatically converted to the correct URL

As part of the build process a linkchecker application will check the generated html site for any broken links.  You can run this linkchecker locally using the instructions.  If any links in the documentation should be excluded from the link checker, such as links to localhost, then they should be added as a regex to the linkcheckerrc file, located in the root folder of the project - see [linkchecker documentation](https://linkchecker.github.io/linkchecker/index.html) for additional information

## Extensions used in the prototype

There are a number of Markdown extensions being used in the prototype.  See the mkdocs.yml file to see which extensions are configured.  The documentation for the extensions can be found [here](https://python-markdown.github.io/extensions/)

### Link configuration

Links on the page or embedded images can be annotated to control the links and also the appearance of the links:

#### Image

Images are embedded in a page using the standard Markdown syntax `![description](URL)`, but the image can be formatted with [Attribute Lists](https://python-markdown.github.io/extensions/attr_list/){: target="_blank" .external }.  This is most commonly used to scale an image or center an image, e.g.

```md
![GitHub repo url](images/github-repo-url.png){style="width: 80%" .center }
```

#### External Links

External links can also use attribute lists to control behaviors, such as open in new tab or add a css class attribute to the generated HTML, such as **external** in the example below:

```md
[MkDocs](http://mkdocs.org){: target="_blank" .external }
```

#### YouTube videos

It is not possible to embed a YouTube video and have it play in place using pure markdown.  You can use HTML to embed a video:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/u3PTRqkd94k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

but you can use a link that will open the video in a new browser tab using pure markdown:

```markdown
[![alt-content](img URL)](video URL "video title"){: target="_blank"}
```

where:

- alt-content is the content used if the image cannot be displayed by the browser
- img URL is the URL for the thumbnail image for the video.  For YouTube this is usually `http://img.youtube.com/vi/<video ID>/0.jpg`
- video URL is the URL used to launch the video in a new tab (this can be found by opening the video on YouTube and capturing the URL from the browser address bar - this also provides the video ID to be used in the image). It typically looks like `https://youtu.be/u3PTRqkd94k` or `https://www.youtube.com/watch?v=u3PTRqkd94k`
- video title is a string that is displayed to the viewer when they hover over the video image

!!!info
    You can also use the same technique to create clickable images that launch to another site: `[![Image description](Image URL)](target URL "hover text"){: target=_blank}`

### Tabs

Content can be organized into a set of horizontal tabs.  

```md
=== "Tab 1"
    Hello

=== "Tab 2"
    World
```

produces :

=== "Tab 1"
    Hello

=== "Tab 2"
    World

### Information boxes

The [Admonition](https://python-markdown.github.io/extensions/admonition/){: target="_blank" .external } extension allows you to add themed information boxes using the `!!!` and `???` syntax:

```md
!!! note
    This is a note
```

produces:

!!! note
    This is a note

and

```text
??? note
    This is a note

    You can add a `+` character to force the box to be initially open `???+`
```

produces a collapsible box:

??? note
    This is a collapsible note

    You can add a `+` character to force the box to be initially open `???+`

You can override the title of the box by providing a title after the Admonition type.  

!!!Example
    You can also nest different components as required

    === "note"
        !!!note
            This is a note

    === "collapsible note"
        ???+note
            This is a note

    === "custom title note"
        !!!note "Sample Title"
            This is a note

    === "Markdown"
        ```md
        !!!Example
            You can also nest different components as required

            === "note"
                !!!note
                    This is a note

            === "collapsible note"
                ???+note
                    This is a note

            === "custom title note"
                !!!note "Sample Title"
                    This is a note
        ```

#### Supported Admonition Classes

The Admonitions supported by the Material theme are :

!!! note
    This is a note

!!! abstract
    This is an abstract

!!! info
    This is an info

!!! tip
    This is a tip

!!! success
    This is a success

!!! question
    This is a question

!!! warning
    This is a warning

!!! failure
    This is a failure

!!! danger
    This is a danger

!!! bug
    This is a bug

!!! example
    This is an example

!!! quote
    This is a quote

### Redirects

To help external sites wanting to link to the documentation there are a number of vanity links maintained using the [redirect plugin](){: target=_blank}.  The links are defined in the **mkdocs.yml** file and documented on the [Additional Resources](../resources/resources.md#linking-to-this-site){: target=_blank} page.

To ensure the auto-generated link page does not get reported by the link checker, an entry needs to be added to the **nofollow** section of the link checker config file, **linkcheckerrc** in the root directory of the project.

E.g. if a link /help was created then an entry in the nofollow section should be ```public/help.html$```.

## Spell checking

This project uses [cSpell](https://github.com/streetsidesoftware/cspell){: target=_blank} to check spelling within the markdown.  The configuration included in the project automatically excludes content in a code block, enclosed in triple back quotes \`\`\`.

The configuration file also specifies that US English is the language used in the documentation, so only US English spellings should be used for words where alternate international English spellings exist.

You can add words to be considered valid either within a markdown document or within the cspell configuration file, **cspell.json**, in the root folder of the documentation repository.

Words defined within a page only apply to that page, but words added to the configuration file apply to the entire project.

### Adding local words

You can add a list of words to be considered valid for spell checking purposes as a comment in a Markdown file.

The comment has a specific format to be picked up by the cSpell tool:

```<!--- cSpell:ignore linkchecker linkcheckerrc mkdocs mkdoc -->```

here the words *linkchecker*, *linkcheckerrc*, *mkdocs* and *mkdoc* are specified as words to be accepted by the spell checker within the file containing the comment.

### Adding global words

The cSpell configuration file **cspell.json** contains a list of words that should always be considered valid when spell checking.  The list of words applies to all files being checked.

## Setting up a documentation environment

To work on documentation and be able to view the rendered web site you need to create an environment, which comprises of:

=== "Local tooling installation"

    You can install MkDocs and associated plugins on your development system and run the tools locally:

    - Install [Python 3](https://www.python.org) on your system
    - Clone or Fork the documentation repository
    - cd into the documentation directory
    - Install the required python packages `pip install -r requirements.txt'
    - Install the linkchecker using command `pip install git+https://github.com/linkchecker/linkchecker.git`
    - Install the spell checker using command `npm install -g cspell`

    !!!note
        sudo command may be needed to install globally, depending on your system configuration

    You now have all the tools installed to be able to create the static HTML site from the markdown documents.  The [documentation for MkDocs](https://www.mkdocs.org) provides full instructions for using MkDocs, but the important commands are:

    - `mkdocs build` will build the static site.  This must be run in the root directory of the repo, where mkdocs.yml is located
    - `mkdocs serve` will build the static site and launch a test server on `http://localhost:8000`.  Every time a document is modified the website will automatically be updated and any browser open will be refreshed to the latest.
    - To check links in the built site (`mkdocs build` must be run first), use the linkchecker, with command `linkchecker -f linkcheckerrc --check-extern public`.  This command should be run in the root folder of the project, containing the **linkcheckerrc** file.
    - To check spelling ```cspell docs/**/*.md``` should be run in the root folder of the project, containing the **cspell.json** file.

=== "Tooling within a Docker container"

    You can use a Docker container and run MkDocs from the container, so no local installation is required:

    - You need to have [Docker](https://www.docker.com) installed and running on your system
    - There are helper configurations installed if you have npm from [Node.JS](https://nodejs.org) installed.
    - To start developing run command `npm run dev` in the root directory of the git repo (where **package.json** and **mkdocs.yaml** are located)
    - Open a browser to `http://localhost:8000`, where you will see the documentation site.  This will live update as you save changes to the Markdown files in the docs folder
    - To stop developing run command `npm dev:stop`, which will terminate the docker container
    - View the scripts section of **package.json** in the root folder of the git repo for additional options available
    - To build the static HTML file and check all links and spelling run command `npm run build`
