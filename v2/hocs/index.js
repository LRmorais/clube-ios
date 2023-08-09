import React from 'react';

import GlobalStateProvider from './globalState';
import NotificationsProvider from './notifications';
import AnalyticsProvider from './analytics';
import OfflineDataProvider from './offlineData';
import PermissionsProvider from './permissions';
import LayoutProvider from './layout';
import APIProvider from './api';

const HOCs = [
  NotificationsProvider,
  AnalyticsProvider,
  OfflineDataProvider,
  GlobalStateProvider,
  PermissionsProvider,
  LayoutProvider,
  APIProvider,
];

export default ({ children: mainApp }) => HOCs.reduce(
  (mergedProviders, NextProvider) => (
    <NextProvider>
      {mergedProviders}
    </NextProvider>
  ), mainApp
);
