// import classNames from 'classnames/bind';
// import styles from './AdminOrder.module.scss';
// import { Button, Space } from 'antd';
// import TableComponent from '../TableComponent/TableComponent';
// import InputComponent from '../InputComponent/InputComponent';
// import { useRef } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import * as OrderService from '../../services/OrderService';
// import { SearchOutlined } from '@ant-design/icons';
// import { orderConstant } from '../../constant.js';
// import { useMutationHook } from '../../hooks/useMutationHook';

// const cx = classNames.bind(styles);

// const AdminOrder = () => {
//     const searchInput = useRef(null);
//     const user = useSelector((state) => state?.user);

//     const getAllOrders = async () => {
//         const res = await OrderService.getAllOrders(user?.access_token);
//         return res;
//     };

//     const queryOrder = useQuery({
//         queryKey: ['orders'],
//         queryFn: getAllOrders,
//     });

//     const { isLoading: isLoadingOrders, data: orders } = queryOrder;

//     const mutationUpdate = useMutationHook((data) => {
//         const { id, access_token, ...rests } = data;
//         const res = OrderService.updateOrder(id, access_token, { ...rests });
//         return res;
//     });

//     const {
//         data: dataUpdated,
//         isPending: isPendingUpdated,
//         isSuccess: isSuccessUpdated,
//         isError: isErrorUpdated,
//     } = mutationUpdate;

//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <InputComponent
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: 'block',
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         // onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? '#1677ff' : undefined,
//                 }}
//             />
//         ),
//         onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         // render: (text) =>
//         //     searchedColumn === dataIndex ? (
//         //         <Highlighter
//         //             highlightStyle={{
//         //                 backgroundColor: '#ffc069',
//         //                 padding: 0,
//         //             }}
//         //             searchWords={[searchText]}
//         //             autoEscape
//         //             textToHighlight={text ? text.toString() : ''}
//         //         />
//         //     ) : (
//         //         text
//         //     ),
//     });

//     const columns = [
//         {
//             title: 'Tên khách hàng',
//             dataIndex: 'userName',
//             sorter: (a, b) => a.userName.length - b.userName.length,
//             ...getColumnSearchProps('userName'),
//         },
//         {
//             title: 'SĐT',
//             dataIndex: 'phone',
//             sorter: (a, b) => a.phone.length - b.phone.length,
//             ...getColumnSearchProps('phone'),
//         },
//         {
//             title: 'Địa chỉ',
//             dataIndex: 'address',
//             sorter: (a, b) => a.address.length - b.address.length,
//             ...getColumnSearchProps('address'),
//         },
//         {
//             title: 'Ngày đặt hàng',
//             dataIndex: 'date',
//             ...getColumnSearchProps('date'),
//         },
//         {
//             title: 'Tổng tiền',
//             dataIndex: 'totalPrice',
//             sorter: (a, b) => a.totalPrice - b.totalPrice,
//             ...getColumnSearchProps('totalPrice'),
//         },
//         {
//             title: 'TT Vận chuyển',
//             dataIndex: 'isDelivered',
//         },
//         {
//             title: 'TT Thanh toán',
//             dataIndex: 'isPaid',
//         },
//         {
//             title: 'Phương thức thanh toán',
//             dataIndex: 'paymentMethod',
//             ...getColumnSearchProps('paymentMethod'),
//         },
//     ];

//     const columnsExport = [
//         {
//             title: 'Tên khách hàng',
//             dataIndex: 'userName',
//             sorter: (a, b) => a.userName.length - b.userName.length,
//             ...getColumnSearchProps('userName'),
//         },
//         {
//             title: 'SĐT',
//             dataIndex: 'phone',
//             sorter: (a, b) => a.phone.length - b.phone.length,
//             ...getColumnSearchProps('phone'),
//         },
//         {
//             title: 'Địa chỉ',
//             dataIndex: 'address',
//             sorter: (a, b) => a.address.length - b.address.length,
//             ...getColumnSearchProps('address'),
//         },
//         {
//             title: 'Ngày đặt hàng',
//             dataIndex: 'date',
//             ...getColumnSearchProps('date'),
//         },
//         {
//             title: 'Tổng tiền',
//             dataIndex: 'totalPrice',
//             sorter: (a, b) => a.totalPrice - b.totalPrice,
//             ...getColumnSearchProps('totalPrice'),
//         },
//         {
//             title: 'TT Vận chuyển',
//             dataIndex: 'isDelivered',
//         },
//         {
//             title: 'TT Thanh toán',
//             dataIndex: 'isPaid',
//         },
//         {
//             title: 'Phương thức thanh toán',
//             dataIndex: 'paymentMethod',
//             ...getColumnSearchProps('paymentMethod'),
//         },
//     ];

