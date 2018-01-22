import {UPDATE_TITLE,
UPDATE_DESCRIPTION,
UPDATE_EMAIL,
SAVE_SUCCESS,
SAVE_DATA,
VALIDATE} from './constants';

export const changeEmail = ({target}) => ({
  type: UPDATE_EMAIL,
  email: target.value
})

export const changeTitle = ({target}) => ({
  type: UPDATE_TITLE,
  title: target.value
})

export const changeDescription = ({target}) => ({
  type: UPDATE_DESCRIPTION,
  description: target.value
});

const validate = () => ({
  type: VALIDATE
});


const saveSuccess = () => ({
  type: SAVE_SUCCESS
});

const saveData = () => ({
  type: SAVE_DATA
});

export const sendData = () =>  (dispatch, getState)=> {
  dispatch(validate())
  if(getState().hasErrors) {
    return 
  }

    dispatch(saveData())
    setTimeout(()=>{
      console.log('saving --->>>>>')
      dispatch(saveSuccess())
    }, 1000)
}