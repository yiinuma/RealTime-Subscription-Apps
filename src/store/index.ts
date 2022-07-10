import create from 'zustand'
import { Session } from '@supabase/supabase-js'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  opened: boolean
  setOpened: (state: boolean) => void
}
const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  opened: false,
  setOpened: (state) => set({ opened: state }),
}))
export default useStore
