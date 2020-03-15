export default (table, obj) => {
  let query = `INSERT INTO ${table}`;
  let value = "";
  let column = "";
  const len = Object.keys(obj).length;
  Object.keys(obj).forEach((data, index) => {
    column += `${data},`;
    value += `$${index + 1},`;
  });
  column = `${column}updated_at,created_at`;
  value = `${value}$${len + 1},$${len + 2}`;
  query += ` (${column}) VALUES (${value}) RETURNING *`;
  return query;
};
