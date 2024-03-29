import React, { useEffect, useState } from 'react';

// material-ui
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, Paper } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

// components
import Sidemenu from '../../../components/Sidemenu';

// sections
import BusinessCard from '../../../sections/business/list/BusinessCard';

// data 
import { SampleBusinessData } from '../../../data/business';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const List = () => {
  const [businesses, setBusinesses] = useState([])

  useEffect(() => {
    setBusinesses(SampleBusinessData || [])
  }, [])

  return (
    <>
      <div className="business-listing">
        <h2>Businesses</h2>
        <div className="sub">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="businesses" style={{ gridTemplateColumns: "auto" }}>
            <Paper sx={{ p: 5 }}>
              <Grid container spacing={2}>
                <Grid item md={9}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Grid>
                <Grid item md={3}>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    fullWidth
                  >
                    Create Business
                  </Button>
                </Grid>
                {businesses && businesses.length > 0 ? businesses.map((business, index) => {
                  return (
                    <Grid item key={index} xs={12} md={12} >
                      <BusinessCard businessData={business} />
                    </Grid>
                  )
                }) :
                  <>
                    No Business to view...
                  </>
                }
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    </>
  )
}

export default List
