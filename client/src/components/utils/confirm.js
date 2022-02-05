import {confirmAlert} from "react-confirm-alert";
import "../../css/confirm.scss"

export const submit = (title, callback, params) => {
  const paramsFn = () => {
    if (params) {
      callback()
    } else {
      return callback(params)
    }
  }
  confirmAlert({
    title: title,
    buttons: [
      {
        label: "Да",
        onClick: paramsFn
      },
      {
        label: "Нет",
        onClick: onclose
      }
    ]
  });
};
