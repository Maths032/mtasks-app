import { Text, View } from 'react-native'
import Header from '../../components/header'
import styles from './styles'
import { TextInput } from 'react-native-paper'

export default function Home () {
  return (
    <View style={{ flex: 1 }}>
      {/* importando header */}
      <Header />

      {/* corpo da pagina */}
      <View>
        <Text>teste</Text>
        <Text>teste</Text>
        <Text>teste</Text>

        <Text>teste</Text>
        <Text>teste</Text>
      </View>
    </View>
  )
}
