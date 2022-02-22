const doFetch = async (url, options = {}) => {
  try {
    // eslint-disable-next-line
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
          ? `${json.message}: ${json.error}`
          : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default doFetch;