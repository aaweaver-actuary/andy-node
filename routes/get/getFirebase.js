const express = require('express');
const router = express.Router();

const db = require('../../src/initFirebase');

const getFirestoreData = async (collection, document, queryParams = {}) => {
  const docRef = db.collection(collection).doc(document);

  try {
    const doc = await docRef.get();

    if (doc.exists) {
      let data = doc.data();

      // Apply any additional query parameters
      for (const [key, value] of Object.entries(queryParams)) {
        if (data.hasOwnProperty(key)) {
          if (data[key] !== value) {
            return null; // Return null if query params don't match
          }
        }
      }

      return data; // Return JSON data
    } else {
      return null; // Return null if document doesn't exist
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

/* GET home page. */
router.get('/:collection/:document/:queryParams', (req, res, next) => {
  const { collection, document, queryParams } = req.params;
  let data;
  if (queryParams) {
    queryParams = JSON.parse(queryParams);
    data = getFirestoreData(collection, document, queryParams);
  } else {
    data = getFirestoreData(collection, document);
  }

  data.then((result) => {
    res.send(result);
  });
});

module.exports = router;
