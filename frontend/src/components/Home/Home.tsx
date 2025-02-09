import { Box, Card, Button, Grid, CardContent, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { tempStyles } from './styles';
import Overall_Model4 from '../../imgs/Overall_Model4.png';

const Home = () => {
  const styles = tempStyles();
  // Data for the cards
  const cardData = [
    {
      primary: "Instantly Understand Complex Terms",
      secondary:
        "LingoLab eliminates the need to search through multiple sources for definitions. Our AI-powered system instantly provides clear and concise explanations for technical terms, saving you time and effort.",
    },
    {
      primary: "AI-Powered, Human-Refined",
      secondary:
        "Our cutting-edge AI generates accurate definitions, which are then reviewed and refined by experts in the STEM community. This ensures the highest quality and reliability of information.",
    },
    {
      primary: "Built for the STEM Community",
      secondary:
        "LingoLab is a collaborative platform where knowledge evolves. Researchers, students, and professionals can contribute to and improve the definitions, making it a truly community-driven resource.",
    },
    {
      primary: "Free & Open-Source",
      secondary:
        "LingoLab is completely free and open-source. You can contribute to the global dictionary of technical terms, helping to create a comprehensive and accessible resource for everyone in the STEM community.",
    },
  ]; 
  return (
    <Container maxWidth={false} sx={{padding: '50px'}}>
      {/* Introduction section */}
      <Grid>
        <h1 style={styles.title}>
          A Dictionary for STEM, by the STEM Community
        </h1>
        <p style={styles.title_para}>
        LingoLab is an innovative, AI-powered dictionary designed specifically for researchers, students, and professionals in science, technology, engineering, and mathematics (STEM). Our mission is to simplify the process of understanding complex technical terms and concepts, making it easier for you to navigate the ever-expanding world of STEM literature. With LingoLab, you can simply upload a PDF of a research paper, article, or textbook, and our advanced AI will automatically extract and define technical terms, saving you time and effort. Whether you're a seasoned researcher or a student just starting out, LingoLab is here to help you understand dense material faster than ever before.
        </p>
        <Button style={styles.butt}>
          Try it out!
        </Button>
      </Grid>

      {/* Why use LingoLab section */}
      <h2 style={styles.subtitle}>
              Why Use LingoLab?
      </h2>
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#F9F8F4', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={styles.cardTitle}>
                  {card.primary}
                </Typography>
                <Typography variant="body2" sx={styles.cardDescription}>
                  {card.secondary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How it Works Section */}
      <Grid container style={{ marginTop: '40px' }}>
        <Grid item sm={5}>
          <h2 style={styles.subtitle}>
            How It Works
          </h2>
          <List style={styles.list2}>
            <ListItem style={styles.listItem}>
              <ListItemText
                primary="1. Upload Your PDF"
                secondary="Simply upload a PDF of the research paper, article, or textbook you’re working on."
                primaryTypographyProps={{ style: styles.primaryText }}
                secondaryTypographyProps={{ style: styles.secondaryText }}
              />
            </ListItem>
            <ListItem style={styles.listItem}>
              <ListItemText
                primary="2. AI Parses the PDF"
                secondary="Our AI scans the document and identifies technical terms, acronyms, and jargon."
                primaryTypographyProps={{ style: styles.primaryText }}
                secondaryTypographyProps={{ style: styles.secondaryText }}
              />
            </ListItem>
            <ListItem style={styles.listItem}>
              <ListItemText
                primary="3. Read and Select Words"
                secondary="Read the PDF in our reader and click on any word to see its definition instantly."
                primaryTypographyProps={{ style: styles.primaryText }}
                secondaryTypographyProps={{ style: styles.secondaryText }}
              />
            </ListItem>
            <ListItem style={styles.listItem}>
              <ListItemText
                primary="4. Explore Definitions"
                secondary="Definitions appear on the right side of the reader, helping you understand complex terms effortlessly."
                primaryTypographyProps={{ style: styles.primaryText }}
                secondaryTypographyProps={{ style: styles.secondaryText }}
              />
            </ListItem>
            <ListItem style={styles.listItem}>
              <ListItemText
                primary="5. Help Us"
                secondary="If you think a defintion is wrong, help us to fix them."
                primaryTypographyProps={{ style: styles.primaryText }}
                secondaryTypographyProps={{ style: styles.secondaryText }}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={7}>
          <div style={styles.demoImg}>
            <img src={Overall_Model4} style={{maxWidth:'100%'}}></img>
          </div>
        </Grid>
      </Grid>
       {/* Contact Us section */}
       <Box sx={{ marginTop: '60px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          Address: 9500 Gilman Drive, La Jolla, CA 92093
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          Email: support@lingolab.com
        </Typography>
      </Box>
    </Container>
  );
}
export default Home;
