import { Text, View } from 'react-native'
import Header from '../../components/header'
import styles from './styles'
import { Checkbox, TextInput } from 'react-native-paper'
import IconIon from 'react-native-vector-icons/Ionicons'
import { RectButton } from 'react-native-gesture-handler'
// import { TextInput } from 'react-native-paper'
import TaskCard from '../../components/taskCard'
import { useEffect, useState } from 'react'

interface TaskCardProps {
  id: number
  title: string
  description: string
  dateForEnd: Date
  completed: boolean
  priority: boolean
  onPress: (id: number) => void
  onToggleCheck: (id: number) => void
}

export default function Home(): React.JSX.Element {
  // estado que armazena as tasks
  const [tasks, setTasks] = useState<TaskCardProps[]>([])

  // function handleToggleCheck() {
  //   console.log('toggle')
  // }

  useEffect(() => {
    setTasks([
      {
        id: 1,
        title: 'Tarefa 1',
        description: 'Descrição da tarefa 1',
        dateForEnd: new Date(),
        completed: false,
        priority: false,
        onToggleCheck: (id) => { console.log('toggle' + id) },
        onPress: (id) => { console.log('pressed' + id) }
      },
      {
        id: 2,
        title: 'Tarefa 2',
        description: 'Descrição da tarefa 2',
        dateForEnd: new Date(),
        completed: false,
        priority: true,
        onToggleCheck: (id) => { console.log('toggle' + id) },
        onPress: (id) => { console.log('pressed' + id) }
      },
      {
        id: 3,
        title: 'Tarefa 3',
        description: 'Descrição da tarefa 3',
        dateForEnd: new Date(),
        completed: false,
        priority: false,
        onToggleCheck: (id) => { console.log('toggle' + id) },
        onPress: (id) => { console.log('pressed' + id) }
      },
      {
        id: 4,
        title: 'Tarefa 4',
        description: 'Descrição da tarefa 4',
        dateForEnd: new Date(),
        completed: false,
        priority: false,
        onToggleCheck: (id) => { console.log('toggle' + id) },
        onPress: (id) => {}
      }
    ])
  }, [])

  return (
    <>
      {/* importando header */}
      <Header />

      {/* corpo da pagina */}
      <View style={styles.bodyContainer}>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Digite aqui para criar uma tarefa"
            right={<TextInput.Icon icon={'send'} />}
            // value={text}
            // onChangeText={text => setText(text)}
          />
        </View>

        {/* parte dos filtros e ordenação */}
        <View style={styles.filterContainer}>
          {/* botão de ordenação */}
          <RectButton
            style={styles.orderButton}

            // onPress={() => { console.log('Pressed') }}
          >
            <Text style={styles.orderButtonText}>Ordenando por data</Text>
            <IconIon
              style={styles.orderButtonIcon}
              name="caret-down-outline"
              size={20}
              color="#595959"
            />
          </RectButton>

          {/* botão filtro */}
          <View style={styles.filterButton}>
            <Checkbox status="checked" />
            <Text style={styles.filterButtonText}>Mostrar concluídas</Text>
          </View>
        </View>
        {/* container lista de tarefas */}
        <View style={styles.taskListContainer}>
          {tasks.map((task) => {
            return <TaskCard key={task.id} {...task} />
          })}
        </View>
      </View>
    </>
  )
}
