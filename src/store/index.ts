import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedPost, EditedProfile } from 'types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
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
  editedProfile: { username: '', favorites: '', avatar_url: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
      },
    }),
  resetEditedProfile: () => set({ editedProfile: { username: '', avatar_url: '' } }),
  editedNotice: { id: '', content: '' },
}))
export default useStore
