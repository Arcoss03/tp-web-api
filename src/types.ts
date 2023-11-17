import e from "express"

type User = {
  id: number,
  email: string,
  password: string,
  role: boolean
}

type Course = {
  id: number,
  title: string,
  date: Date,
}


export { User, Course }