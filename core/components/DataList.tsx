'use client'
import Link from "next/link";
import React, { useEffect, useState, useCallback, useReducer } from "react";
import OdataBuilder from "../utilities/ODataBuilder";
import { Constants } from "../datasets/Constants";
import { Hyperlink } from "./HyperLink";
const DataList: React.FC<DataListConfiguration<any>> = (props) => {
    function getNestedProperty<T>(obj: T, path: string): any {
        if (path.includes('.')) {
            return path.split('.').reduce((prev: any, curr: string) => prev ? prev[curr] : null, obj);
        } else {
            return obj[path as keyof T];
        }
    }

    let activePageNumber = 0;
    let pages = 0
    let builder = new OdataBuilder(props.path);
    let orderBy = "";
    let label = "";

    builder = builder.setQuery(props.query);
    orderBy = builder.getOrderBy();
    activePageNumber = builder.getPageNumber(Constants.pagesize);

    if (props.dataset && props.dataset!.count) {
        pages = Math.ceil(props.dataset!.count / Constants.pagesize);

        label = `Showing  ${(activePageNumber - 1) * Constants.pagesize + 1} - `;
        if ((activePageNumber) * Constants.pagesize > props.dataset!.count!) {
            label = label + `${props.dataset!.count} of ${props.dataset!.count} results`
        }
        else {
            label = label + `${(activePageNumber) * Constants.pagesize} of ${props.dataset!.count} results`
        }
    }

    return (
        <div>
            <table className=" min-w-full py-4 table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-sm font-medium">
                    <tr>
                        {props.columns.map((column, index) => {
                            return (
                                <th key={index} className="border border-gray-300 px-6 py-3 text-left">{column.label}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className="text-gray-600 ">

                    {props.dataset?.result?.map((item, row) => {
                        return (
                            <tr key={row} className="bg-white hover:bg-gray-50 transition duration-150">
                                {props.columns.map((column, colIndex) => {
                                    return (
                                        <React.Fragment key={colIndex} >
                                            <td className="border border-gray-300 px-6 py-3">
                                                {colIndex == 1 &&
                                                    <Hyperlink className="" href={props.path + "edit/" + item[props.columns[0].name]}>
                                                        {getNestedProperty(item, column.name)}
                                                    </Hyperlink>
                                                }
                                                {colIndex != 1 && !column.showAsLink && getNestedProperty(item, column.name)}

                                                {colIndex != 1 && column.showAsLink && (
                                                    <Hyperlink
                                                        href={
                                                            props.path +
                                                            item[props.columns[0].name] +
                                                            "/" +
                                                            column.linkUrlSegment
                                                        }
                                                    >
                                                        {getNestedProperty(item, column.name) || column.emptyValueLabel}
                                                    </Hyperlink>
                                                )}

                                            </td>
                                        </React.Fragment>


                                    )
                                })}
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>




            <div className="py-4 border-t border-t-gray-50">
                <div className="flex items-center justify-between">
                    <div className=" text-gray-700">
                        {label}
                    </div>
                    <div className="flex space-x-2">

                        {activePageNumber > 1 && <Hyperlink className={"px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-200"} href={builder.getNewPageUrl(activePageNumber - 1)}>
                            Prev
                        </Hyperlink>}
                        {activePageNumber <= 1 && <div className={"px-3 py-1 rounded-l-md border border-gray-300 bg-gray-200 text-gray-500 hover:bg-gray-200"}>
                            Prev
                        </div>}


                        {Array.from({ length: pages }, (_, index) => index + 1).map((page) => {
                            return (

                                <React.Fragment key={page}>

                                    {activePageNumber != page && <Hyperlink key={page} className={"px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700"} href={builder.getNewPageUrl(page)}>
                                        {page}
                                    </Hyperlink>}

                                    {activePageNumber == page &&
                                        <span key={page} className={"px-3 py-1 border-t border-b border-gray-300 bg-primary text-white"}  >
                                            {page}
                                        </span>
                                    }
                                </React.Fragment>
                            )
                        })}


                        {activePageNumber < pages && <Hyperlink className={"px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-200"} href={builder.getNewPageUrl(activePageNumber + 1)}>
                            Next
                        </Hyperlink>}
                        {activePageNumber >= pages && <div className={"px-3 py-1 rounded-r-md border border-gray-300 bg-gray-200 text-gray-500 "}>
                            Next
                        </div>}

                        {/* <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-200">
                            Next
                        </button> */}
                    </div>
                </div>
            </div>
        </div>

    )


}
export default DataList;