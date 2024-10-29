import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import React from 'react';
import { TextInput } from 'react-native';
import { Button } from '@/components/Button';
import { useSQLiteContext } from 'expo-sqlite';

export default function Details() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const db = useSQLiteContext();
  const [task, setTask] = React.useState({
    title: '',
    description: '',
    userId: 1,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  });

  const hanldeAddTask = async () => {
    try {
      const statement = await db.prepareAsync(
        `INSERT INTO tasks (title, description, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`
      );
      await statement.executeAsync([
        task.title,
        task.description,
        task.userId,
        task.createdAt,
        task.updatedAt,
      ]);

      router.replace('/');
    } catch (error) {}
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <TextInput
          placeholder="Task Title"
          value={task.title}
          onChangeText={(e) => setTask({ ...task, title: e })}
          className="mb-4 rounded-md border border-gray-300 p-4 text-black"
        />
        <TextInput
          placeholder="Task Description"
          value={task.description}
          onChangeText={(e) => setTask({ ...task, description: e })}
          className="mb-4 rounded-md border border-gray-300 p-4 text-black"
          multiline
          numberOfLines={4}
        />
        <Button title="Add Task" onPress={hanldeAddTask} />
      </Container>
    </>
  );
}
