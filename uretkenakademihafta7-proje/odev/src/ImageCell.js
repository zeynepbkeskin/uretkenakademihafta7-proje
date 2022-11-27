import { Table } from 'rsuite'
const { Cell } = Table

const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div
            style={{
                width: 40,
                height: 40,
                background: '#f5f5f5',
                borderRadius: 6,
                marginTop: 2,
                overflow: 'hidden',
                display: 'inline-block'
            }}
        >
            <img src={rowData.image} width="40" />
        </div>
    </Cell>
);

export default ImageCell