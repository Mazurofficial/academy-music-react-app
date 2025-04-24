import type React from "react"
import { useEffect } from "react"
import styles from "./Modal.module.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectIsModalVisible } from "../../../features/modalWindow/modalWindowSelector"
import { closeModal } from "../../../features/modalWindow/modalWindowSlice"

type ModalProps = {
  children?: React.ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  const isVisible = useAppSelector(selectIsModalVisible)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  return (
    <div
      className={isVisible ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => dispatch(closeModal())}
    >
      <div
        className={
          isVisible
            ? `${styles.modal_window} ${styles.active}`
            : styles.modal_window
        }
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <span
          className={styles.modal_close}
          onClick={() => dispatch(closeModal())}
        >
          <i className="fa fa-times"></i>
        </span>
        {children}
      </div>
    </div>
  )
}
