# Cloud-Native Development with the Toolkit

!!!Todo
    Add the following content:

    - Quick summary of Cloud-Native development
    - Outline of what the Continuous Integration phase needs to complete
    - Role of starter kits in toolkit

!!!Todo
    Ensure that links to reference section are included whenever a specific tool, script or starter kit is mentioned

## Testing

!!!Todo
    Add the following content:

    - Language specific, automated unit testing
    - Code coverage tools

## Static Analysis

!!!Todo
    Add the following content:

    - What the analysis tools achieve
    - what can be covered by static analysis (code, Dockerfile)
    - Security and vunerability scanning

## Pipeline

!!!Todo
    Add the following content:

    - Pipeline technology comparison (Jenkins vs Tekton)
    - What the pipeline needs to deliver - everything needed by Continuous Delivery to deliver into testing and production
        - Build the application (Language specific - install dependencies, compile/link code, ...)
        - Run automated unit tests
        - Perform analysis
        - Package into container
        - Perform security scans
        - Build Helm package
