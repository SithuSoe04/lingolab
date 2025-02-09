import { Box, Button, Grid, CardContent, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { tempStyles } from './styles';
import Overall_Model4 from '../../imgs/Overall_Model4.png';

const Home = () => {
  const styles = tempStyles();
  return (
    <Container>
      <Grid>
        <h1 style={styles.title}>
          A Dictionary for STEM, by the STEM Community
        </h1>
        <p style={styles.title_para}>
          LingoLab is an AI-powered dictionary built for researchers, students, and professionals in science, technology, engineering, and mathematics. Simply upload a PDF, and our AI will extract and define technical terms—helping you understand research papers faster than ever.
        </p>
        <Button style={styles.butt}>
          Try it out!
        </Button>
      </Grid>


        <Grid container>
          <Grid item sm={7}>
            <img src={Overall_Model4} style={styles.demoImg}></img>
          </Grid>
          <Grid item sm={5}>
            <h2 style={styles.subtitle}>
              Why Use LingoLab?
            </h2>
            <List style={styles.list}>
              <ListItem style={styles.listItem}>
                <ListItemText
                  primary="Instantly Understand Complex Terms"
                  secondary="No more searching through multiple sources."
                  primaryTypographyProps={{ style: styles.primaryText }}
                  secondaryTypographyProps={{ style: styles.secondaryText }}
                />
              </ListItem>
              <ListItem style={styles.listItem}>
                <ListItemText
                  primary="AI-Powered, Human-Refined"
                  secondary="Cutting-edge AI generates definitions, and experts improve them."
                  primaryTypographyProps={{ style: styles.primaryText }}
                  secondaryTypographyProps={{ style: styles.secondaryText }}
                />
              </ListItem>
              <ListItem style={styles.listItem}>
                <ListItemText
                  primary="Built for the STEM Community"
                  secondary="A collaborative platform where knowledge evolves."
                  primaryTypographyProps={{ style: styles.primaryText }}
                  secondaryTypographyProps={{ style: styles.secondaryText }}
                />
              </ListItem>
              <ListItem style={styles.listItem}>
                <ListItemText
                  primary="Free & Open-Source"
                  secondary="Contribute to a global dictionary of technical terms."
                  primaryTypographyProps={{ style: styles.primaryText }}
                  secondaryTypographyProps={{ style: styles.secondaryText }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

      {/* Footer Section */}
    </Container>
  );
}
export default Home;
