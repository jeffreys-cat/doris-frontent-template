/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

import { Button } from '../button';
import { Input } from '../input';
import { filterTableData, getColumns } from './table.utils';

export default function SortFilterTable(props: any) {
    const {
        isFilter = false,
        isSort = false,
        allTableData,
        isInner,
        isSystem = false,
        path = '',
        rowKey,
    } = props;
    const [tableData, setTableData] = useState<any[]>([]);
    const [localColumns, setColumns] = useState<any[]>([]);
    const { t } = useTranslation();
    // function onChange(pagination, filters, sorter, extra) {
    //     console.log('params', pagination, filters, sorter, extra);
    // }
    function changeTableData(e: any) {
        const localData = filterTableData(allTableData.rows, e.target.value);
        setTableData(localData);
    }

    const content = (
        <Input placeholder="Filter data" onChange={(e) => changeTableData(e)} />
    );
    useEffect(() => {
        if (allTableData.rows && allTableData.column_names) {
            setColumns(
                getColumns(
                    allTableData.column_names,
                    isSort,
                    isInner,
                    allTableData.href_columns || allTableData.href_column,
                    path
                )
            );
            setTableData(allTableData.rows);
        }
    }, [allTableData]);

    return (
        <span className="systemTable">
            <div className="my-6 flex w-full max-w-sm items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Configuration"
                    onChange={(e) => changeTableData(e)}
                />
                <Button type="submit">{t`Search`}</Button>
            </div>
            <Table
                columns={localColumns}
                rowKey={(record) =>
                    typeof rowKey === 'function'
                        ? rowKey(record)
                        : typeof rowKey === 'string'
                        ? rowKey
                        : undefined
                }
                dataSource={tableData}
                scroll={{ x: 'max-content' }}
                size="small"
                bordered
                pagination={{
                    size: 'small',
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    defaultPageSize: 30,
                }}
            />
        </span>
    );
}
