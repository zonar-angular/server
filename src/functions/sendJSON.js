export const sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write(JSON.stringify(data));
  res.end();
};