import { Stack, Link, router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect } from 'react';
import { Container } from '@/components/Container';
import { TaskTable } from '@/types/dbType';
import { Button } from '@/components/Button';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

export default function AddTask() {
  const db = useSQLiteContext();
  const [taskList, setTaskList] = React.useState<TaskTable[]>([]);
  // const [forceUpdate, forceUpdateId] = useForceUpdate();

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
        // forceUpdate();
        const iUpdatedList = taskList.filter(i => i.id !== taskId);
        setTaskList(iUpdatedList);
      });
    } catch (error) {}
  }

  async function editTask(id : number) {
    router.push(`/details/${id}`); 
  }
  
  return (
    <>
      <Stack.Screen options={{ title: 'AddTask' }} />
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
              <TouchableOpacity onPress={() => editTask(task.id)}>
                <Text>Edit</Text>
              </TouchableOpacity>
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

// function useForceUpdate(): [() => void, number] {
//   const [value, setValue] = React.useState(0);
//   return [() => setValue(value + 1), value];
// }
