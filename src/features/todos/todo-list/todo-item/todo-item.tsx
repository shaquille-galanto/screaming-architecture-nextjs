'use client'

import { Button, Input } from '@features/ui'
import clsx from 'clsx'
import { ErrorMessage, Field, Form, Formik, FormikHandlers } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { useTodoDispatch } from '../../todo-context'
import styles from './styles.module.scss'
import type { TodoItemProps } from './types'

const validationSchema = yup.object().shape({
  text: yup.string().required('This field is required'),
})

export const TodoItem = ({ todo, ...props }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { handleDelete, handleEdit } = useTodoDispatch()

  const { id, text } = todo

  const onDelete = () => {
    handleDelete(id)
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onSave = (handleSubmit: FormikHandlers['handleSubmit']) => () => {
    handleEdit({ ...todo, text })
    setIsEditing(false)
    handleSubmit()
  }

  return (
    <li className={styles.item} {...props}>
      <Formik initialValues={{ text }} validationSchema={validationSchema} onSubmit={() => {}}>
        {({ isValid, handleSubmit }) => (
          <Form className={styles.form}>
            <div className={styles.content}>
              <input type="checkbox" />
              <div>
                <Field
                  as={Input}
                  size="sm"
                  name="text"
                  className={clsx(styles.editInput, { [styles.readOnly]: !isEditing })}
                  readOnly={!isEditing}
                />
                <p className={styles.errorMessage}>
                  <ErrorMessage name="text" />
                </p>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                type={isEditing ? 'submit' : 'button'}
                size="sm"
                onClick={isEditing ? onSave(handleSubmit) : onEdit}
                disabled={isEditing && !isValid}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
              <Button variant="secondary" size="sm" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </li>
  )
}
