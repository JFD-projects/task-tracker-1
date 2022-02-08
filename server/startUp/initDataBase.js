const List = require('../models/List')
const Task = require('../models/Task')
const listMock = require('../mock/list.json')
const taskMock = require('../mock/tasks.json')

module.exports = async () => {
    const lists = await List.find()
    if (lists.length !== listMock.length) {
        await createInitialEntity(List, listMock)
    }
    const tasks = await Task.find()
    if (tasks.length !== taskMock.length) {
        await createInitialEntity(Task, taskMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async (item) => {
            try {
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}
