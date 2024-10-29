import '../global.css';

import { Stack } from 'expo-router';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import React, { Suspense, useEffect } from 'react';
import { SQLiteProvider } from 'expo-sqlite/next';
import FallbackView from '@/components/ui/FallbackView';
import { initTables } from '@/utils/dbUtils';

const loadLocalDB = async () => {
  const dbName = 'testSQLite.db';
  const dbAsset = require('../assets/testSQLite.db');
  const dbUri = Asset.fromModule(dbAsset).uri;

  const dbFilePath = `${FileSystem.documentDirectory}sqlite-biometrics/${dbName}`;
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}sqlite-biometrics`, {
      intermediates: true,
    });

    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function Layout() {
  const [loadDB, setLoadDB] = React.useState(false);

  useEffect(() => {
    loadLocalDB()
      .then(() => setLoadDB(true))
      .catch(() => setLoadDB(true));
  }, []);
  return (
    <Suspense fallback={<FallbackView />}>
      <SQLiteProvider databaseName="testSQLite.db" onInit={initTables} useSuspense>
        <Stack />
      </SQLiteProvider>
    </Suspense>
  );
}
