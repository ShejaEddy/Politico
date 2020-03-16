import moment from "moment";

export default (obj, update) => {
  const params = obj;
  params.updated_at = moment(new Date());
  if (!update) params.created_at = moment(new Date());
  return [...Object.keys(params).map(item => obj[item])];
};
