import { Keyboard, Modal, Text, View, type TextInput as TextInputProp } from 'react-native'
// import Modal from 'react-native-modal'
import styles from './styles'
import { Button, Checkbox, TextInput } from 'react-native-paper'
import { useEffect, useRef, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface TaskProps {
  id: number
  title: string
  description: string
  dateForEnd: Date
  completed: boolean
  priority: boolean
}

interface NewTaskModalProps {
  newTaskModaIsOpen: boolean
  taskTitle: string
  onClose: () => void
  onCreated: (task: TaskProps) => void
}

export default function NewTaskModal({ newTaskModaIsOpen, onClose, onCreated, taskTitle }: NewTaskModalProps): React.JSX.Element {
  // estado do modal de datetime
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false)

  // estados para armazenar erro e valor de cada um dos inputs
  const [title, setTitle] = useState<{ value: string, error: string }>({ value: '', error: '' })
  const [description, setDescription] = useState<{ value: string, error: string }>({ value: '', error: '' })
  const [dateForEnd, setDateForEnd] = useState<{ value: string, error: string }>({ value: '', error: '' })
  const [priority, setPriority] = useState<boolean>(false)

  // referencia para o input de descrição para focar quando pressionar enter e caso o titulo esteja preenchido foca assim que o modal abre
  const descInputRef = useRef<TextInputProp>(null)

  // função para alterar o foco do input
  function changeFocus(): void {
    // verifica se o titulo está preenchido e se o input de descrição não está focado
    if (title.value !== '' && descInputRef.current !== null && !descInputRef.current.isFocused()) {
      descInputRef.current.focus()
    }
    // se o titulo e a descrição estiverem preenchidos, exibe o datetimepicker
    if (description.value !== '' && title.value !== '') {
      setDatePickerVisibility(true)
    }
  }

  // função para criar uma nova tarefa
  async function handleCreate(): Promise<void> {
    // validando se os campos estão preenchidos
    if (title.value === '') {
      setTitle({ ...title, error: 'Campo obrigatório' })
      return
    }
    if (description.value === '') {
      setDescription({ ...description, error: 'Campo obrigatório' })
      return
    }
    if (dateForEnd.value === '') {
      setDateForEnd({ ...dateForEnd, error: 'Campo obrigatório' })
    }

    // busca as tasks atuais de storage
    const tasksSaved = await AsyncStorage.getItem('mtasks:tasks')

    // verifica se já existe tasks
    if (tasksSaved !== null) {
      // se existir, converte para array
      const tasksArray = JSON.parse(tasksSaved)
      // cria a nova task
      const newTask: TaskProps = {
        id: tasksArray.length + 1,
        title: title.value,
        description: description.value,
        dateForEnd: moment(dateForEnd.value, 'DD/MM/YYYY HH:mm').toDate(),
        completed: false,
        priority
      }

      // adiciona a nova task
      tasksArray.push(newTask)
      // atualiza o storage com a nova task
      await AsyncStorage.setItem('mtasks:tasks', JSON.stringify(tasksArray))
      // executa função de oncreate retornando a nova task
      onCreated(newTask)
    } else {
      // se não existir tasks, cria um novo array com a task
      // cria a nova task
      const newTask: TaskProps = {
        id: 1,
        title: title.value,
        description: description.value,
        dateForEnd: moment(dateForEnd.value, 'DD/MM/YYYY HH:mm').toDate(),
        completed: false,
        priority
      }

      await AsyncStorage.setItem('mtasks:tasks', JSON.stringify([newTask]))

      // executa função de oncreate retornando a nova task
      onCreated(newTask)
    }
  }

  // função para cancelar a criação de uma nova tarefa
  function handleCancel(): void {
    onClose()
  }
  // função para abrir o datetimepicker
  function showDatePicker(): void {
    setDatePickerVisibility(true)
  }

  // função de confirm para o datetimepicker
  function handleConfirmDatePicker(date: Date): void {
    setDateForEnd({ value: moment(date).format('DD/MM/YYYY HH:mm'), error: '' })
    setDatePickerVisibility(false)
  }

  // função de cancelar para o datetimepicker
  function handleCancelDatePicker(): void {
    setDatePickerVisibility(false)
    Keyboard.dismiss()
  }

  useEffect(() => {
    if (newTaskModaIsOpen) {
      setTitle({ value: taskTitle, error: '' })
      setDescription({ value: '', error: '' })
      setDateForEnd({ value: '', error: '' })
      setPriority(false)
      changeFocus()
    } else {
      setTitle({ value: '', error: '' })
      setDescription({ value: '', error: '' })
      setDateForEnd({ value: '', error: '' })
      setPriority(false)
    }
  }, [newTaskModaIsOpen])

  return (
  // <>
            <Modal
                animationType="slide"
                transparent={true}
                style={styles.modalBody}
                visible={newTaskModaIsOpen}
                onRequestClose={() => {
                  onClose()
                }}
                onDismiss={() => {
                  onClose()
                }}
            >
                {/* view usada apenas para escurecer o background e dar funcionalidade de fechar */}
                <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  height: '50%'
                }}
                 onTouchEnd={() => { onClose() }}
                />
                <View style={styles.modalBody}>
                <Text style={styles.textTitle}>Criando nova tarefa</Text>
                    <TextInput
                        defaultValue={taskTitle}
                        style={styles.inputTitle}
                        label="Titulo da tarefa*"
                        mode='outlined'
                        maxLength={40}
                        value={title.value}
                        // keyboardType='default'
                        enterKeyHint='next'
                        onSubmitEditing={() => { changeFocus() }}
                        onChangeText={(v) => {
                          setTitle({ error: '', value: v })
                        }}
                        error={title.error !== ''}
                    />

                    <TextInput
                        style={styles.inputDesc}
                        label="Descrição da tarefa*"
                        mode='outlined'
                        maxLength={200}
                        ref={descInputRef}
                        value={description.value}
                        enterKeyHint='next'
                        onSubmitEditing={() => { changeFocus() }}
                        onChangeText={(v) => {
                          setDescription({ error: '', value: v })
                        }}
                        error={description.error !== ''}
                    />

                    <View
                        onTouchStart={showDatePicker}
                        style={{ zIndex: 999, width: '100%' }}

                    >
                        <TextInput
                            // disabled
                            // onTouchStart={showDatePicker}
                            value={dateForEnd.value}
                            style={styles.inputDate}
                            label="Data de entrega*"
                            mode='outlined'
                            keyboardType='numeric'
                            onChangeText={() => { }}
                            onFocus={() => { showDatePicker() }}
                            error={dateForEnd.error !== ''}
                        />
                        {/* <Text>sdasd</Text> */}
                    </View>
                   <DateTimePickerModal
                        // value={'2021-09-01 00:00:00'}
                        onCancel={handleCancelDatePicker}
                        onConfirm={handleConfirmDatePicker}
                        isVisible={isDatePickerVisible}
                        mode='datetime'
                    />
                    <View style={styles.priorityCheck} onTouchEnd={() => { setPriority(!priority) }}>
                        <Checkbox status={priority ? 'checked' : 'unchecked'} />
                        <Text style={styles.priorityCheckText}>Prioridade</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button mode='contained'
                        style={styles.saveButton}

                         onPress={() => { void handleCreate() }}>
                            Criar tarefa
                        </Button>

                        <Button mode='outlined'
                        style={styles.cancelButton}
                         onPress={() => { handleCancel() }}>
                            Cancelar
                        </Button>
                    </View>
                </View>
            </Modal>
  // </>
  )
}
