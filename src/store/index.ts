import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedPost, EditedProfile } from 'types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  sessionUser: string | undefined
  setSessionUser: (payload: string | undefined) => void
  authOpened: boolean
  setAuthOpened: (state: boolean) => void
  profileOpened: boolean
  setProfileOpened: (state: boolean) => void
  editedPost: EditedPost
  updateEditedPost: (payload: EditedPost) => void
  resetEditedPost: () => void
  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetEditedProfile: () => void
}
const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  sessionUser: undefined,
  setSessionUser: (payload) => set({ sessionUser: payload }),
  authOpened: false,
  setAuthOpened: (state) => set({ authOpened: state }),
  profileOpened: false,
  setProfileOpened: (state) => set({ profileOpened: state }),
  editedPost: { id: '', title: '', post_url: '', description: '' },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        id: payload.id,
        title: payload.title,
        post_url: payload.post_url,
        description: payload.description,
      },
    }),
  resetEditedPost: () => set({ editedPost: { id: '', title: '', post_url: '', description: '' } }),
  editedProfile: { username: '', avatar_url: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
      },
    }),
  resetEditedProfile: () => set({ editedProfile: { username: '', avatar_url: '' } }),
}))
export default useStore
