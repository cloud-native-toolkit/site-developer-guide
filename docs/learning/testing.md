# Automated testing

<!--- cSpell:ignore qube -->

Automated testing is an essential part of cloud-native development.  In traditional development, where a typical development cycle consists of a number of months, there is a period of time set aside at the end of the development cycle to run testing.  

With cloud-native development the approach to software development is very different with the adoption of continuous integration and continuous delivery.  There is no longer the opportunity to run a large testing phase at the end of the delivery cycle, as each service and application can have its own development cadence, which can be between a few day to a few weeks.

Cloud-native development shifts the bulk of the testing effort to as early as possible in the development cycle.  Testing needs to be mostly automated to fit with the continuous integration and continuous development practices adopted.  Ideally a bug should be detected as it is first checked in to the source control system.  

Development practices such as [test-driven development](https://www.ibm.com/garage/method/practices/code/practice_test_driven_development/){: target=_blank} use a programming technique requiring all code creation to be driven by automated tests that need to be passed - the test is always written before the code.

The Cloud-Native Toolkit starter kits have testing enabled.  

Each programming language has a number of automated testing tools available, so for the Java starter kits you will see [JUnit](https://junit.org/){: target=_blank} is used and in the JavaScript and TypeScript based starter kits you will find [jest](https://jestjs.io){: target=_blank} is the test framework used.  There are other frameworks and when adopting the Cloud-Native Toolkit you may want to create your own starter kits using your preferred testing framework

## Code coverage

A good practice when running any automated testing is to check the code coverage of tests.  Ideally this should be as close to 100% as possible.  You may even choose to fail a build if the code coverage of automated testing falls below a given threshold, but this is not currently enabled in the starter kits.  

Many of the testing frameworks have code coverage built in, so they can be configured to report code coverage in addition to the results of the tests being executed.  

The code coverage information can be written to a file, then tools such as [SonarQube](../reference/tools/sonar-qube.md){: target=_blank} will read the coverage data and report it as part of their analysis output.  The starter kits use this mechanism, so you can find the results of code coverage in the SonarQube report.  If you completed the fast-start learning, you can go and look at the SonarQube report to see the code coverage results.

!!!Todo
    Add screen capture of SonarQube report showing test coverage result

## Contract Testing

When creating multiple applications and services that need to communicate with each other it is important to verify that both the client (requester) and the server (responder) both stick to the defined API for the communication.  In traditional testing this would have been verified during integration and systems testing, where the end-to-end functionality of a system is tested.  In Cloud-Native development [contract-driven testing](https://www.ibm.com/garage/method/practices/code/contract-driven-testing/){: target=_blank} can be used to validate that all parties are complying with service APIs.

In the Cloud-Native Toolkit the [Pact](https://docs.pact.io){: target=_blank} is used.  The tests need to be written by a developer and integrated into the project automated testing.

You can see an example of **Pact** in use in the [inventory management svc solution](https://ibm-gsi-ecosystem.github.io/ibm-gsi-cloudnative-journey/developer-intermediate/inventory-app){: target=_blank}.  The code repository can be found [here](https://github.com/ibm-gsi-ecosystem/inventory-management-svc-solution){: target=_blank}.  This example is part of one of the **Learning Journey** suggested additional learning in the [resources section](../resources/resources.md)
