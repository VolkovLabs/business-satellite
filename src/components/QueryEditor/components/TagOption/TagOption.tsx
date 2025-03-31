import { cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import React from 'react';
import { OptionProps } from 'react-select';

import { TEST_IDS } from '../../../../constants';
import { TagSelectOption } from '../../../../types';
import { TagBadge } from '../TagBadge';
import { getStyles } from './TagOption.styles';

export const TagOption = ({ data, className, label, innerProps }: OptionProps<TagSelectOption>) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={cx(styles.option)} aria-label="Tag option" {...innerProps} data-testid={TEST_IDS.tagOption.root}>
      <div className={cx(styles.optionInner, className)}>
        <TagBadge label={label} removeIcon={false} count={data.count ?? 0} />
      </div>
    </div>
  );
};
