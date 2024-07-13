/** @format */

const baseUrl = "https://api.mv-team.ir/api";
const getFetch = async (url: string, headers: {} = {}) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail to Fetch , error is : ${error}`);
  }
};

const postFetch = async (url: string, body: {} = {}, headers: {} = {}) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      cache: "no-store",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    // throw new Error(`Failed to fetch data from ${baseUrl}${url}, error: ${error.message}`);
    throw new Error(`Failed to fetch data from ${baseUrl}${url}`);
  }
};
export { getFetch, postFetch };
