import "./styles.css";
import { css } from '@emotion/css';
import { Table, useTheme2 } from "@grafana/ui";
import './normalize.css';
import { buildData } from './api';

export default function App() {
  const theme = useTheme2();
  const data = buildData(theme);
  const style = css`
    width: 100%;
    height: 100%;
    padding: 32px;
    background: ${theme.colors.background.canvas};
  `;

  return (
    <div className={style}>
      <Table data={data[0]} height={800} width={1500} columnMinWidth={200} />
    </div>
  );
}
