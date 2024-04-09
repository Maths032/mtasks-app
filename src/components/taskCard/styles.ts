import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  // container de cada tarefa
  taskContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 2,
    marginTop: 10,
    borderRadius: 10,
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 7
    },
    shadowOpacity: 0.29,
    shadowRadius: 10,
    elevation: 9
  },

  // seção 1 do container de tarefa (checkbox)
  taskContainerSectionOne: {
    // flex: 1,
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: 'red'
  },

  // seção 2 do container de tarefa (titulo e descrição)
  taskContainerSectionTwo: {
    // flex: 2,
    width: '85%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
    // backgroundColor: 'blue'
  },

  // texto da tarefa
  taskTitleText: {
    // alinha ao centro descontando 15% da largura do checkbox
    marginLeft: '-15%',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    // impede quebra de linha sem whitespace
    flexWrap: 'nowrap',
    maxHeight: 40
  },

  // texto da descrição da tarefa
  taskDescText: {
    marginLeft: '-15%',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#595959'
  },

  // seção 3 do container de tarefa (data de criação)
  taskCreatedDateText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginLeft: 'auto',
    color: '#595959'
  }
})

export default styles
