import api from '../api/api'

/*
* recebe uma url base (endpoint) e retorna um conjunto de funções para realizar operações na API
*/
export default function useApi(url: string) {

  // GET
  const getAll = async () => {
    const { data } = await api.get(url)
    return data
  }

  // GET by ID
  const getById = async (id?: string) => {
    if (id) {
      const response = await api.get(`${url}/${id}`)
      return response.data
    }
    const response = await api.get(`${url}`)
    return response.data
  }

  // POST
  const post = async <T = Record<string, any>>(form: T) => {
    const { data } = await api.post(url, form)
    return data
  }

  // PUT
  const update = async <T = Record<string, any>>(form: { id: T }) => {
    const { data } = await api.put(`${url}/${form?.id ? form.id : ''}`, form)
    console.log(data)
    return data
  }

  // DELETE
  const remove = async (id: string) => {
    const { data } = await api.delete(`${url}/${id}`)
    return data
  }

  return {
    getAll,
    getById,
    post,
    update,
    remove,
  }
}
