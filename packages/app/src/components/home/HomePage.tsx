import React, { useEffect, useState } from 'react';
import {
  FeaturedDocsCard,
  HomePageStarredEntities,
  HomePageToolkit,
  HomePageRecentlyVisited,
} from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { Grid, Container, Box, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { useApi, identityApiRef } from '@backstage/core-plugin-api';

const useStyles = makeStyles((theme: Theme) => ({
  searchBar: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 999,
      backgroundColor: '#181818',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: 999,
      borderColor: '#1DB954',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1ED760',
    },
  },
}));

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 18, lineHeight: 1 }}>{children}</span>
);

export const HomePage = () => {
  const classes = useStyles();
  const identityApi = useApi(identityApiRef);

  const [displayName, setDisplayName] = useState<string>('guest');

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const profile = await identityApi.getProfileInfo();
        const name = profile.displayName || profile.email?.split('@')[0] || 'guest';
        if (mounted) setDisplayName(name);
      } catch {
        if (mounted) setDisplayName('guest');
      }
    })();

    return () => {
      mounted = false;
    };
  }, [identityApi]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(90deg, #1DB954 0%, #14833B 100%)',
          padding: '40px 64px',
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#fff', marginBottom: 1 }}
        >
          Bem-vinda(o), {displayName}!
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.85)' }}
        >
          O que você quer fazer hoje?
        </Typography>
      </Box>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HomePageSearchBar
              placeholder="Search"
              classes={{ root: classes.searchBar }}
            />
          </Grid>

          <Grid item xs={8}>
            <HomePageToolkit
              title="Atalhos"
              tools={[
                { url: '/catalog', label: 'Catálogo', icon: <Icon>📚</Icon> },
                { url: '/create', label: 'Criar', icon: <Icon>➕</Icon> },
                { url: '/docs', label: 'Docs', icon: <Icon>📄</Icon> },
                { url: '/api-docs', label: 'APIs', icon: <Icon>🔌</Icon> },
              ]}
            />
          </Grid>

          <Grid item xs={4}>
            <HomePageStarredEntities />
          </Grid>

          <Grid item xs={6}>
            <FeaturedDocsCard
              filter={{
                'spec.type': 'documentation',
                'metadata.name': 'getting-started-with-backstage',
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <HomePageRecentlyVisited />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
