'use client'

import { Button, Input } from '@features/ui'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { useTodoDispatch } from '../todo-context'
import styles from './styles.module.scss'
import type { AddTodoFormProps } from './types'

const formInitialValues = {
  text: '',
}

const validationSchema = yup.object().shape({
  text: yup.string().required('This field is required'),
})

export const AddTodoForm = ({ ...props }: AddTodoFormProps) => {
  const { handleAdd } = useTodoDispatch()

  const handleSubmit = (
    { text }: typeof formInitialValues,
    { resetForm }: FormikHelpers<typeof formInitialValues>,
  ) => {
    handleAdd(text)
    resetForm()
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <Form className={styles.form} {...props}>
          <div className={styles.fieldWrapper}>
            <Field as={Input} name="text" placeholder="Add todo" />
            <p className={styles.errorMessage}>
              <ErrorMessage name="text" />
            </p>
          </div>
          <Button type="submit" disabled={!isValid}>
            Add
          </Button>
        </Form>
      )}
    </Formik>
  )
}
