
// material-ui
import { Card, CardContent, CardHeader, Grid, List, ListItem, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// ==============================|| VALIDATION WIZARD - REVIEW  ||============================== //


export default function Review({ basicDetailsData, productDetailsData, achievementDetailsData }) {

  return (
    <>
      <Grid container spacing={3}>
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
                        <Typography>{basicDetailsData.name ? basicDetailsData.name : '-'}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Industry</Typography>
                        <Typography>{basicDetailsData.industry ? basicDetailsData.industry : '-'}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Organization Type</Typography>
                        <Typography>{basicDetailsData.organizationType ? basicDetailsData.organizationType : '-'}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={true}>
                  <Grid container spacing={3}>
                    <Grid item xs={4} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Organization Size</Typography>
                        <Typography>{basicDetailsData.organizationSize ? basicDetailsData.organizationSize : '-'}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Tags</Typography>
                        <Typography>{basicDetailsData.tagline ? basicDetailsData.tagline : '-'}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={true}>
                  <Grid container spacing={3}>
                    <Grid item xs={4} md={12}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Description</Typography>
                        <Typography>{basicDetailsData.description ? basicDetailsData.description : '-'}</Typography>
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
                    {productDetailsData.products && productDetailsData.products.length > 0 ?
                      productDetailsData.products.map((product, index) => {
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
                    {achievementDetailsData.achievements && achievementDetailsData.achievements.length > 0 ?
                      achievementDetailsData.achievements.map((achievement, index) => {
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
      </Grid>
    </>
  );
}
