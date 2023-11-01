import axios from "axios";
import { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import Table from "./Table";
// import { dataTable } from "./TestDataSet";
import { searchKeys } from "./FilterUtils";
import { dataTable } from "./TestDataSet";

export default function Explore() {
    const [database, setDatabase] = useState([]);

    useEffect(() => {
        axios.get("/api").then((res) => setDatabase(res.data));
    }, []);

    // Search functionality
    const [searchQuery, setSearchQuery] = useState("");

    // Search function -- Todo: Make the fuzzyQuery fuzzier
    const searchDatabase = (data) => {
        const fuzzyQuery = searchQuery.toLowerCase();
        return data.filter((row) =>
            searchKeys.some((key) =>
                row[key].toLowerCase().includes(fuzzyQuery)
            )
        );
    };

    const filterData = (data) => {
        return searchDatabase(data).filter((row) => {
            if (
                typeFilter &&
                typeFilter !== "All" &&
                !row["textType"]
                    .toLowerCase()
                    .includes(typeFilter.toLowerCase())
            ) {
                return false;
            }

            if (
                dimensionFilter &&
                dimensionFilter !== "All" &&
                !row["dimensionLabel"]
                    .toLowerCase()
                    .includes(dimensionFilter.toLowerCase())
            ) {
                return false;
            }

            if (
                languageFilter &&
                languageFilter !== "All" &&
                !row["language"]
                    .toLowerCase()
                    .includes(languageFilter.toLowerCase())
            ) {
                return false;
            }
            // Check if every genre in the multiselect is included in the row
            if (genreFilter && !genreFilter.includes("All")) {
                const row_genre = row["genre"].toLowerCase();
                let included = true;
                genreFilter.forEach((genre) => {
                    if (!row_genre.includes(genre.toLowerCase())) {
                        included = false;
                    }
                });
                if (!included) {
                    return false;
                }
            }
            // TODO
            if (
                scriptFilter
                // scriptFilter !== "All" &&
                // !row["genre"].toLowerCase().includes(scriptFilter.toLowerCase())
            ) {
                // console.log(row);
            }
            // TODO
            // if (database.indexOf(row["titleOriginal"]) == -1){
            //     return false;
            // }
            // let date = database.indexOf(row["titleOriginal"]).normalizedDate;
            let date = normalizedDate(row["date"]);
            if (date < dateFilter[0] || date > dateFilter[1]) {
                
                return false;
            }
            // TODO (dimension filter)
            // What we will do is use a single dimension slider and represent a large square and small square
            // with the values of this slider. Using the areas of these squares, we can come up with a upper
            // bound and lower bound for the area. For the rows to be displayed, the area of the artifact
            // represented by the row must be more than the lower bound and less than the upper bound.
            return true;
        });
    };

    const [typeFilter, setTypeFilter] = useState(null);
    const [languageFilter, setLanguageFilterKeys] = useState(null);
    const [scriptFilter, setScriptFilterKeys] = useState(null);
    const [genreFilter, setGenreFilter] = useState([]);
    const [dateFilter, setDateFilter] = useState([]);
    const [dimensionFilter, setDimensionFilter] = useState(null);

    return (
        <div>
            <FilterBar
                searchChange={(searchQuery) => setSearchQuery(searchQuery)}
                filterByType={(typeFilter) => setTypeFilter(typeFilter)}
                filterByLanguage={(languageFilter) =>
                    setLanguageFilterKeys(languageFilter)
                }
                filterByScript={(scriptFilter) =>
                    setScriptFilterKeys(scriptFilter)
                }
                filterByGenre={(genreFilter) => setGenreFilter(genreFilter)}
                filterByDate={(dateFilter) => setDateFilter(dateFilter)}
                filterByDimension={(dimensionFilter) => setDimensionFilter(dimensionFilter)}
            />
            <Table database={filterData(database)}></Table>
        </div>
    );
}

function normalizedDate(date) {
    if (date[0] === "~"){
        return Number(date.slice(1, 5));
    }
    if (date[0] === "["){
        return 0;
    }
    if (date[3] === " "){
        return Number(date.slice(0, 4));
    }
    return Number(date.slice(0, 5));
}

