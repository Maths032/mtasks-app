import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  modalBody: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 'auto',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 520
  },

  // texto do titulo

  textTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    marginBottom: 5
  },

  // input de titulo
  inputTitle: {
    width: '100%',
    marginBottom: 10
  },

  // input de descrição
  inputDesc: {
    width: '100%',
    marginBottom: 10
  },

  // input de data
  inputDate: {
    width: '100%',
    marginBottom: 10
    // zIndex: -999
  },

  // botão de filtro
  priorityCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  // texto do botão de filtro
  priorityCheckText: {
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
    color: '#595959'
  },

  // container com botão de criar tarefa e descartar
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto'
  },

  // botão de salvar
  saveButton: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#110982',
    borderRadius: 5,
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#fff',
    height: 60,
    justifyContent: 'center'
  },

  // botão de salvar
  cancelButton: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontFamily: 'Poppins_500Medium',
    color: '#110982',
    height: 60,
    justifyContent: 'center'

  }
})

export default styles