//     const tableData = orders?.data.map((order) => {
//         return {
//             ...order,
//             key: order._id,
//             userName: order.shippingAddress.fullName,
//             phone: '0' + order.shippingAddress.phone,
//             address: order.shippingAddress.address,
//             date: new Date(order.createdAt).toLocaleDateString(),
//             totalPrice: order.totalPrice.toLocaleString('vn-VN') + ' đ',
//             isDelivered: order.isDelivered === true ? 'Đã vận chuyển' : 'Chưa vận chuyển',
//             isPaid: order.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán',
//             paymentMethod: orderConstant.payment[order.paymentMethod],
//         };
//     });

//     return (
//         <div className={cx('wrapper')}>
//             <h1 className={cx('title')}>Quản lý người dùng</h1>
//             <div>
//                 <TableComponent
//                     columns={columns}
//                     columnsExport={columnsExport}
//                     data={tableData}
//                     isLoading={isLoadingOrders}
//                 />
//             </div>
//         </div>
//     );
// };

// export default AdminOrder;

import classNames from 'classnames/bind';
import styles from './AdminOrder.module.scss';
import { Button, Space, Select } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService';
import { SearchOutlined } from '@ant-design/icons';
import { orderConstant } from '../../constant.js';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message';

const cx = classNames.bind(styles);
const { Option } = Select;

const AdminOrder = () => {
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user);
    const [dataUpdateStatus, setDataUpdateStatus] = useState({});

    const getAllOrders = async () => {
        const res = await OrderService.getAllOrders(user?.access_token);
        return res;
    };

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    });

    const { isLoading: isLoadingOrders, data: orders } = queryOrder;

    const mutationUpdate = useMutationHook((data) => {
        console.log('mutationUpdate', data);
        const { id, access_token, ...rests } = data;
        const res = OrderService.updateOrder(id, access_token, { ...rests });
        return res;
    });

    const {
        data: dataUpdated,
        isPending: isPendingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    const handleChange = (id, field, value) => {
        setDataUpdateStatus((prevState) => {
            const updatedStatus = {
                ...prevState,
                [field]: value,
            };
            mutationUpdate.mutate({ id, access_token: user.access_token, ...updatedStatus });
            return updatedStatus;
        });
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button type="primary" icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'date',
            ...getColumnSearchProps('date'),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            ...getColumnSearchProps('totalPrice'),
        },
        {
            title: 'TT Vận chuyển',
            dataIndex: 'isDelivered',
            render: (text, record) => (
                <Select
                    defaultValue={record.isDelivered}
                    onChange={(value) => handleChange(record.key, 'isDelivered', value)}
                >
                    <Option value={true}>Đã vận chuyển</Option>
                    <Option value={false}>Chưa vận chuyển</Option>
                </Select>
            ),
        },
        {
            title: 'TT Thanh toán',
            dataIndex: 'isPaid',
            render: (text, record) => (
                <Select defaultValue={record.isPaid} onChange={(value) => handleChange(record.key, 'isPaid', value)}>
                    <Option value={true}>Đã thanh toán</Option>
                    <Option value={false}>Chưa thanh toán</Option>
                </Select>
            ),
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            ...getColumnSearchProps('paymentMethod'),
        },
    ];

    const tableData = orders?.data.map((order) => {
        return {
            ...order,
            key: order._id,
            userName: order.shippingAddress.fullName,
            phone: '0' + order.shippingAddress.phone,
            address: order.shippingAddress.address,
            date: new Date(order.createdAt).toLocaleDateString(),
            totalPrice: order.totalPrice.toLocaleString('vn-VN') + ' đ',
            isDelivered: order.isDelivered === true ? 'Đã vận chuyển' : 'Chưa vận chuyển',
            isPaid: order.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán',
            paymentMethod: orderConstant.payment[order.paymentMethod],
        };
    });

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success('Cập nhật thành công!');
        } else if (isErrorUpdated) {
            message.error('Cập nhật thất bại');
        }
    }, [isSuccessUpdated, isErrorUpdated, dataUpdated?.status]);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Quản lý người dùng</h1>
            <div>
                <TableComponent columns={columns} data={tableData} isLoading={isLoadingOrders || isPendingUpdated} />
            </div>
        </div>
    );
};

export default AdminOrder;
