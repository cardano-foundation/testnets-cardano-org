/* eslint-disable */

import React, { useState } from 'react';
import { useBorderSelectStyles } from '@mui-treasury/styles/select/border';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styled from 'styled-components'

import ByronFaucet from './ByronFaucet'
import IeleFaucet from './IELEFaucet'
import ItnFaucet from './ITNFaucet'
import KevmFaucet from './KEVMFaucet'

// Original design here: https://github.com/siriwatknp/mui-treasury/issues/541

const StyledFaucetSelector = styled.div`
  .faucet-label + .MuiInput-formControl {
    margin-top: 2.5rem;
  }
`

const BorderSelect = () => {
  const [ val, setVal ] = useState(0);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const borderSelectClasses = useBorderSelectStyles();

  // moves the menu below the select input
  const menuProps = {
    classes: {
      list: borderSelectClasses.list
    },
    anchorOrigin: {
      vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null
  };

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + borderSelectClasses.icon}/>
    )};

  return (
    <StyledFaucetSelector>
      <h4>Choose your faucet from these testnet versions:</h4>
      <FormControl>
        <InputLabel
          className={`faucet-label ${borderSelectClasses.label}`}
          id="inputLabel"
        >Choose Faucet:</InputLabel>
        <Select
          disableUnderline
          classes={{ root: borderSelectClasses.select, }}
          labelId="inputLabel"
          IconComponent={iconComponent}
          MenuProps={menuProps}
          value={val}
          onChange={handleChange}
        >
          <MenuItem value={0} disabled>Faucets</MenuItem>
          <MenuItem value={1}>Byron Faucet</MenuItem>
          <MenuItem value={2}>IELE Faucet</MenuItem>
          <MenuItem value={3}>ITN Faucet</MenuItem>
          <MenuItem value={4}>KEVM Faucet</MenuItem>
        </Select>
      </FormControl>
      {
        {
          '0': '',
          '1': <ByronFaucet/>,
          '2': <IeleFaucet/>,
          '3': <ItnFaucet/>,
          '4': <KevmFaucet/>
        }[val]
      }
    </StyledFaucetSelector>
  );
};

export default BorderSelect;