const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

const baseUrl = 'https://goskatalog.ru/muzfo-rest/rest/';

getExhibitsUrl = ({
  statusIds,
  pubLimit,
  countsType,
  sortDir,
  imageExists,
  limit,
  museumIds,
  offset,
  sortBy
}) => `${baseUrl}exhibits/ext?` +
  `&statusIds=${statusIds}` +
  `&publicationLimit=${pubLimit}` +
  `&calcCountsType=${countsType}` +
  `&dirFields=${sortDir}` +
  `&imageExists=${imageExists}` +
  `&limit=${limit}` +
  `&museumIds=${museumIds}` +
  `&offset=${offset}` +
  `&sortFields=${sortBy}`;

app.get('/exhibits', async (req, res) => {
  const defaultParams = {
    statusIds: 6,
    museumIds: 2791,
    pubLimit: false,
    countsType: 0,
    sortDir: 'desc',
    imageExists: true,
    limit: 10,
    offset: 0,
    sortBy: 'id',
  };

  await axios.post(
    getExhibitsUrl(defaultParams),
    [],
    {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }
  ).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(500).send(error);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
