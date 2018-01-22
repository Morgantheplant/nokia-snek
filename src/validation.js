import {
TITLE_MAX_LENGTH,
EMAIL_MAX_LENGTH,
DESCRIPTION_MAX_LENGTH} from './constants';

export const validateTitle = title => {
  if(!title){
    return "You must have a title";
  }
  if(title.length > TITLE_MAX_LENGTH){
    return `Title must be under ${TITLE_MAX_LENGTH} characters`
  }
  return ''
}

export const validateEmail = email => {
  if(!email){
    return 'You must enter an email'
  }
  if(email.length > EMAIL_MAX_LENGTH){
    return `Email must be under ${EMAIL_MAX_LENGTH} characters`;
  }
  return ''
}

export const validateDescription = description => {
  if(description && description.length > DESCRIPTION_MAX_LENGTH){
    return `Description must be under ${DESCRIPTION_MAX_LENGTH} characters`;
  }
  return ''
}

export const validationData = ({ title, email, description }) => {
  const titleMessage = validateTitle(title);
  const emailMessage = validateEmail(email);
  const descriptionMessage = validateDescription(description)
  const hasErrors = !!(titleMessage || emailMessage || descriptionMessage);
  return {
  titleMessage,
  emailMessage, 
  descriptionMessage,
  hasErrors,
  }
}
