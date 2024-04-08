import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  bodyContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red'
    alignItems: 'center'
  },

  InputContainer: {},
  // input de texto
  textInput: {
    minWidth: '90%',
    alignSelf: 'center',
    marginTop: 10
  },

  // container que engloba os botões de ordenação e filtro
  filterContainer: {
    minWidth: '92%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
    // backgroundColor: 'red'
  },

  // botão de ordenação
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // texto do botão de ordenação
  orderButtonText: {
    // fontSize: 16,
    // regular
    fontFamily: 'Poppins_400Regular',
    color: '#595959'
  },

  // ícone do botão de ordenação
  orderButtonIcon: {
    marginLeft: 5,
    color: '#595959'
  },

  // botão de filtro
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  // texto do botão de filtro
  filterButtonText: {
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
    color: '#595959'
  },

  // container lista de tarefas
  taskListContainer: {
    width: '95%',
    height: '100%',
    paddingBottom: 20
    // backgroundColor: 'red'
  }
})

export default styles
