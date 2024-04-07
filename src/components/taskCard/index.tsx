import { Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import styles from './styles'
import moment from 'moment'
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

export default function TaskCard({
  id,
  title,
  description,
  dateForEnd,
  completed,
  priority,
  onToggleCheck,
  onPress
}: TaskCardProps): React.JSX.Element {
  return (
    <View
      key={id}
      style={[
        styles.taskContainer,
        { backgroundColor: priority ? '#f8d7da' : '#fff' }
      ]}
    >
      {/* container com checkbox */}
      <View style={styles.taskContainerSectionOne}

        // onTouchStart={onToggleCheck}
      >
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          onPress={() => {
            onToggleCheck(id)
          }}
        />
      </View>
      {/* container com titulo e desc */}
      <View style={styles.taskContainerSectionTwo} onTouchEnd={() => {
        onPress(id)
      }}>
        <Text numberOfLines={1} style={styles.taskTitleText}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.taskDescText}>
          {description}
        </Text>
        <Text style={styles.taskCreatedDateText}>
          {moment(dateForEnd).format('[até] DD/MM [as] HH:mm')}
        </Text>
      </View>
    </View>
  )
}
