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

import React from 'react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

function sortItems(a: any, b: any, item: string) {
    if (typeof a[item] === 'number' && typeof b[item] === 'number') {
        return a[item] - b[item];
    }
    return a[item].localeCompare(b[item]);
}
function getLinkItem(
    text: string,
    record: any,
    index: number,
    isInner: boolean,
    item: any,
    hrefColumn: any,
    path: string
) {
    if (
        isInner &&
        hrefColumn &&
        hrefColumn.indexOf(item) !== -1 &&
        record.__hrefPaths
    ) {
        if (record.__hrefPaths[hrefColumn.indexOf(item)].includes('http')) {
            return (
                <a
                    href={record.__hrefPaths[hrefColumn.indexOf(item)]}
                    target="_blank"
                    rel="noreferrer"
                >
                    {text}
                </a>
            );
        }
        return (
            <Link
                href={
                    path +
                    (location.search ? location.search : isInner) +
                    '/' +
                    text
                }
            >
                {text}
            </Link>
        );
    }
    return text === '\\N' ? '-' : <Balancer>{text}</Balancer>;
}
export function getColumns(
    params: string[],
    isSort: boolean,
    isInner: boolean,
    hrefColumn: any,
    path: string
) {
    if (!params || params.length === 0) {
        return [];
    }
    let arr = params.map((item, idx) => {
        if (isSort) {
            return {
                title: item,
                dataIndex: item,
                className: 'pr-25',
                key: item + idx,
                sorter: (a: number, b: number) => sortItems(a, b, item),
                render: (text: string, record: any, index: number) =>
                    getLinkItem(
                        text,
                        record,
                        index,
                        isInner,
                        item,
                        hrefColumn,
                        path
                    ),
            };
        }
        return {
            title: item,
            dataIndex: item,
            className: 'pr-25',
            key: item + idx,
            render: (text: string, record: any, index: number) =>
                getLinkItem(
                    text,
                    record,
                    index,
                    isInner,
                    item,
                    hrefColumn,
                    path
                ),
        };
    });
    return arr;
}
export function filterTableData(data: any, target: string) {
    const res: any[] = [];
    data.forEach((item: any) => {
        const flag: boolean = Object.values(item).some((value) => {
            if (typeof value === 'object') {
                return false;
            }
            return (value + '').includes(target);
        });
        if (flag) {
            res.push(item);
        }
    });
    return res;
}
