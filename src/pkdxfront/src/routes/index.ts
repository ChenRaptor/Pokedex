function fetchApi(method: string, link: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_ADRESS}/${link}`, {
    method
  })
}

export { fetchApi }