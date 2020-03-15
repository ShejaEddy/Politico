export default (table, obj) => {
  let query = `UPDATE ${table} SET`;
  let value = "";
  const keys = Object.keys(obj);
  keys.forEach((column, index) => {
    value += ` ${column} = $${index + 2},`;
  });
  value = `${value} updated_at = $${keys.length + 2}`;
  query += value;
  return `${query} WHERE id = $1 RETURNING *`;
};
