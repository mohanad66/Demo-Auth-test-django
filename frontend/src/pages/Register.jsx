import React from 'react'
import Form from '../componenets/Form'

export default function Register() {
  return (
    <>
        <Form route="/api/user/register/" method="register" />
    </>
  )
}
