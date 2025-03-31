import { getTagColorsFromName, Icon, useStyles2, useTheme2 } from '@grafana/ui';
import * as React from 'react';

import { TEST_IDS } from '../../../../constants';
import { getStyles } from './TagBadge.styles';

/**
 * Tag badge properties
 */
export interface Props {
  label: string;
  removeIcon: boolean;
  count: number;
  onClick?: React.MouseEventHandler<SVGElement>;
}

/**
 * TagBadge
 */
export const TagBadge = ({ count, label, onClick, removeIcon }: Props) => {
  const { color } = getTagColorsFromName(label);
  const theme = useTheme2();

  const styles = useStyles2(getStyles);
  const countLabel = count !== 0 && <span style={{ marginLeft: '3px' }}>{`(${count})`}</span>;

  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: color,
        color: theme.colors.getContrastText(color),
      }}
      data-testid={TEST_IDS.tagBadge.root}
    >
      {removeIcon && <Icon onClick={onClick} name="times" data-testid={TEST_IDS.tagBadge.removeIcon} />}
      {label} {countLabel}
    </span>
  );
};
