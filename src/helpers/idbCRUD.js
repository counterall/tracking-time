import Dexie from "dexie";

const idb = new Dexie("TasksDB");

function idbCRUD() {

    const idbSchema = {
        tasks: "++id, project_id, date, *tags, active",
        projects: "++id, &name, active"
    };

    const init = (reset = false) => {
        if (reset) {
            return idb.delete().then(()=>{
                idb.version(1).stores(idbSchema);
                return idb.open();
            });
        } else {
            return Promise.resolve(idb.version(1).stores(idbSchema));
        }
    };

    const createTask = taskObj => idb.tasks.add({...taskObj, date: getTodayTag()});

    const updateTask = (id, updateObj) => idb.tasks.update(id, updateObj);

    const setActiveTask = activeTask => idb.tasks.put({...activeTask, active: 1, date: getTodayTag()});

    const getActiveTask = async () => await idb.tasks.where({active: 1}).first();

    const getActiveProject = async () => await idb.projects.where({active: 1}).first();

    const getTaskListOfToday = () => {
        const today = getTodayTag();
        const activeProject = getActiveProject();
        const projectId = typeof activeProject !== "undefined" ? activeProject.id : 1;
        return idb.tasks.where({date: today, project_id: projectId}).toArray();
    };

    const createProject = projectName => {
        idb.projects.where({name: projectName}).count().then(c => {
            c === 0 ? idb.projects.add({name: projectName}) : console.log(`Project '${projectName}' already exists`);
        }).catch((e) => {
            console.log("Failed to create new project: " + e);
        });
    }

    const getTodayTag = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${year}-${month}-${day}`;
    };

    return {
        init: init,
        createTask: createTask,
        updateTask: updateTask,
        setActiveTask: setActiveTask,
        getActiveTask: getActiveTask,
        getTaskListOfToday: getTaskListOfToday,
        createProject: createProject,
        getActiveProject: getActiveProject
    }

}

export default idbCRUD();