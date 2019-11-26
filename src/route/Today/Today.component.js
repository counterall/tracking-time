import React, { Component } from 'react';
import ActiveTask from "../../components/Today/ActiveTask";
import AddNewTask from "../../components/Today/AddNewTask";
import TaskList from "../../components/Today/TaskList";
import Header from "../../components/ui/Header";
import Crud from "../../helpers/crud";
import idbCRUD from "../../helpers/idbCRUD";

class Today extends Component {
    constructor(props){
        super(props);
        // this.saveStateToLocalStorageBeforePageReload();
        this.state = {
            activeTask: {},
            activeTaskIsRunning: false,
            activeProject: {},
            taskList: []
        };

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.handleResumeClick = this.handleResumeClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);

        this.initData().then(data => {
            console.log("initial data is reseting state!");
            this.setState({
                ...data
            });
        });
    }

    async initData() {
        const data = await Promise.all([idbCRUD.getActiveTask(),idbCRUD.getActiveProject(), idbCRUD.getTaskListOfToday()]);
        console.log("initial data fetched from IDB!");

        return {
            activeTask: data[0],
            activeProject: data[1],
            taskList: data[2]
        };
    }

    handleAddTask(newTask) {
        if (Object.keys(newTask).length) {
            // if an active task still exists, first simulate the task finishing operation
            if ('id' in this.state.activeTask) {
                const activeTaskID = this.state.activeTask.id;
                idbCRUD.updateTask(activeTaskID, {duration: this.state.activeTask.duration, active: 0}).then(updated => {
                    if (updated) {
                        idbCRUD.getTaskListOfToday().then(list => {
                            this._addNewTask(newTask, list);
                        }).catch(e => {
                            console.log("Failed to fetch task list: " + e);
                        });
                    } else {
                        console.log("Failed to set active task inactive in IDB.");
                    }
                });
            } else {
                this._addNewTask(newTask);
            }
        }
    }

    handleResumeClick() {
        this.setState((state) => {
            return {activeTaskIsRunning: !state.activeTaskIsRunning}
        }, this.initialiseDisplay);
    }

    handleFinishClick() {
        clearInterval(this.timer);
        const activeTaskID = this.state.activeTask.id;
        idbCRUD.updateTask(activeTaskID, {duration: this.state.activeTask.duration, active: 0}).then(updated => {
            if (updated) {
                idbCRUD.getTaskListOfToday().then(list => {
                    this.setState({
                        taskList: list,
                        activeTask: {},
                        activeTaskIsRunning: false
                    });
                })
            } else {
                console.log("Failed to set active task inactive in IDB.");
            }
        });
    }

    handleResetClick() {
        this.setState((state)=>{
            return {activeTask: {...state.activeTask, duration: 0}}
        }, this.initialiseDisplay);
    }

    saveStateToLocalStorageBeforePageReload() {
        window.onunload = () => {
            this._saveActiveTaskDuration();
            this._saveTaskList();
        }
    }

    // if active task is still running when page is refreshed, save data of active task to localStorage
    _saveActiveTaskDuration() {
        if (this.state.activeTaskTS >= 0) {
            const oldActiveTask = Crud.getActiveTask();
            const newActiveTask = {...oldActiveTask, duration: this.state.activeTaskTS, name: this.state.activeTaskName, tag: this.state.activeTaskTag};
            Crud.setActiveTask(newActiveTask);
        }
    }

    _saveTaskList() {
        if (this.state.taskList.length) {
            Crud.updateTaskListofToday(this.state.taskList);
        }
    }

    _addNewTask(newTask, list = []) {
        clearInterval(this.timer);
        // Now create the new task
        idbCRUD.createTask({
            project_id: this.state.activeProject.id,
            tags: newTask.tags,
            name: newTask.name,
            duration: 0
        }).then((taskId) => {
            return idbCRUD.getActiveTask()
        }).then(activeTask => {
            const newState = {
                activeTask: activeTask,
                activeTaskIsRunning: false
            };
            if (list.length) {
                newState.taskList = list;
            }
            this.setState(newState);
        }).catch(e => {
            console.log("Failed to create new task: " + e);
        });
    }


    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        console.log('rendered once!');
        return <div className="today-view">
            <Header previous="/" txt="Home" />
            <ActiveTask {...this.props.activeTask} isRunning={this.props.activeTaskIsRunning} />
            {/* <AddNewTask handleAddTask={this.handleAddTask} />
            <TaskList taskList={this.state.taskList} /> */}
        </div>
    }
}

export default Today;