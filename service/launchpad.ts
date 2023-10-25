import launchpadRequest from "lib/launchpadRequest";

export const getLaunchpadList = async () => {
  const { data } = await launchpadRequest.get("/ico-active-list");
  return data;
};
export const getLaunchpadListDetails = async (id: number) => {
  const { data } = await launchpadRequest.get(`ico-details?id=${id}`);
  return data;
};
export const launchpadBuyIcoToken = async () => {
  const { data } = await launchpadRequest.get("/buy-ico-token");
  return data;
};
export const launchpadDynamicFromSubmit = async (payload: any) => {
  const { data } = await launchpadRequest.post("/dynamic-form-submit", payload);
  return data;
};
export const launchpadDynamicFrom = async () => {
  const { data } = await launchpadRequest.get("/dynamic-form");
  return data;
};
