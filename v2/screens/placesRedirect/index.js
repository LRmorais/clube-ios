const PlacesRedirect = (props) => {
  props.navigation.replace('Places', {
    0: 'categorias',
    slug: props.navigation.getParam('otherCategory'),
  });

  return null;
};

export default PlacesRedirect;
