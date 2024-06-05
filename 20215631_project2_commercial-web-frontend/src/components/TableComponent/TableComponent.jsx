import { Dropdown, Space, Table } from 'antd';
import Loading from '../LoadingComponent/Loading';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';

const TableComponent = (props) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const { selectionType = 'checkbox', data = [], columns = [], isLoading = false, handleDeleteMany } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };

    return (
        <div>
            <Loading isLoading={isLoading}>
                {rowSelectedKeys.length > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'left',
                            padding: 6,
                            fontSize: 16,
                            color: 'red',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                        onClick={handleDeleteAll}
                    >
                        Xóa tất cả
                    </div>
                )}
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </Loading>
        </div>
    );
};

export default TableComponent;
