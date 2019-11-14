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
                return idb.open().then(()=>{
                    idb.tasks.add({project_id: 1, date: "2019-11-12", tags: ['YA', 'NBA'], name: "VJ-1012: Warehouse Inventory Check", duration: 11333, active: 1});
                });
            });
        } else {
            return Promise.resolve(idb.version(1).stores(idbSchema));
        }
    };

    const createTask = taskObj => idb.tasks.add({...taskObj, date: getTodayTag()});

    const updateTask = (id, updateObj) => idb.tasks.update(id, updateObj);

    const setActiveTask = activeTask => idb.tasks.put({...activeTask, active: 1, date: getTodayTag()});

    const getActiveTask = async () => await idb.tasks.where({active: 1}).first() || {};

    const getActiveProject = async () => await idb.projects.where({active: 1}).first() || {};

    const getTaskListOfToday = async () => {
        const activeProject = await getActiveProject();
        const today = getTodayTag();
        return activeProject.id ? await idb.tasks.where({date: today, project_id: activeProject.id}).toArray() : [];
    };

    const createProject = projectName => {
        return idb.projects.where({name: projectName}).count().then(c => {
            if(c === 0) {
                return idb.projects.add({name: projectName, active: 1});
            } else {
                console.log(`Project '${projectName}' already exists`);
                return getActiveProject().then(activeProject => Promise.resolve(activeProject.id));
            }
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