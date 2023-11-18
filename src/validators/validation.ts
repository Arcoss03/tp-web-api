import { object, string, array, number, date } from 'yup';

const courseSchema = object().shape({
  title: string().required('The title is required.'),
  userIds: array().of(number().integer()).required('User IDs are required.'),
  date: date().required('The date is required.')
});

const UserSchema = object().shape({
    email: string().email('The email is not valid.').required('The email is required.'),
    password: string().min(8, 'The password must be at least 8 characters long.').required('The password is required.'),
});

const students_coursesSchema = (courseId: number) => object().shape({
    userId: number().integer().required('The user ID is required.'),
    courseId: number().integer().required('The course ID is required.'),
    });


export { courseSchema , UserSchema, students_coursesSchema};