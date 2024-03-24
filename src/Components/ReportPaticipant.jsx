import React from 'react'
import { Document, Page,Image, Text, View, StyleSheet,PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";


  const borderColor = '#90ee90';
const styles = StyleSheet.create({
    
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: 'column',
    },

    titleContainer:{
      flexDirection: 'row',
      marginTop: 24,
  },
  reportTitle:{
      color: '#90ee90', 
      letterSpacing: 4,
      fontSize: 25,
      textAlign: 'center',
      textTransform: 'uppercase',
      marginLeft: 'auto',
      marginRight: 'auto'
  },
tableContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 24,
  borderWidth: 1,
  borderColor: '#90ee90',
},
container: {
  flexDirection: 'row',
  borderBottomColor: '#90ee90',
  backgroundColor: '#90ee90',
  borderBottomWidth: 1,
  alignItems: 'center',
  height: 24,
  textAlign: 'center',
  fontStyle: 'bold',
  flexGrow: 1,
},
cedula: {
  width: '40%',
  borderRightColor: borderColor,
  borderRightWidth: 1,
},
firstName: {
  width: '100%',
  borderRightColor: borderColor,
  borderRightWidth: 1,
},
description: {
  width: '60%',
  borderRightColor: borderColor,
  borderRightWidth: 1,
},
email: {
  width: '100%',
  borderRightColor: borderColor,
  borderRightWidth: 1,
},
row: {
  flexDirection: 'row',
  borderBottomColor: '#90ee90',
  borderBottomWidth: 1,
  alignItems: 'center',
  height: 24,
  fontStyle: 'bold',
},
logo: {
  width: 150,
  height: 150,
  marginLeft: 'auto',
  marginRight: 'auto'
}
  });
  
  

  const ReportPaticipant = ({data}) => (
    
    <Document>
      <Page size="A3" style={styles.page}>

      <Image style={styles.logo} src="/logo4.png" />
      <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Reporte de Participantes</Text>
      </View>

      <View style={styles.tableContainer}>
            <View style={styles.container}>
              <Text style={styles.cedula}>Cedula</Text>
              <Text style={styles.firstName}>Nombre apellido</Text>
              <Text style={styles.email}>Corre electrónico</Text>
              <Text style={styles.cedula}>Telefono</Text>
              <Text style={styles.description}>Grado de instrucción</Text>
            </View>
            {data.map((item) => (
              <View style={styles.row} key={item.id} >
                  <Text style={styles.cedula}>{item.identification_number}</Text>
                  <Text style={styles.firstName}>{item.firstName+' '+item.lastName}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                  <Text style={styles.cedula}>{item.phone}</Text>
                  <Text style={styles.description}>{item.gradeOfSchooling}</Text>
              </View>
            ))}
          </View>
      </Page>
    </Document>
  );
export default ReportPaticipant