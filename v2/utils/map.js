const getRadians = value => (Math.PI * value) / 180;
export const formatDistance = distance => {
  if (!distance) {
    return null;
  }

  if (distance > 25000) {
    return '25km+';
  }
  if (distance >= 950) {
    return Math.round((distance - 250) / 1000) + 'km';
  }
  if (distance >= 100) {
    return Math.round((distance - 25) / 100) * 100 + 'm';
  }
  return Math.max(5, Math.round(distance / 5) * 5) + 'm';
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const getDistance = (firstCoords, secondCoords, formatted = false) => {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(firstCoords.lat - secondCoords.lat); // deg2rad below
  let dLon = deg2rad(firstCoords.lng - secondCoords.lng);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(firstCoords.lat)) *
      Math.cos(deg2rad(secondCoords.lng)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  let z = Math.round((d + Number.EPSILON) * 100) / 100;
  if (z < 1) {
    return `${z * 1000}m`;
  } else if (z >= 1 && z <= 25) {
    return `${z}km`;
  } else if (z > 25) {
    return '25km+';
  } else {
    return '';
  }
};

export const isInsideBounds = (bounds, coords, hypotenuse) => {
  let boundsDistance =
    hypotenuse ||
    getDistance(
      {lat: bounds.northEast.latitude, lng: bounds.northEast.longitude},
      {lat: bounds.southWest.latitude, lng: bounds.southWest.longitude},
    );
  let distanceFromNE = getDistance(
    {lat: bounds.northEast.latitude, lng: bounds.northEast.longitude},
    coords,
  );
  let distanceFromSW = getDistance(
    {lat: bounds.southWest.latitude, lng: bounds.southWest.longitude},
    coords,
  );
  // a² = b² + c²
  return boundsDistance ** 2 > distanceFromNE ** 2 + distanceFromSW ** 2;
};
