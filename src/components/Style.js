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
`
