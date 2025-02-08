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
      fontSize: '40px',
      fontFamily: 'Anonymous Pro',
      margin: '10px auto',
      textAlign: 'center' as 'center'
    },
    title_para: {
        color: '#1E1E1E',
        fontSize: '20px',
        fontFamily: 'Anonymous Pro',
        margin: '10px auto',
        padding: '40px 120px',
        textAlign: 'center' as 'center',
        lineHeight: '1.6'
      },
    butt: {
        color: '#1E1E1E',
        fontSize: '16px',
        backgroundColor: '#D1CFCB',
        padding: '10px 20px',
        margin: '10px auto',
        display: 'block',
        marginBottom: '100px',
    },
    demoImg: {
        maxWidth: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    subtitle: {
        color: '#1E1E1E',
        fontSize: '30px',
        fontFamily: 'Anonymous Pro',
        margin: '10px auto',
      },
      list: {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '16px',
        listStyleType: 'disc', // Add bullet points
        paddingLeft: '16px', // Add left padding for bullet points
      },
    
      listItem: {
        padding: '8px 0',
        display: 'list-item',
      },
    
      primaryText: {
        fontFamily: "'Anonymous Pro', monospace", // Custom font family
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        fontStyle: 'italic', // Italic text
      },
    
      secondaryText: {
        fontFamily: "'Anonymous Pro', monospace", // Custom font family
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.6', // Adjust line height
      },
  });