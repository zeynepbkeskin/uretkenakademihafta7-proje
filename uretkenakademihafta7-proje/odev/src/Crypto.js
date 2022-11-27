import { useEffect, useState } from "react"
import { Content, Container, Input, Panel, Table } from "rsuite";
import ImageCell from "./ImageCell";
const { Column, HeaderCell, Cell } = Table;

const Crypto = () => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [data, setData] = useState([])
    const [dataFiltered, setFilteredData] = useState([])

    const getData = async () => {
        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            );
            const data = await res.json();
            setData(data);
            setFilteredData(data);
        } catch (e) {
            alert("Api error");
        }
    };

    const onSearch = (text) => {
        let filteredData = data.filter(f => f.name.toLocaleLowerCase().includes(text))
        setFilteredData(filteredData)
    }

    const onSort = (sortColumn, sortType) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
        return data.sort((a, b) => {
            let x = a[sortColumn];
            let y = b[sortColumn];
            if (typeof x === 'string') {
                x = x.charCodeAt();
            }
            if (typeof y === 'string') {
                y = y.charCodeAt();
            }
            if (sortType === 'asc') {
                return x - y;
            } else {
                return y - x;
            }
        });
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <Container>
                <Content>
                    <Panel header="Crypto Tracker">
                        <Input size="lg" style={{ width: 400 }} placeholder="Ara" onChange={onSearch} />
                        <Table
                            height={600}
                            width={800}
                            data={dataFiltered}
                            style={{ marginTop: 25 }}
                            onSortColumn={onSort}
                            sortColumn={sortColumn}
                            sortType={sortType}
                        >
                            <Column flexGrow={1} align="left" sortable>
                                <HeaderCell>Id</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>
                            <Column flexGrow={1}>
                                <HeaderCell>Image</HeaderCell>
                                <ImageCell dataKey="image" />
                            </Column>
                            <Column flexGrow={1} align="left" >
                                <HeaderCell>Symbol</HeaderCell>
                                <Cell dataKey="symbol">{rowData => `$${rowData.symbol.toUpperCase()}`}</Cell>
                            </Column>
                            <Column flexGrow={1} align="left" sortable>
                                <HeaderCell>Price</HeaderCell>
                                <Cell dataKey="current_price">{rowData => `$${rowData.current_price}`}</Cell>
                            </Column>
                            <Column flexGrow={1} align="left" sortable>
                                <HeaderCell>Change</HeaderCell>
                                <Cell dataKey="price_change_percentage_24h">
                                    {rowData => <div style={{ color: /-/i.test(rowData.price_change_percentage_24h) ? "#ff0374" : "#06a847" }}>
                                        {rowData.price_change_percentage_24h}%
                                    </div>}
                                </Cell>
                            </Column>
                            <Column flexGrow={1} sortable>
                                <HeaderCell>Total Volume</HeaderCell>
                                <Cell dataKey="total_volume" />
                            </Column>
                        </Table>
                    </Panel>
                </Content>
            </Container>
        </>
    )

}

export default Crypto