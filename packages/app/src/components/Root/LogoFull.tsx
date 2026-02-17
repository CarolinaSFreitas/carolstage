import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  img: {
    width: 'auto',
    height: 40,
    display: 'block',
  },
});

const LogoFull = () => {
  const classes = useStyles();

  return <img className={classes.img} src="/Carolstage.png" alt="Carolstage" />;
};

export default LogoFull;
