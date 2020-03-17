import EnvironmentVariable from './data/environment-variable';
import Processor from './data/processor';
import Config from './model/xrm-tab-map-config';
import TabMap from './model/tab-map';

class XrmTabMap {
    public static async setDefaultTab(
        executionContext: Xrm.Events.EventContext,
        config: Config
    ): Promise<void> {
        try {
            // Validate input config.
            if (
                !config ||
                !config.environmentVariableName ||
                !config.optionSetName
            ) {
                console.log(`Config passed to XrmTabMap is invalid or empty.`);
                return;
            }

            // Get value of environment variable.
            const environmentVariableValue = await EnvironmentVariable.getDefaultValue(
                config.environmentVariableName
            );

            // Validate environment variable value is JSON.
            if (!Processor.isJsonString(environmentVariableValue)) {
                console.log(
                    `Environment variable default value is not valid JSON. Value received: ${environmentVariableValue}`
                );
                return;
            }

            // Get option set value from form.
            const formContext = executionContext.getFormContext();
            const option = formContext.getAttribute(config.optionSetName);

            if (!option) {
                console.log(
                    `Unable to get option set attribute from given schema name: ${config.optionSetName}`
                );
                return;
            }

            const optionValue = option.getValue();

            // Parse environment variable JSON.
            const tabMap = <TabMap[]>JSON.parse(environmentVariableValue);

            console.log(`TabMap parsed as: ${tabMap}`);

            // Find matching tab from given option set value.
            const map = tabMap.find(map => map.option === optionValue);

            if (!map || !map.tab) {
                console.log(
                    `Unable to retrieve mapping for option value: ${optionValue}`
                );
                return;
            }

            // Set focus tab.
            formContext.ui.tabs.get(map.tab).setFocus();
        } catch (e) {
            console.error(`${e}`);
        }
    }
}

export default XrmTabMap;
