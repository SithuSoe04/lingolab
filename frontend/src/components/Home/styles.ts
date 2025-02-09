import { alignProperty } from "@mui/material/styles/cssUtils";

export const tempStyles = () => ({
    body: { 
    top: '93px',
    marginBottom: '200px',
    padding: 0,
   },
    root: {
      position: 'relative',
    },
    title: {
      color: '#1E1E1E',
      fontSize: 'clamp(40px, 2vw, 80px)',
      fontFamily: 'Anonymous Pro',
      margin: '20px auto',
      marginBottom: '10px',
      textAlign: 'center' as 'center',

    },
    title_para: {
        color: '#1E1E1E',
        fontSize: 'clamp(20px, 1vw, 30px)',
        fontFamily: 'Anonymous Pro',
        margin: '10px auto',
        padding: '40px 80px',
        textAlign: 'center' as 'center',
        lineHeight: '1.6'
      },
    butt: {
        color: '#1E1E1E',
        fontSize: 'clamp(10px, 2vw, 20px)',
        backgroundColor: '#D1CFCB',
        padding: '10px 20px',
        margin: '10px auto',
        display: 'block',
        marginBottom: '100px',
    },
    demoImg: {
        maxWidth: '90%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 'auto',
        height: "100%",
    },
    subtitle: {
        color: '#1E1E1E',
        fontSize: 'clamp(40px, 2vw, 60px)',
        fontFamily: 'Anonymous Pro',
        margin: '40px auto',
        display: 'flex',
        justifyContent: 'center',

      },
      list: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '16px',
        listStyleType: 'disc', // Add bullet points
        paddingLeft: '16px', // Add left padding for bullet points
      },
      list2: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '0px',
        paddingLeft: '0px', // Add left padding for bullet points
      },
    
      listItem: {
        padding: '8px 0',
        display: 'list-item',
      },
    
      primaryText: {
        fontFamily: "'Anonymous Pro', monospace", // Custom font family
        fontSize: 'clamp(20px, 1vw, 40px)',
        fontWeight: 'bold',
        color: '#333',
        fontStyle: 'italic', // Italic text
      },
    
      secondaryText: {
        fontFamily: "'Anonymous Pro', monospace", // Custom font family
        fontSize: 'clamp(15px, 1vw, 30px)',
        color: '#666',
        lineHeight: '1.6', // Adjust line height
      },
      cardTitle: {
        fontFamily: "'Anonymous Pro', monospace", // Custom font family
        fontWeight: 'bold',
        fontSize: '1.1rem',
        marginBottom: '8px',
      },
      cardDescription: {
        fontFamily: "'Anonymous Pro', monospace", // Custom font family
        fontSize: '0.9rem',
        color: 'text.secondary',
        lineHeight: '1.5', // Improves readability
      },
  });