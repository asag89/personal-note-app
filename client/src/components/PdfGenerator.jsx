
import Doc from './Doc';
import { PDFDownloadLink } from '@react-pdf/renderer';

const PdfGenerator = () => {
    return (
        <PDFDownloadLink document={<Doc />} fileName="asdas">
            {({ loading }) => (loading ? <button>loading doc</button> : <button>download</button>)}
        </PDFDownloadLink>
    )
}

export default PdfGenerator