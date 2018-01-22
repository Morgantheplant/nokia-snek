import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";
import {
TITLE_MAX_LENGTH,
EMAIL_MAX_LENGTH,
FETCHING_STATUSES,
DESCRIPTION_MAX_LENGTH} from './constants';
import {
  changeEmail,
  changeTitle,
  changeDescription,
  sendData
} from './actions';

const Email = props => (
  <div>
    Enter email 
    <input type="text" value={props.value} onChange={props.onChange} />
    <small>{`max ${EMAIL_MAX_LENGTH}`}</small>
    {props.message}
  </div>
);

const Title = props => (
  <div>
    Enter title 
    <input type="text" value={props.value} onChange={props.onChange} />
    <small>{`max ${TITLE_MAX_LENGTH}`}</small>
     {props.message}
  </div>
);

const Description = props => (
  <div>
    Enter descrition 
    <input type="text" value={props.value} onChange={props.onChange} />
    <small>{`max ${DESCRIPTION_MAX_LENGTH}`}</small>
     {props.message}
  </div>
);

const App = props => (
  <div>
    <h2>my validation</h2>
    <Email value={props.email} onChange={props.changeEmail} message={props.validationMessages.emailMessage} />
    <Title value={props.title} onChange={props.changeTitle} message={props.validationMessages.titleMessage}/>
    <Description value={props.description} onChange={props.changeDescription} message={props.validationMessages.descriptionMessage} />
    <button onClick={props.sendData} >send data</button> 
    {props.savingState === FETCHING_STATUSES.SAVING && <strong> saving... </strong>}
  </div>
);

const mapStateToProps = ({ title, email, description, validationMessages, savingState }) => {
  return {
  title,
  email,
  description,
  validationMessages,
  savingState
}
};

const mapDispatchToProps = {
  changeEmail,
  changeTitle,
  sendData,
  changeDescription
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
