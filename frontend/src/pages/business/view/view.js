import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { Card, CardContent, CardHeader, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// components
import Sidemenu from '../../../components/Sidemenu';

// store
import { useDispatch, useSelector } from '../../../store';
import { fetchBusiness } from '../../../store/reducers/business';

const View = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { business } = useSelector(state => state.business);
  const { id } = useParams()

  // API calls
  useEffect(() => {
    dispatch(fetchBusiness(id));
  }, [dispatch, id]); 

  return (
    <>
      <div className="business-listing">
        <h2>View Businesses</h2>
        <div className="sub">
          <div className="sidemenu">
            <Sidemenu />
          </div>
          <div className="businesses" style={{ gridTemplateColumns: "auto" }}>
            <Paper sx={{ p: 5 }}>
              {business && <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Card>
                    <CardHeader title="Basic Details" />
                    <CardContent>
                      <List sx={{ py: 0 }}>
                        <ListItem divider={true}>
                          <Grid container spacing={3}>
                            <Grid item xs={4} md={4}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Name</Typography>
                                <Typography>{business.basicDetails.name ? business.basicDetails.name : '-'}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Industry</Typography>
                                <Typography>{business.basicDetails.industry ? business.basicDetails.industry : '-'}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Organization Type</Typography>
                                <Typography>{business.basicDetails.organizationType ? business.basicDetails.organizationType : '-'}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider={true}>
                          <Grid container spacing={3}>
                            <Grid item xs={4} md={4}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Organization Size</Typography>
                                <Typography>{business.basicDetails.organizationSize ? business.basicDetails.organizationSize : '-'}</Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Tags</Typography>
                                <Typography>{business.basicDetails.tagline ? business.basicDetails.tagline : '-'}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem divider={true}>
                          <Grid container spacing={3}>
                            <Grid item xs={4} md={12}>
                              <Stack spacing={0.5}>
                                <Typography color="secondary">Description</Typography>
                                <Typography>{business.basicDetails.description ? business.basicDetails.description : '-'}</Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card>
                    <CardHeader title="Products Details" />
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center"> # </TableCell>
                              <TableCell align="left"> Name </TableCell>
                              <TableCell align="left"> Industry </TableCell>
                              <TableCell align="left"> Description </TableCell>
                              <TableCell align="left"> Image </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {business.productDetails && business.productDetails.length > 0 ?
                              business.productDetails.map((product, index) => {
                                return (
                                  <>
                                    <TableRow
                                      key={index}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell align="left">{product.name ? product.name : '-'}</TableCell>
                                      <TableCell align="left">{product.industry ? product.industry : '-'}</TableCell>
                                      <TableCell align="left">{product.description ? product.description : '-'}</TableCell>
                                      <TableCell align="left">{product.image ? <img height={85} width={125} src={product.image} title={product.name} /> : '-'}</TableCell>
                                    </TableRow>
                                  </>
                                )
                              }) :
                              <TableRow>
                                <TableCell align="center" colSpan={6}>
                                  No Data to Preview...
                                </TableCell>
                              </TableRow>
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card>
                    <CardHeader title="Achievements Details" />
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center"> # </TableCell>
                              <TableCell align="left"> Title </TableCell>
                              <TableCell align="left"> Description </TableCell>
                              <TableCell align="left"> Image </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {business.achievementDetails && business.achievementDetails.length > 0 ?
                              business.achievementDetails.map((achievement, index) => {
                                return (
                                  <>
                                    <TableRow
                                      key={index}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell align="left">{achievement.title ? achievement.title : '-'}</TableCell>
                                      <TableCell align="left">{achievement.description ? achievement.description : '-'}</TableCell>
                                      <TableCell align="left">{achievement.image ? <img height={85} width={125} src={achievement.image} title={achievement.title} /> : '-'}</TableCell>
                                    </TableRow>
                                  </>
                                )
                              }) :
                              <TableRow>
                                <TableCell align="center" colSpan={6}>
                                  No Data to Preview...
                                </TableCell>
                              </TableRow>
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card>
                    <CardHeader title="Customer Testimonial Details" />
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center"> # </TableCell>
                              <TableCell align="left"> Name </TableCell>
                              <TableCell align="left"> Email </TableCell>
                              <TableCell align="left"> Rating </TableCell>
                              <TableCell align="left"> Description </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {business.customerTestimonials && business.customerTestimonials.length > 0 ?
                              business.customerTestimonials.map((customerTestimonial, index) => {
                                return (
                                  <>
                                    <TableRow
                                      key={index}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell align="left">{customerTestimonial.name ? customerTestimonial.name : '-'}</TableCell>
                                      <TableCell align="left">{customerTestimonial.email ? customerTestimonial.email : '-'}</TableCell>
                                      <TableCell align="left">{customerTestimonial.rating ? customerTestimonial.rating : '-'}</TableCell>
                                      <TableCell align="left">{customerTestimonial.description ? customerTestimonial.description : '-'}</TableCell>
                                    </TableRow>
                                  </>
                                )
                              }) :
                              <TableRow>
                                <TableCell align="center" colSpan={6}>
                                  No Data to Preview...
                                </TableCell>
                              </TableRow>
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card>
                    <CardHeader title="Advertisement Details" />
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center"> # </TableCell>
                              <TableCell align="left"> Title </TableCell>
                              <TableCell align="left"> Target Audience </TableCell>
                              <TableCell align="left"> Budget </TableCell>
                              <TableCell align="left"> Description </TableCell>
                              <TableCell align="left"> Image </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {business.advertisementDetails && business.advertisementDetails.length > 0 ?
                              business.advertisementDetails.map((advertisement, index) => {
                                return (
                                  <>
                                    <TableRow
                                      key={index}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell align="left">{advertisement.title ? advertisement.title : '-'}</TableCell>
                                      <TableCell align="left">{advertisement.targetAudience ? advertisement.targetAudience : '-'}</TableCell>
                                      <TableCell align="left">{advertisement.budget ? advertisement.budget : '-'}</TableCell>
                                      <TableCell align="left">{advertisement.description ? advertisement.description : '-'}</TableCell>
                                      <TableCell align="left">{advertisement.image ? <img height={85} width={125} src={advertisement.image} title={advertisement.title} /> : '-'}</TableCell>
                                    </TableRow>
                                  </>
                                )
                              }) :
                              <TableRow>
                                <TableCell align="center" colSpan={6}>
                                  No Data to Preview...
                                </TableCell>
                              </TableRow>
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>


              </Grid>}
            </Paper>
          </div>
        </div>
      </div>
    </>
  )
}

export default View
