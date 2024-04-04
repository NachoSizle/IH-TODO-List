import { supabase } from '@/api/supabase'

export const fetchActualUser = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return data?.session?.user || null
}

export const createNewUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const logIn = async (email, password) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  return user
}

export const logInWithProvider = async (provider) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithOAuth({ provider })

  if (error) {
    throw new Error(error.message)
  }

  return user
}

export const logOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}
