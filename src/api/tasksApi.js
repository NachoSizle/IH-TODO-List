import { supabase } from '@/api/supabase'

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

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}
