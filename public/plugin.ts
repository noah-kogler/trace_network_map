import { i18n } from '@kbn/i18n';
import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  TraceNetworkMapPluginSetup,
  TraceNetworkMapPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

export class TraceNetworkMapPlugin
  implements Plugin<TraceNetworkMapPluginSetup, TraceNetworkMapPluginStart> {
  public setup(core: CoreSetup): TraceNetworkMapPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'traceNetworkMap',
      title: PLUGIN_NAME,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('traceNetworkMap.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): TraceNetworkMapPluginStart {
    return {};
  }

  public stop() {}
}
