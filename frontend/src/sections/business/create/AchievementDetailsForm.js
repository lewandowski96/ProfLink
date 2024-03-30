import { useState } from "react";

// material-ui
import { DeleteOutlined } from "@mui/icons-material";
import { Button, Dialog, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';

// third-party
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

// project import
import CreateEditAchievement from "./CreateEditAchievement";

// data

const validationSchema = yup.object({
  // name: yup.string().required('Name is required'),  
});

// ==============================|| VALIDATION WIZARD - ADDRESS  ||============================== //

const AchievementDetailsForm = ({ achievementDetailsData, setAchievementDetailsData, handleNext, handleBack, setErrorIndex }) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      achievements: achievementDetailsData.achievements,
    },
    validationSchema,
    onSubmit: (values) => {
      setAchievementDetailsData({
        achievements: values.achievements,
      });
      handleNext();
    }
  });

  const { values, handleSubmit } = formik;

  //dialog model 
  const [open, setOpen] = useState(false);
  const [achievement, setAchievement] = useState()

  const onClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Achievement Details
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ margin: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FieldArray name="achievements">
                {({ insert, remove, push, }) => {
                  return (
                    <>
                      <Grid item xs={12} md={12}>
                        <Grid container spacing={3}>
                          <Grid item md={12}>
                            <Button
                              style={{
                                float: "right"
                              }}
                              onClick={() => {
                                setOpen(true)
                                // push(
                                //   {
                                //     title: "",
                                //     description: '',
                                //     image: ''
                                //   }
                                // )
                              }}
                              variant="contained" >
                              Create Achievement
                            </Button>
                          </Grid>
                          <Grid item md={12}>
                            <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center"> # </TableCell>
                                    <TableCell align="left"> Title </TableCell>
                                    <TableCell align="left"> Description </TableCell>
                                    <TableCell align="left"> Image </TableCell>
                                    <TableCell align="center"> Actions </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {values.achievements && values.achievements.length > 0 ?
                                    values.achievements.map((achievement, index) => {
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
                                            <TableCell align="left">{achievement.image ? achievement.image : '-'}</TableCell>
                                            <TableCell align="center">
                                              <Tooltip title="Delete Achievement" placement="right-start">
                                                <IconButton onClick={() => { remove(index) }} size="large" color="error">
                                                  <DeleteOutlined />
                                                </IconButton>
                                              </Tooltip>
                                            </TableCell>
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
                          </Grid>
                        </Grid>
                      </Grid>
                      <Dialog
                        maxWidth="sm"
                        keepMounted
                        fullWidth
                        onClose={onClose}
                        open={open}
                        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <CreateEditAchievement onClose={onClose} push={push} achievement={achievement} />
                      </Dialog>
                    </>
                  )
                }}
              </FieldArray >
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                  Back
                </Button>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                  Next
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form >
      </FormikProvider >
    </>
  );
};

export default AchievementDetailsForm;
