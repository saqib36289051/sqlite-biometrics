import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
import { Button } from '@/components/Button';
import { useSQLiteContext } from 'expo-sqlite';
import { TaskTable } from '@/types/dbType';

export default function Details() {
  const { id } = useLocalSearchParams();
  console.log('🚀 ~ Details ~ id:', id);
  const router = useRouter();
  const db = useSQLiteContext();
  const [task, setTask] = React.useState({
    title: '',
    description: '',
    userId: 1,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  });
  const idNumber = Number(id);

  useEffect(() => {
    if (!id) return;
    fetchTaskById(idNumber);
  }, [id]);
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

      statement.finalizeAsync();

      router.replace('/addTask');
    } catch (error) {}
  };

  async function fetchTaskById(id: number) {
    const statement = await db.prepareAsync('SELECT * FROM tasks WHERE id = ?');
    try {
      const result = await statement.executeAsync([id]);
      const task = await result.getAllAsync();
      setTask(task[0] as TaskTable);
    } catch (error) {}
  }

  async function hanldeUpdateTask() {
    const statement = await db.prepareAsync(
      'UPDATE tasks SET title = ?, description = ?, updatedAt = ? WHERE id = ?'
    );

    try {
      await statement.executeAsync([task.title, task.description, task.updatedAt, idNumber]);

      router.replace('/addTask');
    } catch (error) {
    } finally {
      await statement.finalizeAsync();
    }
  }

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
        <Button
          title={id ? 'Update Task' : 'Add Task'}
          onPress={id ? hanldeUpdateTask : hanldeAddTask}
        />
      </Container>
    </>
  );
}
