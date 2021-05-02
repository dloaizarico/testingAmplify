import Model from "./model"

type Paginate<T> = {
  data: T,
  count: number
}

export type PaginationData<T> = {
  skip?: number,
  limit?: number,
  sort?: string,
  order?: string,
  filter?: Model<T>
}

export type FilterObj = { [item: string]: string }

export default Paginate