import httpService from "./http.service";

const urlTasksEndpoint = `tasks/`

export const tasksService = {
  async getTasks() {
    const {data} = await httpService.get(urlTasksEndpoint)
    return data
  },
  async addTask(objTask) {
    const {data} = await httpService.post(urlTasksEndpoint, objTask)
    return data
  },
  async editTask(taskId, obj) {
    const {data} = await httpService.patch(urlTasksEndpoint + taskId, obj)
    return data
  },
  async removeTask(taskId) {
      return await httpService.delete(urlTasksEndpoint + taskId)
  },
}
