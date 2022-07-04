import { Props } from "./Toast"
import Toast from "./ToastLogic"

export default (props: Props) => {
  const toaster = Toast.getToast()
  return toaster.createToast(props)
}