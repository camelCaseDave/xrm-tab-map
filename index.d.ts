declare module 'xrm-tab-map' {
    class XrmTabMap {
        static setDefaultTab(
            executionContext: Xrm.Events.EventContext,
            config: XrmTabMap.Config
        ): Promise<void>;
    }

    namespace XrmTabMap {
        interface Config {
            environmentVariableName: string;
            optionSetName: string;
        }
    }

    export default XrmTabMap;
}
