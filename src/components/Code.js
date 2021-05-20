import React from 'react'
import PropTypes from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import styled from 'styled-components'
import Confetti from 'react-dom-confetti'

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: [ '#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a' ]
}

const Wrapper = styled.div`
  position: relative;
`
const ConfettiWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const Button = (props) => (
  <button
    {...props}
  />
)

const CopyButton = styled(Button)`
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      box-shadow: none;
      text-decoration: none;
      margin: 8px;
      padding: 8px 12px;
      background: #E2E8F022;
      color: #0033ad;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-family: sans-serif;
      line-height: 1;
`
const Pre = styled.pre`
      padding: 2rem;
      background: #f9f9f9;
      position: relative;
      overflow-x: auto;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
`

const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const Code = ({ codeString, language, theme }) => {
  const [ isCopied, setIsCopied ] = React.useState(false)

  return (
    <Wrapper>
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <Pre
            className={className}
          >
            <CopyButton
              onClick={() => {
                copyToClipboard(codeString)
                setIsCopied(true)
                setTimeout(() => setIsCopied(false), 3000)
              }}
            >
              {isCopied ? '🎉 Copied!' : 'Copy'}
            </CopyButton>

            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        )}
      </Highlight>
      <ConfettiWrapper>
        <Confetti active={isCopied} config={config} />
      </ConfettiWrapper>
    </Wrapper>
  )
}

Code.propTypes = {
  codeString: PropTypes.string.isRequired,
  language: PropTypes.string,
  theme: PropTypes.string
}

export default Code
