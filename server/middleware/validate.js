export function validate(schema, property = 'body') {
  return (req, res, next) => {
    const data = req[property] || {};
    for (const [key, rule] of Object.entries(schema)) {
      const def = typeof rule === 'string' ? { type: rule } : rule;
      const { type, optional } = def;
      let value = data[key];
      if (value === undefined) {
        if (!optional) {
          return res.status(400).json({ error: `${key} is required` });
        }
      } else {
        if (type === 'number') {
          const num = Number(value);
          if (Number.isNaN(num)) {
            return res.status(400).json({ error: `${key} must be a number` });
          }
          data[key] = num;
        } else if (typeof value !== type) {
          return res.status(400).json({ error: `${key} must be a ${type}` });
        }
      }
    }
    req[property] = data;
    next();
  };
}
