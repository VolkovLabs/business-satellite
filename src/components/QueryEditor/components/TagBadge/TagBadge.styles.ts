import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => ({
  badge: css`
    background-color: ${theme.colors.background.secondary};
    border-radius: ${theme.shape.radius.default};
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.bodySmall.fontSize};
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: ${theme.spacing(0, 0.75)};
    vertical-align: baseline;
    white-space: nowrap;
    &:hover: {
      opacity: 0.85;
    },
  `,
});
