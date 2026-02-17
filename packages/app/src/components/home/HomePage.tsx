import { HomePageStarredEntities, HomePageToolkit } from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { Grid, Container } from '@mui/material';

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 18, lineHeight: 1 }}>{children}</span>
);

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
          <HomePageToolkit
            title="Atalhos"
            tools={[
              { url: '/catalog', label: 'Catálogo', icon: <Icon>📚</Icon> },
              { url: '/create', label: 'Criar componente', icon: <Icon>➕</Icon> },
              { url: '/docs', label: 'Documentação', icon: <Icon>📄</Icon> },
              { url: '/api-docs', label: 'APIs', icon: <Icon>🔌</Icon> },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
