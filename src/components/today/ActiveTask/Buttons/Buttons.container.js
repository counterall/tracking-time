import { connect } from 'react-redux';
import {
    toggleActiveTaskStatus,
    triggerActiveTaskTimer,
    addToCompleteTaskList
} from "../../../../store/Today/Today.action";
import PlayButtons from './Buttons.component';

const mapStateToProps = state => ({
});

let timer;

const startActiveTaskTimer = (dispatch) => {
    console.log("timer is turned on!");
    timer = setInterval(() => {
        dispatch(triggerActiveTaskTimer());
    }, 1000);
}

const mapDispatchToProps = dispatch => ({
    resumeTask: () => {
        clearInterval(timer);
        dispatch(toggleActiveTaskStatus(true));
        startActiveTaskTimer(dispatch);
    },
    pauseTask: () => {
        clearInterval(timer);
        console.log("timer is turned off!");
        dispatch(toggleActiveTaskStatus(false));
    },
    finishTask: () => {
        clearInterval(timer);
        dispatch(addToCompleteTaskList());
    }
});

const ButtonsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayButtons);

export default ButtonsContainer;


