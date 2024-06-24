const baseUrl = "https://api.mv-team.ir/api";
const getFetch = async (url) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Fail to Fetch , error code is : ${response.status}`);
    //error={message:"Fail to Fetch..."}
  }
};

const postFetch = async (url, body) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Fail to Fetch , error code is : ${response.status}`);
    //error={message:"Fail to Fetch..."}
  }
};
export { getFetch, postFetch };
