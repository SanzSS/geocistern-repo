import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import Popup from "./Popup";
import ColumnLabels from "./ColumnLabels";

const Table = (props) => {
    const database = props.database;

    let pageSize = 15;
    const [currentPage, setCurrentPage] = useState(1);

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * pageSize;
    //     const lastPageIndex = firstPageIndex + pageSize;
    //     return database.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    const defaultValue = "N/A";
    const [popupContents, setPopupContents] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const togglePopup = (index) => {
        console.log(index, database[index]);
        if (!isPopupOpen) {
            setPopupContents(database[index]);
        }
        setIsPopupOpen(!isPopupOpen);
    };
    return (
        <div role='document'>
            <table role='grid'>
                <ColumnLabels />
                <tbody>
                    {database.map((r, index) => {
                        return (
                            <>
                                <tr
                                    className='row-item'
                                    key={index}
                                    onClick={() => togglePopup(index)}
                                >
                                    <td>
                                        {r.authorNameOriginal
                                            ? r.authorNameOriginal
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.authorNameTranslit
                                            ? r.authorNameTranslit
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.titleOriginal
                                            ? r.titleOriginal
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.titleTranslit
                                            ? r.titleTranslit
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.language ? r.language : defaultValue}
                                    </td>
                                    <td>{r.genre ? r.genre : defaultValue}</td>
                                    <td>
                                        {r.textType ? r.textType : defaultValue}
                                    </td>
                                    <td>{r.date ? r.date : defaultValue}</td>
                                    <td>{r.dimensionLabel ? r.dimensionLabel : defaultValue}</td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
            {isPopupOpen && (
                <Popup
                    content={
                        <>
                            <b>Additional Details</b>
                            <p>
                                Original location:{" "}
                                {popupContents.originalLocation
                                    ? popupContents.originalLocation
                                    : ""}{" "}
                                <br />
                                Publisher:{" "}
                                {popupContents.publisher
                                    ? popupContents.publisher
                                    : ""}{" "}
                                <br />
                                Script:{" "}
                                {popupContents.script
                                    ? popupContents.script
                                    : ""}{" "}
                                <br />
                                Page count:{" "}
                                {popupContents.pageCount
                                    ? popupContents.pageCount
                                    : ""}{" "}
                                <br />
                                Dimensions:{" "}
                                {popupContents.dimensions
                                    ? popupContents.dimensions
                                    : ""}{" "}
                                <br />
                                Additional information:{" "}
                                {popupContents.additionalInfo
                                    ? popupContents.additionalInfo
                                    : ""}
                            </p>
                        </>
                    }
                    handleClose={togglePopup}
                />
            )}
            <Pagination
                className='pagination-bar'
                currentPage={currentPage}
                totalCount={database.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Table;
