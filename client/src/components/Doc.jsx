
import { Document, Page, Text, View, StyleSheet, } from '@react-pdf/renderer';

const Doc = ({ doc, docOptions }) => {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: docOptions.bgColor || "#111827",
            color: docOptions.fontColor || "#fff"
        },
        title: {
            textAlign: "center",
            width: "100%",
            fontSize: docOptions.fontSize || "16px",
            paddingBottom: "15px"
        },
        text: {
            fontSize: docOptions.fontSize || "16px"

        },
        section: {
            margin: 10,
            padding: 10,
        }
    });

    return (
        <Document>
            <Page size={docOptions.size || "A4"} style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        {doc.title}
                    </Text>
                    <Text style={styles.text}>
                        {doc.text}
                    </Text>
                </View>
            </Page>
        </Document>
    )
}
export default Doc