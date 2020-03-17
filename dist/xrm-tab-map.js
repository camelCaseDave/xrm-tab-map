'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var EnvironmentVariable = /** @class */ (function () {
    function EnvironmentVariable() {
    }
    EnvironmentVariable.getDefaultValue = function (name) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", "?$select=defaultvalue&$filter=schemaname eq '" + name + "'&$top=1").then(function (response) {
                            if (response && response.entities && response.entities.length === 1) {
                                var environmentVariable = response.entities[0];
                                return environmentVariable.defaultvalue;
                            }
                            else {
                                console.log("No environment variable definition found matching the schema name: " + name + ".");
                            }
                        })];
                }
                catch (e) {
                    console.log(e.message);
                }
                return [2 /*return*/];
            });
        });
    };
    return EnvironmentVariable;
}());

var Processor = /** @class */ (function () {
    function Processor() {
    }
    Processor.isJsonString = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return Processor;
}());

var XrmTabMap = /** @class */ (function () {
    function XrmTabMap() {
    }
    XrmTabMap.setDefaultTab = function (executionContext, config) {
        return __awaiter(this, void 0, Promise, function () {
            var environmentVariableValue, formContext, option, optionValue_1, tabMap, map, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Validate input config.
                        if (!config || !config.environmentVariableName || !config.optionSetName) {
                            console.log("Config passed to XrmTabMap is invalid or empty.");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, EnvironmentVariable.getDefaultValue(config.environmentVariableName)];
                    case 1:
                        environmentVariableValue = _a.sent();
                        // Validate environment variable value is JSON.
                        if (!Processor.isJsonString(environmentVariableValue)) {
                            console.log("Environment variable default value is not valid JSON. Value received: " + environmentVariableValue);
                            return [2 /*return*/];
                        }
                        formContext = executionContext.getFormContext();
                        option = formContext.getAttribute(config.optionSetName);
                        if (!option) {
                            console.log("Unable to get option set attribute from given schema name: " + config.optionSetName);
                            return [2 /*return*/];
                        }
                        optionValue_1 = option.getValue();
                        tabMap = JSON.parse(environmentVariableValue);
                        console.log("TabMap parsed as: " + tabMap);
                        map = tabMap.find(function (map) { return map.option === optionValue_1; });
                        if (!map || !map.tab) {
                            console.log("Unable to retrieve mapping for option value: " + optionValue_1);
                            return [2 /*return*/];
                        }
                        // Set focus tab.
                        formContext.ui.tabs.get(map.tab).setFocus();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error("" + e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return XrmTabMap;
}());

module.exports = XrmTabMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHJtLXRhYi1tYXAuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhL2Vudmlyb25tZW50LXZhcmlhYmxlLnRzIiwiLi4vc3JjL2RhdGEvcHJvY2Vzc29yLnRzIiwiLi4vc3JjL3hybS10YWItbWFwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVudmlyb25tZW50VmFyaWFibGUge1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldERlZmF1bHRWYWx1ZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gWHJtLldlYkFwaS5yZXRyaWV2ZU11bHRpcGxlUmVjb3JkcyhcbiAgICAgICAgXCJlbnZpcm9ubWVudHZhcmlhYmxlZGVmaW5pdGlvblwiLFxuICAgICAgICBgPyRzZWxlY3Q9ZGVmYXVsdHZhbHVlJiRmaWx0ZXI9c2NoZW1hbmFtZSBlcSAnJHtuYW1lfScmJHRvcD0xYFxuICAgICAgKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmVudGl0aWVzICYmIHJlc3BvbnNlLmVudGl0aWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGNvbnN0IGVudmlyb25tZW50VmFyaWFibGUgPSByZXNwb25zZS5lbnRpdGllc1swXTtcbiAgICAgICAgICByZXR1cm4gZW52aXJvbm1lbnRWYXJpYWJsZS5kZWZhdWx0dmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgTm8gZW52aXJvbm1lbnQgdmFyaWFibGUgZGVmaW5pdGlvbiBmb3VuZCBtYXRjaGluZyB0aGUgc2NoZW1hIG5hbWU6ICR7bmFtZX0uYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudmlyb25tZW50VmFyaWFibGU7XG4iLCJjbGFzcyBQcm9jZXNzb3Ige1xuICBwdWJsaWMgc3RhdGljIGlzSnNvblN0cmluZyhzdHIpIHtcbiAgICB0cnkge1xuICAgICAgSlNPTi5wYXJzZShzdHIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvY2Vzc29yO1xuIiwiaW1wb3J0IEVudmlyb25tZW50VmFyaWFibGUgZnJvbSBcIi4vZGF0YS9lbnZpcm9ubWVudC12YXJpYWJsZVwiO1xuaW1wb3J0IFByb2Nlc3NvciBmcm9tIFwiLi9kYXRhL3Byb2Nlc3NvclwiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9tb2RlbC94cm0tdGFiLW1hcC1jb25maWdcIjtcbmltcG9ydCBUYWJNYXAgZnJvbSBcIi4vbW9kZWwvdGFiLW1hcFwiO1xuXG5jbGFzcyBYcm1UYWJNYXAge1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIHNldERlZmF1bHRUYWIoXG4gICAgZXhlY3V0aW9uQ29udGV4dDogWHJtLkV2ZW50cy5FdmVudENvbnRleHQsXG4gICAgY29uZmlnOiBDb25maWdcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFZhbGlkYXRlIGlucHV0IGNvbmZpZy5cbiAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuZW52aXJvbm1lbnRWYXJpYWJsZU5hbWUgfHwgIWNvbmZpZy5vcHRpb25TZXROYW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBDb25maWcgcGFzc2VkIHRvIFhybVRhYk1hcCBpcyBpbnZhbGlkIG9yIGVtcHR5LmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB2YWx1ZSBvZiBlbnZpcm9ubWVudCB2YXJpYWJsZS5cbiAgICAgIGNvbnN0IGVudmlyb25tZW50VmFyaWFibGVWYWx1ZSA9IGF3YWl0IEVudmlyb25tZW50VmFyaWFibGUuZ2V0RGVmYXVsdFZhbHVlKFxuICAgICAgICBjb25maWcuZW52aXJvbm1lbnRWYXJpYWJsZU5hbWVcbiAgICAgICk7XG5cbiAgICAgIC8vIFZhbGlkYXRlIGVudmlyb25tZW50IHZhcmlhYmxlIHZhbHVlIGlzIEpTT04uXG4gICAgICBpZiAoIVByb2Nlc3Nvci5pc0pzb25TdHJpbmcoZW52aXJvbm1lbnRWYXJpYWJsZVZhbHVlKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgRW52aXJvbm1lbnQgdmFyaWFibGUgZGVmYXVsdCB2YWx1ZSBpcyBub3QgdmFsaWQgSlNPTi4gVmFsdWUgcmVjZWl2ZWQ6ICR7ZW52aXJvbm1lbnRWYXJpYWJsZVZhbHVlfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgb3B0aW9uIHNldCB2YWx1ZSBmcm9tIGZvcm0uXG4gICAgICBjb25zdCBmb3JtQ29udGV4dCA9IGV4ZWN1dGlvbkNvbnRleHQuZ2V0Rm9ybUNvbnRleHQoKTtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGZvcm1Db250ZXh0LmdldEF0dHJpYnV0ZShjb25maWcub3B0aW9uU2V0TmFtZSk7XG5cbiAgICAgIGlmICghb3B0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBVbmFibGUgdG8gZ2V0IG9wdGlvbiBzZXQgYXR0cmlidXRlIGZyb20gZ2l2ZW4gc2NoZW1hIG5hbWU6ICR7Y29uZmlnLm9wdGlvblNldE5hbWV9YFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gb3B0aW9uLmdldFZhbHVlKCk7XG5cbiAgICAgIC8vIFBhcnNlIGVudmlyb25tZW50IHZhcmlhYmxlIEpTT04uXG4gICAgICBjb25zdCB0YWJNYXAgPSA8VGFiTWFwW10+SlNPTi5wYXJzZShlbnZpcm9ubWVudFZhcmlhYmxlVmFsdWUpO1xuXG4gICAgICBjb25zb2xlLmxvZyhgVGFiTWFwIHBhcnNlZCBhczogJHt0YWJNYXB9YCk7XG5cbiAgICAgIC8vIEZpbmQgbWF0Y2hpbmcgdGFiIGZyb20gZ2l2ZW4gb3B0aW9uIHNldCB2YWx1ZS5cbiAgICAgIGNvbnN0IG1hcCA9IHRhYk1hcC5maW5kKG1hcCA9PiBtYXAub3B0aW9uID09PSBvcHRpb25WYWx1ZSk7XG5cbiAgICAgIGlmICghbWFwIHx8ICFtYXAudGFiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBVbmFibGUgdG8gcmV0cmlldmUgbWFwcGluZyBmb3Igb3B0aW9uIHZhbHVlOiAke29wdGlvblZhbHVlfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgZm9jdXMgdGFiLlxuICAgICAgZm9ybUNvbnRleHQudWkudGFicy5nZXQobWFwLnRhYikuc2V0Rm9jdXMoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGAke2V9YCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFhybVRhYk1hcDtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtLQW9CQztJQW5CcUIsbUNBQWUsR0FBbkMsVUFBb0MsSUFBWTt1Q0FBRyxPQUFPOztnQkFDeEQsSUFBSTtvQkFDRixzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUN2QywrQkFBK0IsRUFDL0Isa0RBQWdELElBQUksYUFBVSxDQUMvRCxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7NEJBQ2IsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0NBQ25FLElBQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENB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
