import request from './request'

export const fetchTaskByNone = async () => {
  return await request.Pget('/job/getalljobtasks')
}

export const addTaskByConfig = async ({
  beanClass,
  createTime,
  createUser,
  cronExpression,
  jobDescription,
  jobGroup,
  jobName,
  jobStatus,
  updateTime,
  updateUser,
}) => {
  return await request.post('/job/insertjobtask', {
    data: {
      beanClass,
      createTime,
      createUser,
      cronExpression,
      jobDescription,
      jobGroup,
      jobName,
      jobStatus,
      updateTime,
      updateUser,
    },
  })
}

export const editTaskByConfig = async ({
  id,
  beanClass,
  createTime,
  createUser,
  cronExpression,
  jobDescription,
  jobGroup,
  jobName,
  jobStatus,
  updateTime,
  updateUser,
}) => {
  return await request.put('/job/updatejobtask', {
    data: {
      id,
      beanClass,
      createTime,
      createUser,
      cronExpression,
      jobDescription,
      jobGroup,
      jobName,
      jobStatus,
      updateTime,
      updateUser,
    },
  })
}

export const editTaskCronById = async ({ jobId, cronExpression }) => {
  return await request.put('/job/updatecron', {
    params: {
      jobId,
      cronExpression,
    },
  })
}

export const editTaskStatusById = async ({ id, jobStatus }) => {
  return await request.put('/job/changejobstatus', {
    params: {
      id,
      jobStatus,
    },
  })
}

export const deleteTaskById = async ({ id }) => {
  return await request.delete('/job/deletejobtask', {
    params: {
      id,
    },
  })
}
