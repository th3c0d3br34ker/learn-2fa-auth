export default fetcher = (...args) => {
  const [url, method, body, headers] = args;

  return fetch(url, {
    method,
    body,
    headers,
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 500) {
        return response.json();
      }

      throw new Error(response.statusText);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
