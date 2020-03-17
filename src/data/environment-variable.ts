class EnvironmentVariable {
    public static async getDefaultValue(name: string): Promise<any> {
        try {
            return Xrm.WebApi.retrieveMultipleRecords(
                'environmentvariabledefinition',
                `?$select=defaultvalue&$filter=schemaname eq '${name}'&$top=1`
            ).then(response => {
                if (
                    response &&
                    response.entities &&
                    response.entities.length === 1
                ) {
                    const environmentVariable = response.entities[0];
                    return environmentVariable.defaultvalue;
                } else {
                    console.log(
                        `No environment variable definition found matching the schema name: ${name}.`
                    );
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default EnvironmentVariable;
