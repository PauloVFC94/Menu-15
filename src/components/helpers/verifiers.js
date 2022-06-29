import { mealsEndpoints } from './endpoints';

const shouldRedirectToDetails = (data, endpoint) => data.length === 1
  && !endpoint.includes(mealsEndpoints.searchByCategory);

export default shouldRedirectToDetails;
