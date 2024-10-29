import { Stack, Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect } from 'react';
import { Container } from '@/components/Container';
import { TaskTable } from '@/types/dbType';
import { Button } from '@/components/Button';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const db = useSQLiteContext();
  const [taskList, setTaskList] = React.useState<TaskTable[]>([]);

  const getAllTasks = async () => {
    await db.getAllAsync<TaskTable>('SELECT * FROM tasks').then((result) => {
      setTaskList(result);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  async function deleteTask(taskId: number) {
    try {
      const statement = await db.prepareAsync(`DELETE FROM tasks WHERE id = ?`);
      await statement.executeAsync([taskId]).then(() => {
        getAllTasks();
      });
    } catch (error) {}
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Link href={{ pathname: '/details' }} asChild>
          <Button title="Add New Task" />
        </Link>
        <View className="mt-4">
          {taskList.map((task) => (
            <View
              className="m-2 flex-row items-center justify-between rounded-md bg-white p-4"
              key={task.id}>
              <Text>{task.title}</Text>
              <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text>DELETE</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Container>
    </>
  );
}
