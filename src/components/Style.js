import { createGlobalStyle } from 'styled-components'

// Tech debt
export default createGlobalStyle`
  .MuiButton-contained, {
  .MuiButton-outlined {
    padding: 1rem 2rem;
    border-radius: 1.8rem;

    &.MuiButton-containedPrimary {
      &:hover {
        color: ${({ theme }) => theme.palette.primary.contrastText};
      }
    }
  }

  table {
      /* Remove spacing between table cells (from Normalize.css) */
      border-collapse: collapse;
      border-spacing: 0;
      empty-cells: show;
      border: 1px solid #cbcbcb;
      font-size:89%;
  }

  table caption {
      color: #000;
      font: italic 85%/1 arial, sans-serif;
      padding: 1em 0;
      text-align: center;
  }

  table td,
  table th {
      border-left: 1px solid #cbcbcb;/*  inner column border */
      border-width: 0 0 0 1px;
      font-size: inherit;
      margin: 0;
      overflow: visible; /*to make ths where the title is really long work*/
      padding: 0.5em 1em; /* cell padding */
      line-height: 1;
      white-space: nowrap;
  }

  table thead {
      background-color: #e0e0e0;
      color: #000;
      text-align: left;
      vertical-align: bottom;
  }

  /*
  striping:
    even - #fff (white)
    odd  - #f2f2f2 (light gray)
  */
  table td {
      background-color: transparent;
  }
`
