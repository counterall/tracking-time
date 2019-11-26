import { connect } from 'react-redux';
import {
    addActiveTask,
    toggleActiveTaskStatus,
    addToCompleteTaskList,
    removeFromTaskList
} from '../../store/Today';
import Today from './Today.component';

const mapStateToProps = state => ({
    activeTask: state.activeTask,
    activeTaskIsRunning: state.activeTaskIsRunning
});

const mapDispatchToProps = dispatch => ({

});

const TodayContainer = connect(mapStateToProps, mapDispatchToProps)(Today);

export default TodayContainer;