export const send404 = (res) => {
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.write(JSON.stringify(err));
  res.end();
}