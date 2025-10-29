import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const createOrganisation = (data) => api.post("/onboarding/organisation", data);
export const createGroups = (groups) => api.post("/onboarding/groups", { groups });
export const inviteMembers = (members) => api.post("/onboarding/invite", { members });
