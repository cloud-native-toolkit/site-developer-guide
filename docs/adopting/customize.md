# Customizing the Toolkit installation

!!!Todo
    How do we reconcile all the options for installing in different environments, the different install methods and the desired outcomes?

    Proposal:
    
    - Fast start creates a *standard* install, suitable for working through the learning
    - This section talks about options to move away from the *standard* install
    
      - switch components (e.g. Jenkins instead of Tekton/OpenShift Pipelines)
      - platform specific components (e.g. IBM Cloud Pak)
      - 
    - Reference section contains the detail of each option
      
      - Components supported by the toolkit.  How they function within the toolkit

        - ConfigMaps, Secrets, CRD created for the component
        - Any specific customizations, config the toolkit adds for enable a component
        
      - Tekton modules available and details of what each module does
      - Pipelines and Tasks installed and details of what each module does