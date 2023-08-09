import React from 'react';

import Spacer from '../../../components/spacer';
import WrappedLabeledCheckboxGroup from '../../../components/labeledCheckbox/wrappedGroup';
import { insert, remove } from '../../../utils/array';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Tagging = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    rating,
    tags: value,
    setTags,
    evaluationTagsByRating,
  } = useContext();

  const color = {
    croppedText: theme.contrastTextColor,
    highlight: theme.primaryColor,
    unchecked: theme.inputBackground,
  };
  const data = rating && evaluationTagsByRating[rating].map((tag) => ({
    color,
    text: tag.name,
    value: tag.id,
    bordered: false,
    showChecked: true,
  }));

  function handleChange(value, checked) {
    setTags((tags) => (
      checked
        ? insert(tags, value)
        : remove(tags, value)
    ));
  }

  if (!rating) return null;

  return (
    <>
      <Spacer size={3} fixedSize />
      <WrappedLabeledCheckboxGroup
        data={data || []}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default Tagging;
