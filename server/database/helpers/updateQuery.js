export default (table, obj, more) => {
  let i = 2;
  let where = "id =  $1";
  if (more) {
    where += `AND ${more} = $2`;
    i += 1;
  }
  let query = `UPDATE ${table} SET`;
  let value = "";
  const keys = Object.keys(obj);
  keys.forEach((column, index) => {
    value += ` ${column} = $${index + i},`;
  });
  value = `${value} updated_at = $${keys.length + i}`;
  query += value;
  return `${query} WHERE ${where} RETURNING *`;
};
