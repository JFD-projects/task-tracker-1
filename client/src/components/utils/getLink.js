export const getLink = (id) => {
  if (id === 'all_tasks') {
    return '/'
  }
  if (id === 'statistics') {
    return '/statistics'
  }
  if (id === 'task') {
    return '/task'
  }
  else return`/lists/${id}`
}
