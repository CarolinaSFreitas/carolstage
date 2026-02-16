import { HomePageStarredEntities, HomePageToolkit } from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
export const HomePage = () => {
    return (
        <Container>
            <h1>Bem-vindo(a) ao Carolstage!</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HomePageSearchBar placeholder="Search" />
                </Grid>
                <Grid item xs={6}>
                    <HomePageStarredEntities />
                </Grid>
                <Grid item xs={6}>
                    <HomePageToolkit tools={[]} />
                </Grid>
            </Grid>
        </Container>
    );
}