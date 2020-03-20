<p align="center"><a href="#" target="_blank" rel="noopener noreferrer">
            <img width="550" src="https://i.imgur.com/sgqV6k1.png" alt="xrm-tab-map"></a></p>

<p align="center"><b>xrm-tab-map</b> for Dynamics 365</p>

> xrm-tab-map sets the focus of a Dynamics 365 form to a specific tab depending on the value of a given option set.

---

**Model-driven app forms** for Dynamics 365 are often laid out so that fields are placed different **tabs that correspond to the status of the record** or an option set value. This is similar to business process flows.

For example an 'Application' entity might go through the stages:

 1. Identify
 2. Details
 3. Supporting evidence
 4. Confirmation
 
 To support this, a form could be laid out with 4 tabs, one for each stage, and an option set (or customised status reason) to specify which stage is currently being worked.
 
 **xrm-tab-map** puts the relevant tab in focus when the form is loaded, based on the value specified in the option set.
 
 ## Usage
 
 1. Create an [Environment Variable](https://docs.microsoft.com/en-us/powerapps/maker/common-data-service/environmentvariables) definition where the default value is the mapping configuration:
 
 ```json
 [
    { "option": 804160000, "tab": "tab_yourDetails" },
    { "option": 804160001, "tab": "tab_yourHistory" },
    { "option": 804160002, "tab": "tab_backgroundChecks" },
    { "option": 804160003, "tab": "tab_offer" },
    { "option": 804160004, "tab": "tab_paymentDetails" },
    { "option": 804160005, "tab": "tab_finalOffer" }
]

 ```
 
 2. Add [xrm-tab-map.js](https://github.com/camelCaseDave/xrm-tab-map/blob/master/dist/xrm-tab-map.js) as a Web Resource to your solution and add it to the Form Library of the form.
 
 Optionally, you can instead import **xrm-tab-map** into your script library via **npm** as follows:
 
- First install the package `npm install xrm-tab-map`
- Then in your script file import the package with `import { XrmTabMap } from 'xrm-tab-map'`;

- Call **xrm-tab-map** 

```ts
XrmTabMap.setDefaultTab(executionContext, {
  environmentVariableName: 'cr142_yourEnvironmentVariableSchemaName',
  optionSetName: 'statuscode'
});
```

3. Add an `onLoad` event handler to your form. If you followed the Web Resource approach this is `XrmTabMap.setDefaultTab`. If you instead imported the package into your own code then you'll know the name of the event handler.

Be sure to tick 'pass execution context' and also enter in your config to the optional parameters box:

```json
{
  "environmentVariableName": "cr142_yourEnvironmentVariableSchemaName",
  "optionSetName": "statuscode"
}
```
