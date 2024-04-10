
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
    return (
        <Grid backgroundColor={'blue'}>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} direction="column">
                        <Item>

                            <h2>Datos del estudiante</h2>
                            <input type="text" style={{ display: 'block', margin: 'normal' }} />
                            <input type="text" style={{ display: 'block', margin: 'normal' }} />
                            <input type="text" style={{ display: 'block', margin: 'normal' }} />
                            <input type="text" style={{ display: 'block', margin: 'normal' }} />

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <div>
                                <h2>Datos del Apoderado</h2>
                                <input type="text" />
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <div>
                                <h2>Datos Curso</h2>
                                <input type="text" />
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box>


        </Grid>

    );
}