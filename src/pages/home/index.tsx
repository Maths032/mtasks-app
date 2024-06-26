import { Text, View } from 'react-native'
import Header from '../../components/header'
import styles from './styles'
import { Checkbox, TextInput } from 'react-native-paper'
import IconIon from 'react-native-vector-icons/Ionicons'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
// import { TextInput } from 'react-native-paper'
import TaskCard from '../../components/taskCard'
import { useEffect, useState } from 'react'
import NewTaskModal from '../../components/newTaskModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import EditTaskModal from '../../components/editTaksModal'

interface TaskProps {
  id: number
  title: string
  description: string
  dateForEnd: Date
  completed: boolean
  priority: boolean
  createdAt: Date
}

interface OrderProps {
  type: 'date' | 'priority' | 'finished'
  order: 'asc' | 'desc'
}

export default function Home(): React.JSX.Element {
  // estado que armazena as tasks
  const [tasks, setTasks] = useState<TaskProps[]>([])
  // estado que armazena a ordem
  const [order, setOrder] = useState<OrderProps>({
    type: 'date',
    order: 'asc'
  })
  // estado p armazenar o filtro por completed
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  // estado para abrir e fechar o modal de nova tarefa
  const [newTaskModaIsOpen, setNewTaskModalIsOpen] = useState<boolean>(false)
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

  // estados para abrir e fechar o modal de edição e exclusao
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<TaskProps | null>(null)

  async function handleToggleCheck(idTask: number): Promise<void> {
    // cria uma nova lista de tasks (conceito de imutabilidade)
    const newTasks = tasks.map((task) => {
      // verifica se a task atual é a task que foi clicada
      if (task.id === idTask) {
        // retorna a task com o completed invertido
        return {
          ...task,
          completed: !task.completed
        }
      }
      // retorna a task sem alterações
      return task
    })
    // atualiza o estado de tasks com a nova lista
    setTasks(newTasks)

    // atualiza o estado do async storage
    await AsyncStorage.setItem('mtasks:tasks', JSON.stringify(newTasks))
  }

  // muda a ordenação das tasks entre data e prioridade maior e menor
  function toggleOrder(): void {
    // verifica se a ordenação atual é por data e se é ascendente
    const newOrder: OrderProps = {
      type: 'date',
      order: 'asc'
    }
    // se for date asc, muda para date desc
    if (order.type === 'date' && order.order === 'asc') {
      newOrder.type = 'date'
      newOrder.order = 'desc'
    }
    // se for date desc, muda para priority asc
    if (order.type === 'date' && order.order === 'desc') {
      newOrder.type = 'priority'
      newOrder.order = 'asc'
    }
    // se for priority asc, muda para priority desc
    if (order.type === 'priority' && order.order === 'asc') {
      newOrder.type = 'priority'
      newOrder.order = 'desc'
    }
    // se for priority desc, muda para date asc
    if (order.type === 'priority' && order.order === 'desc') {
      newOrder.type = 'date'
      newOrder.order = 'asc'
    }

    setOrder(newOrder)
    orderTasks(newOrder)
  }

  // de fato realiza a ordenação das tasks
  function orderTasks(parsedOrder: OrderProps): void {
    // cria uma nova lista de tasks com a ordenação atual
    const newTasks = tasks.sort((a, b) => {
      // verifica se a ordenação é por data
      if (parsedOrder.type === 'date') {
        // verifica se a ordenação é ascendente
        if (parsedOrder.order === 'asc') {
          // retorna a diferença entre as datas, para ordenar de forma ascendente
          return (
            moment(a.createdAt).toDate().getTime() -
            moment(b?.createdAt).toDate().getTime()
          )
        } else {
          // retorna a diferença entre as datas
          return (
            moment(b.createdAt).toDate().getTime() -
            moment(a.createdAt).toDate().getTime()
          )
        }
      }
      if (parsedOrder.type === 'priority') {
        // verifica se a ordenação é ascendente
        if (parsedOrder.order === 'asc') {
          // retorna a diferença entre as prioridades
          return Number(a.priority) - Number(b.priority)
        } else {
          // retorna a diferença entre as prioridades
          return Number(b.priority) - Number(a.priority)
        }
      }

      // retorna 0 se as tarefas forem iguais
      return 0
    })

    // atualiza o estado de tasks com a nova lista
    setTasks(newTasks)
  }

  // função que faz o refresh das tasks
  function refreshTasks(): void {
    // busca as tasks atuais de storage
    AsyncStorage.getItem('mtasks:tasks')
      .then((tasksSaved) => {
        // verifica se já existe tasks
        if (tasksSaved !== null) {
          // se existir, converte para array
          const tasksArray = JSON.parse(tasksSaved)
          // atualiza o estado de tasks com as tasks do storage
          setTasks([...tasksArray])
        }
      })
      .catch((error) => {
        console.error('error', error)
      })
  }

  // função que é chamada quando a página é carregada
  useEffect(() => {
    // // busca as tasks atuais de storage

    refreshTasks()
    orderTasks(order)
  }, [])

  // função que é chamada toda vez que o estado de order é alterado
  useEffect(() => {
    // ordena as tasks

    orderTasks(order)
  }, [order])

  return (
    <ScrollView>
      {/* modal de nova tarefa */}
      <NewTaskModal
        newTaskModaIsOpen={newTaskModaIsOpen}
        onClose={() => {
          setNewTaskModalIsOpen(!newTaskModaIsOpen)
          setNewTaskTitle('')
        }}
        onCreated={(task) => {
          setTasks([...tasks, task])
          setNewTaskModalIsOpen(false)
          setNewTaskTitle('')
        }}
        taskTitle={newTaskTitle}
      />

      <EditTaskModal
        task={taskToEdit ?? null}
        editTaskModalIsOpen={editTaskModalIsOpen}
        onClose={() => {
          setEditTaskModalIsOpen(!editTaskModalIsOpen)
          setTaskToEdit(null)
        }}
        onUpdateOrDelete={() => {
          refreshTasks()
          // setTasks(newTasks)
          setEditTaskModalIsOpen(false)
          setTaskToEdit(null)
        }}
      />
      {/* importando header */}
      <Header />

      {/* corpo da pagina */}
      <View style={styles.bodyContainer}>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Digite aqui para criar uma tarefa"
            right={
              <TextInput.Icon
                icon={'send'}
                onPress={() => {
                  setNewTaskModalIsOpen(true)
                }}
              />
            }
            value={newTaskTitle}
            onChangeText={(text) => {
              setNewTaskTitle(text)
            }}
            enterKeyHint="send"
            onSubmitEditing={() => {
              setNewTaskModalIsOpen(true)
            }}
          />
        </View>

        {/* parte dos filtros e ordenação */}
        <View style={styles.filterContainer}>
          {/* botão de ordenação */}
          <RectButton
            style={styles.orderButton}
            onPress={() => {
              toggleOrder()
            }}
          >
            <Text style={styles.orderButtonText}>
              Ordenando por
              {order.type === 'date' ? ' data' : ' prioridade'}
            </Text>
            <IconIon
              style={styles.orderButtonIcon}
              name={
                order.order === 'asc'
                  ? 'caret-up-outline'
                  : 'caret-down-outline'
              }
              size={20}
              color="#595959"
            />
          </RectButton>

          {/* botão filtro */}
          <View
            style={styles.filterButton}
            onTouchEnd={() => {
              setShowCompleted(!showCompleted)
            }}
          >
            <Checkbox status={showCompleted ? 'unchecked' : 'checked'} />
            <Text style={styles.filterButtonText}>Mostrar concluídas</Text>
          </View>
        </View>
        {/* container lista de tarefas */}
        <View style={styles.taskListContainer}>
          {tasks?.map((task) => {
            // faz o filtro de tarefas concluídas
            if (showCompleted && task.completed) {
              return null
            }
            return (
              <TaskCard
                key={task.id}
                {...task}
                onToggleCheck={() => {
                  void handleToggleCheck(task.id)
                }}
                onPress={() => {
                  setTaskToEdit(task)
                  setEditTaskModalIsOpen(true)
                }}
              />
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}
