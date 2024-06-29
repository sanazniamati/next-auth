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
    //error={message:"Fail to Fetch..."}
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
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail to Fetch , error is : ${error}`);
    //error={message:"Fail to Fetch..."}
  }
};
export { getFetch, postFetch };
