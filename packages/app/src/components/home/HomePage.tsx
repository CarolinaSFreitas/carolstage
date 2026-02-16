import { HomePageStarredEntities } from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { Grid } from '@mui/material';

export const HomePage = () => {
    return (
        <>
            <h1>Bem-vindo(a) ao Carolstage!</h1>
            
            

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <HomePageStarredEntities />
                </Grid>
                <Grid item xs={4}>
                    <HomePageSearchBar placeholder="Search" />
                </Grid>
            </Grid>
        </>
    );
}