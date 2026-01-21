import { Store } from '@tanstack/store'

export type UserDoc = {
  uid: string
  given_name: string
  family_name: string
  picture: string
  email: string
  displayName?: string
}

type UserState = {
  user: UserDoc | null
  loading: boolean
}

export const userStore = new Store<UserState>({
  user: null,
  loading: true,
})
