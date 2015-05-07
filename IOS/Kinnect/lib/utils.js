'use strict';

function mapToURI(object, prevKey) {
  prevKey = prevKey || '';

  var keys = Object.keys(object);
  var formatedUri = keys.map((key) => {
    if (typeof object[key] === 'object') {
      return mapToURI(object[key], key);
    }
    var formatedKey = key;
    if (prevKey.length > 0) { formatedKey = '%5B'+key+'%5D'; }
    return prevKey + formatedKey + '=' + encodeURIComponent(object[key]);
  }).join('&');

  return formatedUri;
}

function urlForQuery(path, data) {
  var querystring = mapToURI(data);
  return `http://localhost:3000/api/v1/${path}.json?${querystring}`;
}

function _executeRequest(method, path, data, callback, user) {
  if (user && user.uuid.length > 0 && user.token.length > 0) {
    data.uuid = user.uuid;
    data.token = user.token;
  }
  var request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      callback(request.responseText);
    } else {
      console.warn('error');
    }
  };

  request.open(method, urlForQuery(path, data));
  request.send();
}

function _mergeObjects(obj1, obj2) {
  var obj3 = {};
  for (var attrname1 in obj1) { obj3[attrname1] = obj1[attrname1]; }
  for (var attrname2 in obj2) { obj3[attrname2] = obj2[attrname2]; }
  return obj3;
}

var Utils = {
  getRequest: _executeRequest.bind(null, 'GET'),

  postRequest: _executeRequest.bind(null, 'POST'),

  putRequest: _executeRequest.bind(null, 'PUT'),

  deleteRequest: _executeRequest.bind(null, 'DELETE'),

  mergeObjects: _mergeObjects.bind(null)
};

module.exports = Utils;
