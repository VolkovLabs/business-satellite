import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => {
  return {
    option: css`
      padding: ${theme.spacing(0.5)};
      white-pace: nowrap;
      cursor: pointer;
      border-left: 2px solid transparent;
      border-radius: ${theme.shape.radius.default};
      &:hover: {
        background: ${theme.colors.action.hover};
      },
    `,
    optionInner: css`
      position: relative;
      text-align: left;
      width: 100%;
      display: block;
      cursor: pointer;
      padding: 2px 0;
    `,
  };
};
