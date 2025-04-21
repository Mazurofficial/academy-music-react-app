import type { Axios } from "axios"
import type * as API from "../api/api"

export type ExtraType = {
  client: Axios
  api: typeof API
}
