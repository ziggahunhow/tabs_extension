export const backendPostFn = async (
  data,
  path,
  method = 'post',
  token = ''
) => {
  let headers = { 'Content-Type': 'application/json' };
  if (token.length > 0) headers = { ...headers, 'x-token': token };
  let url = `${process.env.REACT_APP_BACKEND_URL}/${path}`;
  const body = JSON.stringify(data);
  const result = await fetch(url, {
    method: method,
    headers,
    body
  })
    .then(res => res.json())
    .catch(error => {
      console.log('error', error);
      throw new Error(error);
    });
  return result;
};

export const handleChange = (event, callback, input) => {
  const { value, name } = event.target;
  callback({
    ...input,
    [name]: value
  });
};
