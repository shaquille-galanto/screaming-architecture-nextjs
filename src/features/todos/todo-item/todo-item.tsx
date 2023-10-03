'use client'

import { Button, Input } from '@features/ui'
import clsx from 'clsx'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { ChangeEvent, useState } from 'react'
import * as yup from 'yup'
import { useTodoDispatch } from '../todo-provider'
import styles from './styles.module.scss'
import type { TodoItemProps } from './types'

const validationSchema = yup.object().shape({
  text: yup.string().required('This field is required'),
})

export const TodoItem = ({ todo, ...props }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { handleDelete, handleEdit } = useTodoDispatch()

  const { id, text, completed } = todo

  const onDelete = () => {
    handleDelete(id)
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onSave = (text: string) => () => {
    handleEdit({ ...todo, text })
    setIsEditing(false)
  }

  const onComplete = (e: ChangeEvent<HTMLInputElement>) => {
    handleEdit({ ...todo, completed: e.target.checked })
  }

  return (
    <li className={styles.item} {...props}>
      <Formik initialValues={{ text }} validationSchema={validationSchema} onSubmit={() => {}}>
        {({ isValid, values }) => (
          <Form className={styles.form}>
            <div className={styles.content}>
              <input
                type="checkbox"
                className={styles.checkbox}
                name="completed"
                checked={completed}
                onChange={onComplete}
              />
              <div>
                <Field
                  as={Input}
                  size="sm"
                  name="text"
                  className={clsx(styles.editInput, {
                    [styles.readOnly]: !isEditing,
                    [styles.completed]: completed,
                  })}
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
                onClick={isEditing ? onSave(values.text) : onEdit}
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
