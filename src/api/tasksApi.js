import { supabase } from '@/api/supabase'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}


export const createNewTask = async (task) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...task })
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data[0]
}

export const removeTaskById = async (taskId) => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId)

  if (error) {
    throw new Error(error.message)
  }
}

export const updateTaskById = async (taskId, task) => {
  const { error } = await supabase
    .from('tasks')
    .update({ ...task })
    .eq('id', taskId)

  if (error) {
    throw new Error(error.message)
  }
}
