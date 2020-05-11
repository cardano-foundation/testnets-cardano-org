import cardano from '@input-output-hk/front-end-themes/themes/cardano'

export function getThemes () {
  return [
    {
      key: 'cardano',
      config: {
        ...cardano,
        colors: {
          ...cardano.colors,
          primary: {
            main: '#6e9bf0',
            light: '#6e9bf0',
            dark: '#3B68BD',
            contrastText: '#fff'
          }
        }
      }
    }
  ]
}
