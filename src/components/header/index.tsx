import { Text, View } from 'react-native'
import styles from './styles'

export default function Header(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>mTasks App</Text>
    </View>
  )
}
