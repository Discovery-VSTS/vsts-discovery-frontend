# An Extension for VSTS
[Download from VSTS Marketplace](https://marketplace.visualstudio.com/items?itemName=yichen-lu.vsts-discovery-extension)
## Build and Publish Extension into VSTS
Please follow this [article](https://www.visualstudio.com/en-us/docs/integrate/extensions/get-started/node#package-your-extension).

## Structure of this plugin
### Modules and components
Each item in top navigation menu is corresponding to a module. All modules are under #module-area. (in following structure diagram, #ids are ids for html tags in index.html. those *.html are dynamically loaded page using JQuery.load())
```
#module-area
|-- #100-points-module
|    |-- #100-points-components
|        |-- #100pt-status --> 100-points-status.html
|        |-- #100pt-assign --> 100-points-assign.html
|-- #codetracker-module --> codetracker-status.html
|-- #setting-module --> setting.html
```
When nav bar is clicked, corresponding module section will be shown. By default the plug in will load 100-points-module on page load.
